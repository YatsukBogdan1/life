const getAliveNeighboursByIndex = (index, cells, boardSize) => {
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

onmessage = function(e) {
    const gameState = e.data;
    const newGameState = { cells: [], boardSize: gameState.boardSize };
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
    postMessage(newGameState);
}