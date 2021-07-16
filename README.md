# Noughts-Crosses
<img src="images/icon.png"  width="100px" height= "100px">

<img alt="JavaScript" src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/> <img alt="HTML5" src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white"/> <img alt="CSS3" src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white"/>

[![Apache-2.0 License](https://img.shields.io/badge/License-Apache--2.0-brightgreen.svg)](https://github.com/AParovyshnaya/Noughts-Crosses/blob/master/LICENSE)

[![GitHub release](https://img.shields.io/github/release/AParovyshnaya/Noughts-Crosses)](https://GitHub.com/Naereen/StrapDown.js/releases/)


## Что это?

Это классическая игра в крестики-нолики в веб-формате.

## Как это работает?

### Создание поля

По нажатию кнопки создаётся поле из 3-ёх строк (`div-ов`), с тремя клетками (тоже `div-ами`). У каждой "клетки" есть особенное `id`, по которому программа понимает расположение клетки в поле. Например:

<img src="images/README_1.png">

Первое часть `id` — `square` — переводится как "квадрат" с английского. Первая цифра обозначает ряд (строчку), а вторая — колонну (столбец). Исчисление начинается с нуля.

Если поле уже было или другие части игры уже были созданы, то они удаляются.

### Игра

#### Что происходит фоном

Говорится, кто сейчас будет ходить, а также при нажатии на клетку появляется крестик или нолик.

#### Проверка

О да! Самая горячая часть. Проверка начинается только с наличия трёх заполненных клеток типа(o/x), который сейчас создали нажатием. Если они есть, то проверяется в ряду и колонне этого типа. Есть особенность: проверяется только в столбце/ряду, в котором стоит клетка. Ещё проверяются диоганали этого типа.

#### Поздравления

Если кто-то выиграл или ничья, то выводится положение игроков в игре (например, "Выиграл крестик!"), картинка и предложение начать новую игру с кнопкой.

## Я нашёл ошибку или у меня есть пожелания

Напишите `issue` и выскажите свою мысль. Поставьте звезду. :).

## Благодарности

Спасибо @zelenyhleb, что починил баг со скаканием клеток.

Спасибо @AParovyshnaya за исполнение своей идеи.

Спасибо читателю за поставлению звезду.
