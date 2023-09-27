import { getCellsMatrixFromCellsObject, getAliveNeighboursByIndex, getNextGameState } from "@/game/utils";

describe('getCellsMatrixFromCellsObject', () => {
    test('should return an array of arrays', () => {
        const cells = [true, false, true, false, true, false, true, false, true];
        const cellsArray = [[true, false, true], [false, true, false], [true, false, true]];
        expect(getCellsMatrixFromCellsObject(cells, 3)).toEqual(cellsArray);
    })
});

describe('getAliveNeighboursByIndex', () => {
    test('should return 0 when no neighbours are alive', () => {
        const cells = [
            false, false, false,
            false, false, false,
            false, false, false,
        ];
        const index = 4;
        const boardSize = 3;
        expect(getAliveNeighboursByIndex(index, cells, boardSize)).toBe(0);
    });
    test('should return 1 when 1 neighbour is alive', () => {
        const cells = [
            false, true, false,
            false, false, false,
            false, false, false,
        ];
        const index = 4;
        const boardSize = 3;
        expect(getAliveNeighboursByIndex(index, cells, boardSize)).toBe(1);
    });
    test('should return 5 when 5 neighbours are alive', () => {
        const cells = [
            false, true, true,
            true, false, true,
            false, true, false,
        ];
        const index = 4;
        const boardSize = 3;
        expect(getAliveNeighboursByIndex(index, cells, boardSize)).toBe(5);
    })
});

describe('getNextGameState', () => {
    test("blinker", () => {
        const boardSize = 5;
        const cells = [
            false, false, false, false, false,
            false, false, true, false, false,
            false, false, true, false, false,
            false, false, true, false, false,
            false, false, false, false, false,
        ];
        const newCells = [
            false, false, false, false, false,
            false, false, false, false, false,
            false, true, true, true, false,
            false, false, false, false, false,
            false, false, false, false, false,
        ];
        const gameState = { cells, boardSize };
        const newGameState = { cells: newCells, boardSize };
        expect(getNextGameState(gameState)).toEqual(newGameState);
    });
    test("block", () => {
        const boardSize = 4;
        const cells = [
            false, false, false, false,
            false, true, true, false,
            false, true, true, false,
            false, false, false, false,
        ];
        const newCells = [
            false, false, false, false,
            false, true, true, false,
            false, true, true, false,
            false, false, false, false,
        ];
        const gameState = { cells, boardSize };
        const newGameState = { cells: newCells, boardSize };
        expect(getNextGameState(gameState)).toEqual(newGameState);
    });
    test("glider", () => {
        const boardSize = 5;
        const cells = [
            false, false, false, false, false,
            false, false, true, false, false,
            true, false, true, false, false,
            false, true, true, false, false,
            false, false, false, false, false,
        ];
        const newCells = [
            false, false, false, false, false,
            false, true, false, false, false,
            false, false, true, true, false,
            false, true, true, false, false,
            false, false, false, false, false,
        ];
        const gameState = { cells, boardSize };
        const newGameState = { cells: newCells, boardSize };
        expect(getNextGameState(gameState)).toEqual(newGameState);
    });
})