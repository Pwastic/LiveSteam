param([string]$InputFile = "")

$ErrorActionPreference = "Stop"

function Say($text, $color = "Gray") { Write-Host $text -ForegroundColor $color }
function Ask($question, $default) {
    $answer = Read-Host "$question [$default]"
    if ([string]::IsNullOrWhiteSpace($answer)) { return $default }
    return $answer.Trim()
}
function Fail($message) {
    Write-Host ""
    Write-Host "Problem: $message" -ForegroundColor Red
    Write-Host "If you ask for help, copy the text of this window." -ForegroundColor Red
    exit 1
}

function Find-ThemeFolders {
    $found = @()
    $roots = @()
    try {
        $steam = (Get-ItemProperty "HKCU:\Software\Valve\Steam" -ErrorAction Stop).SteamPath
        if ($steam) { $roots += (Join-Path ($steam -replace '/', '\') "millennium\themes") }
    } catch { }
    $roots += "C:\Program Files (x86)\Steam\millennium\themes"
    foreach ($root in ($roots | Select-Object -Unique)) {
        if (-not (Test-Path -LiteralPath $root)) { continue }
        foreach ($dir in (Get-ChildItem -LiteralPath $root -Directory)) {
            $js = Join-Path $dir.FullName "libraryroot.custom.js"
            $media = Join-Path $dir.FullName "media"
            if ((Test-Path -LiteralPath $js) -and (Test-Path -LiteralPath $media)) {
                if (Select-String -LiteralPath $js -Pattern "livesteam-bg" -Quiet) { $found += $dir.FullName }
            }
        }
    }
    return $found
}

function Find-Ffmpeg {
    $local = Join-Path $env:LOCALAPPDATA "LiveSteamConverter\ffmpeg"
    if (Test-Path -LiteralPath $local) {
        $exe = Get-ChildItem -LiteralPath $local -Recurse -Filter ffmpeg.exe -ErrorAction SilentlyContinue | Select-Object -First 1
        if ($exe) { return $exe.FullName }
    }
    $cmd = Get-Command ffmpeg -ErrorAction SilentlyContinue
    if ($cmd) { return $cmd.Source }
    return $null
}

try {
    Write-Host ""
    Say "LiveSteam video converter" "Cyan"
    Say "Turns any video into a Steam background file and puts it in your theme." "Cyan"
    Write-Host ""

    Add-Type -AssemblyName System.Windows.Forms

    if ([string]::IsNullOrWhiteSpace($InputFile)) {
        Say "Choose the video you want as your Steam background..."
        $dialog = New-Object System.Windows.Forms.OpenFileDialog
        $dialog.Title = "Choose the video you want as your Steam background"
        $dialog.Filter = "Video files|*.mp4;*.mkv;*.mov;*.webm;*.avi;*.gif;*.m4v;*.wmv|All files|*.*"
        if ($dialog.ShowDialog() -ne [System.Windows.Forms.DialogResult]::OK) { Fail "No file was chosen." }
        $InputFile = $dialog.FileName
    }
    if (-not (Test-Path -LiteralPath $InputFile)) { Fail "Could not find the file: $InputFile" }
    Say "Video: $InputFile"

    $themes = @(Find-ThemeFolders)
    $theme = $null
    if ($themes.Count -eq 1) {
        $theme = $themes[0]
    } elseif ($themes.Count -gt 1) {
        Say "More than one LiveSteam theme folder was found:"
        for ($i = 0; $i -lt $themes.Count; $i++) { Say ("  " + ($i + 1) + " = " + $themes[$i]) }
        $pick = [int](Ask "Which one?" "1")
        if ($pick -lt 1 -or $pick -gt $themes.Count) { Fail "That is not one of the choices." }
        $theme = $themes[$pick - 1]
    } else {
        Say "Could not find the LiveSteam theme folder by itself. Please choose it (the folder that contains skin.json)."
        $folderDialog = New-Object System.Windows.Forms.FolderBrowserDialog
        $folderDialog.Description = "Choose your LiveSteam theme folder (inside millennium\themes)"
        if ($folderDialog.ShowDialog() -ne [System.Windows.Forms.DialogResult]::OK) { Fail "No folder was chosen." }
        $theme = $folderDialog.SelectedPath
    }
    $media = Join-Path $theme "media"
    if (-not (Test-Path -LiteralPath $media)) { Fail "There is no 'media' folder in: $theme" }
    Say "Theme: $theme"
    Write-Host ""

    $slot = Ask "Which video slot should this replace? (1, 2 or 3)" "1"
    if (@("1", "2", "3") -notcontains $slot) { Fail "The slot must be 1, 2 or 3." }

    Say "Quality:  1 = Small and light (720p, recommended)   2 = Sharper (1080p, bigger file)"
    $quality = Ask "Quality" "1"
    if ($quality -eq "2") { $height = 1080; $crf = "34" } else { $height = 720; $crf = "36" }

    $maxText = Ask "Maximum length in seconds (press Enter to keep the whole video)" ""
    $maxSeconds = 0
    if (-not [string]::IsNullOrWhiteSpace($maxText)) {
        if (-not [int]::TryParse($maxText, [ref]$maxSeconds) -or $maxSeconds -lt 1) { Fail "The length must be a whole number of seconds." }
    }
    Write-Host ""

    $ffmpeg = Find-Ffmpeg
    if (-not $ffmpeg) {
        Say "This tool needs ffmpeg, a free video program, and it is not installed yet."
        $yes = Ask "Download it now? About 200 MB, one time only (Y/N)" "Y"
        if ($yes -notmatch '^[Yy]') { Fail "ffmpeg is needed. Install it from ffmpeg.org, or run this again and answer Y." }
        $base = Join-Path $env:LOCALAPPDATA "LiveSteamConverter"
        New-Item -ItemType Directory -Force -Path $base | Out-Null
        $zip = Join-Path $base "ffmpeg.zip"
        $url = "https://github.com/BtbN/FFmpeg-Builds/releases/latest/download/ffmpeg-master-latest-win64-gpl.zip"
        Say "Downloading... this can take a few minutes. Please wait."
        [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
        $oldProgress = $ProgressPreference
        $ProgressPreference = "SilentlyContinue"
        try { Invoke-WebRequest -Uri $url -OutFile $zip -UseBasicParsing } finally { $ProgressPreference = $oldProgress }
        Say "Unpacking..."
        Expand-Archive -LiteralPath $zip -DestinationPath (Join-Path $base "ffmpeg") -Force
        Remove-Item -LiteralPath $zip -Force
        $ffmpeg = Find-Ffmpeg
        if (-not $ffmpeg) { Fail "ffmpeg could not be installed." }
        Say "ffmpeg is ready." "Green"
        Write-Host ""
    }

    $work = Join-Path $env:TEMP "LiveSteamConverter"
    New-Item -ItemType Directory -Force -Path $work | Out-Null
    $outWebm = Join-Path $work "video.webm"
    if (Test-Path -LiteralPath $outWebm) { Remove-Item -LiteralPath $outWebm -Force }

    Say "Converting... this can take a few minutes for long videos. Please wait."
    $ffArgs = @("-y", "-hide_banner", "-loglevel", "warning", "-stats", "-i", $InputFile, "-an")
    if ($maxSeconds -gt 0) { $ffArgs += @("-t", [string]$maxSeconds) }
    $filter = "scale=-2:min(ih\,$height),fps=30"
    $ffArgs += @("-vf", $filter, "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", $crf, "-cpu-used", "4", "-row-mt", "1", "-pix_fmt", "yuv420p", $outWebm)
    & $ffmpeg @ffArgs
    if ($LASTEXITCODE -ne 0) { Fail "ffmpeg could not convert that file (error code $LASTEXITCODE)." }
    if (-not (Test-Path -LiteralPath $outWebm)) { Fail "The converted file was not created." }

    $stream = [System.IO.File]::OpenRead($outWebm)
    $head = New-Object byte[] 4
    [void]$stream.Read($head, 0, 4)
    $stream.Close()
    if (-not ($head[0] -eq 0x1A -and $head[1] -eq 0x45 -and $head[2] -eq 0xDF -and $head[3] -eq 0xA3)) { Fail "The converted file is not a valid WebM video." }
    $sizeMB = [math]::Round((Get-Item -LiteralPath $outWebm).Length / 1048576, 1)
    Say "Converted: $sizeMB MB" "Green"
    if ($sizeMB -gt 25) {
        Say "Warning: that is a large file. The whole video is loaded into memory when Steam starts." "Yellow"
        Say "Consider choosing quality 1, or a shorter maximum length, if Steam feels heavy." "Yellow"
    }

    $target = Join-Path $media "video$slot.gif"
    if (Test-Path -LiteralPath $target) {
        Copy-Item -LiteralPath $target -Destination (Join-Path $media "video$slot.previous") -Force
        Say "Your old video was kept as video$slot.previous in the media folder."
    }
    Copy-Item -LiteralPath $outWebm -Destination $target -Force
    Say "Installed: $target" "Green"

    if ($slot -eq "1") {
        $update = Ask "Also update the loading picture (shown for a moment while the video loads)? (Y/N)" "Y"
        if ($update -match '^[Yy]') {
            $still = Join-Path $work "still.jpg"
            if (Test-Path -LiteralPath $still) { Remove-Item -LiteralPath $still -Force }
            & $ffmpeg -y -hide_banner -loglevel error -ss 2 -i $outWebm -frames:v 1 -vf "scale=1920:-2" -q:v 3 $still
            if ($LASTEXITCODE -eq 0 -and (Test-Path -LiteralPath $still)) {
                $fallback = Join-Path $media "bg-fallback.jpg"
                if (Test-Path -LiteralPath $fallback) { Copy-Item -LiteralPath $fallback -Destination (Join-Path $media "bg-fallback.previous") -Force }
                Copy-Item -LiteralPath $still -Destination $fallback -Force
                Say "Loading picture updated." "Green"
            } else {
                Say "Could not make a loading picture from this video; the old one was kept." "Yellow"
            }
        }
    }

    Write-Host ""
    Say "Done! Restart Steam to see it." "Green"
    if ($slot -eq "2") { Say "Then pick it in the theme's settings: Background video -> Second." "Green" }
    if ($slot -eq "3") { Say "Then pick it in the theme's settings: Background video -> Third." "Green" }
}
catch {
    Fail $_.Exception.Message
}
