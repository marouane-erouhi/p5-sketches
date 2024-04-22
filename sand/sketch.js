// Create a 2D array
// Sorry if you are used to matrix math!
// How would you do this with a
// higher order function????

function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
        // Fill the array with 0s
        for (let j = 0; j < arr[i].length; j++) {
            arr[i][j] = 0;
        }
    }
    return arr;
}

class Button {
    constructor(x, y, w, h, defaultColor, hoverColor, text, callback) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.defaultColor = defaultColor
        this.hoverColor = hoverColor
        this.currentColor = defaultColor
        this.text = text
        this.callback = callback
    }

    draw() {
        this.hover()
        fill(this.currentColor)
        rect(this.x - (this.w / 2), this.y - (this.h / 2), this.w, this.h)
        // text
        fill(0) // Set the text color to black
        textAlign(CENTER, CENTER) // Center the text
        text(this.text, this.x, this.y) // Draw the text
    }

    hovered(){
        return (mouseX > this.x - (this.w / 2) && mouseX < this.x + (this.w / 2) && mouseY > this.y - (this.h / 2) && mouseY < this.y + (this.h / 2))
    }

    hover(){
        if (this.hovered()) {
            this.currentColor = this.hoverColor
        } else {
            this.currentColor = this.defaultColor
        }
    }

    click(){
        if(!this.hovered()) return
        
        this.callback()
    }

}

const TetraminoFunctions = {
    scale: function (arr, factor) {
        let result = [];
        for (let i = 0; i < arr.length; i++) {
            let row = [];
            for (let j = 0; j < arr[i].length; j++) {
                for (let k = 0; k < factor; k++) {
                    row.push(arr[i][j]);
                }
            }
            for (let k = 0; k < factor; k++) {
                result.push(row);
            }
        }
        return result;
    },
    rotate: function (arr, direction) {
        let result = [];
        if (direction === 'clockwise') {
            for (let i = 0; i < arr[0].length; i++) {
                let row = [];
                for (let j = arr.length - 1; j >= 0; j--) {
                    row.push(arr[j][i]);
                }
                result.push(row);
            }
        } else if (direction === 'counter-clockwise') {
            for (let i = 0; i < arr[0].length; i++) {
                let row = [];
                for (let j = 0; j < arr.length; j++) {
                    row.push(arr[j][i]);
                }
                result.push(row);
            }
        }
        return result;
    }
}

/*
write a function that takes a tetramino array and rotates it either clockwise or counter-clockwise based on the direction input variable
*/


class Tertramino{
    constructor(shape, scale,c){
        this.shape = shape
        this.scale = scale
        this.color = c
        
        this.tetramino = TetraminoFunctions.scale(shape,scale)
    }
    insert(x,y){
        this.tetramino = TetraminoFunctions.rotate(this.tetramino, 'clockwise')
        for (let i = 0; i < this.tetramino.length; i++) {
            for (let j = 0; j < this.tetramino[0].length; j++) {
                let col = x + i;
                let row = y + j;
                if (withinCols(col) && withinRows(row)) {
                    if (this.tetramino[i][j] === 0) continue
                    grid[col][row] = hueValue;
                }
            }
        }
    }
}
// The grid
let grid;
// How big is each square?
let w = 2;
let cols, rows;
let hueValue = 200;

const gameColors = [0,'red', 'blue', 'green']
const tetrisShapes = {
    t: [[1, 0], [1, 0], [1, 1]]
}

let gameState = 'game' // menu, game


function withinCols(i) {// Check if a row is within the bounds
    return i >= 0 && i <= cols - 1;
}
function withinRows(j) {// Check if a column is within the bounds
    return j >= 0 && j <= rows - 1;
}

let menuData = {
    playButton: null
}
let gameData = {
    tetraminoT: null
}
function drawMenu(){
    menuData.playButton.draw()
}

function drawGame(){
    // Draw the sand
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            noStroke();
            if (grid[i][j] > 0) {
                fill(grid[i][j], 255, 255);
                let x = i * w;
                let y = j * w;
                square(x, y, w);
            }
        }
    }

    // Create a 2D array for the next frame of animation
    let nextGrid = make2DArray(cols, rows);

    // Check every cell
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            // What is the state?
            let state = grid[i][j];

            // If it's a piece of sand!
            if (state > 0) {
                // What is below?
                let below = grid[i][j + 1];

                // Randomly fall left or right
                let dir = 1;
                if (random(1) < 0.5) {
                    dir *= -1;
                }

                // Check below left or right
                let belowA = -1;
                let belowB = -1;
                if (withinCols(i + dir)) {
                    belowA = grid[i + dir][j + 1];
                }
                if (withinCols(i - dir)) {
                    belowB = grid[i - dir][j + 1];
                }


                // Can it fall below or left or right?
                if (below === 0) {
                    nextGrid[i][j + 1] = state;
                } else if (belowA === 0) {
                    nextGrid[i + dir][j + 1] = state;
                } else if (belowB === 0) {
                    nextGrid[i - dir][j + 1] = state;
                    // Stay put!
                } else {
                    nextGrid[i][j] = state;
                }
            }
        }
    }
    grid = nextGrid;
}

function mousePressed() {
    if(gameState !== 'game')    return
    let mouseCol = floor(mouseX / w);
    let mouseRow = floor(mouseY / w);

    // tetrisShapes.t = enlargeArray(tetrisShapes.t,10)

    gameData.tetraminoT.insert(mouseCol, mouseRow)
}
function mouseReleased(){
    if(gameState === 'menu'){
        menuData.playButton.click()
    }
}

function setup() {
    createCanvas(400, 600);
    colorMode(HSB, 360, 255, 255);
    cols = width / w;
    rows = height / w;
    grid = make2DArray(cols, rows);
    // frameRate(1)
    menuData.playButton = new Button(width / 2, (height / 2), 100, 65, color(150, 55, 100), color(50, 55, 100), "Start Game", () => { gameState = 'game' })
    gameData.tetraminoT = new Tertramino(tetrisShapes.t,10,'red')
    gameData.tetraminoT.insert(cols / 2, 3)

}

function draw() {
    background(0);

    if(gameState === 'menu'){
        drawMenu()
    }else{
        drawGame()
    }

}
