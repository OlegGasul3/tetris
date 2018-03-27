function GameEngine(uiManager) {
    var FIGURES = [LineFigure, PointFigure, AxeFigure, CubeFigure];

    this.start = function() {
        var figure = new AxeFigure(5, 5);
        paintFigure(figure);

        setInterval(function() {
            removeFigure(figure);
            figure.rotate();
            paintFigure(figure);
        }, 900);
    };

    function paintFigure(figure) {
        var coords = figure.getCoords();

        var stones = figure.getCurrentStones();
        for (var i = 0; i < stones.length; i++) {
            var stone = stones[i];
            uiManager.paintStone(coords.x + stone.x, coords.y + stone.y, figure.getColor());
        }
    }

    function removeFigure(figure) {
        var coords = figure.getCoords();

        var stones = figure.getCurrentStones();
        for (var i = 0; i < stones.length; i++) {
            var stone = stones[i];
            uiManager.clearStone(coords.x + stone.x, coords.y + stone.y);
        }
    }

    return this;
}