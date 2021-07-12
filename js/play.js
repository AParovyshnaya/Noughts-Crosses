function whatsSquare(canPlay) {
    let squares = document.querySelectorAll(".square");
    let turn = "крестика (x)";
    let whatsturn = 0;
    howsTurn(null, turn);
    for (let square in squares) {
        squares[square].onclick = function (e) {
            turn = howsTurn(e.target, turn);
            howWin(e.target, turn);
            whatsturn += 1;
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
        square.setAttribute("data", "cross");
    } else {
        image.setAttribute("src", "images/o.svg");
        square.setAttribute("data", "nolik");
    }
    square.appendChild(image);
}

function howWin(square) {
    let thisType = getThisType(square);
    if (thisType.length < 3) {
        break;
    }
}

function getThisType(square) {
    let thisType = [];
    let type = square.getAttribute("data");
    let all = document.querySelectorAll(".square");
    let length = all.length;
    let whenStop = 0;
    for (let number in all) {
        let element = all[number];
        if (element.hasAttribute("data")) {
            if (element.getAttribute("data") == type) {
                thisType.push(element);
            }
        }
        whenStop += 1;
        if (whenStop == length) {
            break;
        }
    }
    console.log(thisType);
    return thisType;
}