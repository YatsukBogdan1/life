
export type Cells = boolean[];

export type CellsMatrix = boolean[][];

export interface GameState {
    cells: Cells;
    boardSize: number;
}