class GameEngine {
    constructor(fieldModel, figureFactory) {
        this.fieldModel = fieldModel;
        this.figureFactory = figureFactory;

        this.currentFigure = undefined;
    }

    startMainLoop() {
        this.interval = setInterval(this.mainLoop, 650);
    }

    mainLoop() {
        if (!this.currentFigure) {
            this.currentFigure = this.figureFactory.generateRandomFigure();
            if (!this.fieldModel.placeFigureAtTop(this.currentFigure)) {
                // Game over
                return;
            }
        }

        if (this.fieldModel.canMoveDown(this.currentFigure)) {
            this.fieldModel.moveDown(this.currentFigure);
        } else {
            this.fieldModel.freezeFigure(this.currentFigure);
        }
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