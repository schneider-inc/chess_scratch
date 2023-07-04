import Square from "./Square";
import "./Chessboard.css";



export default function Chessboard() {
    return (
        <div className="chessboard">
            <span id="first-row" className="row">
                <Square color="light" square="a8" />
                <Square color="dark" square="b8" />
                <Square color="light" square="c8" />
                <Square color="dark" square="d8" />
                <Square color="light" square="e8" />
                <Square color="dark" square="f8" />
                <Square color="light" square="g8" />
                <Square color="dark" square="h8" />
            </span>
            <span id="second-row" className="row">
                <Square color="dark" square="a7" />
                <Square color="light" square="b7" />
                <Square color="dark" square="c7" />
                <Square color="light" square="d7" />
                <Square color="dark" square="e7" />
                <Square color="light" square="f7" />
                <Square color="dark" square="g7" />
                <Square color="light" square="h7" />
            </span>
            <span id="third-row" className="row">
                <Square color="light" square="a6" />
                <Square color="dark" square="b6" />
                <Square color="light" square="c6" />
                <Square color="dark" square="d6" />
                <Square color="light" square="e6" />
                <Square color="dark" square="f6" />
                <Square color="light" square="g6" />
                <Square color="dark" square="h6" />
            </span>
            <span id="fourth-row" className="row">
                <Square color="dark" square="a5" />
                <Square color="light" square="b5" />
                <Square color="dark" square="c5" />
                <Square color="light" square="d5" />
                <Square color="dark" square="e5" />
                <Square color="light" square="f5" />
                <Square color="dark" square="g5" />
                <Square color="light" square="h5" />
            </span>
            <span id="fifth-row" className="row">
                <Square color="light" square="a4" />
                <Square color="dark" square="b4" />
                <Square color="light" square="c4" />
                <Square color="dark" square="d4" />
                <Square color="light" square="e4" />
                <Square color="dark" square="f4" />
                <Square color="light" square="g4" />
                <Square color="dark" square="h4" />
            </span>
            <span id="sixth-row" className="row">
                <Square color="dark" square="a3" />
                <Square color="light" square="b3" />
                <Square color="dark" square="c3" />
                <Square color="light" square="d3" />
                <Square color="dark" square="e3" />
                <Square color="light" square="f3" />
                <Square color="dark" square="g3" />
                <Square color="light" square="h3" />
            </span>
            <span id="seventh-row" className="row">
                <Square color="light" square="a2" />
                <Square color="dark" square="b2" />
                <Square color="light" square="c2" />
                <Square color="dark" square="d2" />
                <Square color="light" square="e2" />
                <Square color="dark" square="f2" />
                <Square color="light" square="g2" />
                <Square color="dark" square="h2" />
            </span>
            <span id="eighth-row" className="row">
                <Square color="dark" square="a1" />
                <Square color="light" square="b1" />
                <Square color="dark" square="c1" />
                <Square color="light" square="d1" />
                <Square color="dark" square="e1" />
                <Square color="light" square="f1" />
                <Square color="dark" square="g1" />
                <Square color="light" square="h1" />
            </span>
        </div>
    )
}

