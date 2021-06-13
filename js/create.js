function whatsField() {
    let field = document.getElementById("select_size").value;
    create([0, 1, 2], [0, 1, 2]);
}

function create(lines, inLines) {
    let target = document.getElementById("field");
    for (let i in lines) {
        let p = document.createElement("p");
        p.setAttribute("class", "line");
        for (let i in inLines) {
            let square = document.createElement("input");
            square.setAttribute("class", "line");
            square.setAttribute("type", "button");
            p.appendChild(square);
        }
        target.appendChild(p);
    }
}