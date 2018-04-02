class GameEngine {
    constructor(fieldModel, figureFactory) {
        this.fieldModel = fieldModel;
        this.figureFactory = figureFactory;

        this.currentFigure = undefined;
    }

    startMainLoop() {
        this.fieldModel.initField();

        var self = this;
        this.interval = setInterval(function() {
            if (!self.currentFigure) {
                self.currentFigure = self.figureFactory.generateRandomFigure();

                var coords = self.fieldModel.getTopCoords();
                self.currentFigure.setCoords(coords);

                var stones = self.currentFigure.getStones();
                if (!self.fieldModel.areStonesEmpty(stones)) {
                    // Game over
                    clearInterval(self.interval);
                    return;
                }
            }

            var stones = self.currentFigure.getShiftStones(-1, 0);
            if (self.fieldModel.areStonesEmpty(stones)) {
                self.fieldModel.removeStones(self.currentFigure.getStones());

                var coords = self.currentFigure.getCoords();
                coords.x -= 1;
                self.currentFigure.setCoords(coords);

                self.fieldModel.fillStones(self.currentFigure.getStones(), self.currentFigure.getColor());
            } else {
                self.fieldModel.processRemoveLines();
            }
        }, Consts.FALLING_DELAY);
    }

    rotate() {

    }

    moveLeft() {
        if (!this.currentFigure) {
            return;
        }

        var coords = this.currentFigure.getCoords();
        coords.x -= 1;

        if (!this.fieldModel.canPlaceFigure(this.currentFigure, coords)) {
            return;
        }

        this.currentFigure.setCoords()
    }

    moveRight() {

    }

    moveDown() {
        var coords = this.currentFigure.getCoords();
    }
}