import {Cells, CellState, GamePageState} from "@/pages/game-page/interfaces";
import { BOARD_SIZE } from "@/pages/game-page/constants";

const getIndexNeighbours = (index: number): number[] => {
    const neighbours: number[] = [];
    const isLeftEdge = index % BOARD_SIZE === 0;
    const isRightEdge = index % BOARD_SIZE === BOARD_SIZE - 1;

    if (index > BOARD_SIZE && !isLeftEdge) neighbours.push(index - BOARD_SIZE - 1);
    if (index > BOARD_SIZE) neighbours.push(index - BOARD_SIZE);
    if (index > BOARD_SIZE && !isRightEdge) neighbours.push(index - BOARD_SIZE + 1);
    if (!isLeftEdge) neighbours.push(index - 1);
    if (!isRightEdge) neighbours.push(index + 1);
    if (index < BOARD_SIZE * BOARD_SIZE - BOARD_SIZE && !isLeftEdge) neighbours.push(index + BOARD_SIZE - 1);
    if (index < BOARD_SIZE * BOARD_SIZE - BOARD_SIZE) neighbours.push(index + BOARD_SIZE);
    if (index < BOARD_SIZE * BOARD_SIZE - BOARD_SIZE && !isRightEdge) neighbours.push(index + BOARD_SIZE + 1);

    return neighbours;
}

export const generateRandomGamePageState = (): GamePageState => {
    const cells: Record<number, CellState> = {};
    for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
        cells[i] = {
            alive: Math.random() > 0.5,
            neighboursIndices: getIndexNeighbours(i)
        };
    }
    return { cells };
}

export const getNextGamePageState = (gamePageState: GamePageState): GamePageState => {
    const newGamePageState: GamePageState = { cells: {} };
    Object.keys(gamePageState.cells).forEach((key) => {
        const isAlive = gamePageState.cells[key].alive;
        const liveNeighbours = gamePageState.cells[key].neighboursIndices.reduce((acc, neighbourIndex) => {
            return gamePageState.cells[neighbourIndex].alive ? acc + 1 : acc;
        }, 0);
        newGamePageState.cells[key] = {
            alive: isAlive,
            neighboursIndices: gamePageState.cells[key].neighboursIndices
        }
        if (isAlive && (liveNeighbours < 2 || liveNeighbours > 3)) {
            newGamePageState.cells[key].alive = false;
        }
        if (!isAlive && liveNeighbours === 3) {
            newGamePageState.cells[key].alive = true;
        }
    })
    return newGamePageState;
}

export const getCellsArrayFromCellsObject = (cells: Cells): boolean[][] =>
    Object.keys(cells).reduce((acc: boolean[][], key: string) => {
        const index = Number(key);
        const row = Math.floor(index / BOARD_SIZE);
        const col = index % BOARD_SIZE;
        acc[row] = acc[row] || [];
        acc[row][col] = cells[index].alive;
        return acc;
    }, []);