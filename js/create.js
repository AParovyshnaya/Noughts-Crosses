function whatsField() {
    let size = document.getElementById("select_size").value;
    if (size == "3x3") {
        create(["0", "1", "2"], ["0", "1", "2"]);
    }
    return (true)
}

function create(lines, inLines) {
    let target = deleteOld("field");
    deleteOld("friends");
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
        let body = document.getElementsByTagName("body")[0];
        body.appendChild(newTarget);
        return newTarget;
    }
}