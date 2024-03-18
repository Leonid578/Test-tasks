import { useState } from "react";
import "./Calculator.style.css";
// import { Container, Display, Buttons, Button, Zero } from "./Calculator.style";
import { IoArrowBack } from "react-icons/io5";

function Calculator() {
  const [display, setDisplay] = useState("0");
  const [currentValue, setCurrentValue] = useState(0); // второй символ
  const [previousValue, setPreviousValue] = useState(null); // первый символ
  const [operator, setOperator] = useState("");
  const [accumulator, setAccumulator] = useState(null);

  function calculateResult() {
    let result = "0";

    switch (operator) {
      case "+":
        console.log("case '+'");

        if (currentValue === "" && accumulator === null) {
          // при повторном нажатии на +
          setAccumulator(previousValue);
          result = (
            result = +previousValue + +previousValue
          )
          console.log("1+", result);
        } else if (
          currentValue === "" &&
          accumulator !== null
        ) {
          console.log(" aad ", accumulator, previousValue );
          result = (+accumulator + +previousValue).toString();
          result = result.replace(/\./g, "");
          console.log("2", result);
        }
        else if (
          // при втором действии слажения
          previousValue !== 0 &&
          currentValue !== 0 &&
          accumulator !== null
        ) {
          result = (
            result = +accumulator + +currentValue
          ).toString()
          setAccumulator(result);
          console.log("3", result);
        }
        else {
          // при первом действии слажения
          result = (
            result = +previousValue + +currentValue
          ).toString();
          setAccumulator(currentValue);
          // setCurrentValue("");
          console.log(" '4' при первом действии слажения", result);
        }

        // result = result.replace(/\./g, "")

        break;

      case "-":
        console.log("case '-' ");

        if (currentValue === "" && accumulator === null) {
          result = (
            parseFloat(previousValue) - parseFloat(previousValue)
          ).toString()

          console.log("previousValue - previousValue =", result);
          console.log("accumulator1", accumulator);
          console.log("1-", result);
        } else if (
          currentValue === "" &&
          accumulator !== 0) {
          result = (
            result = +accumulator - +previousValue
          ).toString()

          console.log("accumulator - previousValue =", result);
          console.log("accumulator1", accumulator);
          console.log("2-", result);
        } else if (previousValue !== 0 &&
          currentValue !== 0 &&
          accumulator !== null
        ) {
          result = (
            result = +accumulator - +currentValue
          ).toString()
          setAccumulator(result);

          console.log("accumulator - currentValue2 =", result);
          console.log("accumulator1", accumulator);
          console.log("3-", result);
        } else {
          
          result = (
            result = +previousValue - +currentValue)
            // .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
          setAccumulator(currentValue);
          setCurrentValue("");
          console.log(" '4-' при первом действии слажения", result);
        }

        // result = result.replace(/\./g, "")

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

    if (!isNaN(result)) {
      // Если результат - число, отображаем его с разделителями
      result = result
        .toString()
        // .replace(/./g, "")
        // .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    } else {
      // Если результат не является числом
      setDisplay("результат не является числом");
      setCurrentValue("");
      setPreviousValue("");
      setOperator("");
      return;
    }
    console.log("previousValue", previousValue);
    console.log("CurrentValue", currentValue);

    setDisplay(result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));
    setAccumulator(result);
  }

  function handleNumberClick(number) {
    if (display === "0" || currentValue === "0") {
      setDisplay(number);
      setCurrentValue(number);
    } else {
      setDisplay(() => {
        // setCurrentValue(number);
        const newResult = (currentValue + number);
        setCurrentValue(currentValue + number);
        // console.log("нажата цифра ", number);
        // console.log("происходит добавлиние справа", currentValue + number);
        return newResult.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      });
      setCurrentValue(currentValue + number);
    }
  }
  
  function handleOperatorClick(operatorValue) {
        console.log("Нажата кнопка оператора", operator, previousValue, currentValue)
        if (operatorValue !== operator && operator !== "") {
          // Если новый оператор отличается от предыдущего:
          setPreviousValue(currentValue); // Устанавливаем предыдущее значение
          setOperator(operatorValue); // Устанавливаем новый оператор
          setCurrentValue(""); // Сбрасываем текущее значение для нового ввода
          console.log("Оператор был изменен на ", operator);
          console.log("не первая операция");
        } else if (operator !== "" && previousValue !== 0 && currentValue !== 0) {
          console.log("previousValue !== 0 && currentValue !== 0", previousValue , currentValue );
          calculateResult()
        } else if (operator === "") {
          // Если оператор еще не был установлен (первая операция):
          console.log("первая операция");
          console.log("устаовили оператор = ", operator)
          setPreviousValue(currentValue); // Устанавливаем предыдущее значение
          setOperator(operatorValue); // Устанавливаем оператор
          setCurrentValue(""); // Сбрасываем текущее значение для нового ввода
        } else {
          console.log("qeqwe", previousValue , currentValue );
          console.log("error", operator)
        }
    }

    function handleClearClick() {
      setDisplay("0");
      setCurrentValue("");
      setOperator("");
      setPreviousValue("");
      setAccumulator(null);
      // setPreviousOperator("null")
    }

    function handleEqualsClick() {
      calculateResult();
      // setCurrentValue('0')
    }

    const deleteLastDigit = () => {
      setCurrentValue(currentValue.slice(0, -1)); // Удаляем последний символ
      setDisplay((prevDisplay) => {
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
