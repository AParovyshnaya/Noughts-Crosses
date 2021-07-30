function whatsField() {
    let size = document.getElementById("select_size").value;
    if (size == "3x3") {
        create(["0", "1", "2"], ["0", "1", "2"]);
    } else if (size == "19x19") {
            console.log("Здесь будет поле");
    }
    return (true)
}

function create(lines, inLines) {
    let target = deleteOld("field");
    deleteOld("friends");
    deleteOld("new_game_target");
    for (let nubmersline in lines) {
        let line = document.createElement("div");
        line.setAttribute("class", "line");
        iLine = nubmersline
        for (let i in inLines) {
            let square = document.createElement("div");
            square.setAttribute("class", "square");
            square.setAttribute("id", "square" + iLine + "-" + i);
            let img = document.createElement("img");
            img.setAttribute("class", "img");
            square.appendChild(img);
            line.appendChild(square);
        }
        target.appendChild(line);
    }
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