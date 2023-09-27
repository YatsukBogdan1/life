import { Cells, CellsMatrix, GameState } from "@/game/interfaces";
import { CANVAS_SIZE, CELL_PADDING, CELL_SIZE } from "@/game/constants";

export const generateRandomGameState = (boardSize: number): GameState => {
    const cells: boolean[] = [];
    for (let i = 0; i < boardSize * boardSize; i++) {
        cells[i] = Math.random() > 0.5;
    }
    return { cells, boardSize };
}

export const getCellsMatrixFromCellsObject = (cells: Cells, boardSize: number): CellsMatrix =>
    Object.keys(cells).reduce((acc: CellsMatrix, key: string) => {
        const index = Number(key);
        const row = Math.floor(index / boardSize);
        const col = index % boardSize;
        acc[row] = acc[row] || [];
        acc[row][col] = cells[index];
        return acc;
    }, []);

export const drawCellsOnCanvas = (cells: Cells, ctx: CanvasRenderingContext2D, boardSize: number) => {
    const cellsMatrix = getCellsMatrixFromCellsObject(cells, boardSize);
    const cellSizeWithPadding = CELL_SIZE + CELL_PADDING;
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    cellsMatrix.forEach((row, rowIndex) => {
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

// This function is used in the web worker
// I had to move this function to a separate file because Jest doesn't support web workers,
// so I can't test this function in the same file as the web worker
export const getAliveNeighboursByIndex = (index: number, cells: boolean[], boardSize: number) => {
    let aliveNeighbours = 0;
    const isLeftEdge = index % boardSize === 0;
    const isRightEdge = index % boardSize === boardSize - 1;

    if (index > boardSize && !isLeftEdge && cells[index - boardSize - 1]) {
        aliveNeighbours++;
    }
    if (index > boardSize && cells[index - boardSize]) {
        aliveNeighbours++;
    }
    if (index > boardSize && !isRightEdge && cells[index - boardSize + 1]) {
        aliveNeighbours++;
    }
    if (!isLeftEdge && cells[index - 1]) {
        aliveNeighbours++;
    }
    if (!isRightEdge && cells[index + 1]) {
        aliveNeighbours++;
    }
    if (index < boardSize * boardSize - boardSize && !isLeftEdge && cells[index + boardSize - 1]) {
        aliveNeighbours++;
    }
    if (index < boardSize * boardSize - boardSize && cells[index + boardSize]) {
        aliveNeighbours++;
    }
    if (index < boardSize * boardSize - boardSize && !isRightEdge && cells[index + boardSize + 1]) {
        aliveNeighbours++;
    }

    return aliveNeighbours;
}

// This function is used in the web worker
// I had to move this function to a separate file because Jest doesn't support web workers,
// so I can't test this function in the same file as the web worker
export const getNextGameState = (gameState: GameState) => {
    const newGameState: GameState = { cells: [], boardSize: gameState.boardSize };
    gameState.cells.forEach((isAlive, index) => {
        const liveNeighbours = getAliveNeighboursByIndex(index, gameState.cells, gameState.boardSize);
        if (isAlive && (liveNeighbours < 2 || liveNeighbours > 3)) {
            newGameState.cells[index] = false;
        } else if (!isAlive && liveNeighbours === 3) {
            newGameState.cells[index] = true;
        } else {
            newGameState.cells[index] = isAlive;
        }
    })
    return newGameState;
}