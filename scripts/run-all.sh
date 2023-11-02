#!/bin/bash

wt.exe --window 0 -p PowerShell -d ./ --title Gateway pwsh.exe -c "nx serve gateway" &
wt.exe --window 0 -p PowerShell -d ./ --title Order pwsh.exe -c "nx serve order" &
wt.exe --window 0 -p PowerShell -d ./ --title User pwsh.exe -c "nx serve user" &
wt.exe --window 0 -p PowerShell -d ./ --title Product pwsh.exe -c "nx serve product"

