class GameView {
    constructor(viewport, maxX, maxY) {
        this.maxX = maxX - Consts.INVISIBLE_ROWS;
        this.maxY = maxY;

        this.context = viewport.getContext("2d");
        this.context.canvas.width = this.maxY * Images.SIZE;
        this.context.canvas.height = this.maxX * Images.SIZE;

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
                self.drawImage(stone, self.images[colorIndex]);
            });
        });

        Events.addListener('clear.cells', function() {
            self.clearField();
        });

        Events.addListener('fill.cells', function(field) {
            for (let i = 0; i < field.length; i++) {
                let row = field[i];
                for (let j = 0; j < row.length; j++) {
                    self.drawImage({x: i, y: j}, row[j] ? self.images[row[j]] : self.backgroundImage);
                }
            }
        });
    }

    drawImage(stone, image) {
        let realX = stone.y * Images.SIZE;
        let realY = (this.maxX - stone.x - 1) * Images.SIZE;
        this.context.drawImage(image, realX, realY);
    }

    clearStone(stone) {
        this.drawImage(stone, this.backgroundImage);
    }

    clearField() {
        for (let i = 0; i <= this.maxX; i++) {
            for (let j = 0; j <= this.maxY; j++) {
                this.drawImage({x: i, y: j}, this.backgroundImage);
            }
        }
    }
}