# Noughts-Crosses
 
[![Apache-2.0 License](https://img.shields.io/badge/License-Apache--2.0-brightgreen.svg)](https://github.com/AParovyshnaya/Noughts-Crosses/blob/master/LICENSE)

[![Release](https://img.shields.io/badge/Release-Latest%202.0.0-pink.svg)](https://github.com/AParovyshnaya/Noughts-Crosses/releases/latest)

https://aparovyshnaya.github.io/Noughts-Crosses/)

## Что это?

Это классическая игра в крестики-нолики в веб-формате.

## Как это работает?

### Создание поля

По нажатию кнопки создаётся поле из 3-ёх строк (`div-ов`), с тремя клетками (тоже `div-ами`). У каждой "клетки" есть особенное `id`, по которому программа понимает расположение клетки в поле. Например:

<img src="images/README_1">

Первое часть `id` — `square` — переводится как "квадрат" с английского. Первая цифра обозначает ряд (строчку), а вторая — столбец. Исчисление начинается с нуля.

Если поле уже было или другие части игры уже были созданы, то они удаляются.
