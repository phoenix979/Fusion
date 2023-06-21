const { Game } = require('./game');
const { Player } = require('./player');

class GameManager {

    constructor() {
        this.games = []; //on going games
        this.players = []; //players waiting for a game
    }

    addPlayerToWaitingRoom(playerSocket) {
        console.log("Adding player to waiting room: ", playerSocket.id);
        this.players.push(new Player(playerSocket));
    }

    canJoinGame() {
        console.log("players in waiting room: ", this.players.length);
        return this.players.length >= 2;
    }

    newGame() {
        const p1 = this.players.pop();
        const p2 = this.players.pop();
        p1.setSymbol('X');
        p2.setSymbol('O');
        const game = new Game(p1, p2);
        this.games.push(game);
        return game;
    }

    getGame(gameId) {
        return this.games.find(game => game.getGameId() === gameId);
    }

    getGameByPlayerId(playerId) {
        for (const game of this.games) {
            const player = game.getPlayers().find(player => player.getPlayerId() === playerId);
            if (player) {
                return game;
            }
        }

        return null;
    }

    removeGame(game) {
        this.games = this.games.filter(g => g.getGameId() !== game.getGameId());
    }

    isGameExist(gameId) {
        return this.games.some(game => game.getGameId() === gameId);
    }

    setWinner(game, winner) {
        game.setWinner(winner);
    }
}

module.exports = new GameManager();