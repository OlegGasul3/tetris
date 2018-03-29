function GameEngine(uiManager, maxX, maxY, delay) {
    const FIGURES = [LineFigure, AxeFigure, CubeFigure, LadderLFigure, PointFigure, TriangleFigure, LadderRFigure, Axe2Figure];
    const INVISIBLE_ROWS = 4;

    maxX += INVISIBLE_ROWS;

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
    var mainLoop;

    this.start = function() {
        initField();
        startMainLoop();
    };

    function startMainLoop() {
        generateNewFigure();
        paintFigure(currentFigure);

        if (mainLoop) {
            clearInterval(mainLoop);
        }

        mainLoop = setInterval(function() {
            removeFigure(currentFigure);
            processFigureFallen();
            moveDown();
            paintFigure(currentFigure);
        }, delay);
    }

    function generateNewFigure(x, y) {
        var index = Utils.generateRandom(FIGURES.length);
        currentFigure = new FIGURES[index](maxX - 2, Math.floor(maxY / 2));

        if (isFigureFallen()) {
            initField();
            uiManager.fillWholeSpace(field);
            startMainLoop();
        }
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

    function isFieldEmpty(x, y) {
        if (x < 0 || x >= maxX || y < 0 || y >= maxY) {
            return false;
        }

        return field[x] === false ? true : field[x][y] === false;
    }

    function markFieldWithCurrentColor(x, y) {
        if (x < 0 || field[x] === false || y < 0) {
            return;
        }

        field[x][y] = currentFigure.getColor();
    }
    
    function fillUpperLinesEmpty(count) {
        for (var i = 0; i < count; i++) {
            var index = field.length;
            field[index] = [];

            for (var j = 0; j < maxY; j++) {
                field[index][j] = false;
            }
        }
    }

    function removeFilledRows(indexes) {
        var min = indexes[0];
        var max = indexes[indexes.length - 1];

        var decr = 0;
        var count = 0;
        var start = -1;

        for (var i = min; i <= max; i++) {
            var index = i - decr;

            var lineFilled = field[index].every(function(item) {
                return item !== false;
            });

            if (lineFilled) {
                if (start < 0) {
                    start = index;
                }
                count++;
            } else if (start >= 0) {
                field.splice(start - decr, count);
                decr += count;
                start = -1;

                fillUpperLinesEmpty(count);

                count = 0;
            }
        }

        if (start >= 0) {
            field.splice(start - decr, count);
            fillUpperLinesEmpty(count);
        }
    }

    function checkAndRemoveFilledLines() {
        var coords = currentFigure.getCoords();
        var stones = currentFigure.getCurrentStones();
        var indexes = stones.map(function(stone) {
            return coords.x + stone.x;
        }).sort();
        removeFilledRows(indexes);

        uiManager.fillWholeSpace(field);
    }

    function isFigureFallen() {
        var coords = currentFigure.getCoords();

        return currentFigure.getCurrentStones().some(function(stone) {
            return !isFieldEmpty(coords.x + stone.x - 1, coords.y + stone.y)
        });
    }

    function processFigureFallen() {
        if (!isFigureFallen()) {
            return;
        }

        var coords = currentFigure.getCoords();
        currentFigure.getCurrentStones().forEach(function(stone) {
            markFieldWithCurrentColor(coords.x + stone.x, coords.y + stone.y);
        });

        checkAndRemoveFilledLines();
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

    function moveDown() {
        if (!canMove(-1, 0)) {
            return;
        }

        var coords = currentFigure.getCoords();
        removeFigure(currentFigure);

        currentFigure.setCoords(coords.x - 1, coords.y);

        paintFigure(currentFigure);
        processFigureFallen();
    }
    
    document.onkeydown = function(e) {
        if (!currentFigure) {
            return;
        }

        switch (e.keyCode) {
            case 38:
                rotateFigure();
                break;

            case 37:
                moveLeft();
                break;

            case 39:
                moveRight();
                break;

            case 40:
                moveDown();
                break;

            case 32:
                while (canMove(-1, 0)) {
                    var coords = currentFigure.getCoords();
                    removeFigure(currentFigure);
                    currentFigure.setCoords(coords.x - 1, coords.y);
                    paintFigure(currentFigure);
                }
                processFigureFallen();
                break;
        }
    };

    return this;
}