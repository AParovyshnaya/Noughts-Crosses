function whatsSquare(canPlay) {
    let squares = document.querySelectorAll(".square");
    console.log(squares);
    let turn = "крестика (x)";
    howsTurn(null, turn);
    for (let square in squares) {
        squares[square].onclick = function (e) {
            console.log('event triggered on element', e, e.target);
            howsTurn(e.target, turn);
            if (turn == "крестика (x)") {
                turn = "нолика (o)";
            } else {
                turn = "крестика (x)"
            }
        };
        console.log("listener added to ", square);
    }
}

function howsTurn(square, turn) {
    target = document.getElementById("move");
    target.textContent = "Сейчас ход " + turn;
    if (square != null) {
        drawInTheSquare(square, turn);
    }
}

function drawInTheSquare(square, turn) {
    if (turn == "крестика (x)") {
        square.textContent = "x";
    } else {
        square.textContent = "o";
    }
}