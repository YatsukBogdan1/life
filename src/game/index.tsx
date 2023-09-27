import React from "react";
import { useWorkerGameUpdates } from "@/game/hooks";
import { CANVAS_ID, CANVAS_SIZE } from "@/game/constants";

export const GamePage = () => {
    useWorkerGameUpdates();
    return <canvas id={CANVAS_ID} width={CANVAS_SIZE} height={CANVAS_SIZE} />;
}