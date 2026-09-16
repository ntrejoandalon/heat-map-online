import Button from "../../../../components/Button";
import { useGridManager } from "../../../../hooks/useGridManager";
import { useHeatMapManager } from "../../../../hooks/useHeatMapManager";
import "./HeatMapExplainer.css"

// Define the component props interface
interface HeatMapExplainerProps {
    returnToGrid: Function;
    toggleValueDisplay: Function;
}



export default function HeatMapExplainer({ returnToGrid, toggleValueDisplay }: HeatMapExplainerProps) {
    const { center, heatmapState, metrics } = useHeatMapManager();
    const { clearGrid } = useGridManager();
    
    const centerSquare = `(${center[0]},${center[1]})`;
    const totalRows = heatmapState.length;
    const totalCols = heatmapState[0].length;

    function runReset() {
        clearGrid();
        returnToGrid();
    }


    return (
        <div className="explanation-box">
            <div className = "results-box">
                <h2>Results of Heat Map Search</h2>

                <div className="heatmap-metrics" style={{ marginBottom: '15px', lineHeight: '1.6' }}>
                    <strong>Number of rows / cols:</strong> {totalRows} x {totalCols}<br />
                    <strong>Location of center square:</strong> {centerSquare}<br />
                    <strong>Min / Max distance:</strong> {metrics.min.toFixed(1)} / {metrics.max.toFixed(1)}<br />
                    <strong>Average distance:</strong> {metrics.avg.toFixed(1)}<br />
                    <strong>Standard deviation:</strong> {metrics.stdDev.toFixed(1)} <br />
                </div>
                <Button text="Display Distances" onClick={toggleValueDisplay} />
            </div>



            <div className="return-box">
                <h2>Return to Selection</h2>
                <div className="return-actions">
                    <Button text="Edit Selection" onClick={returnToGrid} />
                    <Button text="Reset Grid" onClick={runReset} />
                </div>
            </div>

        </div>
    );
}
