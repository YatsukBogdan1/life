import React from "react";

interface Props {
    alive: boolean;
}

export const Cell: React.FC<Props>  = ({ alive }) =><td className={`cell ${alive ? 'alive' : 'dead'}`} />;