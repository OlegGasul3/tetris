class FieldModel {
    constructor(maxX, maxY) {
        this.maxX = maxX;
        this.maxY = maxY;

        this.cells = [];
    }

    initField() {
        for (var i = 0; i < this.maxX; i++) {
            this.cells[i] = [];
            for (var j = 0; j < this.maxY; j++) {
                this.cells[i][j] = false;
            }
        }

        Events.fireEvent(Events.CLEAR_FIELD);
    }

    getStartCoords() {
        return {
            x: this.maxX - Consts.INVISIBLE_ROWS,
            y: Math.floor(this.maxY / 2)
        }
    }

    areCellsEmpty(stones) {
        var self = this;
        return stones.every((stone) => {
            return self.cells[stone.x] && self.cells[stone.x][stone.y] === false;
        });
    }

    freezeCells(stones, colorIndex) {
        var self = this;
        stones.forEach((stone) => {
            self.cells[stone.x][stone.y] = colorIndex;
        });

        if (this.processRemoveLines(stones) > 0) {
            Events.fireEvent(Events.REPAINT, [this.cells]);
        }
    }

    processRemoveLines(stones) {
        var fromIndex = stones.reduce((min, stone) => Math.min(min, stone.x), stones[0].x);
        var toIndex = stones.reduce((max, stone) => Math.max(max, stone.x), stones[0].x);

        var self = this;

        function fillUpperLinesEmpty(count) {
            for (var i = 0; i < count; i++) {
                var index = self.cells.length;
                self.cells[index] = [];

                for (var j = 0; j < self.maxY; j++) {
                    self.cells[index][j] = false;
                }
            }
        }

        var decr = 0;
        var count = 0;
        var start = -1;
        var result = 0;

        for (var i = fromIndex; i <= toIndex; i++) {
            var index = i - decr;

            var lineFilled = this.cells[index].every(function(item) {
                return item !== false;
            });

            if (lineFilled) {
                if (start < 0) {
                    start = index;
                }
                count++;
            } else if (start >= 0) {
                this.cells.splice(start - decr, count);
                fillUpperLinesEmpty(count);

                decr += count;
                result += count;
                count = 0;
                start = -1;
            }
        }

        if (start >= 0) {
            this.cells.splice(start - decr, count);

            result += count;
            fillUpperLinesEmpty(count);
        }

        return result;
    }
}