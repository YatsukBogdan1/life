import { Cells, GameState } from "@/game/interfaces";
import { BOARD_SIZE } from "@/game/constants";

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