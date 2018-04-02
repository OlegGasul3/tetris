class BaseFigure {
    constructor(stones, color) {
        this.coords = {x: 0, y: 0};

        this.stones = stones;
        this.color = color;

        this.rotationIndex = 0;
    }

    getCoords() {
        return this.coords;
    }

    setCoords(coords) {
        this.coords = coords;
    }

    getColor() {
        return this.color;
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

    shiftLeft() {
        this.coords.y--;
    }

    shiftRight() {
        this.coords.y++;
    }

    moveDown() {
        this.coords.x--;
    }
}

class Axe2Figure extends BaseFigure {
    constructor() {
        super([
            [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}, {x: 1, y: 2}],
            [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}, {x: 0, y: 1}],
            [{x: 0, y: 0}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}],
            [{x: 2, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}]
        ]);
    }
}

class AxeFigure extends BaseFigure {
    constructor() {
        super([
            [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}, {x: 2, y: 1}],
            [{x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 0, y: 2}],
            [{x: 0, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}],
            [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}, {x: 1, y: 0}]
        ]);
    }
}

class CubeFigure extends BaseFigure {
    constructor() {
        super([
            [{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}]
        ]);
    }
}

class LadderLFigure extends BaseFigure {
    constructor() {
        super([
            [{x: 1, y: 0}, {x: 1, y: 1}, {x: 0, y: 1}, {x: 0, y: 2}],
            [{x: 0, y: 0}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 2, y: 1}]
        ]);
    }
}

class LadderRFigure extends BaseFigure {
    constructor() {
        super([
            [{x: 0, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 1, y: 2}],
            [{x: 1, y: 0}, {x: 2, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}]
        ]);
    }
}

class LineFigure extends BaseFigure {
    constructor() {
        super([
            [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}, {x: 0, y: 3}],
            [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 0}]
        ]);
    }
}

class PointFigure extends BaseFigure {
    constructor() {
        super([
            [{x: 0, y: 0}]
        ]);
    }
}

class TriangleFigure extends BaseFigure {
    constructor() {
        super([
            [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}, {x: 1, y: 1}],
            [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}, {x: 1, y: 1}],
            [{x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 0, y: 1}],
            [{x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}]
        ]);
    }
}