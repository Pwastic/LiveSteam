# LiveSteam
customizable animated theme for Steam Client. Built on the **Millennium** framework
# 🌌 Animated Steam Theme

<div align="center">

[![Millennium Framework](https://img.shields.io/badge/Millennium-Framework-blue?style=for-the-badge&logo=steam)](https://github.com/SteamClientHomebrew/Millennium)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

A fluid, customizable animated theme for the desktop Steam Client. Built on the **Millennium** framework

</div>

---
<img width="488" height="329" alt="image" src="https://github.com/user-attachments/assets/86fe0e38-2708-46e5-8246-24749a778bb4" />
<img width="1422" height="847" alt="Screenshot 2026-11-05 121942" src="https://github.com/user-attachments/assets/74a7b02e-7809-4e5c-9338-b232f341483d" />
<img width="1425" height="841" alt="Screenshot 2026-11-05 121955" src="https://github.com/user-attachments/assets/ca0d0eee-4f26-4945-a652-50ecff1b6def" />
https://github.com/user-attachments/assets/4fc85cbf-1ba8-459c-897d-8ecfda689950

## Features

* **Dynamic Animated Backgrounds:** Bring your Steam client to life with smooth loopable video backgrounds.
* **Integrated Video Converter:** Includes a built-in conversion utility to easily transcode your favorite clips into optimized formats directly supported by the theme engine.
* **Transparent Window Workaround:** Utilizes specialized Chromium composition techniques (inspired by **yufengOvO**'s pioneering transparency workarounds) to let your animated backdrops shine seamlessly behind clean glass-morphism panels.
* **Deep Customization:** Tailor accent colors, panel opacities, and blur intensities directly via the Millennium settings menu.
* **Full UI Coverage:** Custom styles injected across the Library, Store, Friends list, chat windows, and overlay.

---

## Installation

1. Make sure you have [Millennium](https://github.com/SteamClientHomebrew/Millennium) installed on your desktop Steam client.
2. Download or clone this repository into your Millennium themes directory (typically found under your Steam installation path inside `millennium/themes/` or via the theme loader).
3. Open Steam, navigate to your **Millennium Settings**, and enable this theme.
4. Restart your Steam client to apply changes.

---
## Convert video

Drag any video onto Convert-Video.bat, or double-click it and pick a file. It then:

1. Finds your LiveSteam theme folder by itself, and asks you to pick it if it can’t.
2. Asks three quick questions, each with a suggested answer: which slot (1, 2 or 3), quality (720p small or 1080p sharp) and an optional maximum length.
------the video that will play can be chosen in the theme configuration option  
3. Converts the video with the same settings I used for yours, checks the result is a valid WebM, and installs it as video1.gif, or the slot you chose.
4. Keeps your old video as video1.previous and can update the loading picture too.

## Extra 
you can also customize the dropdown and panel backround by replacing the " Menu-bg.jpg " found in :
" C:\Program Files (x86)\Steam\millennium\themes\LiveSteam\media " to any image you want as long as it's .jpg

## Acknowledgements & Credits
SteamClientHomebrew for creating the incredible Millennium modding framework.

yufengOvO for inspiring the transparent window styling workarounds that make background integration possible. 

Claude for finding the workaround for video integration and converter 

