import { useState } from "react";
import "./Calculator.style.css";
// import { Container, Display, Buttons, Button, Zero } from "./Calculator.style";
import { IoArrowBack } from "react-icons/io5";

function Calculator() {
  const [display, setDisplay] = useState("0");
  const [currentValue, setCurrentValue] = useState(0);
  const [previousValue, setPreviousValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [PreviousOperator, setPreviousOperator] = useState(null);
  const [accumulator, setAccumulator] = useState(null);

  // function toNumber(str) {
  //   return +str;
  // }

  //   let a = "123"
  //   console.log("a", a);
  //   let b = +a;
  //   console.log("b", b);

  // function resultDisplay(result) {

  //   if (accumulator !== null) {

  //     console.log("accumulator !== null", accumulator);
  //     // resultDisplay = +accumulator + +result; // преобразование строки к числу
  //     resultDisplay = accumulator + result; 
  //     console.log("resultDisplay", resultDisplay);
  //   } else {

  //     console.log("accumulator === null!! ");
  //     resultDisplay =  result.toString();
  //     console.log("resultDisplay", resultDisplay);
  //   }
  // }

  function calculateResult() {
    let result = "0";

    switch (operator) {
      case "+":
        setAccumulator(null)
        if (currentValue === "" && accumulator === null) {
          setAccumulator(parseFloat(previousValue));
          result = parseFloat(previousValue) + parseFloat(previousValue);
          console.log("accumulator1", result);
          console.log("accumulator1", operator);
        } else if (
          currentValue === "" &&
          accumulator !== 0
        ) {
          result = +accumulator + +previousValue;
          console.log("accumulator2", result.toString());
          console.log("operator", operator);
        }
        else if (
          previousValue !== 0 &&
          currentValue !== 0 &&
          accumulator !== null
        ) {
          result = +accumulator + +currentValue;
          setAccumulator(result);
        }
        else {
          result = +previousValue + +currentValue;
          setAccumulator(+currentValue);
        }
        break;

      case "-":
        setAccumulator(null)
        console.log("case '-' ");
        if (currentValue === "" && accumulator === null) {
          result = (
            parseFloat(previousValue) - parseFloat(previousValue)
          ).toString();

          console.log("previousValue - previousValue =", result);
          console.log("accumulator1", accumulator);
        } else if (
          currentValue === "" &&
          accumulator !== 0)
          {
          result = (
            result = +accumulator - +previousValue
          ).toString();

          console.log("accumulator - previousValue =", result);
          console.log("accumulator1", accumulator);
        } else if (previousValue !== 0 &&
          currentValue !== 0 &&
          accumulator !== null) {
          result = (
            result = +accumulator - +currentValue
          ).toString();
          setAccumulator(result);

          console.log("accumulator - currentValue2 =", result);
          console.log("accumulator1", accumulator);
        } else {
          result = (
            result = +previousValue - +currentValue
          ).toString();
          setAccumulator(+currentValue);
        }

        result = result.replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        // resultDisplay(result);
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
        .replace(/,/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, "");
    } else {
      // Если результат не является числом, отображаем "Ошибка"
      setDisplay("результат не является числом");
      setCurrentValue("");
      setPreviousValue("");
      setOperator("");
      return;
    }
    console.log("previousValue", previousValue);
    console.log("CurrentValue", currentValue);

    setDisplay(result.toString());
    setAccumulator(result.toString());
    // setCurrentValue(result.toString());
    // setOperator("");
    // setPreviousValue("");
  }

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

  function handleOperatorClick(operatorValue) {
    if (operator) {
      // Проверяем, был ли уже установлен оператор
      if (operatorValue !== operator && operator !== "") {
        // Если новый оператор отличается от предыдущего:
        calculateResult(); // Выполняем вычисления с предыдущим оператором
        setPreviousValue(currentValue); // Устанавливаем предыдущее значение
        setOperator(operatorValue); // Устанавливаем новый оператор
        setCurrentValue(""); // Сбрасываем текущее значение для нового ввода
        console.log("Оператор был изменен");
      }
    } else {
      // Если оператор еще не был установлен (первая операция):
      setPreviousValue(currentValue); // Устанавливаем предыдущее значение
      setOperator(operatorValue); // Устанавливаем оператор
      setCurrentValue(""); // Сбрасываем текущее значение для нового ввода
      console.log("Оператор уже нажат");
    }
  }

  function handleClearClick() {
    setDisplay("0");
    setCurrentValue("");
    setOperator("");
    setPreviousValue("");
    setAccumulator(null);
    setPreviousOperator("null")
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
