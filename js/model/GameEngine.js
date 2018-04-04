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
                self._fireClearCells();
                self.currentFigure.moveDown();
                self._fireFillCells();
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

        var stones = this.currentFigure.getNextRotationStones();
        if (!this.fieldModel.areCellsEmpty(stones)) {
            return;
        }

        this._fireClearCells();
        this.currentFigure.rotate();
        this._fireFillCells();
    }

    moveLeft() {
        if (!this.currentFigure) {
            return;
        }

        var stones = this.currentFigure.getShiftStones(0, -1);
        if (!this.fieldModel.areCellsEmpty(stones)) {
            return;
        }

        this._fireClearCells();
        this.currentFigure.shiftLeft();
        this._fireFillCells();
    }

    moveRight() {
        if (!this.currentFigure) {
            return;
        }

        var stones = this.currentFigure.getShiftStones(0, 1);
        if (!this.fieldModel.areCellsEmpty(stones)) {
            return;
        }

        this._fireClearCells();
        this.currentFigure.shiftRight();
        this._fireFillCells();
    }

    moveDown() {
        if (!this.currentFigure) {
            return;
        }

        let stones = this.currentFigure.getShiftStones(-1, 0);
        if (!this.fieldModel.areCellsEmpty(stones)) {
            return;
        }

        this._fireClearCells();
        this.currentFigure.moveDown();
        this._fireFillCells();
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
                this._fireClearCells();
                this.currentFigure.moveDown();
            } else {
                this._fireFillCells();
                this.fieldModel.freezeCells(this.currentFigure.getStones(), this.currentFigure.getColor());

                this.currentFigure = null;
            }
        }
    }

    _fireFillCells() {
        Events.fireEvent(Events.FILL_CELLS, [this.currentFigure.getStones(), this.currentFigure.getColor()]);
    }

    _fireClearCells() {
        Events.fireEvent(Events.CLEAR_CELLS, [this.currentFigure.getStones()]);
    }
}