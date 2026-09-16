import React, { useState } from "react";
import { GridContext } from "./GridContext";

interface GridProviderProps {
  children: React.ReactNode;
}

export const DEFAULT_GRID_SIZE = 4;

export const GridProvider = ({ children }: GridProviderProps) => {
  // 1. Instantiates the live React state
  const [gridState, setGridState] = useState<number[][]>(() =>
    Array.from({ length: DEFAULT_GRID_SIZE }, () => Array(DEFAULT_GRID_SIZE).fill(0))
  );

  return (
    <GridContext.Provider 
      value={{ 
        gridState, 
        setGridState,
      }}
    >
      {children}
    </GridContext.Provider>
  );
};
