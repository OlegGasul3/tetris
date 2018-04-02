class BaseFigure {
    constructor(stones) {
        this.stones = stones;
        this.color = Utils.generateRandom(Images.getImageByColorIndex().length);

        this.currentPosition = 0;
    }

    setCoords(x, y) {
        this.x = x;
        this.y = y;
    }

    getCoords() {
        return {
            x: this.x, y: this.y
        };
    }

    getColor() {
        return this.color ? this.color : 0;
    }

    setColor(color) {
        this.color = color;
    }

    getCurrentStones() {
        var stones = this.stones[this.currentPosition];

        return this.stones[this.currentPosition];
    }

    getRotateStones() {
        var newPosition = this.currentPosition + 1;
        if (newPosition >= this.stones.length) {
            newPosition = 0;
        }

        return this.stones[newPosition];
    }

    rotate() {
        this.currentPosition++;
        if (this.currentPosition >= this.stones.length) {
            this.currentPosition = 0;
        }
    }
}