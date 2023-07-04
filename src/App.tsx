import Chessboard from "./components/Chessboard";
import { setJSON } from "./jsonHandlers";
import "./App.css";
import Game from "./logic/Game";
import { useState } from "react";



export default function App() {
  const [play, setPlay] = useState(false);

  async function setupBoard(): Promise<void> {
    const startBoard = {
      a1: {color: "white", piece: "rook"},
      b1: {color: "white", piece: "knight"},
      c1: {color: "white", piece: "bishop"},
      d1: {color: "white", piece: "queen"},
      e1: {color: "white", piece: "king"},
      f1: {color: "white", piece: "bishop"},
      g1: {color: "white", piece: "knight"},
      h1: {color: "white", piece: "rook"},
      a2: {color: "white", piece: "pawn"},
      b2: {color: "white", piece: "pawn"},
      c2: {color: "white", piece: "pawn"},
      d2: {color: "white", piece: "pawn"},
      e2: {color: "white", piece: "pawn"},
      f2: {color: "white", piece: "pawn"},
      g2: {color: "white", piece: "pawn"},
      h2: {color: "white", piece: "pawn"},
      a8: {color: "black", piece: "rook"},
      b8: {color: "black", piece: "knight"},
      c8: {color: "black", piece: "bishop"},
      d8: {color: "black", piece: "queen"},
      e8: {color: "black", piece: "king"},
      f8: {color: "black", piece: "bishop"},
      g8: {color: "black", piece: "knight"},
      h8: {color: "black", piece: "rook"},
      a7: {color: "black", piece: "pawn"},
      b7: {color: "black", piece: "pawn"},
      c7: {color: "black", piece: "pawn"},
      d7: {color: "black", piece: "pawn"},
      e7: {color: "black", piece: "pawn"},
      f7: {color: "black", piece: "pawn"},
      g7: {color: "black", piece: "pawn"},
      h7: {color: "black", piece: "pawn"},
    }
  
    const game = new Game(startBoard);
    setPlay(true)
  }

  if (play) return (
    <div id="app">
      <Chessboard /> 
      <button id="new-game" onClick={setupBoard}>New Game</button>
    </div>
  );
  else {
    return (
    <div id="app">
      <button id="new-game" onClick={setupBoard}>New Game</button>
    </div>
    )
  }
}
