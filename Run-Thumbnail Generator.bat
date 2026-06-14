@echo off
title AKARI 360 - Image Optimization Tool
color 0a

echo =======================================================
echo AKARI 360: STARTING AUTOMATIC THUMBNAIL GENERATOR
echo =======================================================
echo.

:: Check if Node.js is installed on the machine
where node >nul 2>nul
if %errorlevel% neq 0 (
    color 0c
    echo ❌ ERROR: Node.js is not installed on this computer!
    echo Please install Node.js from https://nodejs.org/ first.
    echo.
    pause
    exit
)

:: Run the script automatically via node engine
node thumbnail-generator.js

echo.
echo =======================================================
echo  Optimization processing complete. Window can be closed.
echo =======================================================
echo.
pause