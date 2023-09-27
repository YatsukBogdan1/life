import React, {useEffect, useState} from "react";
import { GameState } from "@/game/interfaces";
import { generateRandomGameState, getCellsArrayFromCellsObject } from "@/game/utils";
import { CellTable } from "@/game/components/cell-table";
import { BOARD_SIZE } from "@/game/constants";

export const GamePage = () => {
    const [gameState, setGameState] = useState<GameState | null>(null);
    const getCells: () => boolean[][] = () => getCellsArrayFromCellsObject(gameState?.cells || []);
    useEffect(() => {
        const newGameState = generateRandomGameState(BOARD_SIZE);
        const webWorker = new Worker('web-worker.js');
        webWorker.postMessage(newGameState);
        webWorker.onmessage = function (e) {
            setGameState(e.data);
            setTimeout(() => {
                webWorker.postMessage(e.data);
            }, 50);
        };
        return () => {
            webWorker.terminate();
        }
    }, []);
    if (!gameState) {
        return null;
    }
    return <CellTable cells={getCells()} />;
}