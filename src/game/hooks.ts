import { useEffect} from "react";
import { drawCellsOnCanvas, generateRandomGameState } from "@/game/utils";
import { BOARD_SIZE, CANVAS_ID, TICK_DURATION } from "@/game/constants";

export const useWorkerGameUpdates = () => {
    useEffect(() => {
        const newGameState = generateRandomGameState(BOARD_SIZE);
        const webWorker = new Worker('web-worker.js');
        webWorker.postMessage(newGameState);
        webWorker.onmessage = function (e) {
            drawCellsOnCanvas(
                e.data.cells,
                (document.getElementById(CANVAS_ID) as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D,
                newGameState.boardSize
            );
            setTimeout(() => {
                webWorker.postMessage(e.data);
            }, TICK_DURATION);
        };
        return () => {
            webWorker.terminate();
        }
    }, []);
}