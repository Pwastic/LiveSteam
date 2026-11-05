# Troubleshooting

## The troubleshooting report
Click the main Steam window and press Ctrl+Alt+D. A black box appears at the top right. Take a screenshot of it
(scroll inside the box for the rest). Press Ctrl+Alt+D again, or click Close, to hide it.
To have it appear by itself after Steam starts, set `diagnosticOnStart: true` in `libraryroot.custom.js`.

How to read the "video log" lines:
- `stylesheet active after ... ms` the theme's styling was applied.
- `settings: animation=..., video slot=...` the dropdown choices the theme sees. `(default)` next to a value means
  that dropdown did not reach the theme and the built-in default is being used.
- `file video1.gif: status 200, type image/gif, ... KB, valid WebM` your video was found and is a real WebM. This is
  the healthy line.
- `file video1.gif: ... not usable` the file is missing, empty, or not WebM inside (see "Placeholder plays").
- `video READY, source: video1.gif (blob)` the video is playing.
- `built-in placeholder` the theme gave up on your file and is showing its backup animation.

## The theme does not appear in Millennium
- The folder must be directly inside `millennium\themes` and contain `skin.json` at its top level
  (`themes\LiveSteam\skin.json`, not one folder deeper).
- Quit Steam completely (system tray too) and start it again.
- Open `skin.json` in Notepad: if it is damaged or was edited by hand, restore it from the original zip.

## Steam looks completely normal, no background
- In Millennium's settings make sure JS insertion is enabled and this theme is selected.
- Press Ctrl+Alt+D. If no box appears, the script is not running: check the previous two points.
- If the box appears, send it to whoever is helping you (the `video log` lines say what went wrong).

## A slow color-cycling animation plays instead of my video
That is the built-in placeholder, shown because your video could not be used.
- The file must be named exactly `video1.gif` (or `video2.gif` / `video3.gif`) in the theme's `media` folder.
  Windows hides extensions by default, so a file that looks like `video1.gif` may really be `video1.gif.webm`.
  Turn on View -> Show -> File name extensions in Explorer and check.
- The contents must be a WebM video (VP9 or VP8). Renaming an MP4 does not work.
- Make sure the file is not empty and is under about 20 MB.
- The report line `file video1.gif: ...` shows what Steam received. `0 KB` means empty or missing.
- Reloading the theme through Millenium is also recommended if the above doesn't work

## The placeholder showed after turning the PC on, and a theme refresh fixed it
Right after the PC starts, Steam and Millennium are still busy, and the first attempt to read the video file can
fail. Since 1.0.1 the theme retries (after 3, 8 and 20 seconds), then shows the placeholder only as a last resort
and keeps checking once a minute for five more minutes, switching to your video as soon as it can be read.
If you still see the placeholder for many minutes after starting Steam, press Ctrl+Alt+D and look at the
`video log`: lines saying `retrying`, `giving up` or `request FAILED` show what happened. Refreshing the theme
(or restarting Steam) always starts the process again.

## The video plays but looks wrong
- Too dark/bright: Settings -> Brightness. Washed or too strong colors: Color intensity.
- Cropped oddly: edit `--ls-bg-fit` and `--ls-bg-pos-x/y` (see CUSTOMIZE.md) or use a 16:9 video.
- Stutters: use a smaller video (720p, 30 fps), turn Blur off, or set Animation to Still.

## Text is hard to read
Settings -> Panels -> Panel darkness: Heavy, and Background -> Brightness: Dark. Black panel color helps most.

## The Store or Community pages have no background
- Quit Steam completely and restart it.
- Check that `webkit.css` is in the theme folder and `skin.json` still contains the `Steam-WebKit` line.
- After a Steam update, the Store can change; send the report and a screenshot.

## The background disappeared after a Steam update
Steam renames its internal styling names now and then. The script finds Steam's big panels automatically, so this
should be rare. Press Ctrl+Alt+D and read the "Big elements" list at the bottom of the report: panels marked
`tint` or `clear` are handled; a large panel with a solid color that is not marked is what hides the background.
The two long class names at the end of `libraryroot.custom.css` are specific to one Steam build; if they are out of
date they only stop helping, they do not break anything.

## High CPU or graphics use
- Settings -> Animation: Still (freezes on one frame, almost zero use).
- Blur: Off. Use a 720p, 30 fps video. Keep `videoInPopups` at `false`.
- Normal use is about 1% CPU while in use and 0% idle on a GTX 1080.

## A dropdown setting changes nothing
- Restart Steam; settings apply on start.
- Press Ctrl+Alt+D and look at the `settings:` line. If a value shows `(default)`, that dropdown is not reaching the
  theme. Reselect the choice, restart, and check again.

## The menus look wrong
Settings -> Panels -> Menu background: try Same or Plain. To use your own picture replace `media/menu-bg.jpg`.

## Go back to a clean state
Select another theme in Millennium's settings, or delete the theme folder. To retry from scratch, delete the folder
and unzip a fresh copy.
