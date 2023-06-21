class Player {
    constructor(socket) {
        this.socket = socket;
        this.id = socket.id;
    }

    setSymbol(symbol) {
        this.symbol = symbol;
    }

    getSymbol = () => this.symbol;

    getSocket = () => this.socket;

    getPlayerId = () => this.id;
}

module.exports = { Player };