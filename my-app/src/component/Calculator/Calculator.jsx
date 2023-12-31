import { useState } from "react";
import "./Calculator.style.css";
// import { Container, Display, Buttons, Button, Zero } from "./Calculator.style";
import { IoArrowBack } from "react-icons/io5";

function Calculator() {
  const [display, setDisplay] = useState("0");
  const [currentValue, setCurrentValue] = useState(0);
  const [previousValue, setPreviousValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [accumulator, setAccumulator] = useState(0);

  //  const [accumulator, setAccumulator] = useState({});

  // const [currentValue, setCurrentValue] = useState('');
  // const [previousValue, setPreviousValue] = useState('');
  // const [operator, setOperator] = useState('');
  // const [display, setDisplay] = useState('0');
  // const [accumulator, setAccumulator] = useState({});

  // const calculateResult = () => {
  //   let result;

  //   switch (operator) {
  //     case "+":
  //       if (currentValue === "" && accumulator['+'] || 0) {

  //                 result = parseFloat(previousValue) + parseFloat(previousValue);
  //                 accumulator['+'] = result;
  //                 console.log("accumulator1", result);
  //               } else if (currentValue === "" && accumulator !== 0) {
  //                 result = accumulator + parseFloat(previousValue);
  //                 console.log("accumulator2", result);
  //               } else {
  //                 result = parseFloat(previousValue) + parseFloat(currentValue);
  //                 setAccumulator(parseFloat(currentValue));
  //                 console.log("accumulator3", accumulator);
  //               }
  //       result = (accumulator['+'] || 0) + parseFloat(currentValue);
  //       accumulator['+'] = result;
  //       console.log("accumulator+", accumulator);
  //       break;
  //     case "-":
  //       result = (accumulator['-'] || 0) - parseFloat(currentValue);
  //       accumulator['-'] = result;
  //       break;
  //     case "*":
  //       result = (accumulator['*'] || 1) * parseFloat(currentValue);
  //       accumulator['*'] = result;
  //       break;
  //     case "/":
  //       result = (accumulator['/'] || 1) / parseFloat(currentValue);
  //       accumulator['/'] = result;
  //       break;
  //     default:
  //       return;
  //   }

  //   if (!isNaN(result)) {
  //     result = result.toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, "");
  //   }

  //   setDisplay(result.toString());
  //   setCurrentValue(result.toString());
  //   setOperator("");
  //   setPreviousValue("");
  // };
  function calculateResult() {
    let result = 0;

    switch (operator) {
      case "+":
        if (currentValue === "" && accumulator === 0 && operator === "+") {
          setAccumulator(parseFloat(previousValue));
          result = parseFloat(previousValue) + parseFloat(previousValue);
          console.log("accumulator1", result);
          console.log("accumulator1", operator);
        } else if (
          currentValue === "" &&
          accumulator !== 0 &&
          operator === "+"
        ) {
          result = accumulator + parseFloat(previousValue);
          console.log("accumulator2", result.toString());
          console.log("accumulator1", operator);
        } else {
          result = parseFloat(previousValue) + parseFloat(currentValue);
          setAccumulator(parseFloat(currentValue));
          console.log("accumulator3", accumulator);
          console.log("accumulator1", operator);
        }
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

    if (!isNaN(result)) {
      // Если результат - число, отображаем его с разделителями
      result = result
        .toString()
        .replace(/,/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, "");
    } else {
      // Если результат не является числом, отображаем "Ошибка"
      setDisplay("Ошибка");
      setCurrentValue("");
      setPreviousValue("");
      setOperator("");
      return;
    }
    console.log("CurrentValue", currentValue);
    setDisplay(result.toString());
    setCurrentValue(result.toString());
    setOperator("");
    setPreviousValue("");
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

    // if (operator !== "") {
    //   calculateResult();
    // }

    // setOperator(operator);
    // setPreviousValue(currentValue);
    // setCurrentValue("");
    // setDisplay(operator);
  }

  function handleClearClick() {
    setDisplay("0");
    setCurrentValue("");
    setOperator("");
    setPreviousValue("");
    setAccumulator(0);
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
