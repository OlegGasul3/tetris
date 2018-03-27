function UIManager(viewport, maxX, maxY) {
    var step = 16;

    var ctx = viewport.getContext("2d");
    ctx.canvas.width = maxY * step;
    ctx.canvas.height = maxX * step;

    ctx.beginPath();
    ctx.rect(0, 0, (maxY + 1) * step, (maxX + 1) * step);
    ctx.fillStyle = "red";
    ctx.fill();

    var background = new Image();
    background.src = "./images/background.png";

    var images = [];
    for (var i = 0; i <= 6; i++) {
        var image = new Image();
        image.src = "./images/" + i + ".png";

        images.push(image);
    }

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
            fillWholeField()
            callback()
        }, 1000);
    };

    this.clearStone = function(x, y) {
        drawImage(background, x, y);
    };

    this.paintStone = function(x, y, color) {
        drawImage(images[color], x, y);
    };

    return this;
}