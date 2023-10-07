import { useState } from "react";
import "./Calculator.style.css";
// import { Container, Display, Buttons, Button, Zero } from "./Calculator.style";

function Calculator() {
  const [display, setDisplay] = useState("0");
  const [currentValue, setCurrentValue] = useState("");
  const [previousValue, setPreviousValue] = useState("");
  const [operator, setOperator] = useState("");

  function handleNumberClick(number) {
    if (display === "0" || currentValue === "0") {
      setDisplay(number);
      setCurrentValue(number);
    } else {
      setDisplay(currentValue + number);
      setCurrentValue(currentValue + number);
    }
  }

  function handleOperatorClick(operator) {
    if (operator !== "") {
      calculateResult();
    }

    setOperator(operator);
    setPreviousValue(currentValue);
    setCurrentValue("");
    setDisplay(operator);
  }

  function calculateResult() {
    let result;
    // if(previousValue === "") previousValue=currentValue;
    switch (operator) {
      case "+":
        result = parseFloat(previousValue) + parseFloat(currentValue);
        break;
      case "-":
        result = parseFloat(previousValue) - parseFloat(currentValue);
        break;
      case "*":
        result = parseFloat(previousValue) * parseFloat(currentValue);
        break;
      case "/":
        result = parseFloat(previousValue) / parseFloat(currentValue);
        break;
      default:
        return;
    }

    setDisplay(result.toString());
    setCurrentValue(result.toString());
    setOperator("");
  }

  function handleClearClick() {
    setDisplay("0");
    setCurrentValue("");
    setOperator("");
    setPreviousValue("");
  }

  function handleEqualsClick() {
    calculateResult();
  }

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="buttons">
        <div className="row">
          <button className="clear operator" onClick={handleClearClick}>
            C
          </button>
          <button className="operator">+/-</button>
          <button className="operator">%</button>
          <button className="operator" onClick={() => handleOperatorClick("/")}>
            /
          </button>
        </div>

        <div className="row">
          <button onClick={() => handleNumberClick("7")}>7</button>
          <button onClick={() => handleNumberClick("8")}>8</button>
          <button onClick={() => handleNumberClick("9")}>9</button>
          <button className="operator" onClick={() => handleOperatorClick("*")}>
            x
          </button>
        </div>
        <div className="row">
          <button onClick={() => handleNumberClick("4")}>4</button>
          <button onClick={() => handleNumberClick("5")}>5</button>
          <button onClick={() => handleNumberClick("6")}>6</button>
          <button className="operator" onClick={() => handleOperatorClick("-")}>
            -
          </button>
        </div>
        <div className="row">
          <button onClick={() => handleNumberClick("1")}>1</button>
          <button onClick={() => handleNumberClick("2")}>2</button>
          <button onClick={() => handleNumberClick("3")}>3</button>
          <button className="operator" onClick={() => handleOperatorClick("+")}>
            +
          </button>
        </div>
        <div className="row">
          <button className="zero" onClick={() => handleNumberClick("0")}>
            0
          </button>

          <button onClick={() => handleNumberClick(".")}>.</button>
          <button className="calculate" onClick={handleEqualsClick}>
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
