import { useReducer } from "react";
import DigitButton from "./ButtonDigits";
import OperationButton from "./ButtonOperations";
import "./style.css";

// export to call in ButtonDigits.js file 
export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  DELETE_DIGIT: 'delete-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  EVALUATE: 'evaluate'
}

function reducer(state, { type, payload }) {      // ...state = object/property
  switch(type) {

    // this case action is for concat the digits & validations to limit the 0 or . for not duplicating
    case ACTIONS.ADD_DIGIT:
      if (payload.digit === "0" && state.currOperand === "0") {
        return state
      }
      if (payload.digit === "." && state.currOperand.includes (".")) {
        return state
      }

      return {
        ...state,
        currOperand: `${state.currOperand || ""}${payload.digit}`,
      }
    
    // this case action is for choosing the operator 
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currOperand == null && state.prevOperand == null){
        return state
      }
      // this if statement is for overwrite the operation if hit button is wrong
      if (state.currOperand == null){
        return {
          ...state,
          operation: payload.operation
        }
      }
      // this if statement is to change the state ouput after hit the operator or evaluate
      if (state.prevOperand == null ) {
        return {
          ...state,
          operation: payload.operation,
          prevOperand: state.currOperand,
          currOperand: null
        }
      }
      return {
        ...state,
        prevOperand: evaluate(state),
        operation: payload.operation,
        currOperand: null
      }

    case ACTIONS.CLEAR:
      return {}

    // this case action is for = & after hit the = button it returns into current state output
    case ACTIONS.EVALUATE:
      if (state.operation == null || state.currOperand == null || state.prevOperand == null) {
        return state
      }

      return {
        ...state,
        prevOperand: null,
        operation: null,
        currOperand: evaluate(state)
      }

  }
}

// this function is convert strings to actual numbers
// you can add/subtract etc again with the previous state 
function evaluate({ currOperand, prevOperand, operation }) {
  const prev = parseFloat(prevOperand)
  const curr = parseFloat(currOperand)

  if (isNaN(prev) || isNaN(curr)) return ""
  let computation = ""
  switch (operation) {
    case "+":
      computation = prev + curr
      break
    case "-":
      computation = prev - curr
      break
    case "*":
      computation = prev * curr
      break
    case "÷":
      computation = prev / curr
      break
  }
  return computation.toString()
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
      <button className="span-two" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
      <button>DEL</button>

      <OperationButton operation="÷" dispatch={dispatch}/>

      <DigitButton digit="1" dispatch={dispatch}/>
      <DigitButton digit="2" dispatch={dispatch}/>
      <DigitButton digit="3" dispatch={dispatch}/>
   
      <OperationButton operation="*" dispatch={dispatch}/>

      <DigitButton digit="4" dispatch={dispatch}/>
      <DigitButton digit="5" dispatch={dispatch}/>
      <DigitButton digit="6" dispatch={dispatch}/>
  
      <OperationButton operation="+" dispatch={dispatch}/>

      <DigitButton digit="7" dispatch={dispatch}/>
      <DigitButton digit="8" dispatch={dispatch}/>
      <DigitButton digit="9" dispatch={dispatch}/>
 
      <OperationButton operation="-" dispatch={dispatch}/>

      <DigitButton digit="." dispatch={dispatch}/>
      <DigitButton digit="0" dispatch={dispatch}/>
      <button className="span-two" onClick={() => dispatch({ type: ACTIONS.EVALUATE })}> =</button>


    
    </div>
  );
}

export default App;
