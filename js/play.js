/**
 * Определяет, на какой квадрат нажали
 * @param {string} classSquare класс, к которому относятся квадратики 
 */
function whatsSquare(classSquare) {
    let squares = document.querySelectorAll(classSquare); // найди квадратики
    let turn = `крестика (x)`; // чей ход
    let whatsTurn = 0; // который ход по счёту
    let squaresNumber = aboutNumbers(classSquare)[0]; // максимальное значение whatsTurn
    howsTurn(null, turn);
    for (let square in squares) {
        squares[square].onclick = function (e) { // когда кликнули...
            turn = howsTurn(e.target, turn); // меняем ход и устанавливаем, кто кликнул
            win(e.target, classSquare); // и проверяем, не победил ли кто-нибудь
            whatsTurn += 1; // сейчас ход по номеру...
            if (whatsTurn == squaresNumber) { // не закончилась ли тут игра?
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
        drawInTheSquare(square, turn); // нарисуем крестик или нолик
        if (turn == `крестика (x)`) { // поменяем ход на следующий
            turn = `нолика (o)`;
        } else {
            turn = `крестика (x)`;
        }
    }
    target = document.getElementById(`move`); // даём информацию пользователю
    target.textContent = `Сейчас ход ` + turn; // возращаем главному циклу
    return turn;
}
/**
 * Рисует крестик или нолик в квадратике после нажатия
 * @param {HTMLDivElement} square квадрат, на который нажали
 * @param {string} turn сообщение для пользователей, говорящее чей ход
 */
function drawInTheSquare(square, turn) {
    let image = square.children[0]; 
    if (turn == `крестика (x)`) { //выбираем нужную картинку
        image.setAttribute(`src`, `images/x.svg`);
        square.setAttribute(`data`, `cross`);
    } else {
        image.setAttribute(`src`, `images/o.svg`);
        square.setAttribute(`data`, `nolik`);
    }
}
/**
 * Проверяет, не победил ли сейчас человек, наживший на квадратик
 * @param {HTMLDivElement} square квадратик, на который нажали
 * @param {string} classSquare класс, к которому принадлежат квадратики на поле
 */
function win(square, classSquare) {
    let thisType = getThisType(square, classSquare); // находим квадратики нужного нам типа (то есть человека, который нажал)
    let inColumn = aboutNumbers(classSquare)[1]; // сколько на в ряду
    if (thisType.length >= inColumn) { // если у нас набролось хотя один ряд квадратиков этого типа (иначе проверять бессмысленно)
        let [line, column] = lineAndColumn(square); // координаты квадратика, который сейчас поставили
        if (winInLineOrColumn(thisType, line, 0, inColumn) || winInLineOrColumn(thisType, column, 1, inColumn) || winInD(thisType, inColumn)) {
            congratulation(square); // если выиграл, то идут поздравления
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
    let thisType = []; // создаём массив, в который будут засовывать квадратики этого типа 
    let type = square.getAttribute(`data`); // значение типа
    let all = document.querySelectorAll(classSquare); // находим все-все-все квадратики
    let length = all.length;
    let whenStop = 0; // устанавливаем счёткик
    for (let number in all) {
        let element = all[number];
        if (element.hasAttribute(`data`)) {
            if (element.getAttribute(`data`) == type) { // если подходит - забрасываем
                thisType.push(element);
            }
        }
        whenStop += 1;
        if (whenStop == length) { // проверяем счётчик
            break;
        }
    }
    return thisType; // отдаём свою работу
}
/**
 * Находит местоположение квадрата
 * @param {HTMLDivElement} square квадрат (клетка)
 * @returns координаты: линию и колонну 
 */
function lineAndColumn(square) {
    let id = square.getAttribute(`id`); // id с координатами
    let dash = id.indexOf(`-`); // смотрим по границе: сначала линия, потом колонна
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
    let numberOfGoods = 0; // сколько подходящих
    let goods = []; // массив с подходящими
    for (let number in thisType) {
        let element = thisType[number]; 
        if (lineAndColumn(element)[lineOrColumn] == favorit) { // если признак, по которому мы сравниваем, верен, то...
            goods.push(element); // ...мы зачисляемего в лигу хороших и обновляем счётчик
            numberOfGoods += 1;
        }
    }
    if (threeOr5 == `3`) { // 3 в ряду проще, так как ширина или длина поля тоже равна 3
        if (numberOfGoods == threeOr5) {
            return true;
        }
    } else { // а вот у 5 в ряд можно разъединить хороших, поэтому мы проверяем
        if (numberOfGoods >= threeOr5) {
            if (lineOrColumn == 0) { // едины ли они и запускаем проверку по противоположному признаку
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
    let greats = 0; // сколько отличных
    let lastNumber = goods.length - 1; 
    lastNumber = lastNumber.toString(10); // находим квадратик, от которого отталкиваемся
    let lastSquare = goods[lastNumber];
    for (let number in goods) {
        let first = goods[number];
        if (first == lastSquare) { // если мы уже закончили работу
            break;
        }
        let numberLater = parseInt(number, 10);
        numberLater += 1;
        numberLater = numberLater.toString(10);
        let second = goods[numberLater];
        if (parseInt(lineAndColumn(first)[lineOrColumn], 10) + 1 == parseInt(lineAndColumn(second)[lineOrColumn], 10)) { // сравнение
            greats += 1;
        }
    }
    if (greats == 4) { // они прошли все испытания
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
        let [line, column] = lineAndColumn(element); // координаты
        let goodComand = []; // лига хороших
        let difference = 1; // разница между положением в линии и колонне
        for (let number in thisType) {
            let candidate = thisType[number]; // кандидат
            if (Math.abs(lineAndColumn(candidate)[0] - line) == difference && Math.abs(lineAndColumn(candidate)[1] - column) == difference) { // сравнение разниц
                goodComand.push(candidate);
                difference += 1; 
            }
        }
        if (goodComand.length >= threeOr5 - 1) { // если команда достаточно большая
            return true;
        }

    }
}
/**
 * Удаляет поле, говорит, кто выиграл и предлагает новую игру
 * @param {*} howMany клетка, если кто-то один выиграл или строчка, если ничья
 */
function congratulation(howMany) {
    deleteField(); // удаляем игровое поле
    if (howMany == `two win`) { // ничья или победа
        printAndWin(`У вас ничья!`);
        newGame(`Быть может, ещё?`);
    } else {
        printAndWin(howWin(howMany));
        newGame(`Хотите реванш?`); 
    }
}
/**
 * Удаляет поле
 */
function deleteField() {
    let field = document.getElementById(`field`);
    field.parentNode.removeChild(field);
}
/**
 * Говорит, кто выиграл
 * @param {HTMLDivElement} square 
 * @returns строчку, где оглашается победивший
 */
function howWin(square) {
    let type = square.getAttribute(`data`);
    if (type == `cross`) { // приговор
        return `Победил крестик!`; 
    } else {
        return `Победил нолик!`;
    }
}
/**
 * Выводит картинку и комментирует ситуацию
 * @param {string} howWin 
 */
function printAndWin(howWin) {
    let target = document.getElementById(`move`); // показываем игрокам картинку и итог
    target.textContent = howWin;
    let friends = document.createElement(`img`);
    friends.setAttribute(`src`, `images/friends.png`);
    friends.setAttribute(`id`, `friends`);
    let divImg = document.getElementById(`div_friends`);
    divImg.appendChild(friends);
}
/**
 * Создаёт кнопку, которая делает новое поле
 * @param {string} textContent Что будет написано на кнопке
 */
function newGame(textContent) {
    let request = document.createElement(`p`);
    request.textContent = textContent;
    let button = document.createElement(`input`);
    button.setAttribute("type", `button`);
    button.setAttribute(`value`, `Новая игра`);
    button.setAttribute("class", "button")
    button.setAttribute(`id`, `new_game`);
    let target_request = document.createElement(`div`);
    target_request.setAttribute(`id`, `new_game_target`);
    let target = document.getElementById(`play_aktivity`);
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
