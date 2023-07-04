import { useEffect, useState } from "react";
import { possibleMovesBishop, possibleMovesKing, possibleMovesKnight, possibleMovesPawn, possibleMovesQueen, possibleMovesRook } from "../logic/possibleMoves";
import Game from "../logic/Game";
import "./Square.css";
import { getJSON, setJSON } from "../jsonHandlers";

interface Args {
    color: string;
    square: string;
}

let startBoard = {};

getJSON("board").then(res => {
    startBoard = res;
})

export default function Square({color, square}: Args) {
    const [board, setBoard] = useState<Record<string, any>>(startBoard);
    const [piece, setPiece] = useState<Record<string, any>>(board[square])

    const handleSquareClick = async (): Promise<void> => {
        let move: Record<string, any> = await getJSON("move");
        console.log(move);
        const {from, turn} = move;
        console.log(piece);
        if (piece && piece.color === turn) {
            console.log("from selected")
            await setJSON("move", {turn: turn, from: square, to: ""});
        } else if (from) {
            console.log("to selected")
            const fromPiece = board[from]
            let possMoves: string[] = [];
            if (fromPiece.piece === "bishop") possMoves = possibleMovesBishop(board, from, fromPiece.color);
            else if (fromPiece.piece === "pawn") possMoves = possibleMovesPawn(board, from, fromPiece.color);
            else if (fromPiece.piece === "king") possMoves = possibleMovesKing(board, from, fromPiece.color);
            else if (fromPiece.piece === "queen") possMoves = possibleMovesQueen(board, from, fromPiece.color);
            else if (fromPiece.piece === "knight") possMoves = possibleMovesKnight(board, from, fromPiece.color);
            else possMoves = possibleMovesRook(board, from, fromPiece.color);

            console.log(possMoves, square);
            if (possMoves.includes(square)) {
                console.log("selected to");
                await setJSON("move", {turn: turn, from: from, to: square});
                const game: Game = new Game(board);
                try {
                    await game.move();
                } catch (error) {
                    console.log(error);
                    console.log(board);
                }
            }
        }
        
    }

    useEffect(() => {
        getJSON("board").then(res => setBoard(res));
        setPiece(board[square]);
    }, [board, piece])
        

    if (Object.keys(board).includes(square)) {
        if (piece) {
            return (
                <div id={square} className={`${color} square`} onClick={handleSquareClick}>
                    <img src={`${piece.color}_${piece.piece}.png`} />
                </div>
            );
        }
    } else {
        return <div id={square} className={`${color} square`} onClick={handleSquareClick}></div>;
    }
}