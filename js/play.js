function whatsSquare(canPlay) {
    let squares = document.querySelectorAll(".square");
    let turn = "крестика (x)";
    let whatsturn = 0;
    howsTurn(null, turn);
    for (let square in squares) {
        squares[square].onclick = function (e) {
            turn = howsTurn(e.target, turn);
            win(e.target, turn);
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
    let image = square.children[0];
    if (turn == "крестика (x)") {
        image.setAttribute("src", "images/x.svg");
        square.setAttribute("data", "cross");
    } else {
        image.setAttribute("src", "images/o.svg");
        square.setAttribute("data", "nolik");
    }
    square.appendChild(image);
}

function win(square) {
    let thisType = getThisType(square);
    if (thisType.length >= 3) {
        let [line, column] = lineAndColumn(square);
        if (winInLineOrColumn(thisType, line, 6) || winInLineOrColumn(thisType, column, 8) || winInD(thisType)) {
            console.log("you win");
            congratulation(square);
        }
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
    return thisType;
}

function lineAndColumn(square) {
    let id = square.getAttribute("id");
    let line = id[6];
    let column = id[8];
    return [line, column];
}

function winInLineOrColumn(thisType, favorit, index) {
    let goods = 0;
    for (let number in thisType) {
        let element = thisType[number];
        let id = element.getAttribute("id");
        if (id[index] == favorit) {
            goods += 1
        }
    }
    if (goods == 3) {
        return true;
    }
}

function winInD(thisType) {
    let lR = []; // слева направо
    let rL = []; // справа налево
    for (let number in thisType) {
        let element = thisType[number];
        let [line, column] = lineAndColumn(element);
        if (line == 1 && column == 1) {
            lR.push(element);
            rL.push(element);
        } else if (line == column) {
            lR.push(element);
        }
        if (line - column == 2 || line - column == -2) {
            rL.push(element);
        }
    }
    if (lR.length == 3 || rL.length == 3) {
        return true;
    }
}

function congratulation(square) {
    deleteField();
    printAndWin(howWin(square));
}

function deleteField() {
    let field = document.getElementById("field");
    let body = document.getElementsByTagName("body")[0];
    body.removeChild(field);
}

function howWin(square) {
    let type = square.getAttribute("data");
    if (type == "cross") {
        return "Победил крестик!";
    } else {
        return "Победил нолик!";
    }
}

function printAndWin(howWin) {
    let target = document.getElementById("move");
    target.textContent = howWin;
    let friends = document.createElement("img");
    friends.setAttribute("src", "images/friends.png");
    friends.setAttribute("id", "friends");
    let divImg = document.getElementById("div_friends");
    divImg.appendChild(friends);
}