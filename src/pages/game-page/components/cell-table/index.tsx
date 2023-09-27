import React from 'react';
import { Cell } from "@/pages/game-page/components/cell";

interface Props {
    cells: boolean[][];
}

export const CellTable: React.FC<Props> = ({ cells }) => (
    <table>
        <tbody>
            {cells.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                        <Cell key={cellIndex} alive={cell} />
                    ))}
                </tr>
            ))}
        </tbody>
    </table>
)