const gameManager = require('./game-manager');

class SocketManager {
    constructor(io) {
        this.io = io;
    }

    init(io) {
        io.on('connection', function (socket) {
            console.log("Connection established...", socket.id);

            gameManager.addPlayerToWaitingRoom(socket);

            if (gameManager.canJoinGame()) {
                const game = gameManager.newGame();
                game.sendGameBegin();
            }

            socket.on('make.move', function (data) {
                const game = gameManager.getGame(data.gameId);
                if (!game) {
                    return;
                }

                console.log("move: ", data);
                if (!game.move(socket.id, data)) {
                    //invalid move
                    return;
                }

                game.sendMoveMade(data);

                const winner = game.checkWinner();
                if (winner) {
                    gameManager.setWinner(game, winner);
                    console.log("Winner: ", winner);
                    game.sendGameWon();
                    return;
                }

                if (game.isGameTied()) {
                    console.log("Game tied");
                    game.sendGameTied();
                    return;
                }
            });

            socket.on('disconnect', function () {
                console.log("Disconnecting...", socket.id);
                const game = gameManager.getGameByPlayerId(socket.id);
                if (!game) {
                    return;
                }

                gameManager.removeGame(game);
                console.log("Game removed: ", game.getGameId());
                game.sendPlayerLeft();
            });
        });
    }
}

module.exports = new SocketManager();