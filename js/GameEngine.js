function GameEngine(uiManager, maxX, maxY) {
    var FIGURES = [LineFigure, PointFigure, AxeFigure, CubeFigure, TriangleFigure, LadderRFigure, LadderLFigure];

    var field = [];

    function initField() {
        for (var i = 0; i < maxX; i++) {
            field[i] = [];

            for (var j = 0; j < maxY; j++) {
                field[i][j] = false;
            }
        }
    }

    var currentFigure = null;

    this.start = function() {
        initField();
        generateNewFigure();
        paintFigure(currentFigure);

        setInterval(function() {
            removeFigure(currentFigure);
            checkFigureFallen();
            moveDown();
            paintFigure(currentFigure);
        }, 800);
    };
    
    function generateNewFigure(x, y) {
        var index = Utils.generateRandom(FIGURES.length);
        console.log('Index: ' + index);
        currentFigure = new FIGURES[index](maxX - 2, Math.floor(maxY / 2));
    }
    
    function paintFigure(figure) {
        var coords = figure.getCoords();

        var stones = figure.getCurrentStones();
        stones.forEach(function(stone) {
            uiManager.paintStone(coords.x + stone.x, coords.y + stone.y, figure.getColor());
        });
    }

    function removeFigure(figure) {
        var coords = figure.getCoords();

        var stones = figure.getCurrentStones();
        stones.forEach(function(stone) {
            uiManager.clearStone(coords.x + stone.x, coords.y + stone.y);
        });
    }

    function rotateFigure() {
        if (!canRotate()) {
            return;
        }

        removeFigure(currentFigure);
        currentFigure.rotate();
        paintFigure(currentFigure);
    }

    function moveLeft() {
        if (!canMove(0, -1)) {
            return;
        }

        var coords = currentFigure.getCoords();
        var newY = coords.y - 1;

        removeFigure(currentFigure);
        currentFigure.setCoords(coords.x, coords.y - 1);
        paintFigure(currentFigure);
    }

    function moveRight() {
        if (!canMove(0, 1)) {
            return;
        }
        var coords = currentFigure.getCoords();
        var newY = coords.y + 1;

        removeFigure(currentFigure);
        currentFigure.setCoords(coords.x, newY);
        paintFigure(currentFigure);
    }

    function moveDown() {
        if (!canMove(-1, 0)) {
            return;
        }

        var coords = currentFigure.getCoords();
        removeFigure(currentFigure);

        currentFigure.setCoords(coords.x - 1, coords.y);

        paintFigure(currentFigure);
        checkFigureFallen();
    }

    function isFieldEmpty(x, y) {
        if (x < 0 || x >= maxX || y < 0 || y >= maxY) {
            return false;
        }

        if (field[x] === false) {
            return true;
        }

        return !field[x][y];
    }

    function markField(x, y) {
        if (x < 0 || field[x] === false || y < 0) {
            return;
        }

        field[x][y] = currentFigure.getColor();
    }

    function checkFieldsForRemoving() {
        var stones = currentFigure.getCurrentStones();
        var indexes = stones.map(function(stone) {
            return stone.x;
        }).sort();

        var fullLine = field[indexes[0]].every(function(item) {
            return item !== false;
        });

        if (fullLine) {
            console.log('fullLine');
            field.splice(indexes[0], 1);

            var index = field.length;
            field[index] = [];
            for (var j = 0; j < maxY; j++) {
                field[index][j] = false;
            }

            uiManager.fillWholeSpace(field);
        }
    }

    function checkFigureFallen() {
        var coords = currentFigure.getCoords();
        var stones = currentFigure.getCurrentStones();

        if (stones.every(function(stone) {
            return isFieldEmpty(coords.x + stone.x - 1, coords.y + stone.y)
        })) {
            return;
        }

        stones.forEach(function(stone) {
            markField(coords.x + stone.x, coords.y + stone.y);
        });

        console.log('new');
        checkFieldsForRemoving();
        generateNewFigure();
    }

    function canRotate() {
        var coords = currentFigure.getCoords();
        var stones = currentFigure.getRotateStones();
        return stones.every(function(stone) {
            return isFieldEmpty(coords.x + stone.x, coords.y + stone.y)
        });
    }

    function canMove(xDiff, yDiff) {
        var coords = currentFigure.getCoords();
        var stones = currentFigure.getCurrentStones();
        return stones.every(function(stone) {
            return isFieldEmpty(coords.x + stone.x + xDiff, coords.y + stone.y + yDiff)
        });
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