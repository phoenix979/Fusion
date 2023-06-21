const socket = io.connect();
var myTurn = true, symbol, gameId;

function renderTurnMessage() {
    if (!myTurn) {
        $('#messages').text('Your opponent\'s turn');
        $('.cell').attr('disabled', true);
    } else {
        $('#messages').text('Your turn.');
        $('.cell').removeAttr('disabled');
    }
}

function makeMove(e) {
    e.preventDefault();
    // It's not your turn
    if (!myTurn) {
        return;
    }

    // The space is already checked
    if ($(this).text().length) {
        return;
    }

    // Emit the move to the server
    socket.emit('make.move', {
        gameId: gameId,
        symbol: symbol,
        position: $(this).attr('id'),
        x: $(this).attr('x'),
        y: $(this).attr('y')
    });
}

function reset() {
    $('.board button').attr('disabled', true);
    $(".cell").on("click", makeMove);
}

// Event is called when either player makes a move
socket.on('move.made', function (data) {
    console.log("move.made: ", data);
    $('#' + data.position).text(data.symbol);
    myTurn = (data.symbol !== symbol);
    renderTurnMessage();
});

// Set up the initial state when the game begins
// This method is called from the server
socket.on('game.begin', function (data) {
    console.log("game.begin: ", data);
    $("#symbol").html(data.symbol);
    symbol = data.symbol;
    gameId = data.gameId;
    myTurn = (data.symbol === 'X');
    renderTurnMessage();
});

socket.on('game.win', function (data) {
    console.log("game.win: ", data);
    const isWon = (data.symbol === symbol);
    if (isWon) {
        $('#messages').text('Game over. You won!');
    } else {
        $('#messages').text('Game over. You lost.');
        $('.cell').attr('disabled', true);
    }
});

socket.on('game.tie', function (data) {
    console.log("game.tie: ", data);
    $('#messages').text('Game is a tie!');
    $('.cell').attr('disabled', true);
});

// Disable the board if the opponent leaves
socket.on('opponent.left', function () {
    $('#messages').text('Your opponent left the game.');
    $('.cell').attr('disabled', true);
});

$(function () {
    reset();
});