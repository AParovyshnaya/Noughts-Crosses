function whatsField() {
    let size = document.getElementById("select_size").value;
    if (size == "3x3") {
        return create(["0", "1", "2"], `3`);
    } else if (size == "19x19") {
        return create(["0", "1", "2", `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `13`, `14`, `15`, `16`, `17`, `18`], `19`);
    }
}

function create(lines, squaresSize) {
    let target = deleteOld("field");
    deleteOld("friends");
    deleteOld("new_game_target");
    let [classLine, classSquare] = whatsClass(squaresSize);
    console.log(classLine);
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

function whatsClass(squaresSize) {
    if (squaresSize == `3`) {
        return [`line_3`, `square_3`];
    } else {
        return [`line_19`, `square_19`];
    }
}