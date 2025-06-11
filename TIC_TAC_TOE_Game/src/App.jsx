import { useState } from "react";
import Player from "./Components/Player.jsx";
import GameBoard from "./Components/GameBoard.jsx";
import Log from "./Components/Log.jsx";
import { WINNING_COMBINATIONS } from "./Components/winning-combinations.js";
import GameOver from "./Components/GameOver.jsx";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2"
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]


function deriverdActivePlayer(gameturns){
  let currentPlayer = 'X'

  if(gameturns.length > 0 && gameturns[0].Player === 'X'){
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function derivedGameBoard(gameturns){
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

  for (const turn of gameturns){
      const {Square, Player} = turn;
      const { row , col} = Square;

      gameBoard[row][col] = Player;
  }
  return gameBoard;
}

function derivedWinner(gameBoard , players){
  let winner;

  for( const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col];
    const secondSquareSymbol =  gameBoard[combination[1].row][combination[1].col];
    const thirdSquareSymbol =  gameBoard[combination[2].row][combination[2].col];

    if(
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ){
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS)
  const [gameturns, setGameTurns] = useState([])
  
  const activePlayer = deriverdActivePlayer(gameturns)
  const gameBoard = derivedGameBoard(gameturns);

  const winner  =  derivedWinner(gameBoard, players);
  const hasDraw = gameturns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
  
    setGameTurns((prevTurns) => {

      const currentPlayer = deriverdActivePlayer(prevTurns)

      const updatedTurns = [
        {Square: { row : rowIndex , col : colIndex}, Player: currentPlayer},
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayerNameChnage(symbol, newName){
    setPlayers(prevPlayers => {
      return{
        ...prevPlayers,
        [symbol]:newName
      }
    });
  }
  return <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        
        <Player
          initialName={PLAYERS.X} 
          symbol="X" 
          isActive={activePlayer === 'X'}
          onChangeName={handlePlayerNameChnage}
        />

        <Player
          initialName={PLAYERS.O}
          symbol="O"  
          isActive={activePlayer === 'O'}
          onChangeName={handlePlayerNameChnage}
        />

      </ol>
      {(winner || hasDraw) && ( 
        <GameOver winner={winner} onRestart={handleRestart}/>
      )}
      <GameBoard 
        onSelectSquare={handleSelectSquare} 
        board={gameBoard}
      />
    </div>
    <Log turns={gameturns} />
  </main>
}

export default App
