function GameEngine(uiManager, maxX, maxY) {
    var FIGURES = [LineFigure, PointFigure, AxeFigure, CubeFigure];

    var field = [];

    function initField() {
        for (var i = 0; i < maxX; i++) {
            field[i] = [];

            for (var j = 0; j < maxX; j++) {
                field[i][j] = undefined;
            }
        }
    }

    var currentFigure = null;

    this.start = function() {
        currentFigure = new AxeFigure(maxX, Math.floor(maxY / 2));
        paintFigure(currentFigure);

        setInterval(function() {
            removeFigure(currentFigure);
            moveDown();
            paintFigure(currentFigure);
        }, 1000);
    };
    
    function generateNewFigure(x, y) {
        var index = Math.floor(Math.random() * Utils.generateRandom(FIGURES.length - 1));
        new FIGURES[index](x, y);
    }
    
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

    function rotateFigure() {
        removeFigure(currentFigure);
        currentFigure.rotate();
        paintFigure(currentFigure);
    }

    function moveLeft() {
        var coords = currentFigure.getCoords();
        var newY = coords.y - 1;
        if (newY < 0 || newY >= maxY) {
            return;
        }

        removeFigure(currentFigure);
        currentFigure.setCoords(coords.x, coords.y - 1);
        paintFigure(currentFigure);
    }

    function moveRight() {
        var coords = currentFigure.getCoords();
        var newY = coords.y + 1;
        var borderY = Math.max.apply(Math, currentFigure.getCurrentStones().map(function(stone) {
            return stone.y;
        }));
        if (newY < 0 || (newY + borderY) >= maxY) {
            return;
        }

        removeFigure(currentFigure);
        currentFigure.setCoords(coords.x, newY);
        paintFigure(currentFigure);
    }

    function moveDown() {
        var coords = currentFigure.getCoords();
        removeFigure(currentFigure);
        currentFigure.setCoords(coords.x - 1, coords.y);
        paintFigure(currentFigure);
    }

    document.onkeydown = function(e) {
        if (!currentFigure) {
            return;
        }
        if (e.keyCode == '38') {
            rotateFigure(currentFigure);
        } else if (e.keyCode == '37') {
            moveLeft(currentFigure);
        } else if (e.keyCode == '39') {
            moveRight();
        } else if (e.keyCode == '40') {
            moveDown();
        }
    };

    return this;
}