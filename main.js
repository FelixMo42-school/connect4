const prompt = require('prompt')
  
const Connect4 = require("./Connect4")

let player = () => board => new Promise(ret => prompt.get("number", (_, {number}) => ret(parseInt(number))))

let random = () => board => Math.floor( Math.random() * board.width )

let board = new Connect4([
    random(),
    player()
])

board.game()