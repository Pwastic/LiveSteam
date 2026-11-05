LiveSteam video converter
=========================

Turns any video (mp4, mkv, mov, webm, avi, gif...) into a Steam background file and puts it straight into your
LiveSteam theme. No need to rename or move anything yourself.

HOW TO USE
  Easiest: drag your video file and drop it on  Convert-Video.bat
  Or:      double-click Convert-Video.bat and choose the video in the window that opens.

The tool asks a few questions (press Enter to accept the suggestion each time):
  - Which video slot (1 is the normal one; 2 and 3 are extra slots you can choose in the theme's settings)
  - Quality: 1 = small and light (720p, recommended), 2 = sharper (1080p)
  - Maximum length in seconds (Enter = keep the whole video)
Then it converts the video and installs it. Restart Steam afterwards.

FIRST TIME ONLY
  It needs a free program called ffmpeg. If it is not on your PC, the tool offers to download it (about 200 MB)
  and keeps it in  %LOCALAPPDATA%\LiveSteamConverter  so it only downloads once.

GOOD TO KNOW
  - Your previous video is kept next to the new one as video1.previous (or video2 / video3).
  - The sound is removed (the background is silent).
  - Short clips that loop smoothly work best; the video repeats forever.
  - The whole video is loaded into memory when Steam starts, so keep it small (ideally under 20 MB).
  - Windows may warn about running a script from a download. Choose "More info" then "Run anyway" if you trust it.
  - The tool looks for your theme in the Steam folder's millennium\themes. If it cannot find it, it asks you to
    choose the theme folder (the one that contains skin.json).

IF SOMETHING GOES WRONG
  The window stays open and shows what happened. Copy the text of the window and send it to whoever is helping you.
  Status: written for Windows 10/11 with the built-in Windows PowerShell
