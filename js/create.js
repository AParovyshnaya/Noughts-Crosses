function whatsField() {
    let field = document.getElementById("select_size").value;
    console.log("hello");
    create();
}

function create() {
    let target = document.getElementById("field");
    for (let i in [0, 1, 2]) {
        let p = document.createElement("p");
        p.setAttribute("class", "line");
        for (let i in [0, 1, 2,]) {
            let square = document.createElement("input");
            square.setAttribute("class", "line");
            square.setAttribute("type", "button");
            p.appendChild(square);
        }
        target.appendChild(p);
    }
}