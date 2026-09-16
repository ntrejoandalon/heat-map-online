import "./InputBase.css"

interface NumberInputProps {
  num: number;
  onUpdate: Function;
}

export default function NumberInput({ num, onUpdate }: NumberInputProps) {

    return (
        <input type="number" min="1" step="1" value={num} onChange={(e) => onUpdate(e.target.value)}/>
    )
}