let suitsText = ["♣", "♦", "♥", "♠"]
let numsText = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
let deck = []
let cardElems = []
let unflipped = 0
function randNum(lo, hi) {
    return Math.floor(Math.random()*(hi-lo+1))+lo
}
function loadFile(filePath) {
    let xmlhttp = new XMLHttpRequest()
    xmlhttp.open("GET", filePath, false)
    xmlhttp.send()
    if (xmlhttp.status === 200) {
        return xmlhttp.responseText
    }
    return null
}
function generateDeck() {
    for(let i in cardElems) {
        cardElems[i].remove()
    }
    cardElems = []
    for(let i in suitsText) {
        for(let j in numsText) {
            deck.push([j, i])
        }
    }
    addFaceDown(suitsText.length * numsText.length)
}
function drawCard() {
    if(deck.length === 0) {
        return
    }
    unflipped++
    let index = randNum(0, deck.length-1)
    let result = deck.splice(index, 1)[0]
    let output = document.getElementById("output")
    let card = document.createElement('div')
    let sizeScale = .2
    let width = parseInt(getComputedStyle(output).width)
    cardElems[cardElems.length-1].remove()
    cardElems.pop()
    let min = Math.min(167/3, (width-167)/(cardElems.length))
    for(let i in cardElems) {
        let style = getComputedStyle(cardElems[i])
        cardElems[i].style.zIndex = `${cardElems.length-i}`
        cardElems[i].style.transform = `translate(${min*(i+1)}px, -${243*(i+1)}px)`
    }
    // card.style.padding = `${36*sizeScale}px`
    // card.style.margin = `${36*sizeScale}px`
    // card.style.height = `${1122*sizeScale}px`
    // card.style.width = `${822*sizeScale}px`
    // card.style.backgroundColor = `#fff`
    // card.style.borderRadius = `${36*sizeScale}px`
    // card.style.position = `relative`
    // card.style.top = `-${(1122+36*3)*sizeScale*output.childElementCount}px`
    // card.style.left = `${822/3*sizeScale*output.childElementCount}px`
    // card.style.zIndex = `${1000-output.childElementCount}`

    card.style.position = `relative`
    card.style.height = `243px`
    card.style.width = `167px`
    card.style.background = `url('svgCards.svg') ${-167.575 * result[0]}px ${-243.137 * result[1]}px`
    card.style.transform = `translate(${0}px, -${0}px)`
    card.style.zIndex = `${1000000}`
    output.prepend(card)
    cardElems.unshift(card)
    console.log(numsText[result[0]] + suitsText[result[1]])
    //  = nums[result[0]] + suits[result[1]]
}
function addFaceDown(count) {
    for(let i=0; i<count; i++) {
        let width = parseInt(getComputedStyle(output).width)
        let card = document.createElement('div')
        card.style.position = `relative`
        card.style.height = `243px`
        card.style.width = `167px`
        card.style.background = `url('svgCards.svg') ${-167.575 * 2}px ${-243.137 * 4}px`
        card.style.transform = `translate(${Math.min(167/3, (width-167)/count)*i}px, -${243*i}px)`
        card.style.zIndex = `${1000000-i}`
        output.appendChild(card)
        cardElems.push(card)
    }
}
generateDeck()