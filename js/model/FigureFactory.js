class FigureFactory {
    static get FIGURES() {
        return [Axe2Figure, AxeFigure, CubeFigure, LadderLFigure, LadderRFigure, LineFigure, PointFigure, TriangleFigure];
    }

    constructor() {

    }

    generateRandomFigure() {
        // let figureClass = FigureFactory.FIGURES[Utils.generateRandom(FigureFactory.FIGURES.length)];
        let figureClass = CubeFigure;

        let figure = new figureClass();
        figure.setColor(Utils.generateRandom(Images.SOURCES.length));

        return figure;
    }
}