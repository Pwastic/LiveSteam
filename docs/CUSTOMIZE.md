# Customize

## 1. Settings menu (no editing needed)
In Steam open Millennium's settings -> Themes and open this theme's settings. Changes apply after restarting Steam.

Background tab
- Animation: Animated, or Still (freezes the video on one frame; almost no power use)
- Background video: First / Second / Third (see section 2)
- Brightness: Dark / Medium / Bright
- Blur: Off / Low / High (blur uses more graphics power)
- Color intensity: Muted / Normal / Vivid

Panels tab
- Panel darkness: Light / Medium / Heavy (lighter shows more video but makes text harder to read)
- Panel color: Midnight / Black / Purple / Forest
- Menu background: Different (own picture) / Same (as the main background) / Plain (dark gradient)

## 2. Replace the background video
The videos are the files `video1.gif`, `video2.gif`, `video3.gif` in the theme's `media` folder.
They are really WebM videos. They carry a picture name because Steam's file server refuses to hand out `.webm`
files but does hand out pictures.

Easiest: use the LiveSteam Converter (a separate download). Drag any video onto `Convert-Video.bat`; it converts the
video and installs it into the right slot for you. The manual way is below.

To replace one by hand:
1. Get a WebM video (VP9 or VP8). Recommended: 1280x720 (or 1920x1080), 30 fps, no sound, under 20 MB, and a clip
   whose end flows into its start (it repeats forever).
2. Rename it to `video1.gif` (or `video2.gif` / `video3.gif`). In Windows Explorer turn on View -> Show -> File
   name extensions so you can change the ending. A renamed MP4 will NOT work; the contents must be WebM.
3. Overwrite the file in `media` and restart Steam.

If the chosen slot is empty, the theme uses `video1.gif`. To use another slot, put a video in it and pick
First / Second / Third in the settings.

Converting a video yourself (optional, needs ffmpeg):
`ffmpeg -i input.mp4 -an -vf "scale=1280:-2,fps=30" -c:v libvpx-vp9 -b:v 0 -crf 36 -pix_fmt yuv420p video1.webm`
then rename `video1.webm` to `video1.gif`.

## 3. Replace the pictures
- `media/bg-fallback.jpg`: shown for a moment while the video loads (use a frame of your video).
- `media/menu-bg.jpg`: the dropdown menus' background (JPG, roughly square works well).
Keep the file names.

## 4. Fine settings (editing a file, Notepad is enough)
`libraryroot.custom.css`, the block at the top (`:root { ... }`):
- `--ls-bg-opacity` 0 to 1: how visible the background is
- `--ls-bg-contrast` 1 = normal
- `--ls-bg-scale` 1 = normal, 1.1 = zoom in 10%
- `--ls-bg-fit` `cover` (fill the window, may crop) or `contain` (show everything)
- `--ls-bg-pos-x`, `--ls-bg-pos-y` which part stays visible when cropped (50% = centered)
- `--ls-bg-fade` fade-in time of the video

`libraryroot.custom.js`, the `CONFIG` block at the top:
- `mode`: `"video"` or `"off"` (turns the background off completely)
- `pauseWhenHidden`: pause the video while the window is hidden or minimized
- `videoInPopups`: `true` plays video in menus too (uses more memory)
- `respectReducedMotion`: use a still picture if Windows asks for less motion
- `autoLayers`: let the script find Steam's big panels (leave on)
- `minAreaRatio`, `barMinWidthRatio`, `barMinHeight`, `maxDepth`, `maxNodes`: how the panel finder decides what
  counts as a big panel (leave unless instructed)
- `diagnosticOnStart`: `true` shows the troubleshooting report after Steam starts
- `debug`: `true` prints extra messages to the developer console
Restart Steam after editing.
