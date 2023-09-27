import React, {useEffect, useState} from "react";
import { GamePageState } from "@/pages/game-page/interfaces";
import { generateRandomGamePageState, getCellsArrayFromCellsObject, getNextGamePageState } from "@/pages/game-page/utils";
import { CellTable } from "@/pages/game-page/components/cell-table";

export const GamePage = () => {
    const [gameState, setGameState] = useState<GamePageState>(generateRandomGamePageState());
    const updateGameState = () => {
        setGameState(prevState => getNextGamePageState(prevState));
        requestAnimationFrame(updateGameState);
        // setTimeout(updateGameState, 50);
    }
    const getCells: () => boolean[][] = () => getCellsArrayFromCellsObject(gameState.cells);
    useEffect(() => {
        updateGameState();
    }, []);
    return <CellTable cells={getCells()} />;
}