function whatsField() {
    let field = document.getElementById("select_size").value;
    create([0, 1, 2], [0, 1, 2]);
}

function create(lines, inLines) {
    let target = document.getElementById("field");
    for (let i in lines) {
        let line = document.createElement("div");
        line.setAttribute("class", "line");
        for (let i in inLines) {
            let square = document.createElement("div");
            square.setAttribute("class", "square");
            line.appendChild(square);
        }
        target.appendChild(line);
    }
}