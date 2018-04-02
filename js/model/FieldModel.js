class FieldModel {
    constructor(maxX, maxY) {
        this.maxX = maxX;
        this.maxY = maxY;

        this.field = [];
        this.initField();
    }

    initField() {
        for (var i = 0; i < this.maxX; i++) {
            field[i] = [];
            for (var j = 0; j < this.maxY; j++) {
                field[i][j] = undefined;
            }
        }
    }

    placeFigureAtTop(figure) {
        return false;
    }

    canPlaceFigure(figure, coords) {

    }

    placeFigure(figure) {
        // Remove old Figure's stones
        // Fill new Figure's stones
    }

    canMoveDown(figure) {
        // Check if can move Figure down
        return false;
    }

    moveDown(figure) {
        // Move figure down
        // Remove old Figure's stones
        // Fill new Figure's stones
    }

    freezeFigure(figure) {
        // Fill all stones with current color (if needed)
        processRemoveLines();
    }

    processRemoveLines() {

    }
}