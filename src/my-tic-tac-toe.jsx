import { useState } from "react";
import "./tic-tac-toe/tic-tac-toe.scss"



function Square({ value, onSquareClick }) {
  return (
    <button
      className="border-2 text-6xl h-full w-1/3 float-right"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    xIsNext ? (nextSquares[i] = "X") : (nextSquares[i] = "O");
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  winner
    ? (status = "Winner: " + winner)
    : (status = "Next player: " + (xIsNext ? "X" : "O"));

  return (
    <div>
      <h1 className="my-6 text-center text-2xl">TIC-TAC-TOE</h1>
      <div className="border-2 h-64 w-64 mx-auto">
        <div className="h-1/3 w-full">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="h-1/3 w-full">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="h-1/3 w-full">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
      <div className="my-2 w-64 mx-auto text-lg">{status}</div>
    </div>
  );
}

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    
  }

  const moves = history.map((squares, move) => {
    let description;
    move > 0
      ? (description = "Go to move #" + move)
      : (description = "Go to game start");

    return (
      <li key={move}>
        <button
          className="border-2 w-full hover:bg-slate-200 active:bg-slate-300"
          onClick={() => jumpTo(move)}
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="w-72 mx-auto">
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      <ol className="flex flex-col flex-wrap w-64 max-h-44 mx-auto border-2 text-sm">
        {moves}
      </ol>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

export default function App() {
  return <Game />;
}
