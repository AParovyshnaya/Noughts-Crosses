# Noughts-Crosses
<img src="images/icon.png"  width="100px" height= "100px">

<img alt="JavaScript" src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/> <img alt="HTML5" src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white"/> <img alt="CSS3" src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white"/>

[![Apache-2.0 License](https://img.shields.io/badge/License-Apache--2.0-brightgreen.svg)](https://github.com/AParovyshnaya/Noughts-Crosses/blob/master/LICENSE)

[![GitHub release](https://img.shields.io/github/release/AParovyshnaya/Noughts-Crosses)](https://GitHub.com/Naereen/StrapDown.js/releases/)

[Play online](https://aparovyshnaya.github.io/Noughts-Crosses/)

## Что это?

Это классическая игра в крестики-нолики в веб-формате.

## Как это работает?

### Создание поля

По нажатию кнопки создаётся поле из трёх или девятнадцати строк, с тремя или девятнадцатью клетками из`div`-ов. У каждой "клетки" есть особенное `id`, по которому программа понимает расположение клетки в поле. Например:

<img src="images/README_1.png">

Первое часть `id` — `square` — переводится как "квадрат" с английского. Первая цифра обозначает ряд (строчку), а вторая — колонну (столбец). Исчисление начинается с нуля.

Если поле уже было или другие части игры уже были созданы, то они удаляются.

### Игра

#### Что происходит фоном

Говорится, кто сейчас будет ходить, а при нажатии на клетку появляется крестик или нолик.

#### Проверка

Проверка начинается только с наличия трёх или пяти (в зависимости от режима) заполненных клеток типа o/x, который сейчас создали нажатием. Если они есть, то проверяется только в том ряду и колонне этого типа, в котором стоит клетка.
```
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
        if (lineAndColumn(element)[lineOrColumn] == favorit) { // если признак, по которомц мы сравниваем, верен, то...
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
```
Ещё проверяются диагонали этого типа.
```
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
```

#### Поздравления

Если кто-то выиграл или ничья, то выводится положение игроков в игре (например, "Выиграл крестик!"), картинка и предложение начать новую игру с кнопкой.

## Я нашёл ошибку или у меня есть пожелания

Напишите `issue` и выскажите свою мысль. Поставьте звезду. :).

## Благодарности

Спасибо @zelenyhleb, что починил баг со скаканием клеток.
Спасибо @AParovyshnaya за исполнение своей идеи.

Спасибо читателю за поставлению звезду.
