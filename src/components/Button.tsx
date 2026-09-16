
interface ButtonProps {
  text: string;
  onClick: Function;
}


export default function Button({ text, onClick }: ButtonProps) {
    return (
        <button
            type="button"
            className="counter"
            onClick={() => onClick()}
        >
            {text}
        </button>
    )
}