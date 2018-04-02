class BaseFigure {
    constructor(stones) {
        this.x = 0;
        this.y = 0;

        this.stones = stones;
        this.color = Utils.generateRandom(Images.SOURCES.length);

        this.rotationIndex = 0;
    }

    getCoords() {
        return {
            x: this.x,
            y: this.y
        }
    }

    setCoords(x, y) {
        this.x = x;
        this.y = y;
    }

    getColor() {
        return this.color ? this.color : 0;
    }

    setColor(color) {
        this.color = color;
    }

    getStones() {
        return this.stones[this.rotationIndex].map((stone) => {
            return { x: this.x + stone.x, y: this.y + stone.y };
        });
    }

    getShiftStones(shiftX, shiftY) {
        return this.stones[this.rotationIndex].map((stone) => {
            return { x: this.x + stone.x + shiftX, y: this.y + stone.y + shiftY };
        });
    }

    getRotateStones() {
        var rotateIndex = this.rotationIndex + 1;
        if (rotateIndex >= this.stones.length) {
            rotateIndex = 0;
        }

        return this.stones[rotateIndex].map((stone) => {
            return { x: this.x + stone.x, y: this.y + stone.y };
        });
    }

    rotate() {
        this.rotationIndex++;
        if (this.rotationIndex >= this.stones.length) {
            this.rotationIndex = 0;
        }
    }
}