import { useState } from "react";
import "./Calculator.style.css";
// import { Container, Display, Buttons, Button, Zero } from "./Calculator.style";
import { IoArrowBack } from "react-icons/io5";
import questionDark from "../image/png/question.png";
import sunDark from "../image/png/sun.png";
import toothDark from "../image/png/tooth.png";
import moonSun from "../image/png/moon.png";
import toothSun from "../image/png/tooth.png";
import questionSun from "../image/png/question.png";


// import { number } from "prop-types";

function Calculator() {
  const [display, setDisplay] = useState("0");
  const [currentValue, setCurrentValue] = useState(0); // второй символ
  const [previousValue, setPreviousValue] = useState(null); // первый символ
  const [operator, setOperator] = useState("");
  const [accumulator, setAccumulator] = useState(null);

  const [history, setHistory] = useState([]); // Состояние для хранения истории
  const [isHistoryVisible, setIsHistoryVisible] = useState(false); // Состояние для отображения истории
  const limitedHistory = history.slice(0, 5);
  const [theme, setTheme] = useState(true); // Состояние для хранения истории

  function addToHistory(entry) {
    // Функция для добавления записи в историю
    setHistory([entry, ...history]);
    setIsHistoryVisible(true);
  }

  function calculateResult() {
    let result = "0";
    switch (operator) {
      case "+":
        if (currentValue === "" && accumulator === null) {
          console.log("currentValue ", currentValue);
          return;
        } else if (currentValue === "" && accumulator !== null) {
          console.log("currentValue ", currentValue);
          result = +accumulator + +previousValue;
        } else if (
          previousValue !== 0 &&
          currentValue !== 0 &&
          accumulator !== null
        ) {
          console.log("currentValue ", currentValue);
          result = parseFloat(+accumulator + +currentValue);
        } else {
          result = +previousValue + +currentValue;
        }
        break;

      case "-":
        if (currentValue === "" && accumulator === null) {
          console.log("currentValue ", currentValue);
          return;
        } else if (currentValue === "" && accumulator !== null) {
          console.log("currentValue ", currentValue);
          result = +accumulator - +previousValue;
        } else if (
          previousValue !== 0 &&
          currentValue !== 0 &&
          accumulator !== null
        ) {
          console.log("currentValue ", currentValue);
          result = parseFloat(+accumulator - +currentValue);
        } else {
          result = +previousValue - +currentValue;
        }
        break;

      case "*":
        if (currentValue === "" && accumulator === null) {
          return;
        } else if (currentValue === "" && accumulator !== null) {
          result = +accumulator * +previousValue;
        } else if (
          previousValue !== 0 &&
          currentValue !== 0 &&
          accumulator !== null
        ) {
          result = parseFloat(+accumulator * +currentValue);
          setAccumulator(result);
        } else {
          console.log("hshs");
          result = +previousValue * +currentValue;
          setAccumulator(currentValue);
        }
        break;

      case "/":
        if (currentValue === "0") {
          setDisplay("Ошибка");
          setCurrentValue("");
          setPreviousValue("");
          setOperator("");
          return;
        }

        if (currentValue === "" && accumulator === null) {
          return;
        } else if (currentValue === "" && accumulator !== null) {
          const roundedNumber = +accumulator / +previousValue;
          result = Math.round(roundedNumber * 1e4) / 1e4;
        } else if (
          previousValue !== 0 &&
          currentValue !== 0 &&
          accumulator !== null
        ) {
          const roundedNumber = +accumulator / +currentValue;
          setAccumulator(roundedNumber);
        } else {
          const roundedNumber = +previousValue / +currentValue;
          setAccumulator(currentValue);
        }
        break;

      default:
        return;
    }

    if (!isNaN(result)) {
      // Если результат - число, отображаем его в виде строки
      // result = result.toFixed(6).toString()
      // .replace(/\.?0+$/, "");

      if (Number.isInteger(+result)) {
        result = +result;
      } else {
        // Если результат - дробное число, форматируем его, чтобы убрать конечный ноль
        result = result
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
          .replace(/(\.\d*?)0+$/, "$1")
          .replace(/\.$/, "");
      }
    } else {
      setDisplay("результат не является числом");
      setCurrentValue("");
      setPreviousValue("");
      setOperator("");
      return;
    }

    setDisplay(result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));

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
    let isNegative;
    const parts = newResult.toString().split(".");
    // Получаем целую и дробную части
    let integerPart = parts[0];
    const decimalPart = parts[1] ? "." + parts[1] : "";

    // console.log("parts[1]", parts[1]);
    // console.log("parts[0]", parts[0]);
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

  function handleNumberClick(number) {
    const proverka = display.includes(".");

    if (display.length >= 33) return; // Проверка на максимальную длину ввода

    if (display === "0" && number === ".") {
      setDisplay("0.");
      setCurrentValue("0.");
    } else if (previousValue !== "" && number === ".") {
      const newResult = 0 + currentValue + number;
      setDisplay(`${previousValue} ${operator} ${0 + number}`);
      setCurrentValue(newResult);
      return;
    } else if (proverka && currentValue !== "0" && number === ".") {
      return;
    } else if (proverka && currentValue === "0" && number === ".") {
      setDisplay("хмммммм");
      return;
    } else if (display === "0" || currentValue === "0") {
      setDisplay(number);
      setCurrentValue(number);
    } else if (
      (previousValue === null || previousValue === "") &&
      operator === ""
    ) {
      const newResult = currentValue + number;
      if (newResult.length >= 16) return; // Проверка на максимальную длину ввода
      setCurrentValue(newResult);
      setDisplay(
        `${formatNumber(newResult).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}`
      );
    } else if (previousValue !== null) {
      const newResult = currentValue + number;
      if (newResult.length >= 16) return; // Проверка на максимальную длину ввода
      setCurrentValue(newResult);
      setDisplay(
        `${previousValue.replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ${operator} ${formatNumber(newResult).replace(
          /\B(?=(\d{3})+(?!\d))/g,
          " "
        )}`
      );
    } else if (currentValue !== "") {
      console.log("currentValue ", currentValue);
      const newResult = currentValue + number;
      setCurrentValue(newResult);
      setDisplay(
        `${accumulator} ${operator} ${
          // formatNumber(newResult)
          newResult
        }`
      );
    } else if (currentValue === "") {
      console.log("currentValue ", currentValue);
      setCurrentValue(number);
      setDisplay(`${accumulator} ${operator} ${number}`);
      return;
    } else {
      console.log("error");
      return;
    }
  }

  function handleOperatorClick(operatorValue) {
    if (operator === "") {
      // первая операция, установили оператор
      setOperator(operatorValue);

      setPreviousValue(currentValue); // Устанавливаем предыдущее значение
      setCurrentValue(""); // Сбрасываем текущее значение для нового ввода

      if (currentValue !== "") {
        setDisplay(`${currentValue} ${operatorValue}`);
      }
    } else if (operatorValue !== operator) {
      // Если новый оператор отличается от предыдущего:
      setOperator(operatorValue);
      if (accumulator !== null) {
        setDisplay(`${accumulator} ${operatorValue}`);
      } else {
        setDisplay(`${previousValue} ${operatorValue}`);
      }
    } else if (operatorValue === operator) {
      if (accumulator !== null) {
        setDisplay(`${accumulator} ${operatorValue}`);
      } else {
        setDisplay(`${previousValue} ${operatorValue}`);
      }
    } else if (operator !== null) {
      setDisplay(`${accumulator} ${operator}`);
    } else {
      console.log("error, парни! все сюда", operator);
    }
    setCurrentValue("");
    return;
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

  function getFontSizeClass(textLength) {
    if (textLength > 20) {
      return "sMOLL ";
    } else if (textLength > 16) {
      return "extra-small-font";
    } else if (textLength > 14) {
      return "smaller-font";
    } else if (textLength > 12) {
      return "small-font";
    } else {
      return ""; // Базовый размер шрифта
    }
  }

  function switchTheme() {
    setTheme(false)
    return
  }


  return (
    <div className="calculator">
      <div className="generalBtn">
        <div className="btn">
          <img src={theme ? questionDark : questionSun} alt="Question" />
        </div>
        <div className="btn" onClick={switchTheme}>
          <img src={theme ? sunDark : moonSun} alt="Sun" />
        </div>
        <div className="btn">
          <img src={theme ? toothDark : toothSun} alt="Tooth" />
        </div>
      </div>
      <div className="containerHistory">
        <div className="history">
          {isHistoryVisible && (
            <ul className="history-list">
              {limitedHistory.reverse().map((entry, index) => (
                <li
                  key={index}
                  className="{`history-item ${getFontSizeClass(entry.expression.length)}`}"
                >
                  <span>{entry.expression}</span> = <span>{entry.result}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className={`display ${getFontSizeClass(display.length)}`}>
        {display}
      </div>
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
