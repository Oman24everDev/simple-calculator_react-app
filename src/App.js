import { useReducer } from "react";
import DigitButton from "./ButtonDigits";
import "./style.css";

// export to call in ButtonDigits.js file 
export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  DELETE_DIGIT: 'delete-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  EVALUATE: 'evaluate'
}

function reducer(state, { type, payload }) {
  switch(type) {
    case ACTIONS.ADD_DIGIT:
      return {
        ...state,
        currOperand: `${state.currOperand || ""}${payload.digit}`,
      }
  }
}

function App() {

  // this array of variables will be passed on divs or dispatch
  const [ {currOperand, prevOperand, operation}, dispatch ] = useReducer(reducer, {})

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="prev-operand"> {prevOperand} {operation}</div> 
        <div className="curr-operand">{currOperand}</div>
      </div>
      <button className="span-two">AC</button>
      <button>DEL</button>

      {/* <DigitButton digit="÷" dispatch={dispatch}/> */}

      <DigitButton digit="1" dispatch={dispatch}/>
      <DigitButton digit="2" dispatch={dispatch}/>
      <DigitButton digit="3" dispatch={dispatch}/>
      <button>*</button>

      <DigitButton digit="4" dispatch={dispatch}/>
      <DigitButton digit="5" dispatch={dispatch}/>
      <DigitButton digit="6" dispatch={dispatch}/>
      <button>+</button>

      <DigitButton digit="7" dispatch={dispatch}/>
      <DigitButton digit="8" dispatch={dispatch}/>
      <DigitButton digit="9" dispatch={dispatch}/>
      <button>-</button>

      <DigitButton digit="." dispatch={dispatch}/>
      <DigitButton digit="0" dispatch={dispatch}/>
      <button className="span-two">=</button>


    
    </div>
  );
}

export default App;
