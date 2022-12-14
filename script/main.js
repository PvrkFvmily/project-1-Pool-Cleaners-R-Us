// console.log('linked')
const start = document.getElementById('start')
const quit = document.querySelector('#quit')
const titleScreen = document.getElementById('titleScreen')
const gameGrid = document.getElementById('gameGrid')
const main = document.querySelector('main')
const canvas = document.querySelector('canvas')
const message = document.querySelector('#stageNum')

// CANVAS
canvas.setAttribute('height', getComputedStyle(main)['height'])
canvas.setAttribute('width', getComputedStyle(main)['width'])
const ctx = canvas.getContext('2d')

// CLASS OBSTACLE CREATION
class Obstacle {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.width = 50
        this.height = 50
        this.color = "grey"
    }
    render() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

const mapObstacles = [
    ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
    ['-',' ',' ',' ',' ','-',' ',' ',' ',' ',' ',' ',' ','-','-'],
    ['-',' ','-','-',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','-'],
    ['-',' ','-',' ',' ',' ',' ',' ',' ',' ',' ','-',' ',' ','-'],
    ['-',' ','-',' ',' ','-','-','-','-','-',' ','-',' ',' ','-'],
    ['-',' ','-',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','-'],
    ['-',' ','-','-',' ',' ',' ',' ',' ',' ',' ','-',' ',' ','-'],
    ['-',' ',' ',' ',' ',' ',' ',' ',' ',' ','-','-',' ',' ','-'],
    ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-']
]

let obstacles = []

mapObstacles.forEach((row, k) => {
    row.forEach((dash, i) => {
        // console.log(dash)
        switch(dash) {
            case('-'):
                obstacles.push((new Obstacle(50 * i,50 * k)))
            break
            }
        })
})

// FLOOR CLASS
class Floor {
    constructor(x, y, value) {
        this.x = x
        this.y = y
        this.color = "green"
        this.width = 50
        this.height = 50
        this.clean = false
    }
    render() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
        // BORDER FOR FLOOR
        ctx.strokeRect(this.x, this.y, this.width, this.height)
        ctx.strokeStyle = "black"
    }
}

const mapFloor = [
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ','-','-','-','-',' ','-','-','-','-','-','-','-',' ',' '],
    [' ','-',' ',' ','-','-','-','-','-','-','-','-','-','-',' '],
    [' ','-',' ','-','-','-','-','-','-','-','-',' ','-','-',' '],
    [' ','-',' ','-','-',' ',' ',' ',' ',' ','-',' ','-','-',' '],
    [' ','-',' ','-','-','-','-','-','-','-','-','-','-','-',' '],
    [' ','-',' ',' ','-','-','-','-','-','-','-',' ','-','-',' '],
    [' ','-','-','-','-','-','-','-','-','-',' ',' ','-','-',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
]

let floors = []

// FLOOR GENERATING LOOP
const generateFloor = () => {
    mapFloor.forEach((row, k) => {
    row.forEach((dash, i) => {
        // console.log(dash)
        switch(dash) {
            case('-'):
                floors.push((new Floor(50 * i, 50 * k, 0)))
            break
            }
        })
})

}

class SSB {
    constructor(x, y) {
        this.x = x + 2.5
        this.y = y + 2.5
        this.xspeed = 0
        this.yspeed = 0
        this.width = 45
        this.height = 45
        this.color = "white"
        this.isMoving = false
        this.direction = " "
    }
    render() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    update() {
        this.render()
        this.x += this.xspeed
        this.y += this.yspeed
    }
}

const cleaner = new SSB(50, 50)

// MOVEMENT TRACKS WHAT KEY HAS BEEN PRESSED
document.addEventListener('keydown', (e) => {
    // console.log(e.key)
    // DEPENDING WHAT KEY PRESSED FIRES CASE FUNCTION
    switch (e.key) {
        // IF PLAYER IS NOT MOVING CHANGE IT TO MOVING AND SET DIRECTION
        case('w'):
            if (!cleaner.isMoving) {
                cleaner.isMoving = true
                cleaner.direction = 'up'
                // console.log(cleaner.direction)
            }
            break
            case('a'):
            if (!cleaner.isMoving) {
                cleaner.isMoving = true
                cleaner.direction = 'left'
                // console.log(cleaner.direction)
            }
            break
            case('s'):
            if (!cleaner.isMoving) {
                cleaner.isMoving = true
                cleaner.direction = 'down'
                // console.log(cleaner.direction)
            }
            break
            case('d'):
            if (!cleaner.isMoving) {
                cleaner.isMoving = true
                cleaner.direction = 'right'
                // console.log(cleaner.direction)
            }
            break
    }
})

setInterval(gameLoop, 17)

// ---GAME LOOP---
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    obstacles.forEach((obstacle) => {
        obstacle.render()
        if (cleaner.y + cleaner.yspeed <= obstacle.y + obstacle.height && 
            cleaner.x + cleaner.width + cleaner.xspeed >= obstacle.x &&
            cleaner.y + cleaner.height + cleaner.yspeed >= obstacle.y &&
            cleaner.x + cleaner.xspeed <= obstacle.x + obstacle.width) {
                // console.log('colliding')
                cleaner.xspeed = 0
                cleaner.yspeed = 0
                cleaner.isMoving = false
        }
    })

    floors.forEach((floor) => {
        floor.render()
        if (cleaner.y + cleaner.yspeed <= floor.y + floor.height && 
            cleaner.x + cleaner.width + cleaner.xspeed >= floor.x &&
            cleaner.y + cleaner.height + cleaner.yspeed >= floor.y &&
            cleaner.x + cleaner.xspeed <= floor.x + floor.width) {
                floor.color = "blue"
                floor.clean = true
            }
    })

    cleaner.update()

    // PLAYER MOVEMENT THAT STOPS WHEN IT DETECTS A COLLISION
    if (cleaner.isMoving) {
        switch (cleaner.direction) {
            case ('up'):
                // console.log(cleaner.isMoving)
                cleaner.yspeed = -25
                break
            case ('left'):
                // console.log(cleaner.isMoving)
                cleaner.xspeed = -25
                break
            case ('down'):
                // console.log(cleaner.isMoving)
                cleaner.yspeed = 25
                break
            case ('right'):
                // console.log(cleaner.isMoving)d
                cleaner.xspeed = 25
                break
            }
    }

    let counter = 0

    floors.forEach(floor => {
        if (floor.clean === true) {
            counter++
        }
    })

    if (counter === floors.length) {
        // console.log('win')
        cleaner.xspeed = 0
        cleaner.yspeed = 0
        cleaner.isMoving = false
        message.innerText = "YOU WON! SUPER CLEAN POOL!"
    }
}

// PLAY && QUIT BUTTON FUNCTION
                                                                                                                             
const displayGame = () => {
    // console.log('show game screen')
    titleScreen.style.display = "none";
    gameGrid.style.display = "grid"
    floors = []
    generateFloor()
    cleaner.x = 52.5
    cleaner.y = 52.5
    message.innerText = " "
}

const displayTitle = () => {
    // console.log('show title screen')
    gameGrid.style.display = "none";
    titleScreen.style.display = "flex";
}

displayTitle()

start.addEventListener('click', displayGame)
quit.addEventListener('click', displayTitle)

// --- GAME PLAN ---
// --- TITLE SCREEN ---

// Render game screen with title, instructions, and play button
// Dom for instructions and play button with eventlistener click to invoke function

// --- GAME START ---

// Create canvas 2d

// Create Class for Obstacle
// pick x y coordinate to create a rectangle
// render size as needed

// Create Class for Floor
// pick x coordinate that is divisible by 50px
// render size 50px x 50px
// TBD how I should put floors

// function to render next stage when win condition is met
// Render -- first stage -- 

// -- first stage -- 
// if every floor is clean disable input and go-- second stage --

// Render stage with Super Scrub Block
// always bottom left

// Create Character Class
// Generate hit box (same size as SSB)
// Generate color hit box (smaller size than SSB)
// ++ is moving = true/false
// Render Character

// --- GAME LOOP --- (THINGS TO CHECK CONSTANTLY)

// set interval
// set hit -- wall detection -- callback function
// set color blue -- clean floor -- the grids where SSB has collided with


//  --- MOVEMENT ---

// Move with WASD keys 
// -- movement --
// ONLY MOVE ONE DIRECTION AT A TIME (use is moving variable)
// can move when you hit a wall -- wall detection --

// Stop when SSB hits a wall --
// collision detect function

// --- CALLBACK FUNCTIONS ---
// -- wall detection --
// ++ is moving = true/false
// disable key stroke on the side that is being collided
// once it hits a wall trun is moving to false
// -- clean floor --
// ++ is clean = true/false
// change the floor color to blue if the floor is dirty 
// colored floor dection ignore when it is already clean


// Win screen or next stage screen when pool is clean

// --- QUESTIONS ---
// do i need child class?
// for game loop interval time what is a good refresh interval time
// can i have a class that holds all the map information?