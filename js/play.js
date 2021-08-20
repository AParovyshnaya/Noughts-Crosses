/**
 * Определяет, на какой квадрат нажали
 * @param {string} classSquare класс, к которому относятся квадратики 
 */
function whatsSquare(classSquare) {
    // if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {

    //     alert(`Вы используете мобильное устройство (телефон или планшет). Не бойтесь этого сообщения`);

    // } else { 
    //     alert(`Вы используете ПК. Не пугайтесь, пожалуйста`); 
    // }
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
                congratulation(`two win`);
            }
        };
    }
}
/**
 * Меняет turn, если указан квадрат и записывает в div turn
 * @param {HTMLDivElement} square - квадрат, на который нажали
 * @param {string} turn TextContent div`а, который сообщает пользователям, чей ход
 * @returns turn
 */
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
/**
 * Рисует крестик или нолик в квадратике после нажатия
 * @param {HTMLDivElement} square квадрат, на который нажали
 * @param {string} turn сообщение для пользователей, говорящее чей ход
 */
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
/**
 * Проверяет, не победил ли сейчас человек, наживший на квадратик
 * @param {HTMLDivElement} square квадратик, на который нажали
 * @param {string} classSquare класс, к которому принадлежат квадратики на поле
 */
function win(square, classSquare) {
    let thisType = getThisType(square, classSquare);
    let inColumn = aboutNumbers(classSquare)[1];
    if (thisType.length >= inColumn) {
        let [line, column] = lineAndColumn(square);
        if (winInLineOrColumn(thisType, line, 0, inColumn) || winInLineOrColumn(thisType, column, 1, inColumn) || winInD(thisType, inColumn)) {
            congratulation(`one win`);
        }
    }
}
/**
 * Находит квадратики этого типа
 * @param {HTMLDivElement} square клетка
 * @param {string} classSquare класс, к которому принадлежат все квадратики на поле
 * @returns массив с div`ами-квадратиками одного типа (крестики/нолики)
 */
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
/**
 * Находит местоположение квадрата
 * @param {HTMLDivElement} square квадрат (клетка)
 * @returns координаты: линию и колонну (иссчисляется от нуля)????
 */
function lineAndColumn(square) {
    let id = square.getAttribute("id");
    let dash = id.indexOf(`-`);
    let line = id.substring(`6`, dash);
    let column = id.substring(dash + 1);
    return [line, column];
}
/**
 * Проверяет, выиграл ли игрок по прямой
 * @param {array} thisType квадратики этого типа (крестики/нолики)
 * @param {string} favorit координата, по которой сравнивают клетки, чтобы можно было утверждать: они в одном ряду (по горизонтали/вертикали)
 * @param {number} lineOrColumn сравниваем в линии или в колонне?
 * @param {number} threeOr5 нужно три или пять подряд для победы?
 * @returns если победил - true, иначе - false
 */
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
/**
 * Здесь проверяется, находится ли клетки рядом с друг другом
 * @param {array} goods массив клеток, которые стоят в ряду
 * @param {number} lineOrColumn другой признак. То есть если мы сравнивали в функции выше в колонне, то теперь нам нужно сравнивать, как у них отличается горизанталь
 * @returns если победил - true, иначе - false
 */
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
/**
 * Проверяет диагонали
 * @param {number} thisType массив с клетками этого типа
 * @param {number} threeOr5 три оли пять должны быть в ряд для победы?
 * @returns если победил - true, иначе - false
 */
function winInD(thisType, threeOr5) {
    for (let number in thisType) {
        let element = thisType[number];
        let [line, column] = lineAndColumn(element);
        let goodComand = [];
        let difference = 1;
        for (let number in thisType) {
            let candidate = thisType[number];
            if (Math.abs(lineAndColumn(candidate)[0] - line) == difference && Math.abs(lineAndColumn(candidate)[1] - column) == difference) {
                goodComand.push(candidate);
                difference += 1;
            }
        }
        if (goodComand.length >= threeOr5 - 1) {
            return true;
        }

    }
}
/**
 * Удаляет поле, говорит, кто выиграл и предлагает новую игру
 * @param {string} howMany клетка
 */
function congratulation(howMany) {
    deleteField();
    if (howMany == `two win`) {
        printAndWin("У вас ничья!");
        newGame("Быть может, ещё?");
    } else {
        printAndWin(howWin(howMany));
        newGame("Хотите реванш?");
    }
}
/**
 * Удаляет поле
 */
function deleteField() {
    let field = document.getElementById("field");
    field.parentNode.removeChild(field);
}
/**
 * Говорит, кто выиграл
 * @param {HTMLDivElement} square 
 * @returns строчку, где оглашается победивший
 */
function howWin(square) {
    let type = square.getAttribute("data");
    if (type == "cross") {
        return "Победил крестик!";
    } else {
        return "Победил нолик!";
    }
}
/**
 * Выводит картинку и комментирует сиутацию
 * @param {string} howWin 
 */
function printAndWin(howWin) {
    let target = document.getElementById("move");
    target.textContent = howWin;
    let friends = document.createElement("img");
    friends.setAttribute("src", "images/friends.png");
    friends.setAttribute("id", "friends");
    let divImg = document.getElementById("div_friends");
    divImg.appendChild(friends);
}
/**
 * Создаёт кнопку, которая делает новое поле
 * @param {string} textContent Что будет написано на кнопке
 */
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
/**
 * Помогает определить переменные, которые зависят от размера поля
 * @param {string} classSquare  класс, к которому принадлежат клетки на поле
 * @returns массив из двух чисел
 */
function aboutNumbers(classSquare) {
    let size = classSquare.substring(8);
    if (size == `3`) {
        return [9, 3]; // Первое - ничья, второе - в if win(), winInD(), winInLineorColumn()
    } else {
        return [361, 5];
    }
}
