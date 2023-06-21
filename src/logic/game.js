const uuid = require('uuid');

class Game {
    constructor(player1, player2) {
        this.gameId = uuid.v4();
        this.board = this.createBoard();
        this.player1 = player1;
        this.player2 = player2;
        this.gameOver = false;
        this.winner = null;
    }

    createBoard() {
        return [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
    }

    move(playerId, data) {
        const row = parseInt(data.x, 10);
        const col = parseInt(data.y, 10);

        if (this.board[row][col] !== null) {
            // Invalid move, position already occupied
            return false;
        }

        this.board[row][col] = data.symbol;
        // {
        //     playerId: playerId,
        //     symbol: data.symbol
        // };

        return true;
    }

    checkWinner() {
        // Check rows
        for (let row = 0; row < 3; row++) {
            if (
                this.board[row][0] !== null &&
                this.board[row][0] === this.board[row][1] &&
                this.board[row][0] === this.board[row][2]
            ) {
                return this.board[row][0];
            }
        }

        // Check columns
        for (let col = 0; col < 3; col++) {
            if (
                this.board[0][col] !== null &&
                this.board[0][col] === this.board[1][col] &&
                this.board[0][col] === this.board[2][col]
            ) {
                return this.board[0][col];
            }
        }

        // Check diagonals
        if (
            this.board[0][0] !== null &&
            this.board[0][0] === this.board[1][1] &&
            this.board[0][0] === this.board[2][2]
        ) {
            return this.board[0][0];
        }

        if (
            this.board[0][2] !== null &&
            this.board[0][2] === this.board[1][1] &&
            this.board[0][2] === this.board[2][0]
        ) {
            return this.board[0][2];
        }

        // No winner
        return null;
    }

    setWinner(winner) {
        this.winner = winner;
    }

    isGameTied() {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (this.board[row][col] === null) {
                    return false; // There are still empty positions
                }
            }
        }
        return true; // Board is full
    }

    sendGameTied() {
        this.getPlayers().forEach(player => {
            player.getSocket().emit('game.tie', {});
        });
    }

    sendGameWon() {
        this.getPlayers().forEach(player => {
            player.getSocket().emit('game.win', {
                symbol: this.winner
            });
        });
    }

    sendGameBegin() {
        this.getPlayers().forEach(player => {
            player.getSocket().emit('game.begin', {
                symbol: player.getSymbol(),
                gameId: this.gameId
            });
        });
    }

    sendMoveMade(data) {
        this.getPlayers().forEach(player => {
            player.getSocket().emit('move.made', data);
        });
    }

    sendPlayerLeft() {
        this.getPlayers().forEach(player => {
            player.getSocket().emit('opponent.left', {});
        });
    }

    getGameId = () => this.gameId;

    getPlayers = () => [this.player1, this.player2];
}

module.exports = { Game };