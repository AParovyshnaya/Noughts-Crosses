/**
 * Узнаёт, какого размера должно быть поле и запускает создание последнего
 * @returns  {string} класс, к которому принадлежат квадратики
 */
function whatsField() {
    let size = document.getElementById("select_size").value;
    if (size == "3x3") {
        return create(["0", "1", "2"], `3`);
    } else if (size == "19x19") {
        return create(["0", "1", "2", `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `13`, `14`, `15`, `16`, `17`, `18`], `19`);
    }
}
/**
 * Создаёт поле
 * @param {array} lines перечисление номеров линий (или колонн, ведь поле квадратное)
 * @param {string} squaresSize размер поля с одной стороны
 * @returns {string} класс, к которому принадлежат квадратики
 */
function create(lines, squaresSize) {
    let target = deleteOld("field");
    deleteOld("friends");
    deleteOld("new_game_target");
    let [classLine, classSquare] = whatsClass(squaresSize);
    for (let nubmersline in lines) {
        let line = document.createElement("div");
        line.setAttribute("class", classLine);
        iLine = nubmersline
        for (let i in lines) {
            let square = document.createElement("div");
            square.setAttribute("class", classSquare);
            square.setAttribute("id", "square" + iLine + "-" + i);
            let img = document.createElement("img");
            img.setAttribute("class", "img");
            square.appendChild(img);
            line.appendChild(square);
        }
        target.appendChild(line);
    }
    return (`.` + classSquare);
}
/**
 * Удаляет объект, к которому указано id
 * @param {string} id помогает найти объект для удаления
 * @returns объект, который создали после удаления
 */
function deleteOld(id) {
    let old = document.getElementById(id);
    if (old != null) {
        old.parentNode.removeChild(old);
    }
    if (id == "field") {
        let newTarget = document.createElement("div");
        newTarget.setAttribute("id", id);
        let parent = document.getElementById("play_aktivity");
        parent.appendChild(newTarget);
        return newTarget;
    }
}
/**
 * Определяет названия классов в зависимости от размера
 * @param {*} squaresSize размер (с одной стороны)
 * @returns классы для линии и квадратов
 */
function whatsClass(squaresSize) {
    if (squaresSize == `3`) {
        return [`line_3`, `square_3`];
    } else {
        return [`line_19`, `square_19`];
    }
}