import { useState } from "react";
import "./Calculator.style.css";
// import { Container, Display, Buttons, Button, Zero } from "./Calculator.style";
import { IoArrowBack } from "react-icons/io5";

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
      setDisplay(() => {
        const newResult = (currentValue + number).replace(/,/g, "");
        return newResult.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      });

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

    switch (operator) {
      case "+":
        result = (
          parseFloat(previousValue) + parseFloat(currentValue)
        ).toString();
        result = result.replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        break;
      case "-":
        result = (
          parseFloat(previousValue) - parseFloat(currentValue)
        ).toString();
        result = result.replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        break;
      case "*":
        result = (
          parseFloat(previousValue) * parseFloat(currentValue)
        ).toString();
        result = result.replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        break;
      case "/":
        if (currentValue === "0") {
          setDisplay("Ошибка");
          setCurrentValue("");
          setPreviousValue("");
          setOperator("");
          return;
        }
        result = (
          parseFloat(previousValue) / parseFloat(currentValue)
        ).toString();
        result = result.replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
    // setCurrentValue('0')
  }

  const deleteLastDigit = () => {
    setCurrentValue(currentValue.slice(0, -1)); // Удаляем последний символ
    setDisplay(prevDisplay => {
      const newDisplay = currentValue.slice(0, -1);
      if (newDisplay === "") {
        return "0";
      }
      return newDisplay;
    });
};

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="buttons">
        <div className="row">
          <button className="clear operator" onClick={handleClearClick}>
            AC
          </button>

          <button className="operator" onClick={deleteLastDigit}>
            <IoArrowBack />
          </button>
          <button className="operator">%</button>
          <button className="operator" onClick={() => handleOperatorClick("/")}>
            /
          </button>
        </div>

        <div className="row">
          <button className="button" onClick={() => handleNumberClick("7")}>
            7
          </button>
          <button className="button" onClick={() => handleNumberClick("8")}>
            8
          </button>
          <button className="button" onClick={() => handleNumberClick("9")}>
            9
          </button>
          <button className="operator" onClick={() => handleOperatorClick("*")}>
            x
          </button>
        </div>
        <div className="row">
          <button className="button" onClick={() => handleNumberClick("4")}>
            4
          </button>
          <button className="button" onClick={() => handleNumberClick("5")}>
            5
          </button>
          <button className="button" onClick={() => handleNumberClick("6")}>
            6
          </button>
          <button className="operator" onClick={() => handleOperatorClick("-")}>
            -
          </button>
        </div>
        <div className="row">
          <button className="button" onClick={() => handleNumberClick("1")}>
            1
          </button>
          <button className="button" onClick={() => handleNumberClick("2")}>
            2
          </button>
          <button className="button" onClick={() => handleNumberClick("3")}>
            3
          </button>
          <button className="operator" onClick={() => handleOperatorClick("+")}>
            +
          </button>
        </div>
        <div className="row">
          <button
            className="zero button"
            onClick={() => handleNumberClick("0")}
          >
            0
          </button>

          <button className="button" onClick={() => handleNumberClick(".")}>
            .
          </button>
          <button className="calculate" onClick={handleEqualsClick}>
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
