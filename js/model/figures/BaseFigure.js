class BaseFigure {
    constructor(stones) {
        this.coords = {};

        this.stones = stones;
        this.color = Utils.generateRandom(Images.SOURCES.length);

        this.rotationIndex = 0;
    }

    getCoords() {
        return this.coords;
    }

    setCoords(coords) {
        this.coords = coords;
    }

    getColor() {
        return this.color ? this.color : 0;
    }

    setColor(color) {
        this.color = color;
    }

    getStones() {
        var self = this;
        return this.stones[this.rotationIndex].map((stone) => {
            return { x: self.coords.x + stone.x, y: self.coords.y + stone.y };
        });
    }

    getShiftStones(shiftX, shiftY) {
        var self = this;
        return this.stones[this.rotationIndex].map((stone) => {
            return { x: self.coords.x + stone.x + shiftX, y: self.coords.y + stone.y + shiftY };
        });
    }

    getRotateStones() {
        var rotateIndex = this.rotationIndex + 1;
        if (rotateIndex >= this.stones.length) {
            rotateIndex = 0;
        }

        var self = this;
        return this.stones[rotateIndex].map((stone) => {
            return { x: self.coords.x + stone.x, y: self.coords.y + stone.y };
        });
    }

    rotate() {
        this.rotationIndex++;
        if (this.rotationIndex >= this.stones.length) {
            this.rotationIndex = 0;
        }
    }
}