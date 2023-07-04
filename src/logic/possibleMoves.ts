import { getJSON, setJSON } from "../jsonHandlers";

// FIX EN PASSANT

function isPossibleMove(board: Record<string, any>, color: string, file: string, rank: number): boolean | string {
    const square = board[`${file}${rank}`];
    if (!square){
        return true;
    } else if (square.color !== color) return "x";
    return false;
}

export function possibleMovesPawn(board: any, position: string, color: string): string[] {
    let moves: string[] = [];
    let double_pawn: Record<string, string> = {};
    getJSON("double_pawn").then(res => double_pawn = res);

    const rank: number = parseInt(position[1]);
    const file: string = position[0];
    
    // move options for white
    if (color === "white") {
        // check front straight
        if (isPossibleMove(board, color, file, rank+1)) {
            moves.push(`${file}${rank+1}`);
            setJSON("takes", {takes: false});
        }
        // check front left && enpassant
        if (board[`${String.fromCharCode(file.charCodeAt(0)-1)}${rank+1}`] || double_pawn[position] === `${String.fromCharCode(file.charCodeAt(0)-1)}${rank}`) {
            moves.push(`${String.fromCharCode(file.charCodeAt(0)-1)}${rank+1}`);
        }
        // check front right & en passant
        if (board[`${String.fromCharCode(file.charCodeAt(0)+1)}${rank+1}`] || double_pawn[position] === `${String.fromCharCode(file.charCodeAt(0)+1)}${rank}`) {
            moves.push(`${String.fromCharCode(file.charCodeAt(0)+1)}${rank+1}`);
        }
        // check double pawn move
        if (rank === 2) {
            moves.push(`${file}4`);
            setJSON("double_pawn", {position: `${file}4`, color: "white"});
            setJSON("takes", {takes: false});
        }
    } 

    // move options for black
    else {
        // check front straight
        if (isPossibleMove(board, color, file, rank-1)) {
            moves.push(`${file}${rank-1}`);
            setJSON("takes", {takes: false});
        }
        // check front left
        if (board[`${String.fromCharCode(file.charCodeAt(0)-1)}${rank-1}`]) {
            moves.push(`${String.fromCharCode(file.charCodeAt(0)-1)}${rank-1}`);
        }
        // check front right
        if (board[`${String.fromCharCode(file.charCodeAt(0)+1)}${rank-1}`]) {
            moves.push(`${String.fromCharCode(file.charCodeAt(0)+1)}${rank-1}`);
        }
        // check double pawn move
        if (rank === 7) {
            moves.push(`${file}5`);
            setJSON("double_pawn", {position: `${file}5`, color: "black"});
            setJSON("takes", {takes: false});
        }
    }
    
    return moves;
}

export function possibleMovesKnight(board: any, position: string, color: string): string[] {
    let moves: string[] = [];

    const rank: number = parseInt(position[1]);
    const file: string = position[0];

    if (!(["g", "h"].some(x => file===x))) {
        // middle top right
        if (rank !== 8 && isPossibleMove(board, color, String.fromCharCode(file.charCodeAt(0)+2), rank+1)) moves.push(`${String.fromCharCode(file.charCodeAt(0)+2)}${rank+1}`);
        // middle bottom right
        if (rank !== 1 && isPossibleMove(board, color, String.fromCharCode(file.charCodeAt(0)+2), rank-1)) moves.push(`${String.fromCharCode(file.charCodeAt(0)+2)}${rank-1}`);
    }
    if (!(["a", "b"].some(x => file===x))) {
        // middle top left
        if (rank !== 8 && isPossibleMove(board, color, String.fromCharCode(file.charCodeAt(0)-2), rank+1)) moves.push(`${String.fromCharCode(file.charCodeAt(0)-2)}${rank+1}`);
        // middle bottom left
        if (rank !== 1 && isPossibleMove(board, color, String.fromCharCode(file.charCodeAt(0)-2), rank-1)) moves.push(`${String.fromCharCode(file.charCodeAt(0)-2)}${rank-1}`);
    }
    if (file !== "h") {
        // top right
        if (!([7, 8].some(x => rank===x)) && isPossibleMove(board, color, String.fromCharCode(file.charCodeAt(0)+1), rank+2)) moves.push(`${String.fromCharCode(file.charCodeAt(0)+1)}${rank+2}`);
        // bottom right
        if (!([1, 2].some(x => rank===x)) && isPossibleMove(board, color, String.fromCharCode(file.charCodeAt(0)+1), rank-2)) moves.push(`${String.fromCharCode(file.charCodeAt(0)+1)}${rank-2}`);
    }
    if (file !== "a") {
        // top left
        if (!([7, 8].some(x => rank===x)) && isPossibleMove(board, color, String.fromCharCode(file.charCodeAt(0)-1), rank+2)) moves.push(`${String.fromCharCode(file.charCodeAt(0)-1)}${rank+2}`);
        // bottom left
        if (!([1, 2].some(x => rank===x)) && isPossibleMove(board, color, String.fromCharCode(file.charCodeAt(0)-1), rank-2)) moves.push(`${String.fromCharCode(file.charCodeAt(0)-1)}${rank-2}`);
    }

    return moves;
}

