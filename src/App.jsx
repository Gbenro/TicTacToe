import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import { useState } from "react"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combination";


function deriveActivePlayer(gameTurns){
  let currentPlayer = "X"

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = 'O'
  }
return currentPlayer;
}


function App() {
  const [gameTurns, setGameTurns] = useState([])
 

  let activePlayer = deriveActivePlayer(gameTurns);

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

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="player 1" symbol="X" isActive={activePlayer === "X"} />
          <Player initialName="player 2" symbol="O" isActive={activePlayer === "O"} />

        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} turns= {gameTurns} />


      </div>
      <Log turns ={gameTurns} />
    </main>
  )
}

export default App
