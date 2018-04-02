class GameView {
    constructor(viewport, maxX, maxY) {
        this.context = viewport.getContext("2d");
        this.context.canvas.width = maxY * Images.SIZE;
        this.context.canvas.height = maxX * Images.SIZE;

        this.maxX = maxX;
        this.maxY = maxY;

        this.initImages();
        this.initEventHandlers();
    }

    initImages() {
        this.images = Images.SOURCES.map(function(source) {
            let image = new Image();
            image.src = source;
            return image;
        });

        this.backgroundImage = new Image();
        this.backgroundImage.src = Images.BACKGROUND;
    }

    initEventHandlers() {
        var self = this;

        Events.addListener('clear.stones', function(stones) {
            stones.forEach((stone) => {
                self.clearStone(stone);
            });
        });

        Events.addListener('fill.stones', function(stones, colorIndex) {
            stones.forEach((stone) => {
                drawStone(stone, this.images[colorIndex]);
            });
        });

        Events.addListener('clear.field', function() {
            self.clearField();
        });
    }

    drawImage(stone, image) {
        let realX = stone.y * Images.SIZE;
        let realY = (this.maxX - stone.x - 1) * Images.SIZE;
        this.context.drawImage(image, realX, realY);
    }

    clearStone(stone) {
        drawImage(stone, this.backgroundImage);
    }

    clearField() {
        for (let x = 0; x <= this.maxX; x++) {
            for (let y = 0; y <= this.maxY; y++) {
                this.drawImage({x: x, y: y}, this.backgroundImage);
            }
        }
    }
}