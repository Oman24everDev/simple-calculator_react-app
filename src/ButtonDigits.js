import { ACTIONS } from "./App";

export default function DigitButton ({ dispatch, digit }) {
    return (
        // this button represents for adding a digit to currOperand
        <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}>
            {digit}
        </button>
    )
} 