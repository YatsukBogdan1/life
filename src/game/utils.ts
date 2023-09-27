import { Cells, GameState } from "@/game/interfaces";
import {BOARD_SIZE, CANVAS_SIZE, CELL_PADDING, CELL_SIZE} from "@/game/constants";

export const generateRandomGameState = (boardSize: number): GameState => {
    const cells: boolean[] = [];
    for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
        cells[i] = Math.random() > 0.5;
    }
    return { cells, boardSize };
}

export const getCellsArrayFromCellsObject = (cells: Cells): boolean[][] =>
    Object.keys(cells).reduce((acc: boolean[][], key: string) => {
        const index = Number(key);
        const row = Math.floor(index / BOARD_SIZE);
        const col = index % BOARD_SIZE;
        acc[row] = acc[row] || [];
        acc[row][col] = cells[index];
        return acc;
    }, []);

export const drawCellsOnCanvas = (cells: Cells, ctx: CanvasRenderingContext2D) => {
    const cellsArray = getCellsArrayFromCellsObject(cells);
    const cellSizeWithPadding = CELL_SIZE + CELL_PADDING;
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    cellsArray.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
            if (cell) {
                ctx.fillRect(
                    cellIndex * cellSizeWithPadding,
                    rowIndex * cellSizeWithPadding,
                    CELL_SIZE,
                    CELL_SIZE
                );
            }
        });
    });
}