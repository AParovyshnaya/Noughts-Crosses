function whatsSquare(canPlay) {
    let squares = document.querySelectorAll(".square");
    let turn = "крестика (x)";
    howsTurn(null, turn);
    for (let square in squares) {
        squares[square].onclick = function (e) {
            turn = howsTurn(e.target, turn);
        };
    }
}

function howsTurn(square, turn) {
    if (square != null) {
        drawInTheSquare(square, turn);
        if (turn == "крестика (x)") {
            turn = "нолика (o)";
        } else {
            turn = "крестика (x)";
        }
    }
    target = document.getElementById("move");
    target.textContent = "Сейчас ход " + turn;
    return turn;
}

function drawInTheSquare(square, turn) {
    let image = document.createElement("img");
    if (turn == "крестика (x)") {
        image.setAttribute("src", "images/x.svg");
    } else {
        image.setAttribute("src", "images/o.svg");
    }
    square.appendChild(image);
}