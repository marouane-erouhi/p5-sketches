const colors = {
    'red': {
        attract: 'red',
        repulse: 'none'
    },
    'blue':{
        attract: 'none',
        repulse: 'red'
    }
}

class Particle{
    constructor(pos, c){
        this.pos = pos
        this.vel = 0.0
        this.color = c
    }
}

let world;

function setupWorld(w,h){
    world.length = 0
    world = new Array(w).fill(new Array(h).fill(random('red', 'blue')))
}
function setup() {
    createCanvas(400, 400);

}

function draw() {
    background(220);

    for(let row of world){
        for(let col of row){
            
        }
    }

}

