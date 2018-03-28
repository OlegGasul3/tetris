function UIManager(viewport, maxX, maxY) {
    var step = 16;

    var ctx = viewport.getContext("2d");
    ctx.canvas.width = maxY * step;
    ctx.canvas.height = maxX * step;

    ctx.beginPath();
    ctx.rect(0, 0, (maxY + 1) * step, (maxX + 1) * step);
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
        var realX = y * step;
        var realY = (maxX - x - 1) * step;
        ctx.drawImage(image, realX, realY);
    }

    this.init = function(callback) {
        setTimeout(function() {
            fillWholeField();
            callback()
        }, 2000);
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