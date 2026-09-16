import { createContext, useContext } from "react";
import type { Dispatch, SetStateAction } from "react";

export interface GridContextType {
  gridState: number[][];
  setGridState: Dispatch<SetStateAction<number[][]>>;
}

// 1. Create the container without assigning any markup
export const GridContext = createContext<GridContextType | undefined>(undefined);

// 2. The core gateway hook
export const useGridContext = (): GridContextType => {
  const context = useContext(GridContext);
  if (!context) {
    throw new Error("useGridContext must be used within a GridProvider");
  }
  return context;
};
