function whatsSquare(classSquare) {
    let squares = document.querySelectorAll(classSquare);
    let turn = "крестика (x)";
    let whatsturn = 0;
    let squaresNumber = aboutNumbers(classSquare);
    howsTurn(null, turn);
    for (let square in squares) {
        squares[square].onclick = function (e) {
            turn = howsTurn(e.target, turn);
            win(e.target, classSquare);
            whatsturn += 1;
            if (whatsturn == squaresNumber) {
                congratulation(1);
            }
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
}

function win(square, classSquare) {
    let thisType = getThisType(square, classSquare);
    if (thisType.length >= 3) {
        let [line, column] = lineAndColumn(square);
        if (winInLineOrColumn(thisType, line, 0) || winInLineOrColumn(thisType, column, 1) || winInD(thisType)) {
            congratulation(square);
        }
    }
}

function getThisType(square, classSquare) {
    let thisType = [];
    let type = square.getAttribute("data");
    let all = document.querySelectorAll(classSquare);
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
    let dash = id.indexOf(`-`);
    let line = id.substring(`6`, dash);
    let column = id.substring(dash);
    return [line, column];
}

function winInLineOrColumn(thisType, favorit, lineOrColumn) {
    let goods = 0;
    for (let number in thisType) {
        let element = thisType[number];
            if (lineAndColumn(element)[lineOrColumn] == favorit) {
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
    if (square == 1) {
        printAndWin("У вас ничья!");
        newGame("Быть может, ещё?");
    } else {
        printAndWin(howWin(square));
        newGame("Хотите реванш?");
    }
}

function deleteField() {
    let field = document.getElementById("field");
    field.parentNode.removeChild(field);
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

function newGame(textContent) {
    let request = document.createElement("p");
    request.textContent = textContent;
    let button = document.createElement("input");
    button.setAttribute("type", "button");
    button.setAttribute("value", "Новая игра");
    button.setAttribute("id", "new_game");
    let target_request = document.createElement("div");
    target_request.setAttribute("id", "new_game_target");
    let target = document.getElementById("play_aktivity");
    target.appendChild(target_request);
    target_request.appendChild(request);
    target_request.appendChild(button);
    button.onclick = function () {
        size = whatsField();
        whatsSquare(size);
    }
}

function aboutNumbers(classSquare) {
    let size = classSquare.substring(8);
    if (size == `3`) {
        return [9, 3]; // Первое - ничья, второе - в if win(), winInD(), winInLineorColumn()
    } else {
        return [361, 5];
    }
}
