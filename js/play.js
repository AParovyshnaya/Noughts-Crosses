function whatsSquare(classSquare) {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {

        alert(`Вы используете мобильное устройство (телефон или планшет).`);

    } else { 
        alert(`Вы используете ПК.`); 
    }
    let squares = document.querySelectorAll(classSquare);
    let turn = "крестика (x)";
    let whatsturn = 0;
    let squaresNumber = aboutNumbers(classSquare)[0];
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
    console.log(thisType);
    let inColumn = aboutNumbers(classSquare)[1];
    if (thisType.length >= inColumn) {
        let [line, column] = lineAndColumn(square);
        if (winInLineOrColumn(thisType, line, 0, inColumn) || winInLineOrColumn(thisType, column, 1, inColumn) || winInD(thisType, inColumn)) {
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
    let column = id.substring(dash + 1);
    return [line, column];
}

function winInLineOrColumn(thisType, favorit, lineOrColumn, threeOr5) {
    let numberOfGoods = 0;
    let goods = [];
    for (let number in thisType) {
        let element = thisType[number];
        if (lineAndColumn(element)[lineOrColumn] == favorit) {
            goods.push(element);
            numberOfGoods += 1;
        }
    }
    if (threeOr5 == `3`) {
        if (numberOfGoods == threeOr5) {
            return true;
        }
    } else {
        if (numberOfGoods >= threeOr5) {
            if (lineOrColumn == 0) {
                return inARow(goods, 1);
            } else {
                return inARow(goods, 0);
            }

        }

    }
}

function inARow(goods, lineOrColumn) {
    let greats = 0;
    let lastNumber = goods.length - 1;
    lastNumber = lastNumber.toString(10);
    let lastSquare = goods[lastNumber];
    for (let number in goods) {
        let first = goods[number];
        if (first == lastSquare) {
            break;
        }
        let numberLater = parseInt(number, 10);
        numberLater += 1;
        numberLater = numberLater.toString(10);
        let second = goods[numberLater];
        if (parseInt(lineAndColumn(first)[lineOrColumn], 10) + 1 == parseInt(lineAndColumn(second)[lineOrColumn], 10)) {
            greats += 1;
        }
    }
    if (greats == 4) {
        return true;
    }
}
function winInD(thisType, threeOr5) {
    let lR = []; // слева направо
    let rL = []; // справа налево
    for (let number in thisType) {
        let element = thisType[number];
        let [line, column] = lineAndColumn(element);
        let goodComand = [];
        let difference = 1;
        for (let number in thisType) {
            let candidate = thisType[number];
            console.log(candidate, `candidate`);
            if (Math.abs(lineAndColumn(candidate)[0] - line) == difference && Math.abs(lineAndColumn(candidate)[1] - column) == difference) {
                goodComand.push(candidate);
                difference += 1;
                console.log(goodComand, `so good!`)
            }
        }
        if (goodComand.length >= threeOr5 - 1) {
            return true;
        }

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
