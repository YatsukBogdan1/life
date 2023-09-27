import React from 'react';
import { Cell } from "@/game/components/cell";
import { CellsMatrix } from "@/game/interfaces";

interface Props {
    cells: CellsMatrix;
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