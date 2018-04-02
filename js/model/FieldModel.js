class FieldModel {
    constructor(maxX, maxY) {
        this.maxX = maxX + Consts.INVISIBLE_ROWS;
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

        Events.fireEvent('clear.cells');
    }

    getTopCoords() {
        return {
            x: this.maxX - Consts.INVISIBLE_ROWS,
            y: Math.floor(this.maxY / 2)
        }
    }

    areCellsEmpty(stones) {
        var self = this;
        return stones.every((stone) => {
            return stone.x >= 0 && stone.x < self.maxX && stone.y >= 0 && stone.y < self.maxY && self.cells[stone.x][stone.y] === false;
        });
    }

    freezeCells(stones, colorIndex) {
        var self = this;
        stones.forEach((stone) => {
            self.cells[stone.x][stone.y] = colorIndex;
        });

        if (this.processRemoveLines(stones) > 0) {
            Events.fireEvent('fill.cells', [this.cells]);
        }
    }

    processRemoveLines(stones) {
        var from = stones.reduce((min, stone) => Math.min(min, stone.x), stones[0].x);
        var to = stones.reduce((max, stone) => Math.max(max, stone.x), stones[0].x);

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

        for (var i = from; i <= to; i++) {
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
                console.log('before');
                console.dir(this.cells);

                this.cells.splice(start - decr, count);

                fillUpperLinesEmpty(count);

                console.log('after');
                console.dir(this.cells);

                console.log('==========================');

                decr += count;
                result += count;
                count = 0;
                start = -1;
            }
        }

        if (start >= 0) {
            console.log('before');
            console.dir(this.cells);

            this.cells.splice(start - decr, count);

            result += count;
            fillUpperLinesEmpty(count);

            console.log('after');
            console.dir(this.cells);

            console.log('==========================');
        }

        return result;
    }
}