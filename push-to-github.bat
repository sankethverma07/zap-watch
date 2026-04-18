@echo off
cd /d "%~dp0"

echo === ZAP Watch: commit and push to GitHub ===

rem Clear any stale index lock from a previous crashed commit
if exist ".git\index.lock" (
    echo Clearing stale .git\index.lock
    del /f /q ".git\index.lock"
)

git add -A
git commit -m "Rewrite React app: routing, persistence, all 10 screens"
git push origin main

echo.
echo Done. Vercel should auto-redeploy in ~30 seconds.
echo Visit https://zap-watch.vercel.app to verify.
pause
