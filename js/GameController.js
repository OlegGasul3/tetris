class GameController {
    constructor(gameEngine) {
        document.addEventListener('keydown', function(event) {
            switch (event.keyCode) {
                case 38:
                    gameEngine.rotate()
                    break;

                case 37:
                    gameEngine.moveLeft();
                    break;

                case 39:
                    gameEngine.moveRight();
                    break;

                case 40:
                    gameEngine.moveDown();
                    break;

                case 32:
                    gameEngine.fallDown();
                    break;
            }
        }, false);
    }
}