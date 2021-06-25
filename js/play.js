function whatsSquare(canPlay) {
    let squares = document.querySelectorAll(".square");
    console.log(squares);
    for (let square in squares) {
        squares[square].onclick = function (e) {
            console.log('event triggered on element', e, e.target);
            isGood(e.target);
        };
        console.log("listener added to ", square);
    }
}

function id(square) {
    console.log(square.id)
}