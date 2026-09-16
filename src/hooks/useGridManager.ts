import { useGridContext } from "../features/grid/GridContext"

export function useGridManager() {
  const { gridState, setGridState} = useGridContext();

  const clearGrid = () => {
  setGridState((prevGrid: number[][]) =>
    prevGrid.map((row) => Array(row.length).fill(0))
  );
};

  const toggleCell = (rowIndex: number, colIndex: number) => {
    setGridState((prevGrid: number[][]) =>
      prevGrid.map((row, rIdx) =>
        row.map((cell, cIdx) =>
          rIdx === rowIndex && cIdx === colIndex
            ? (cell === 1 ? 0 : 1) // Toggles between 1 and 0
            : cell
        )
      )
    );
  };

  const changeNumRows = (nR: number) => {
    let currNR = gridState.length;

    if (nR > currNR) {
      let diff = nR - currNR;
      let additionalGrid: number[][] = Array.from({ length: diff }, () =>
        Array(gridState[0].length).fill(0)
      );
      setGridState((prevGrid: number[][]) => [...prevGrid, ...additionalGrid]);
    } else if (nR < currNR) {
      setGridState((prevGrid: number[][]) => prevGrid.slice(0, nR));
    }

    if (nR == 0) {
      setGridState([[]])
    }
  }

  const changeNumCols = (nC: number) => {
    let currNC = gridState[0].length;

    if (nC > currNC) {
      let diff = nC - currNC
      let extraCols = Array(diff).fill(0);

      setGridState((prevGrid: number[][]) =>
        prevGrid.map((row) => [...row, ...extraCols])
      );
    } else if (nC < currNC) {
      setGridState((prevGrid: number[][]) =>
        prevGrid.map((row) => row.slice(0, nC))
      );
    }
  }

return { clearGrid, toggleCell, changeNumRows, changeNumCols };}
