function whatsSquare(canPlay) {
    let squares = document.querySelectorAll(".square");
    console.log(squares);
    let turn = "крестика (x)";
    howsTurn(turn);
    for (let square in squares) {
        squares[square].onclick = function (e) {
            console.log('event triggered on element', e, e.target);
            howsTurn(turn);
            if (turn == "крестика (x)") {
                turn = "нолика (o)";
            } else {
                turn = "крестика (x)"
            }
        };
        console.log("listener added to ", square);
    }
}

function howsTurn(turn) {
    target = document.getElementById("move");
    target.textContent = "Сейчас ход " + turn;
}