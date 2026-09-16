import './HeatMap.css';
import '../../Grid.css';
import { useHeatMapManager } from '../../../../hooks/useHeatMapManager';

interface HeatMapProps {
  showValuesInDisplay: boolean 
}


export default function HeatMap({ showValuesInDisplay }: HeatMapProps) {
  const { heatmapState, normalizedHeatMap, center } = useHeatMapManager();

  const gridStyles = {
    '--rows': heatmapState.length,
    '--cols': heatmapState[0].length,
  } as React.CSSProperties;


  return (
    <div className={`grid-container heatmap-grid ${showValuesInDisplay ? 'show-values' : ''}`} style={gridStyles}>
      {
        normalizedHeatMap.map((row, rowIndex) =>
          row.map((value, colIndex) => {
            const isCenter = rowIndex === center[0] && colIndex === center[1];
            const rawValue = heatmapState[rowIndex]?.[colIndex] ?? 0;

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`grid-item ${value ? 'filled' : 'unfilled'} ${isCenter ? 'center-cell' : ''}`}
                aria-label={`Cell at Row ${rowIndex + 1}, Column ${colIndex + 1}, ${value ? 'filled' : 'unfilled'}`}
                style={value ? { '--percent': value.toFixed(1) } as React.CSSProperties : {}}
                data-value={`${rawValue.toFixed(2)}`}
              />
            );
          })
        )
      }
    </ div>

      );
}
