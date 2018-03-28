class BaseFigure {
    constructor(x, y, stones) {
        this.x = x;
        this.y = y;
        this.stones = stones;
        this.color = Utils.generateRandom(6);

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
        return this.color;
    }

    getCurrentStones() {
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
        return this.stones[this.currentPosition];
    }
}

class LineFigure extends BaseFigure {
    constructor(x, y) {
        var stones = [
            [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 0}],
            [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}, {x: 0, y: 3}]
        ];
        super(x, y, stones);
    }
}

class PointFigure extends BaseFigure {
    constructor(x, y) {
        var stones = [
            [{x: 0, y: 0}]
        ];
        super(x, y, stones);
    }
}

class AxeFigure extends BaseFigure {
    constructor(x, y) {
        var stones = [
            [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}, {x: 2, y: 1}],
            [{x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 0, y: 2}],
            [{x: 0, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}],
            [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}, {x: 1, y: 0}]
        ];
        super(x, y, stones);
    }
}

class CubeFigure extends BaseFigure {
    constructor(x, y) {
        var stones = [
            [{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}]
        ];
        super(x, y, stones);
    }
}

class TriangleFigure extends BaseFigure {
    constructor(x, y) {
        var stones = [
            [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}, {x: 1, y: 1}],
            [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}, {x: 1, y: 1}],
            [{x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 0, y: 1}],
            [{x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}]
        ];
        super(x, y, stones);
    }
}

class LadderRFigure extends BaseFigure {
    constructor(x, y) {
        var stones = [
            [{x: 0, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 1, y: 2}],
            [{x: 1, y: 0}, {x: 2, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}]
        ];
        super(x, y, stones);
    }
}

class LadderLFigure extends BaseFigure {
    constructor(x, y) {
        var stones = [
            [{x: 1, y: 0}, {x: 1, y: 1}, {x: 0, y: 1}, {x: 0, y: 2}],
            [{x: 0, y: 0}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 2, y: 1}]
        ];
        super(x, y, stones);
    }
}