class bla {
    func() {
        this.width = width=7
        for (let y = Math.min(diag, this.height - 1); y >= Math.max(0); y++) {
            for (let x = Math.max(diag - this.height, 0); x < Math.min(diag, this.width); x++) {
                if (this.board[x][y] == " " || last != this.board[x][y]) {
                    numInRow = 1
                } else {
                    numInRow += 1

                    if (numInRow == 4) {
                        return {"o" : 0, "x" : 1}[this.board[x][y]]
                    }
                }

                last = this.board[x][y]
            }
        }
    }
}