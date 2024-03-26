import { useState } from "react";
import "./Calculator.style.css";
// import { Container, Display, Buttons, Button, Zero } from "./Calculator.style";
import { IoArrowBack } from "react-icons/io5";
import question from "../image/png/question.png";
import sun from "../image/png/sun.png";
import tooth from "../image/png/tooth.png";
import { number } from "prop-types";

function Calculator() {
  const [display, setDisplay] = useState("0");
  const [currentValue, setCurrentValue] = useState(0); // второй символ
  const [previousValue, setPreviousValue] = useState(null); // первый символ
  const [operator, setOperator] = useState("");
  const [accumulator, setAccumulator] = useState(null);

  const [history, setHistory] = useState([]); // Состояние для хранения истории
  const [isHistoryVisible, setIsHistoryVisible] = useState(false); // Состояние для отображения истории

  // Функция для добавления записи в историю
  function addToHistory(entry) {
    setHistory([...history, entry]);
    setIsHistoryVisible(true); // Показываем историю после добавления записи
  }

  function directInput(keyOperator) {
    setOperator(keyOperator);
  }

  function calculateResult() {
    let result = "0";

    switch (operator) {
      case "+":
        console.log("case '+'");

        if (currentValue === "" && accumulator === null) {
          // при повторном нажатии на +

          return;
          // setAccumulator(previousValue);

          // result = +previousValue + +previousValue;

          // console.log("1+", result);
        } else if (currentValue === "" && accumulator !== null) {
          result = (+accumulator + +previousValue).toString();
          // result = (+accumulator + +previousValue).toString();
          console.log("2", result);
        } else if (
          // при втором действии слажения
          previousValue !== 0 &&
          currentValue !== 0 &&
          accumulator !== null
        ) {
          result = +accumulator + +currentValue;
          result = parseFloat(result);
          // .toFixed(6)
          setAccumulator(result);

          console.log("3", result);
        } else {
          // при первом действии слажения
          result = +previousValue + +currentValue;
          console.log("previousValue", +previousValue);
          console.log("CurrentValue", +currentValue);

          setAccumulator(currentValue);
          console.log(" '4' при первом действии слажения", result);
        }
        break;

      case "-":
        console.log("case '-' ");

        if (currentValue === "" && accumulator === null) {
          // при повторном нажатии на -

          return;
          // setAccumulator(previousValue);

          // result = +previousValue - +previousValue;

          // console.log("1-", result);
        } else if (currentValue === "" && accumulator !== null) {
          result = (+accumulator - +previousValue).toString();
          // result = (+accumulator + +previousValue).toString();

          console.log("2-", result);
        } else if (
          // при втором действии вычитания
          previousValue !== 0 &&
          currentValue !== 0 &&
          accumulator !== null
        ) {
          result = +accumulator - +currentValue;
          result = parseFloat(result);
          // .toFixed(6)
          setAccumulator(result);
          console.log("3-", result);
        } else {
          // при первом действии вычитания
          result = +previousValue - +currentValue;

          setAccumulator(currentValue);
          console.log(" '4-' при первом действии вычитания", result);
        }
        break;

      case "*":
        console.log("case '*'");

        if (currentValue === "" && accumulator === null) {
          // при повторном нажатии на *
          return;
          // setAccumulator(previousValue);

          // result = +previousValue * +previousValue;

          // console.log("1*", result);
        } else if (currentValue === "" && accumulator !== null) {
          result = (+accumulator * +previousValue).toString();
          console.log("2*", result);
        } else if (
          // при втором действии *
          previousValue !== 0 &&
          currentValue !== 0 &&
          accumulator !== null
        ) {
          result = +accumulator * +currentValue;
          result = parseFloat(result).toFixed(6);
          setAccumulator(result);
          console.log("3*", result);
        } else {
          // при первом действии *
          result = +previousValue * +currentValue;

          setAccumulator(currentValue);
          console.log(" '4*' при первом действии *", result);
        }
        break;

      case "/":
        console.log("case '/'");

        if (currentValue === "0") {
          setDisplay("Ошибка");
          setCurrentValue("");
          setPreviousValue("");
          setOperator("");
          return;
        }

        if (currentValue === "" && accumulator === null) {
          // при повторном нажатии на /
          return;
          // setAccumulator(previousValue);

          // const roundedNumber = +previousValue / +previousValue;
          // result = Math.round(roundedNumber * 1e4) / 1e4;

          // console.log("1/", result);
        } else if (currentValue === "" && accumulator !== null) {
          const roundedNumber = (+accumulator / +previousValue).toString();
          result = Math.round(roundedNumber * 1e4) / 1e4;

          console.log("2/", result);
        } else if (
          // при втором действии /
          previousValue !== 0 &&
          currentValue !== 0 &&
          accumulator !== null
        ) {
          const roundedNumber = +accumulator / +currentValue;
          setAccumulator(roundedNumber);
          console.log("3/", roundedNumber);
        } else {
          // при первом действии /
          const roundedNumber = +previousValue / +currentValue;
          setAccumulator(currentValue);
          console.log(" '4/' при первом действии /", roundedNumber);
        }
        break;

      default:
        return;
    }

    if (!isNaN(result)) {
      // Если результат - число, отображаем его в виде строки
      result = result
        .toFixed(6)
        .toString()
        .replace(/\.?0+$/, "");
    } else {
      // Если результат не является числом
      setDisplay("результат не является числом");
      setCurrentValue("");
      setPreviousValue("");
      setOperator("");
      return;
    }

    setDisplay(
      result.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
      // .replace(/\.?0+$/, '')
    );

    setAccumulator(result);

    addToHistory({
      expression: `${
        accumulator ? accumulator : previousValue
      } ${operator} ${currentValue}`,
      result: result,
    });
    setPreviousValue(null);
  }

  function formatNumber(newResult) {
    // Преобразуем число в строку и разделяем его на целую и дробную части

    const parts = newResult.toString().split(".");
    let isNegative;

    // Получаем целую и дробную части
    let integerPart = parts[0];
    const decimalPart = parts[1] ? "." + parts[1] : "";
    // console.log("parts[0]" , parts[0], "parts[1]" , parts[1]);

    // Форматируем целую часть
    if (integerPart.includes("-")) {
      // Если целая часть содержит знак минуса, удаляем его и помечаем, что число отрицательное
      integerPart = integerPart.replace("-", "");
      isNegative = true;
    } else {
      isNegative = false;
    }

    // // Если абсолютное значение целой части больше или равно 1000, добавляем пробелы между каждыми тремя цифрами
    // if (Math.abs(parseInt(integerPart)) >= 1000) {
    //   integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    // }

    // Собираем число с учетом знака и дробной части
    let formattedNumber = (isNegative ? "-" : "") + integerPart + decimalPart;
    const returnFormattedNumber = parseFloat(formattedNumber)
      .toFixed(6)
      .replace(/\.?0+$/, "");
    // Округляем до 4 знаков после запятой только если количество знаков превышает 4
    // if (decimalPart.length > 4) {
    //   formattedNumber = (Math.round(parseFloat(formattedNumber) * 1e4) / 1e4).toFixed(4);
    // }

    return returnFormattedNumber;
  }

  function handleNumberClick(number, returnFormattedNumber) {
    // console.log("previousValue", previousValue);
    // console.log("CurrentValue", currentValue);
    // console.log(returnFormattedNumber);
    // console.log(formattedNumber);
    const proverka = display.includes(".");

    if (display === "0" && number === ".") {
      setDisplay("0.");
      setCurrentValue("0.");
      console.log("previousValue", previousValue);
      console.log("CurrentValue", currentValue);
    } else if (proverka && currentValue !== "0" && number === ".") {
      console.log("previousValue", previousValue);
      console.log("CurrentValue", currentValue);
      console.log("выходим парни");
      return;
    } else if (proverka && currentValue === "0" && number === ".") {
      setDisplay("0.444");
      return;
    } else if (display === "0" || currentValue === "0") {
      // console.log("number", number);
      setDisplay(number);
      // setDisplay(number.replace(/\.?0+$/, ""));
      setCurrentValue(number);
    } else {
      setDisplay(() => {
        const newResult = currentValue + number;
        setCurrentValue(newResult);
        return formatNumber(newResult);
      });
      // setCurrentValue(currentValue + number);
      setCurrentValue(returnFormattedNumber);
    }

    // if (currentValue === 0) {
    //   console.log(
    //     "previousValue1",
    //     previousValue,
    //     "operator",
    //     operator,
    //     "currentValue",
    //     currentValue
    //   );
    //   setDisplay(`0 ${operator}`);
    // } else if (previousValue !== "") {
    //   console.log(
    //     "previousValue2",
    //     previousValue,
    //     "operator",
    //     operator,
    //     "currentValue",
    //     currentValue
    //   );
    //   setDisplay(`${previousValue} ${operator}`);
    // } else {
    //   console.log(
    //     "previousValue3",
    //     previousValue,
    //     "operator",
    //     operator,
    //     "currentValue",
    //     currentValue
    //   );
    //   setDisplay(`${previousValue} ${operator} ${currentValue}`);
    // }
  }

  function handleOperatorClick(operatorValue) {
    console.log("operatorValue ", operatorValue);
    if (operator === "") {
      // Если оператор еще не был установлен (первая операция):
      setOperator(operatorValue); // Устанавливаем оператор
      console.log("первая операция, установили оператор", operator);
      console.log("currentValue + operatorValue", currentValue + operatorValue);
      setPreviousValue(currentValue); // Устанавливаем предыдущее значение
      setCurrentValue(""); // Сбрасываем текущее значение для нового ввода
    } else if (
      operatorValue !== operator
      //  && operator !== ""
    ) {
      // Если новый оператор отличается от предыдущего:
      if (previousValue !== "") {
        setOperator(operatorValue);
        setDisplay(`${previousValue} ${operatorValue}`);
        console.log("previousValue !== '' ", operatorValue);
        return;
      } else {
        setOperator(operatorValue); // Устанавливаем новый оператор
        console.log("не первая операция, Оператор был изменен ", operatorValue);
        setPreviousValue(currentValue); // Устанавливаем предыдущее значение
        setCurrentValue(""); // Сбрасываем текущее значение для нового ввода
      }
    } else if (operator !== "" && previousValue !== 0 && currentValue !== 0) {
      // calculateResult();
      return;
    } else {
      console.log("error", operator);
      return;
    }

    if (currentValue !== "") {
      console.log(
        "previousValue1",
        previousValue,
        "operator",
        operator,
        "currentValue",
        currentValue
      );
      setDisplay(`${currentValue} ${operatorValue}`);
    } else if (operatorValue !== operator) {
      console.log(
        "previousValue22",
        previousValue,
        "operator",
        operator,
        "currentValue",
        currentValue
      );
      setDisplay(`${previousValue} ${operatorValue}`);
    } else if (previousValue !== "") {
      console.log(
        "previousValue2",
        previousValue,
        "operator",
        operator,
        "currentValue",
        currentValue
      );
      setDisplay(`${previousValue} ${operatorValue}`);
    } else {
      console.log(
        "previousValue3",
        previousValue,
        "operator",
        operator,
        "currentValue",
        currentValue
      );
      // setDisplay(`${previousValue} ${operatorValue}`);
      setDisplay(`${previousValue} ${operator} ${currentValue}`);
    }
  }

  function handleClearClick() {
    setDisplay("0");
    setCurrentValue(0);
    setOperator("");
    setPreviousValue(null);
    setAccumulator(null);
    setIsHistoryVisible(false);
    setHistory([]);
  }

  function handleEqualsClick() {
    calculateResult();
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
      <div className="generalBtn">
        <div className="btn">
          <img src={question} alt="Question" />
        </div>
        <div className="btn">
          <img src={sun} alt="Sun" />
        </div>
        <div className="btn">
          <img src={tooth} alt="Tooth" />
        </div>
      </div>
      <div className="history">
        {isHistoryVisible && (
          <div>
            <ul>
              {history.map((entry, index) => (
                <li key={index}>
                  <span>{entry.expression}</span> = <span>{entry.result}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="display">{display}</div>
      <div className="buttons">
        <div className="row">
          <button className="clear operator" onClick={handleClearClick}>
            AC
          </button>

          <button className="operator" onClick={deleteLastDigit}>
            <IoArrowBack />
          </button>

          <button className="operator" onClick={() => handleOperatorClick("/")}>
            /
          </button>
          <button className="operator" onClick={() => handleOperatorClick("*")}>
            x
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
          <button className="operator" onClick={() => handleOperatorClick("-")}>
            -
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
          <button className="operator" onClick={() => handleOperatorClick("+")}>
            +
          </button>
        </div>
        <div className="container">
          <div>
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
            </div>
            <div className="row">
              <button className="operator">%</button>
              <button className="button" onClick={() => handleNumberClick("0")}>
                0
              </button>
              <button className="button" onClick={() => handleNumberClick(".")}>
                .
              </button>
            </div>
          </div>
          <button className="calculate" onClick={handleEqualsClick}>
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
