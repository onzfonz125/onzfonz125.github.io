const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.height = innerHeight
canvas.width = innerWidth
class Wall {
    constructor({position}) {
        this.position = position
        this.width = 40
        this.height = 40
    }

    draw() {
        c.fillStyle = 'blue'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

class PacMan {
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity
        this.radius = 15
    }
    
    draw() {
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = 'yellow'
        c.fill()
        c.closePath()
    }

    update() {
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        this.draw()
    }
}

const map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]
const walls = []

map.forEach((row, i) => {
    row.forEach((number, j) => {
        if(number == 1)
            walls.push(new Wall({
                position: {
                    x: (40 * j) + 400,
                    y: (40 * i) + 100
                }
            }))
    })
})

const player = new PacMan({
    position: {
        x:600,
        y:160
    },
    velocity: {
        x:0,
        y:0
    }
})

function isTouchingWall() {
    return (
        walls.forEach((wall) => {
            if (player.position.y - player.radius + player.velocity.y <= wall.position.y + wall.height  //collisione sopra
                && player.position.y + player.radius + player.velocity.y >= wall.position.y             //collisione sotto
                && player.position.x - player.radius + player.velocity.x <= wall.position.x + wall.width //collisione a sinistra
                && player.position.x + player.radius + player.velocity.x >= wall.position.x) {
                    player.velocity.y = 0
                    player.velocity.x = 0
                }
        })
    )
}
lastKey = " "
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    isTouchingWall()
    player.update()
    walls.forEach((wall) => {
        wall.draw()
    })
}
animate()

addEventListener('keydown', ({keyCode}) => {
    switch(keyCode)
    {
        case 38:
            //su
            player.velocity.y = -5
            player.velocity.x = 0
            break
        case 40:
            //giù
            player.velocity.y = 5
            player.velocity.x = 0
            break
        case 37:
            //sinistra
            player.velocity.x = -5
            player.velocity.y = 0
            break
        case 39:
            //destra
            player.velocity.x = 5
            player.velocity.y = 0
            break
    }
})