class GameEngine {
    constructor(fieldModel, figureFactory) {
        this.fieldModel = fieldModel;
        this.figureFactory = figureFactory;

        this.currentFigure = null;
    }

    startMainLoop() {
        this.fieldModel.initField();

        var self = this;
        this.interval = setInterval(function() {
            if (!self.currentFigure) {
                self.currentFigure = self.figureFactory.generateRandomFigure();

                var coords = self.fieldModel.getStartCoords();
                self.currentFigure.setCoords(coords);

                var stones = self.currentFigure.getStones();
                if (!self.fieldModel.areCellsEmpty(stones)) {
                    // Game over
                    clearInterval(self.interval);
                    return;
                }
            }

            var stones = self.currentFigure.getShiftStones(-1, 0);
            if (self.fieldModel.areCellsEmpty(stones)) {
                Events.fireEvent('clear.stones', [self.currentFigure.getStones()]);
                self.currentFigure.moveDown();
                Events.fireEvent('fill.stones', [self.currentFigure.getStones(), self.currentFigure.getColor()]);
            } else {
                self.fieldModel.freezeCells(self.currentFigure.getStones(), self.currentFigure.getColor());

                self.currentFigure = null;
            }
        }, Consts.FALLING_DELAY);
    }

    rotate() {
        if (!this.currentFigure) {
            return;
        }

        var stones = this.currentFigure.getRotateStones();
        if (!this.fieldModel.areCellsEmpty(stones)) {
            return;
        }

        Events.fireEvent('clear.stones', [this.currentFigure.getStones()]);
        this.currentFigure.rotate();
        Events.fireEvent('fill.stones', [this.currentFigure.getStones(), this.currentFigure.getColor()]);
    }

    moveLeft() {
        if (!this.currentFigure) {
            return;
        }

        var stones = this.currentFigure.getShiftStones(0, -1);
        if (!this.fieldModel.areCellsEmpty(stones)) {
            return;
        }

        Events.fireEvent('clear.stones', [this.currentFigure.getStones()]);
        this.currentFigure.shiftLeft();
        Events.fireEvent('fill.stones', [this.currentFigure.getStones(), this.currentFigure.getColor()]);
    }

    moveRight() {
        if (!this.currentFigure) {
            return;
        }

        var stones = this.currentFigure.getShiftStones(0, 1);
        if (!this.fieldModel.areCellsEmpty(stones)) {
            return;
        }

        Events.fireEvent('clear.stones', [this.currentFigure.getStones()]);
        this.currentFigure.shiftRight();
        Events.fireEvent('fill.stones', [this.currentFigure.getStones(), this.currentFigure.getColor()]);
    }

    moveDown() {
        if (!this.currentFigure) {
            return;
        }

        let stones = this.currentFigure.getShiftStones(-1, 0);
        if (!this.fieldModel.areCellsEmpty(stones)) {
            return;
        }

        Events.fireEvent('clear.stones', [this.currentFigure.getStones()]);
        this.currentFigure.moveDown();
        Events.fireEvent('fill.stones', [this.currentFigure.getStones(), this.currentFigure.getColor()]);
    }

    fallDown() {
        if (!this.currentFigure) {
            return;
        }

        let canMove = true;
        while (canMove) {
            let stones = this.currentFigure.getShiftStones(-1, 0);
            canMove = this.fieldModel.areCellsEmpty(stones);
            if (canMove) {
                Events.fireEvent('clear.stones', [this.currentFigure.getStones()]);
                this.currentFigure.moveDown();
            } else {
                Events.fireEvent('fill.stones', [this.currentFigure.getStones(), this.currentFigure.getColor()]);
                this.fieldModel.freezeCells(this.currentFigure.getStones(), this.currentFigure.getColor());

                this.currentFigure = null;
            }
        }
    }
}