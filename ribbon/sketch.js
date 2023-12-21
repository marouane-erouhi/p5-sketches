// let ribon
const ribons = []
const vel = 10

function setup() {
    createCanvas(400, 400);
    // ribon = new Ribon(createVector(0,4),createVector(width/2,20),color(255,0,125))

    ribons.push(
        new Ribon(createVector(0, 4), createVector(width / 2, 20), color(255, 0, 125)),
        new Ribon(createVector(width / 2, 4), createVector(width / 2, 20), color(125, 0, 255)),
        new Ribon(createVector(-width / 2, 4), createVector(width / 2, 20), color(125, 50, 255)),
        new Ribon(createVector(width, 4), createVector(width / 2, 20), color(255, 0, 125))
    )

    const count = height / 20
    for (let i = 0; i < count; i++) {
        random(width)
        ribons.push(
            new Ribon(createVector(random(width), i), createVector(width / 2, 20), color(255, 0, 125)),
            new Ribon(createVector(width / 2 + random(width), i), createVector(width / 2, 20), color(125, 0, 255)),
            new Ribon(createVector(-width / 2 + random(width), i), createVector(width / 2, 20), color(125, 50, 255)),
            new Ribon(createVector(width + random(width), i), createVector(width / 2, 20), color(255, 0, 125))
        )
    }

}

function draw() {
    background(220);
    for (let ribon of ribons) {
        ribon.update()
        ribon.draw()
    }

}

class RibonSet {
    constructor() {
        this.ribons = [
            new Ribon(createVector(random(width), i), createVector(width / 2, 20), color(255, 0, 125)),
            new Ribon(createVector(width / 2 + random(width), i), createVector(width / 2, 20), color(125, 0, 255)),
            new Ribon(createVector(-width / 2 + random(width), i), createVector(width / 2, 20), color(125, 50, 255)),
            new Ribon(createVector(width + random(width), i), createVector(width / 2, 20), color(255, 0, 125))
        ]
    }
}

class Ribon {
    constructor(pos, dim, c) {
        this.pos = pos
        this.dim = dim//w & h
        this.c = c//color
        // global velocity??
        this.angle = 0;
        this.velocity = 0.02; // Adjust the velocity to control the sway speed
        this.frames = 20
    }

    update() {
        if (this.frames === 0) {
            const n = noise(0.5 * frameCount)
            const mapped = map(n, 0, 1, 0.01, 0.03)

            this.velocity = mapped
            this.frames = 20
        }
        this.frames--
        // Update the angle over time
        this.angle += this.velocity;
        // Sway the object horizontally based on sine function
        this.pos.x += sin(this.angle);
    }
    draw() {
        // let x = sin(vel * deltaTime + 10)
        let y = this.dim.y * this.pos.y
        stroke(this.c)
        fill(this.c)
        rect(this.pos.x, y, this.dim.x, this.dim.y)
    }
}