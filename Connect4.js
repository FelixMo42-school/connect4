module.exports = class Connect4 {
    constructor(players, width=7, height=6) {
        this.players = players

        this.turn = 0

        this.width = width
        this.height = height

        this.board = []

        this.board.width = width
        this.board.height = height

        for (let x = 0; x < width; x++) {
            this.board[x] = []

            for (let y = 0; y < height; y++) {
                this.board[x][y] = " "
            }
        }
    }

    draw() {
        for (let y = this.height - 1; y >= 0; y--) {
            let line = "|"
            for (let x = 0; x < this.width; x++) {
                line += this.board[x][y] + "|"
            }
            console.log(line)
        }

        console.log("\n")
    }

    isLegalMove(collumn) {
        if ( !Number.isInteger(collumn) ) {
            console.log( JSON.stringify(collumn) )
            return false
        }
        if (collumn < 0) return false
        if (collumn >= this.width) return false

        if ( this.board[collumn][this.height - 1] != " " ) return false

        return true
    }

    getCurrentPlayerIndex() {
        return this.turn % 2
    }

    getCurrentPlayerLogo() {
        return ["x", "o"][ this.getCurrentPlayerIndex() ]
    }

    async play(player) {
        let collumn = await player( this )

        while (true) {
            if ( this.isLegalMove(collumn) ) {
                break
            }

            collumn = await player( this )
        }

        console.log(collumn)

        for (let y = 0; y < this.height; y++) {
            if ( this.board[collumn][y] == " " ) {
                this.board[collumn][y] = this.getCurrentPlayerLogo()

                return {x: collumn, y: y}
            }
        }
    }

    inWidth(x) {
        return x >= 0 && x < this.width
    }

    inHeight(y) {
        return y >= 0 && y < this.height
    }

    isInRow(pos, dirrection, i) {
        let x = pos.x + dirrection[0] * i
        let y = pos.y + dirrection[1] * i

        if ( !this.inWidth(x) || !this.inHeight(y) ) return false

        return this.board[x][y] == this.getCurrentPlayerLogo()
    }

    over = pos => [ [1,1], [1,-1], [1,0], [0,1] ].some(dirrection => {
        let numInRow = 1

        for (let i = 1; i < 4; i++) {
            if ( !this.isInRow(pos, dirrection, i) ) break
            
            numInRow += 1
        }

        for (let i = 1; i < 4; i++) {
            if ( !this.isInRow(pos, dirrection, -i) ) break

            numInRow += 1
        }

        return numInRow >= 4
    })

    async game() {
        while (true) {
            for (let player of this.players) {
                let move = await this.play(player)

                this.draw()

                if ( this.over(move) ) {
                    console.log(`Winner is ${ this.getCurrentPlayerIndex() }`)
                    return this.getCurrentPlayerIndex()
                }

                this.turn += 1
            }
        }
    }
}