

class Piece {
    constructor(color, val, type) {
        this.x = -1;
        this.y = -1;
        this.color = color;
        this.val = val;
        this.type = type;

        this.revealed = false;
        this.selected = false;

        const isRed = color == "red";

        switch (type) {

            case "R":
                this.name = "車";
                break;

            case "H":
                this.name = "馬";
                break;

            case "C":
                this.name = "炮";
                break;

            case "K":
                if (isRed) {
                    this.name = "帅";
                } else {
                    this.name = "将";
                }
                break

            case "A":
                if (isRed) {
                    this.name = "仕";
                } else {
                    this.name = "士";
                }
                break

            case "E":
                if (isRed) {
                    this.name = "相";
                } else {
                    this.name = "象";
                }
                break;

            case "P":
                if (isRed) {
                    this.name = "兵";
                } else {
                    this.name = "卒";
                }
                break;
        }
    }

    canEat(piece) {
        return (piece.type == "K" && this.type == "P") || this.val >= piece.val;
    }

    moveTo(x, y) {
        this.x = x;
        this.y = y;
    }

    draw() {
        stroke(0);
        strokeWeight(this.selected * 5);
        fill(193, 154, 107);
        ellipse(
            this.x * gridLength + gridLength / 2,
            this.y * gridLength + gridLength / 2,
            gridLength * .7
        );

        if (this.revealed) {
            noStroke();
            fill(this.color);
            text(
                this.name,
                (this.x + .25) * gridLength,
                (this.y + .75) * gridLength
            );
        }
    }
}