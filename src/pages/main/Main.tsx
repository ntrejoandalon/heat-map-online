import { useState } from "react";
import InteractableGrid from "../../features/grid/components/InteractableGrid/InteractableGrid";
import './Main.css';
import HeatMap from "../../features/grid/components/HeatMap/HeatMap";
import ConditionalWrapper from "../../features/ConditionalWrapper";
import { GridProvider } from "../../features/grid/GridProvider";
import GridInteractionPanel from "./components/GridInteractionPanel/GridInteractionPanel";
import HeatMapExplainer from "./components/HeatMapExplainer/HeatMapExplainer";



export default function Main() {
    const [onHeatMap, toggleOnHeatMap] = useState(false);
    const [displayHeatValues, toggleDisplayHeatValues] = useState(false);

    function toggleGridHeatMap() {
        toggleOnHeatMap(!onHeatMap);
        if (onHeatMap) toggleDisplayHeatValues(false);
    }

    function toggleViewValues() {
        toggleDisplayHeatValues(!displayHeatValues)
    }

    return (
        <GridProvider>
            <div className="content">
                <ConditionalWrapper childTrue={<HeatMap showValuesInDisplay={displayHeatValues} />} chlidFalse={<InteractableGrid />} condition={onHeatMap} />
                <ConditionalWrapper childTrue={<HeatMapExplainer returnToGrid={toggleGridHeatMap} toggleValueDisplay={toggleViewValues} />} chlidFalse={<GridInteractionPanel submitOnClick={toggleGridHeatMap} />} condition={onHeatMap} />
            </div>
        </GridProvider>
    )
}