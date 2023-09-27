export interface CellState {
    alive: boolean;
    neighboursIndices: number[];
}

export type Cells = Record<string, CellState>;

export interface GamePageState {
    cells: Cells;
}