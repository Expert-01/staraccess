@echo off
REM Celebrity Browser - Deployment Validation Script (Windows)
REM This script validates the project is ready for deployment

echo.
echo Validating Celebrity Browser project for production deployment...
echo.

setlocal enabledelayedexpansion
set ERRORS=0
set WARNINGS=0

REM Check configuration files
echo Checking configuration files...
if exist "vercel.json" (
    echo [+] vercel.json exists
) else (
    echo [-] vercel.json MISSING
    set /a ERRORS+=1
)

if exist "render.yaml" (
    echo [+] render.yaml exists
) else (
    echo [-] render.yaml MISSING
    set /a ERRORS+=1
)

if exist "backend\.env.example" (
    echo [+] backend\.env.example exists
) else (
    echo [-] backend\.env.example MISSING
    set /a ERRORS+=1
)

if exist "frontend\.env.example" (
    echo [+] frontend\.env.example exists
) else (
    echo [-] frontend\.env.example MISSING
    set /a ERRORS+=1
)

if exist "DEPLOYMENT.md" (
    echo [+] DEPLOYMENT.md exists
) else (
    echo [-] DEPLOYMENT.md MISSING
    set /a ERRORS+=1
)

echo.
echo Checking package.json scripts...

findstr "\"start\"" "backend\package.json" >nul
if !errorlevel! equ 0 (
    echo [+] backend: start script defined
) else (
    echo [-] backend: start script missing
    set /a WARNINGS+=1
)

findstr "\"build\"" "frontend\package.json" >nul
if !errorlevel! equ 0 (
    echo [+] frontend: build script defined
) else (
    echo [-] frontend: build script missing
    set /a ERRORS+=1
)

echo.
echo === SUMMARY ===
echo Errors: !ERRORS!
echo Warnings: !WARNINGS!
echo.

if !ERRORS! equ 0 (
    if !WARNINGS! equ 0 (
        echo [OK] All checks passed! Project is ready for deployment.
        exit /b 0
    ) else (
        echo [WARN] !WARNINGS! warning^(s^) found. Project ready with minor improvements needed.
        exit /b 0
    )
) else (
    echo [ERROR] !ERRORS! critical error^(s^) found. Please fix before deployment.
    exit /b 1
)
