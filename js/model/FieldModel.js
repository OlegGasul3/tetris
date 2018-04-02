class FieldModel {
    constructor(maxX, maxY) {
        this.maxX = maxX;
        this.maxY = maxY;

        this.field = [];
    }

    initField() {
        for (var i = 0; i < this.maxX; i++) {
            this.field[i] = [];
            for (var j = 0; j < this.maxY; j++) {
                this.field[i][j] = undefined;
            }
        }

        Events.fireEvent('clear.field');
    }

    getTopCoords() {
        return {
            x: this.maxX - 3,
            y: Math.floor(this.maxY / 2)
        }
    }

    areStonesEmpty(stones) {
        var self = this;
        return stones.every((stone) => {
            return stone.x >= 0 && stone.x <= self.maxX && stone.y >= 0 && stone.y <= self.maxY && self.field[stone.x][stone.y] === undefined;
        });
    }

    removeStones(stones) {
        var self = this;
        stones.forEach((stone) => {
            self.field[stone.x][stone.y] = undefined;
        });
        Events.fireEvent('clear.stones', [stones]);
    }

    freezeStones(stones, colorIndex) {
        var self = this;
        stones.forEach((stone) => {
            self.field[stone.x][stone.y] = colorIndex;
        });
        Events.fireEvent('fill.stones', [stones, colorIndex]);
    }

    processRemoveLines(from, to) {
        function fillUpperLinesEmpty(count) {
            for (var i = 0; i < count; i++) {
                var index = this.field.length;
                this.field[index] = [];

                for (var j = 0; j < maxY; j++) {
                    this.field[index][j] = undefined;
                }
            }
        }

        var decr = 0;
        var count = 0;
        var start = -1;

        for (var i = from; i <= to; i++) {
            var index = i - decr;

            var lineFilled = this.field[index].every(function(item) {
                return item !== undefined;
            });

            if (lineFilled) {
                if (start < 0) {
                    start = index;
                }
                count++;
            } else if (start >= 0) {
                this.field.splice(start - decr, count);
                fillUpperLinesEmpty(count);

                decr += count;
                count = 0;
                start = -1;
            }
        }

        if (start >= 0) {
            this.field.splice(start - decr, count);
            fillUpperLinesEmpty(count);
        }
    }
}