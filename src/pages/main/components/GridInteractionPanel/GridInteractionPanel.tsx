import Button from "../../../../components/Button";
import SizeInputter from "../SizeInputter/SizeInputter";
import "./GridInteractionPanel.css"

interface GridInteractionPanelProps {
    submitOnClick: Function;
}


export default function GridInteractionPanel({ submitOnClick }: GridInteractionPanelProps) {
    return (
        <div className="grid-manager">
            <SizeInputter />
            <div className="algorithm-submit">
                <h2>Search for Emptiest Square</h2>
                <Button text={"Search"} onClick={submitOnClick} />
            </div>
         </div>
    )
}
