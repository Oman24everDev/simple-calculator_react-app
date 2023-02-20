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
      // this if statement is for checking if the value of the output is not from = button
      // to not overwrite it 
      if (state.overwrite) {
        return {
          ...state,
          currOperand: payload.digit,
          overwrite: false
        }
      }

      // this if statement is for digits & validations to limit the 0 or . for not duplicating
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
    
    case ACTIONS.DELETE_DIGIT:
      // this if statement is for clearing the ouput if it is from = button overwrite
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currOperand: null
        }
      }

      // this if statement if for delete the value of output & remove last digit 
      if (state.currOperand == null) return state
      if (state.currOperand.length === 1) {
        return {
          ...state,
          currOperand: null
        }
      }
      return {
        ...state,
        currOperand: state.currOperand.slice(0, -1)
      }

    // this case action is for = & after hit the = button it returns into current state output
    case ACTIONS.EVALUATE:
      if (state.operation == null || state.currOperand == null || state.prevOperand == null) {
        return state
      }

      return {
        ...state,
        overwrite: true,    // this line is to overwrite the ouput after hit = button
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

// this const variable is to declare the number format of what value it is in comma
const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0
})

function formatOperand(operand) {
  // this if statement is for digit is set the decimal into any input value or null if nothing  
  if (operand == null) return
  const [integer, decimal] = operand.split('.')

  // this if statement is for the identify/separate the ouput with comma & concat with decimal
  if (decimal == null ) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function App() {

  // this array of variables will be passed on divs or dispatch
  const [ {currOperand, prevOperand, operation}, dispatch ] = useReducer(reducer, {})

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="prev-operand"> {formatOperand(prevOperand)} {operation}</div> 
        <div className="curr-operand">{formatOperand(currOperand)}</div>
      </div>
      <button className="span-two" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>DEL</button>

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
