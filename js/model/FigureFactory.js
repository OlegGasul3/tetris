class FigureFactory {
    static get FIGURES() {
        return [
            Axe2Figure,
            AxeFigure,
            CubeFigure,
            LadderLFigure,
            LadderRFigure,
            LineFigure,
            PointFigure,
            TriangleFigure
        ];
    }

    generateRandomFigure() {
        let figureClass = FigureFactory.FIGURES[Utils.generateRandom(FigureFactory.FIGURES.length)];
        let colorIndex = Utils.generateRandom(Images.SOURCES.length);

        return new figureClass(colorIndex);
    }
}