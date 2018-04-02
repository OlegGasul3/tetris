class FigureFactory {
    static get FIGURES() {
        return [Axe2Figure, AxeFigure, CubeFigure, LadderLFigure, LadderRFigure, LineFigure, PointFigure, TriangleFigure];
    }

    constructor() {

    }

    generateRandomFigure() {
        var figureClass = FigureFactory.FIGURES[Utils.generateRandom(FigureFactory.FIGURES.length)];

        var figure = new figureClass();
        figure.setColor(Utils.generateRandom(Images.SOURCES));

        return figure;
    }
}