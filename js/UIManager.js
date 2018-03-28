function UIManager(viewport, maxX, maxY) {
    const STEP = 16;

    var ctx = viewport.getContext("2d");
    ctx.canvas.width = maxY * STEP;
    ctx.canvas.height = maxX * STEP;

    ctx.beginPath();
    ctx.rect(0, 0, (maxY + 1) * STEP, (maxX + 1) * STEP);
    ctx.fillStyle = "gray";
    ctx.fill();

    var background = new Image();
    background.src = Images.background();

    var images = Images.sources().map(function(source) {
        var image = new Image();
        image.src = source;
        return image;
    });

    function fillWholeField() {
        for (var x = 0; x < maxX; x++) {
            for (var y = 0; y < maxY; y++) {
                drawImage(background, x, y);
            }
        }
    }

    function drawImage(image, x, y) {
        var realX = y * STEP;
        var realY = (maxX - x - 1) * STEP;
        ctx.drawImage(image, realX, realY);
    }

    this.init = function() {
        fillWholeField();
    };

    this.clearStone = function(x, y) {
        drawImage(background, x, y);
    };

    this.paintStone = function(x, y, color) {
        drawImage(images[color], x, y);
    };

    this.fillWholeSpace = function(field) {
        for (var i = 0; i < field.length; i++) {
            var row = field[i];
            for (var j = 0; j < row.length; j++) {
                var color = field[i][j];
                drawImage(color !== false ? images[color] : background, i, j);
            }
        }
    };

    return this;
}