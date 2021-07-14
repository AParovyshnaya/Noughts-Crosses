function whatsField() {
    let size = document.getElementById("select_size").value;
    if (size == "3x3") {
        create(["0", "1", "2"], ["0", "1", "2"]);
    }
    return (true)
}

function create(lines, inLines) {
    let target = deleteOld();
    for (let nubmersline in lines) {
        let line = document.createElement("div");
        line.setAttribute("class", "line");
        iLine = nubmersline
        for (let i in inLines) {
            let square = document.createElement("div");
            square.setAttribute("class", "square");
            square.setAttribute("id", "square" + iLine + "-" + i);
            const img = document.createElement("img");
			img.setAttribute("class", "img");
			square.appendChild(img);
            line.appendChild(square);
        }
        target.appendChild(line);
    }
}

function deleteOld() {
    let old = document.getElementById("field");
    let body = document.getElementsByTagName("body")[0];
    if (old != null) {
        body.removeChild(old);
    }
    let oldImg = document.getElementById("field");
    let newTarget = document.createElement("div");
    newTarget.setAttribute("id", "field");
    body.appendChild(newTarget);
    return newTarget;
}