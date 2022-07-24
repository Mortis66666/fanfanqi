const gridWidth = 4;
const gridHeight = 8;
const gridLength = 70;
const canvasWidth = gridWidth * gridLength;
const canvasHeight = gridHeight * gridLength;

const grid = [];

var redsTurn = true;
var selected = null;


function setup() {
    let canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent("board");
    background(0, 0);
    
    strokeWeight(5);
    for (let x = 0; x <= gridWidth; x++) {
        line(
            x * gridLength, 0,
            x * gridLength, gridHeight * gridLength
        );
    }

    for (let y = 0; y <= gridHeight; y++) {
        line(
            0, y * gridLength,
            gridWidth * gridLength, y * gridLength
        );
        grid.push([]);
    }

    grid.pop(-1);

    var pieces = [];
    var pieceValues = {
        "C": 2,
        "H": 3,
        "R": 4,
        "E": 5,
        "A": 6,
    }
    var colors = ["red", "black"];

    colors.forEach(color => {
        for (let i = 0; i < 5; i++) {
            pieces.push(new Piece(color, 1, "P"));
        }

        for (let i = 0; i < 2; i++) {
            for (let [piece, value] of Object.entries(pieceValues)) {
                pieces.push(new Piece(color, value, piece));
            }
        }

        pieces.push(new Piece(color, 7, "K"));
    })


    pieces = pieces.sort(() => Math.random() - 0.5);

    for (let x = 0; x < gridWidth; x++) {
        for (let y = 0; y < gridHeight; y++) {
            let piece = pieces.pop();
            piece.moveTo(x, y);
            grid[y][x] = piece;
        }
    }

    textSize(gridLength * .5);
    rectMode(CENTER);
}



function draw() {
    document.querySelector("h1").innerHTML = (redsTurn ? "Red" : "Black") + "'s turn";
    drawgrid();
}

function mouseClicked() {
    if (mouseX && mouseY && mouseX < canvasWidth && mouseY < canvasHeight) {
        if (selected) {
            selected.selected = false;
        }

        let x = Math.floor(mouseX / gridLength);
        let y = Math.floor(mouseY / gridLength);

        let piece = grid[y][x];

        if (piece && !piece.revealed) {
            // Reveal piece
            piece.revealed = true;
            selected = null;
            redsTurn = !redsTurn;
        } else if (selected) {
            if ((!piece || (selected.color != piece.color && selected.canEat(piece))) && Math.abs(selected.x - x) + Math.abs(selected.y - y) == 1) {
                // Eat piece
                grid[selected.y][selected.x] = null;
                selected.moveTo(x, y);
                grid[y][x] = selected;
                redsTurn = !redsTurn;
            }
            selected = null;

        } else if (["black", "red"][redsTurn ? 1:0] != piece.color) {
            // Invalid selection
            console.log(redsTurn, 'invalid');
        } else {
            // Select piece
            piece.selected = true;
            selected = piece;
        }


    } else {
        if (selected) {
            selected.selected = false;
        }

        selected = null;
    }
}


function randint(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}


function drawgrid() {
    for (let [y, row] of grid.entries()) {
        for (let [x, piece] of row.entries()) {
            fill(255);
            noStroke();
            rect(
                x * gridLength + gridLength * .5,
                y * gridLength + gridLength * .5,
                gridLength * .9,
                gridLength * .9
            );

            if (piece)
                piece.draw();
        }
    }
}
