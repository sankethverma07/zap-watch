@echo off
cd /d "%~dp0"
echo Initializing git repo and pushing to GitHub...
git init
git add .
git commit -m "Initial commit: ZAP watch prototype (Vocal Coach + squishy mic)"
git branch -M main
git remote add origin https://github.com/sankethverma07/zap-watch.git
git push -u origin main
echo.
echo Done. You can close this window.
pause
