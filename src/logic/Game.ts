import { BaseDirectory, writeTextFile } from "@tauri-apps/api/fs";
import { getJSON, setJSON } from "../jsonHandlers";

export default class Game {
    moves: string[] = [];
    board: Record<string, any> = {};

    constructor(board: Record<string, any>) {
        this.board = board;
        this.updateBoardJSON().then(() => console.log("game updated"));
        setJSON("move", {turn: "white", from: "", to: ""}).then(() => console.log("let the games commence"));

    }
    
    async updateBoardJSON(): Promise<void> {
        await setJSON("board", this.board);
    }

    async recordMove(): Promise<void> {
        // for PGN string
    }

    async move(): Promise<void> {
        // update move.json
        const {from, to, turn} = await getJSON("move");
        if (turn === "white") await setJSON("move", {turn: "black", from: "", to: ""});
        else await setJSON("move", {turn: "white", from: "", to: ""});
        
        const piece = this.board[from];
        
        // update takes.json
        if (this.board[to]) setJSON("takes", {takes: true});
        else if (piece.piece !== "pawn") setJSON("takes", {takes: false});

        // e

        // update board
        delete this.board[from];
        this.board[to] = piece;


        // update board.json
        await this.updateBoardJSON();
    }

    isCheck(): boolean {
        // IMPORTANT: needs to be checked how Pieces are represented in the object
        const KingPos: string | undefined = Object.keys(this.board).find(x => this.board[x].piece === "king")
        for (let index in Object.keys(this.board)) {
            const piece = Object.values(this.board)[index];
            let possMoves = piece.possibleMoves();
            if (possMoves.includes(KingPos)) {
                return true;
            }
        }
        return false;
    }
}
