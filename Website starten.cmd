@echo off
setlocal
cd /d "%~dp0"
set "WEBSITE_URL=http://localhost:4321/reisen/"

where npm >nul 2>&1
if errorlevel 1 (
  echo.
  echo npm wurde nicht gefunden. Installiere Node.js und starte diese Datei erneut.
  pause
  exit /b 1
)

if not exist "node_modules\.bin\astro.cmd" (
  echo.
  echo Die lokalen Abhaengigkeiten sind unvollstaendig.
  echo Schliesse zuerst alle Node-, Astro- und VS-Code-Prozesse fuer dieses Projekt.
  echo Danach in PowerShell ausfuehren: npm ci
  echo.
  pause
  exit /b 1
)

powershell -NoProfile -Command "if (Test-NetConnection -ComputerName 127.0.0.1 -Port 4321 -InformationLevel Quiet) { Start-Process '%WEBSITE_URL%'; exit 0 }; exit 1"
if not errorlevel 1 exit /b 0

start "Georgien 2026 – lokaler Server" cmd /k "cd /d ""%~dp0"" ^&^& npm run dev -- --host 127.0.0.1"

powershell -NoProfile -Command "$deadline=(Get-Date).AddSeconds(20); while((Get-Date)-lt $deadline) { if(Test-NetConnection -ComputerName 127.0.0.1 -Port 4321 -InformationLevel Quiet) { Start-Process '%WEBSITE_URL%'; exit 0 }; Start-Sleep -Seconds 1 }; Write-Host 'Der Server ist noch nicht bereit. Bitte prüfe das geöffnete Serverfenster.'"
