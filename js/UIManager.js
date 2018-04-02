function UIManager(viewport, maxX, maxY) {
    const IMAGE_SIZE = 16;
    const IMAGES = Images.getImageByColorIndex().map(function(source) {
        var image = new Image();
        image.src = source;
        return image;
    });
    const BACKGROUND = new Image();
    BACKGROUND.src = Images.getBackground();

    var ctx = viewport.getContext("2d");
    ctx.canvas.width = maxY * IMAGE_SIZE;
    ctx.canvas.height = maxX * IMAGE_SIZE;

    function drawImage(image, x, y) {
        var realX = y * IMAGE_SIZE;
        var realY = (maxX - x - 1) * IMAGE_SIZE;
        ctx.drawImage(image, realX, realY);
    }

    this.clearStone = function(x, y) {
        drawImage(BACKGROUND, x, y);
    };

    this.paintStone = function(x, y, color) {
        drawImage(IMAGES[color], x, y);
    };

    this.fillWholeSpace = function(field) {
        for (var i = 0; i < field.length; i++) {
            var row = field[i];
            for (var j = 0; j < row.length; j++) {
                var color = row[j];
                drawImage(color !== false ? IMAGES[color] : BACKGROUND, i, j);
            }
        }
    };

    return this;
}