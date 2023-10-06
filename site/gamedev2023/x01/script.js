let suitsText = ["♣", "♦", "♥", "♠"]
let numsText = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
let deck = []
let cards = []
let context = document.querySelector('canvas').getContext('2d')
let canvasStyle = getComputedStyle(context.canvas)
let svgDrawWidth = parseInt(canvasStyle.height) * 167/243
let svgDrawHeight = parseInt(canvasStyle.height)
let svg = new OffscreenCanvas(svgDrawWidth*13, svgDrawHeight*5)
let svgImg = new Image()
svgImg.onload = ()=>{
    let svgContext = svg.getContext('2d')
    svgContext.drawImage(svgImg, 0, 0, svg.width, svg.height)
}
svgImg.src = 'svgCards.svg'


let options = {
    infinite: false,
    clubs: true,
    diamonds: true,
    hearts: true,
    spades: true,
    jokers: false
}
document.getElementById('infiniteCards').addEventListener('click', function() {
    options.infinite = this.checked
    generateDeck()
})
document.getElementById('clubs').addEventListener('click', function() { options.clubs = this.checked })
document.getElementById('diamonds').addEventListener('click', function() { options.diamonds = this.checked })
document.getElementById('hearts').addEventListener('click', function() { options.hearts = this.checked })
document.getElementById('spades').addEventListener('click', function() { options.spades = this.checked })
document.getElementById('jokers').addEventListener('click', function() { options.jokers = this.checked })
function randNum(lo, hi) {
    return Math.floor(Math.random()*(hi-lo+1))+lo
}
function generateDeck() {
    document.getElementById('words').innerHTML = '...'
    cards = []
    deck = []
    if(options.clubs) {
        for(let j in numsText) {
            deck.push([j, 0])
        }
    }
    if(options.diamonds) {
        for(let j in numsText) {
            deck.push([j, 1])
        }
    }
    if(options.hearts) {
        for(let j in numsText) {
            deck.push([j, 2])
        }
    }
    if(options.spades) {
        for(let j in numsText) {
            deck.push([j, 3])
        } 
    }
    if(options.jokers) {
        deck.push([0, 4])
        deck.push([1, 4])
    }
    if(!options.infinite) {
        addFaceDown((options.clubs + options.diamonds + options.hearts + options.spades) * numsText.length + 2 * options.jokers)
    }
    else {
        addFaceDown(1)
    }
    window.requestAnimationFrame(render)
}
let then = Date.now()
function render() {
    clearCanvas()
    let width = parseInt(canvasStyle.width)
    let height = parseInt(canvasStyle.height)
    let drawWidth = height * 167/243
    let spacing = Math.min(drawWidth/2, (width - drawWidth) / cards.length)
    for(let i=cards.length-1; i>=0; i--) {
        context.drawImage(svg, cards[i][0]*svgDrawWidth, cards[i][1]*svgDrawHeight, svgDrawWidth, svgDrawHeight, spacing*i, 0, drawWidth, height)
    }
}
function drawCard() {
    then = Date.now()
    if(deck.length === 0) {
        return
    }
    let index = randNum(0, deck.length-1)
    let result = deck[index]
    if(!options.infinite) {
        deck.splice(index, 1)[0]
    }
    cards.pop()
    cards.unshift(result)
    if(result[1] == 4) {
        if(result[0] == 0) {
            document.getElementById('words').innerHTML = 'Black Joker'
        }
        else {
            document.getElementById('words').innerHTML = 'Red Joker'
        }
    }
    else {
        document.getElementById('words').innerHTML = numsText[result[0]] + suitsText[result[1]]
    }
    window.requestAnimationFrame(render)
}
function addFaceDown(count) {
    for(let i=0; i<count; i++) {
        cards.push([2, 4])
    }
}
function clearCanvas() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height)
}
function updateCanvasSize() {
    canvasStyle = getComputedStyle(context.canvas)
    context.canvas.width = parseInt(canvasStyle.width)
    context.canvas.height = parseInt(canvasStyle.height)
    svgDrawWidth = parseInt(canvasStyle.height) * 167/243
    svgDrawHeight = parseInt(canvasStyle.height)
    svg = new OffscreenCanvas(svgDrawWidth*13, svgDrawHeight*5)
    let svgContext = svg.getContext('2d')
    svgContext.drawImage(svgImg, 0, 0, svg.width, svg.height)
}

updateCanvasSize()
let resizeTimer
window.addEventListener('resize', ()=>{ clearTimeout(resizeTimer); resizeTimer = setTimeout(()=>{ updateCanvasSize(); window.requestAnimationFrame(render); }, 300)})
window.addEventListener('load', ()=>{window.requestAnimationFrame(render)})
generateDeck()