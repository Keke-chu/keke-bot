echo off
cd lavalink/server
start gogo.bat
cls
echo Bot starts 10 seconds after server starts..
timeout 10
cd ..
node index.js
pause