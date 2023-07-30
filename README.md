# Paint-coloring App

Its a demo for H5 game development using PIXI.JS

# Developer

**Abhishek Singhal**

# Installation

- run command : npm install or npm i
- run command : npm run serve
- browser game : open "localhost:8080" on your preferred browaser

# TEST

**run command** : npm test

In case you see below error ( on serve command )
opensslErrorStack: [ 'error:03000086:digital envelope routines::initialization error' ],

Use any of the below options :

**for macOS, Linux or Windows Git Bash**

export NODE_OPTIONS=--openssl-legacy-provider

**for Windows CMD (Command Prompt)**

set NODE_OPTIONS=--openssl-legacy-provider

**for Windows PowerShell**

$env:NODE_OPTIONS="--openssl-legacy-provider"

**for Docker (in your Dockerfile)**

ENV NODE_OPTIONS="--openssl-legacy-provider"

# Game Behavior

    * Click button on the main screen to start the game.
    * Click on any of the three colors from the bottom of the screen to be filled in the circles.
    * Click on cny of the circles, it will be colored in the chosen color.
    * Click on the white button on the bottom right to undo your action.
