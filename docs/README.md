# LiveSteam 1.0.1

An animated video background for Steam, built on Millennium. The video plays behind the Library, the Store and
Community pages, the top and bottom bars and the dropdown menus. Steam's panels are tinted so text stays readable.
Everything is adjustable from dropdowns in Millennium's settings.

## Files
```
LiveSteam/
  skin.json                  what Millennium loads + the settings dropdowns
  libraryroot.custom.js      puts the video behind Steam's interface
  libraryroot.custom.css     main window styling
  webkit.css                 Store / Community pages styling
  media/
    video1.gif               the background video (really a WebM; see CUSTOMIZE.md)
    video2.gif, video3.gif   optional extra videos (not included)
    bg-fallback.jpg          still picture shown while the video loads
    menu-bg.jpg              picture for the dropdown menus
  settings/                  one tiny file per dropdown choice
  docs/                      these guides
```

## Requirements
- Millennium 3.x for Steam on Windows, with JS insertion enabled in Millennium's settings.
- Developed and tested on Millennium 3.6.2.

## Known limitations
- Steam's built-in file server will not hand out `.webm` files, so the video is stored as `video1.gif` (still a WebM
  inside) and read by the script. Pictures, text and fonts are served normally.
- The whole video is loaded into memory when Steam starts. A 3 MB video costs about 3 MB; a 100 MB video would cost
  much more. Keep videos small (see CUSTOMIZE.md).
- Dropdown menus show a still picture, not the animation (saves memory and power).
- Store and Community pages use a semi-transparent page background, so the pages' own blue gradient is replaced.
  Artwork inside pages is left alone. Unusual pages may look different.
- Steam updates can rename its internal class names. The script finds Steam's big panels automatically, so most
  updates should not matter, but one short block in `libraryroot.custom.css` (the two long class names at the end)
  is specific to the current Steam build and may need updating.
- Settings changes apply after restarting Steam.
- If your video cannot be read when Steam starts (for example right after the PC boots), the theme retries for about
  30 seconds. If it still cannot, a built-in slow color-cycling placeholder plays and the theme keeps checking once a
  minute for five more minutes; the moment the video can be read, it replaces the placeholder.
- A separate converter tool (LiveSteam-Converter) turns any video into the right file and installs it for you.
