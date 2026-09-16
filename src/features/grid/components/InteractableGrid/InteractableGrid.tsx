import './InteractableGrid.css';
import '../../Grid.css'
import { useGridContext } from "../../GridContext"
import { useGridManager } from '../../../../hooks/useGridManager';

export default function InteractableGrid() {
  // Initialize a flat array of booleans set to false (unfilled)
  const { gridState } = useGridContext();
  const {toggleCell} = useGridManager();
  
  const gridStyles = {
    '--rows': gridState.length,
    '--cols': gridState[0].length,
  } as React.CSSProperties;

  return (
    <div className="grid-container" style={gridStyles}>
      {gridState.map((row, rowIndex) =>
        row.map((isFilled, colIndex) => (
          <button
            key={`${rowIndex}-${colIndex}`} // Composite key using row and column index
            type="button"
            className={`grid-item ${isFilled ? 'filled' : 'unfilled'}`}
            onClick={() => toggleCell(rowIndex, colIndex)}
            aria-label={`Cell at Row ${rowIndex + 1}, Column ${colIndex + 1}, ${isFilled ? 'filled' : 'unfilled'}`}
          />
        ))
      )}
    </div>
  );
}
