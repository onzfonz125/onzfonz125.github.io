const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = innerWidth - 10
canvas.height = 400
const gravity = 0.5
class Castagna {
    constructor()
    {
        this.position = {
            x:100,
            y:100
        }
        this.velocity = {
            x:0,
            y:0
        }
        this.width = 30
        this.height = 30
    }

    draw() 
    {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
        this.position.y += this.velocity.y
        if (this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += gravity
        else
            this.velocity.y = 0
    }

    restart() {
        this.position = {
            x:100,
            y:100
        }
        this.velocity = {
            x:0,
            y:0
        }
        this.width = 30
        this.height = 30
    }
}

class Ostacolo {
    constructor()
    {
        this.position = {
            x:700,
            y:canvas.height -20
        }
        this.velocity = {
            x:3,
            y:0
        }
        this.width = 30
        this.height = 10
    }

    draw() 
    {
        c.fillStyle = 'blue'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
        this.position.x -= this.velocity.x
    }

    restart() {
        this.position = {
            x:700,
            y:canvas.height -20
        }
        this.velocity = {
            x:3,
            y:0
        }
        this.width = 30
        this.height = 10
    }
}
const player = new Castagna()
const boh = new Ostacolo()
var perso = false
var conta = 0
var punteggio = 0
player.draw()
boh.draw()
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
    if (boh.position.x < 0)
    {
        boh.position.x = 700
        if (boh.velocity.x <= 20)
            boh.velocity.x += 0.2
        punteggio += 1
    }
    if (boh.position.x <= 130 && boh.position.x >= 70 && conta == 0 && boh.position.y - player.position.y <= 20)
    {
        boh.velocity.x = 0
        conta += 1
        perso = true
        document.getElementById('perso').innerHTML = "HAI PERSO! premi 'a' per continuare"
    }
    document.getElementById('points').innerHTML = "Punteggio: "+punteggio
    boh.update()
}
animate()
addEventListener('keydown', ( { keyCode } ) => {
    if (keyCode == 32 && boh.position.y - player.position.y == 9.5)
    {
        player.velocity.y -= 12
    }
    if (keyCode == 65 && perso)
    {
        boh.restart()
        player.restart()
        punteggio = 0
        conta = 0
        perso = false
        document.getElementById('perso').innerHTML = " "
    }
})
