import { useState } from "react";
import NumberInput from "../../../../components/NumberInput";
import { DEFAULT_GRID_SIZE } from "../../../../features/grid/GridProvider";
import { useGridManager } from '../../../../hooks/useGridManager';
import Button from "../../../../components/Button";
import "./SizeInputter.css"

export default function SizeInput() {
    const [nR, setNR] = useState(DEFAULT_GRID_SIZE);
    const [nC, setNC] = useState(DEFAULT_GRID_SIZE);
    const { changeNumRows, changeNumCols, clearGrid } = useGridManager();


    function handleUpdateNR(newNR: number) {
        changeNumRows(newNR);
        setNR(newNR);
    }

    function handleUpdateNC(newNC: number) {
        changeNumCols(newNC);
        setNC(newNC);
    }

    function handleClear() {
        clearGrid();
    }

    function handleReset() {
        handleUpdateNR(DEFAULT_GRID_SIZE);
        handleUpdateNC(DEFAULT_GRID_SIZE);
    }

    return (
        <section className="layout-container">
            <h2>Manage Grid Selection</h2>
            <form className="size-form">
                <label className="number-input"> Rows:
                    <NumberInput num={nR} onUpdate={handleUpdateNR} />
                </label>
                <label className="number-input"> Cols:
                    <NumberInput num={nC} onUpdate={handleUpdateNC} />
                </label>
            </form>
            <div className="grid-controller-button-container">
                <Button text={"Clear Grid"} onClick={handleClear} />
                <Button text={"Reset Size"} onClick={handleReset} />
            </div>
        </section>
    )
}
