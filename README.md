# Tic-Tac-Toe Game Server

This project is a Tic-Tac-Toe game server developed using Node.js. It uses socket connections for real-time communication between players.

## Table of Contents

- [Entities](#entities)
- [Game Flow](#game-flow)
- [Win Condition](#win-condition)
- [Setup and Installation](#setup-and-installation)
- [Running the Server](#running-the-server)

## Entities

The application comprises the following entities:

1. **GameManager**: A class responsible for managing ongoing games and players waiting to join a game.

2. **Game**: Represents a single Tic-Tac-Toe game. It contains the game state, including the board, players, and game status (ongoing, tie, or has a winner).

3. **Player**: Represents a player, keeping track of their socket connection and the symbol they are using ('X' or 'O').

4. **SocketManager**: Manages socket connections, initializing them, and listening for events such as connecting, making a move, and disconnecting.

## Game Flow

1. When a player connects, they are added to the waiting room by the `GameManager`.
   
2. If there are at least two players in the waiting room, a new game is created.

3. Players make moves in turns by sending 'make.move' events through their socket connection.

4. After each move, the server checks if there's a winner or if the game is tied.

5. If the game ends (there’s a winner or it’s a tie), the server sends corresponding events to the clients.

6. When a player disconnects, the game they are participating in is removed, and the opponent is notified.

## Win Condition

The server checks for a win condition after each move. The check is conducted in the following manner:

1. Check if any of the rows contain only 'X' or only 'O'.

2. Check if any of the columns contain only 'X' or only 'O'.

3. Check the two diagonals to see if they contain only 'X' or only 'O'.

If any of the above conditions are met, we have a winner.

## Setup and Installation

1. Make sure you have [Node.js](https://nodejs.org) installed.

2. Clone this repository.

3. Navigate to the project directory and run `npm install` to install dependencies.

## Running the Server

To start the game server, run the following command in the project directory:

### Run
```
npm run start
```

### Debug
```
npm run debug
```