export function possibleMovesKing(board: any, position: string, color: string): string[] {
    let moves: string[] = [];

    const rank: number = parseInt(position[1]);
    const file: string = position[0];


    // check front straight
    if (isPossibleMove(board, color, file, rank+1)) moves.push(`${file}${rank+1}`);
    // check front left
    if (file !== "a" && isPossibleMove(board, color, String.fromCharCode(file.charCodeAt(0)-1), rank+1)) moves.push(`${String.fromCharCode(file.charCodeAt(0)-1)}${rank+1}`);
    // check front right
    if (file !== "h" && isPossibleMove(board, color, String.fromCharCode(file.charCodeAt(0)+1), rank+1)) moves.push(`${String.fromCharCode(file.charCodeAt(0)+1)}${rank+1}`);
    // check back straight
    if (isPossibleMove(board, color, file, rank-1)) moves.push(`${file}${rank-1}`);
    // check back left
    if (file !== "a" && isPossibleMove(board, color, String.fromCharCode(file.charCodeAt(0)-1), rank-1)) moves.push(`${String.fromCharCode(file.charCodeAt(0)-1)}${rank-1}`);
    // check back right
    if (file !== "h" && isPossibleMove(board, color, String.fromCharCode(file.charCodeAt(0)+1), rank-1)) moves.push(`${String.fromCharCode(file.charCodeAt(0)+1)}${rank-1}`);

    return moves;
}

export function possibleMovesBishop(board: any, position: string, color: string): string[] {
    let moves: string[] = [];

    const rank: number = parseInt(position[1]);
    const file: string = position[0];
    const fileCharCode: number = file.charCodeAt(0);
    const fileNum: number = fileCharCode - 96;

    // right
    for (let i = 1; i <= 8-fileNum; i++) {
        // top right takes
        if (isPossibleMove(board, color, String.fromCharCode(fileCharCode+i), rank+i) === "x") {
            moves.push(`${String.fromCharCode(fileCharCode+i)}${rank+i}`);
            break;
        } 
            // top right 
        else if (isPossibleMove(board, color, String.fromCharCode(fileCharCode+i), rank+i)) {
            moves.push(`${String.fromCharCode(fileCharCode+i)}${rank+i}`)
        } 
        else break;
    }

    for (let i = 1; i <= 8-fileNum; i++) {
        // bottom right takes
        if (isPossibleMove(board, color, String.fromCharCode(fileCharCode+i), rank-i) === "x") {
            moves.push(`${String.fromCharCode(fileCharCode+i)}${rank-i}`)
            break;
        // bottom right
        } else if (isPossibleMove(board, color, String.fromCharCode(fileCharCode+i), rank-i)) {
            moves.push(`${String.fromCharCode(fileCharCode+i)}${rank-i}`);
            console.log("poop")
        }
        else break;
    }
    
    // left
    for (let i = 1; i <= fileNum-1; i++) {
        // top left  takes
        if (isPossibleMove(board, color, String.fromCharCode(fileCharCode-i), rank+i) === "x") {
            moves.push(`${String.fromCharCode(fileCharCode-i)}${rank+i}`);
            break;
        // top left
        } else if (isPossibleMove(board, color, String.fromCharCode(fileCharCode-i), rank+i)) {
            moves.push(`${String.fromCharCode(fileCharCode-i)}${rank+i}`);
        } else break;
    }

    for (let i = 1; i <= fileNum-1; i++) {
        // bottom left takes
        if (isPossibleMove(board, color, String.fromCharCode(fileCharCode-i), rank-i) === "x") {
            moves.push(`${String.fromCharCode(fileCharCode-i)}${rank-i}`);
            break;
        } else if (isPossibleMove(board, color, String.fromCharCode(fileCharCode-i), rank-i)) {
            // bottom left
            moves.push(`${String.fromCharCode(fileCharCode-i)}${rank-i}`);
        } else break;
    }

    return moves;
}

export function possibleMovesRook(board: any, position: string, color: string): string[] {
    let moves: string[] = [];

    const rank: number = parseInt(position[1]);
    const file: string = position[0];

    // for squares above
    for (let i = rank+1; i <= 8; ++i) {
        if (isPossibleMove(board, color, file, i)) moves.push(`${file}${i}`);
        else if (isPossibleMove(board, color, file, i) === "x") {
            moves.push(`${file}${i}`);
            break;
        } else break; 
    }

    // for squares below
    for (let i = rank-1; i >= 1; --i) {
        if (isPossibleMove(board, color, file, i)) moves.push(`${file}${i}`);
        else if (isPossibleMove(board, color, file, i) === "x") {
            moves.push(`${file}${i}`);
            break;
        } else break; 
    }


    // for squares to the right
    for (let i = file.charCodeAt(0)+1; i <= 104; i++) {
        if (isPossibleMove(board, color, String.fromCharCode(i), rank)) moves.push(`${String.fromCharCode(i)}${rank}`);
        else if (isPossibleMove(board, color, String.fromCharCode(i), rank) === "x") {
            moves.push(`${String.fromCharCode(i)}${rank}`);
            break;
        } else break; 
    }

    // for squares to the left
    for (let i = file.charCodeAt(0)-1; i >= 97; i--) {
        console.log(String.fromCharCode(i));
        if (isPossibleMove(board, color, String.fromCharCode(i), rank)) moves.push(`${String.fromCharCode(i)}${rank}`);
        else if (isPossibleMove(board, color, String.fromCharCode(i), rank) === "x") {
            moves.push(`${String.fromCharCode(i)}${rank}`);
            break;
        } else break; 
    }

    return moves;
}

export function possibleMovesQueen(board: any, position: string, color: string): string[] {
    const posMovesRook = possibleMovesRook(board, position, color);
    const posMovesBishop = possibleMovesBishop(board, position, color);

    return posMovesRook.concat(posMovesBishop);
}
