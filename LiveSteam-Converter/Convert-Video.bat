@echo off
title LiveSteam video converter
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0Convert-Video.ps1" "%~1"
echo.
pause
