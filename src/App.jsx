import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import { useState } from "react"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combination";
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X"

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = 'O'
  }
  return currentPlayer;
}



function App() {
  const [gameTurns, setGameTurns] = useState([])
  const [players, setPlayers] = useState({
    X: "Player 1",
    O: "Player 2"
  })
  let activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map(array =>[...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]


    if (
      firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol
    ) {
      winner= players[firstSquareSymbol];

    }
  }

  const hasdraw = gameTurns.length === 9 && !winner;

  function handlePlayerNameChange(symbol, newName){
    setPlayers(prevPlayers =>{
      return {
        ...prevPlayers,
        [symbol]:newName
      }
    })
  }
  function handleSelectSquare(rowIndex, colIndex) {

    setGameTurns((prevTurns) => {
      let currentPlayer = deriveActivePlayer(prevTurns)

      if (prevTurns.length > 0 && prevTurns[0].player === "X") {
        currentPlayer = 'O'
      }

      const updatedTurns = [
        {
          square: { row: rowIndex, col: colIndex },
          player: currentPlayer
        }, ...prevTurns
      ]
      return updatedTurns;
    });
  }

  function handleRestart(){
    setGameTurns([])
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="player 1" symbol="X" isActive={activePlayer === "X"} onChangeName= {handlePlayerNameChange} />
          <Player initialName="player 2" symbol="O" isActive={activePlayer === "O"}  onChangeName= {handlePlayerNameChange}/>

        </ol>
        {(winner || hasdraw) && <GameOver  winner ={winner} onRestart={handleRestart}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />


      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
