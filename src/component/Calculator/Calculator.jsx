import React from "react";
import { useState } from "react";
import "./Calculator.style.css";
// import { Container, Display, Buttons, Button, Zero } from "./Calculator.style";
import { IoArrowBack, IoTerminal } from "react-icons/io5";
import questionDark from "../image/png/question.png";
import sunDark from "../image/png/sun.png";
import toothDark from "../image/png/tooth.png";
import moonSun from "../image/png/moon.png";
import toothSun from "../image/png/tooth.png";
import questionSun from "../image/png/question.png";
import useTheme from "../hooks/useTheme";
import cn from "classnames";

import Decimal from "decimal.js";

// import { number } from "prop-types";

function Calculator() {
  const [display, setDisplay] = useState("0");
  const [currentValue, setCurrentValue] = useState(null); // второй символ
  const [previousValue, setPreviousValue] = useState(null); // первый символ
  const [operator, setOperator] = useState("");
  const [accumulator, setAccumulator] = useState(null);
  const [history, setHistory] = useState([]); // Состояние для хранения истории
  const [isHistoryVisible, setIsHistoryVisible] = useState(false); // Состояние для отображения истории
  const limitedHistory = history.slice(0, 5);
  const { isDark, setIsDark } = useTheme();
  const [resultCalculated, setResultCalculated] = useState(false); // новое состояние

  function addToHistory(entry) {
    setHistory([entry, ...history]);
    setIsHistoryVisible(true);
  }

  function calculateResult() {
    let result = "0";
    switch (operator) {
      case "+":
        if (currentValue === null && accumulator === null) {
          return;
        } else if (currentValue === null && accumulator !== null) {
          result = new Decimal(accumulator).plus(previousValue).toNumber();
        } else if (accumulator !== null) {
          result = new Decimal(accumulator).plus(currentValue).toNumber();
          setAccumulator(result);
        } else {
          result = new Decimal(previousValue).plus(currentValue).toNumber();
          setAccumulator(currentValue);
        }
        break;

      case "-":
        if (currentValue === null && accumulator === null) {
          return;
        } else if (currentValue === null && accumulator !== null) {
          result = new Decimal(accumulator).minus(previousValue).toNumber();
        } else if (accumulator !== null) {
          result = new Decimal(accumulator).minus(currentValue).toNumber();
          setAccumulator(result);
        } else {
          result = new Decimal(previousValue).minus(currentValue).toNumber();
          setAccumulator(currentValue);
        }
        break;

      case "*":
        if (currentValue === null && accumulator === null) {
          return;
        } else if (currentValue === null && accumulator !== null) {
          result = new Decimal(accumulator).times(previousValue).toNumber();
        } else if (accumulator !== null) {
          result = new Decimal(accumulator).times(currentValue).toNumber();
          setAccumulator(result);
        } else {
          result = new Decimal(previousValue).times(currentValue).toNumber();
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

        if (currentValue === null && accumulator === null) {
          return;
        } else if (currentValue === null && accumulator !== null) {
          const roundedNumber = new Decimal(accumulator).div(previousValue);
          result = roundedNumber.toNumber();
        } else if (
          previousValue !== 0 &&
          currentValue !== 0 &&
          accumulator !== null
        ) {
          result = new Decimal(accumulator).div(currentValue).toNumber();
          setAccumulator(result);
        } else {
          result = new Decimal(previousValue).div(currentValue).toNumber();
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
        result = result.toString();
        // .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
      }
    } else {
      setDisplay("результат не является числом");
      setCurrentValue(null);
      setPreviousValue(null);
      setOperator(null);
      return;
    }

    setDisplay(
      result.toString()
      // .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
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

    if (resultCalculated) {
      console.log("resultCalculated1", resultCalculated);
      setCurrentValue(null);
      setOperator("");
      return;
    }
    if (display.length >= 33) return;

    if (display === "0" && number === ".") {
      console.log("currentValue ", currentValue);
      setDisplay("0.");
      setCurrentValue("0.");
    } else if (
      currentValue !== null &&
      number === "." &&
      previousValue === null
    ) {
      console.log("currentValue ", currentValue);
      if (proverka === false) {
        if (accumulator !== null) {
          const newResult = `${accumulator} ${operator} ${
            currentValue + number
          }`;
          setDisplay(newResult);
          setCurrentValue(currentValue + number);
          console.log("accumulator !== null ", accumulator);
          return;
        }
        console.log("accumulator === null ", accumulator);
        const newResult = currentValue + number;
        setDisplay(newResult);
        setCurrentValue(newResult);
        return;
      } else if (proverka === true && accumulator !== null) {
        return;
      }
    } else if (
      previousValue !== null &&
      currentValue !== null &&
      number === "."
    ) {
      console.log("currentValue ", currentValue);
      const proverka2 = currentValue.includes(".");
      if (proverka2 === false) {
        const newResult = `${previousValue} ${operator} ${
          currentValue + number
        }`;
        setDisplay(newResult);
        setCurrentValue(currentValue + number);
        return;
      } else if (proverka2 === true) {
        return;
      }
    } else if (display === "0" || currentValue === "0") {
      setDisplay(number);
      setCurrentValue(number);
    } else if (
      accumulator === null &&
      previousValue === null &&
      operator === ""
    ) {
      console.log("aba");

      const newResult = currentValue + number;
      if (newResult.length >= 16) return;
      setCurrentValue(newResult);
      setDisplay(
        `${formatNumber(newResult).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}`
      );
    } else if (previousValue !== null) {
      console.log("currentValue ", currentValue);
      let newResult;
      if (currentValue !== null) {
        newResult = currentValue + number;
      } else {
        newResult = number;
      }

      if (newResult.length >= 16) return;
      setCurrentValue(newResult);
      setDisplay(
        `${previousValue.replace(
          /\B(?=(\d{3})+(?!\d))/g,
          " "
        )} ${operator} ${newResult.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}`
      );
    } else if (currentValue !== null && operator !== "") {
      console.log("currentValue ", currentValue);
      const newResult = currentValue + number;
      setCurrentValue(newResult);
      setDisplay(`${accumulator} ${operator} ${newResult}`);
    } else if (
      currentValue === null &&
      operator !== "" &&
      accumulator !== null
    ) {
      console.log("accumulator ", accumulator);
      setCurrentValue(number);
      setDisplay(`${accumulator} ${operator} ${number}`);
      return;
    } else {
      console.log("accumulator ", accumulator);
      console.log("currentValue ", currentValue);
      console.log("previousValue ", previousValue);
      console.log("operator ", operator);
      console.log("error");
      return;
    }
  }

  function handleOperatorClick(operatorValue) {
    if (resultCalculated) {
      console.log("resultCalculated", resultCalculated);
      setOperator(operatorValue);
      setCurrentValue(null);
      if (accumulator !== null) {
        setDisplay(`${accumulator} ${operatorValue}`);
      } else {
        setDisplay(`${previousValue} ${operatorValue}`);
      }
      setResultCalculated(false);
      return;
    }

    const currentNumber = +currentValue;
    const previousNumber = +previousValue;
    let result;

    if (operator !== "") {
      console.log("operator !== '' ", previousValue);
      if (operator === "+") {
        console.log("accumulator ", accumulator);
        console.log("currentValue ", currentValue);
        console.log("previousValue ", previousValue);
        console.log("operator ", operator);
        if (currentValue === null && accumulator === null) {
          setDisplay(operatorValue);
          setOperator(operatorValue);
          return;
        } else if (
          currentValue === null &&
          accumulator !== null &&
          previousValue !== null
        ) {
          result = new Decimal(accumulator).plus(previousValue).toNumber();
          return;
        } else if (accumulator !== null && currentValue !== null) {
          console.log("accumulator ", accumulator);
          console.log("currentValue ", currentValue);
          console.log("previousValue ", previousValue);
          console.log("operator ", operator);
          result = new Decimal(accumulator).plus(currentValue).toNumber();
          setAccumulator(result);
        } else if (previousValue !== null && currentValue !== null) {
          console.log("accumulator ", accumulator);
          console.log("currentValue ", currentValue);
          console.log("previousValue ", previousValue);
          console.log("operator ", operator);
          result = new Decimal(previousValue).plus(currentValue).toNumber();
          setAccumulator(result);
        } else {
          console.log("accumulator ", accumulator);
          console.log("currentValue ", currentValue);
          console.log("previousValue ", previousValue);
          console.log("operator ", operator);
          setOperator(operatorValue);
          setDisplay(`${accumulator} ${operatorValue}`);
          console.log("error?");
          return;
        }
      } else if (operator === "-") {
        if (currentValue === null && accumulator === null) {
          setDisplay(operatorValue);
          setOperator(operatorValue);
          return;
        } else if (
          currentValue === null &&
          accumulator !== null &&
          previousValue !== null
        ) {
          result = new Decimal(accumulator).minus(previousValue).toNumber();
        } else if (accumulator !== null && currentValue !== null) {
          result = new Decimal(accumulator).minus(currentValue).toNumber();
          setAccumulator(result);
        } else if (previousValue !== null && currentValue !== null) {
          result = new Decimal(previousValue).minus(currentValue).toNumber();
          setAccumulator(currentValue);
        } else {
          setOperator(operatorValue);
          setDisplay(`${accumulator} ${operatorValue}`);
          console.log("error?");
          return;
        }
      } else if (operator === "*") {
        if (currentValue === null && accumulator === null) {
          setDisplay(operatorValue);
          setOperator(operatorValue);
          return;
        }
        result = previousNumber * currentNumber;
      } else if (operator === "/") {
        if (currentValue === "0") {
          setDisplay("Ошибка");
          setCurrentValue("");
          setPreviousValue("");
          setOperator("");
          return;
        }
        if (currentValue === null && accumulator === null) {
          setDisplay(operatorValue);
          setOperator(operatorValue);
          return;
        }
        result = previousNumber / currentNumber;
      }
    }

    if (operator === "" && (previousValue || currentValue) === null) {
      setOperator(operatorValue);
      setDisplay(`${operatorValue}`);
      setCurrentValue("0");
      // setPreviousValue(0)
      console.log(
        "operator === '' && (previousValue || currentValue ) === null"
      );
    }

    if (operator === "") {
      setPreviousValue(currentValue);
      setCurrentValue(null);

      if (currentValue !== null) {
        setOperator(operatorValue);
        setDisplay(`${currentValue} ${operatorValue}`);
      } else {
        return;
      }
    } else if (
      operatorValue !== operator &&
      currentValue === null &&
      (previousValue !== null || accumulator !== null)
    ) {
      console.log("operatorValue !== operator");
      setOperator(operatorValue);
      if (accumulator !== null) {
        setDisplay(`${accumulator} ${operatorValue}`);
      } else {
        setDisplay(`${previousValue} ${operatorValue}`);
      }
    } else if (
      operatorValue === operator &&
      currentValue === null &&
      (previousValue !== null || accumulator !== null)
    ) {
      console.log("operatorValue === operator");
      if (accumulator !== null) {
        setDisplay(`${accumulator} ${operatorValue}`);
      } else {
        setDisplay(`${previousValue} ${operatorValue}`);
      }
    } else if (operator !== null && currentValue !== null) {
      if (accumulator === null) {
        console.log("result", result);
        calculateResult();
        setDisplay(`${result + operatorValue}`);
        setOperator(operatorValue);
        console.log("setOperator", operatorValue);
      } else {
        console.log("result", result, "currentValue", currentValue);
        calculateResult();
        setDisplay(`${result + operatorValue}`);
        setOperator(operatorValue);
        console.log("setOperator", operatorValue);
      }
    } else {
      console.log("error, парни! все сюда", operator);
    }
    setCurrentValue(null);
    return;
  }

  function handleClearClick() {
    setDisplay("0");
    setCurrentValue(null);
    setOperator("");
    setPreviousValue(null);
    setAccumulator(null);
    setIsHistoryVisible(false);
    setHistory([]);
    setResultCalculated(false);
  }

  function handleEqualsClick() {
    // console.log("accumL ", accumulator);
    // console.log("operator", operator);
    // console.log("currentValue", currentValue);
    // console.log("previousValue", previousValue);

    if (currentValue === null) {
      // console.log(
      //   "первое событие",
      //   accumulator,
      //   operator,
      //   currentValue,
      //   previousValue
      // );
      return;
    } else if (currentValue !== null && operator === "") {
      // console.log(
      //   "второе событие",
      //   accumulator,
      //   operator,
      //   currentValue,
      //   previousValue
      // );
      return;
    } else if (
      previousValue !== null &&
      operator !== "" &&
      currentValue.toString().includes(".")
    ) {
      console.log("Нет символов: ", currentValue);
      setAccumulator(previousValue);
      setDisplay(previousValue);
      setOperator("");
      setCurrentValue(null);
      setPreviousValue(null);
      return;
    } else if (accumulator !== null && currentValue.toString().includes(".")) {
      const parts = currentValue.split(".");
      console.log("currentValue содержит точку: ", currentValue);
      if (parts[0] === "" && parts[1] === "") {
        console.log("Нет символов до или после точки: ", currentValue);

        setAccumulator(accumulator);
        setDisplay(accumulator);
        setOperator("");
        setCurrentValue(null);
        setPreviousValue(null);

        return;
      } else calculateResult();
      setResultCalculated(true);
    } else {
      // console.log(
      //   "третье событие",
      //   accumulator,
      //   operator,
      //   currentValue,
      //   previousValue
      // );
      calculateResult();
      setResultCalculated(true);
    }
  }

  function handlePercentClick() {
    // console.log("accumL ", accumulator);
    // console.log("currentValue", currentValue);
    // console.log("previousValue", previousValue);

    let result;
    if (currentValue === null) return;

    // Проверка: если оператор не задан и предыдущего значения нет, выводим ошибку
    if ((!previousValue || !accumulator) && !operator) {
      setDisplay("Ошибка");
      setCurrentValue(null);
      setOperator("");
      setPreviousValue(null);
      setAccumulator(null);
      setIsHistoryVisible(false);
      setHistory([]);
      setResultCalculated(false);
      return;
    }

    if (operator === "+" || operator === "-") {
      if (accumulator) {
        result = (accumulator * currentValue) / 100;
      } else result = (previousValue * currentValue) / 100;
    } else if (operator === "*" || operator === "/") {
      if (accumulator) {
        result = (currentValue / 100) * accumulator;
      } else result = (currentValue / 100) * previousValue;
    } else {
      result = currentValue / 100;
      console.log("error");
    }
    // console.log("result ", result);
    // console.log("operator", operator);
    // console.log("previousValue", previousValue);
    setCurrentValue(result);
    setDisplay(
      `${previousValue ? previousValue : accumulator} ${
        operator ? operator : ""
      } ${result}`
    );
  }

  function getFontSizeClass(textLength) {
    if (typeof textLength === "undefined") {
      return ""; // Если textLength не определено, возвращаем пустую строку
    }

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

  const deleteLastDigit = () => {
    if (accumulator !== null) {
      if (operator === "") {
        return;
      } else if (operator !== "" && currentValue === null) {
        return;
      } else {
        if (currentValue !== "") {
          setCurrentValue(currentValue.slice(0, -1));
          setDisplay(() => {
            const newCurrentValue = currentValue.slice(0, -1);
            const newDisplay = `${accumulator} ${operator} ${newCurrentValue}`;

            if (newCurrentValue === "") {
              setCurrentValue(null);
              const newDisplay = `${accumulator} ${operator} `;
              return newDisplay;
            }
            return newDisplay;
          });
        } else {
          return;
        }
      }
      return;
    } else if (currentValue === null && operator !== "") {
      return;
    } else if (display === "0") {
      return;
    } else if (currentValue !== "0" && operator === "") {
      setDisplay(() => {
        const newDisplay = currentValue.slice(0, -1);

        if (newDisplay === "") {
          setCurrentValue(null);
          return "0";
        }
        setCurrentValue(currentValue.slice(0, -1));
        console.log("currentValue", currentValue);
        console.log("newDisplay", newDisplay);
        return newDisplay;
      });
    } else if (previousValue !== null && operator !== "") {
      if (currentValue !== "") {
        setCurrentValue(currentValue.slice(0, -1));
        setDisplay(() => {
          const newCurrentValue = currentValue.slice(0, -1);
          const newDisplay = `${previousValue} ${operator} ${newCurrentValue}`;

          if (newCurrentValue === "") {
            setCurrentValue(null);
            const newDisplay = `${previousValue} ${operator} `;
            return newDisplay;
          }
          return newDisplay;
        });
      } else {
        return;
      }

      console.log("currentValue", currentValue);
    } else {
      console.log("error");
      return;
    }
  };

  return (
    <div
      className={cn(
        "layout",
        {
          dark: isDark,
        },
        "calculator"
      )}
    >
      <div
        className={cn(
          "layout",
          {
            dark: isDark,
          },
          "generalBtn"
        )}
      >
        <div className="btn">
          <img
            src={isDark ? questionSun : questionDark}
            alt="Question"
            width={22}
            height={22}
          />
        </div>
        <div
          className={cn(
            "layout",
            {
              dark: isDark,
            },
            "btn"
          )}
          onClick={() => setIsDark(!isDark)}
        >
          <img
            src={isDark ? moonSun : sunDark}
            alt="Sun"
            width={22}
            height={22}
          />
        </div>
        <div className="btn">
          <img
            src={isDark ? toothSun : toothDark}
            alt="Tooth"
            width={22}
            height={22}
          />
        </div>
      </div>
      <div className="containerHistory">
        <div className="history">
          {isHistoryVisible && (
            <ul
              className={cn(
                "layout",
                {
                  dark: isDark,
                },
                "history-list"
              )}
              id="history"
            >
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
      <div
        className={cn(
          "layout",
          {
            dark: isDark,
          },
          `display ${getFontSizeClass(display.length)}`
        )}
      >
        {display}
      </div>
      <div className="buttons">
        <div className="row">
          <button
            className={cn(
              "layout",
              {
                dark: isDark,
              },
              "clear operator"
            )}
            onClick={handleClearClick}
          >
            AC
          </button>

          <button
            className={cn(
              "layout",
              {
                dark: isDark,
              },
              "operator"
            )}
            onClick={deleteLastDigit}
          >
            <IoArrowBack />
          </button>

          <button
            className={cn(
              "layout",
              {
                dark: isDark,
              },
              "operator"
            )}
            onClick={() => handleOperatorClick("/")}
          >
            /
          </button>
          <button
            className={cn(
              "layout",
              {
                dark: isDark,
              },
              "operator"
            )}
            onClick={() => handleOperatorClick("*")}
          >
            x
          </button>
        </div>
        <div className="row">
          <button
            className={cn(
              "layout",
              {
                dark: isDark,
              },
              "button"
            )}
            onClick={() => handleNumberClick("7")}
          >
            7
          </button>
          <button
            className={cn(
              "layout",
              {
                dark: isDark,
              },
              "button"
            )}
            onClick={() => handleNumberClick("8")}
          >
            8
          </button>
          <button
            className={cn(
              "layout",
              {
                dark: isDark,
              },
              "button"
            )}
            onClick={() => handleNumberClick("9")}
          >
            9
          </button>
          <button
            className={cn(
              "layout",
              {
                dark: isDark,
              },
              "operator"
            )}
            onClick={() => handleOperatorClick("-")}
          >
            -
          </button>
        </div>

        <div className="row">
          <button
            className={cn(
              "layout",
              {
                dark: isDark,
              },
              "button"
            )}
            onClick={() => handleNumberClick("4")}
          >
            4
          </button>
          <button
            className={cn(
              "layout",
              {
                dark: isDark,
              },
              "button"
            )}
            onClick={() => handleNumberClick("5")}
          >
            5
          </button>
          <button
            className={cn(
              "layout",
              {
                dark: isDark,
              },
              "button"
            )}
            onClick={() => handleNumberClick("6")}
          >
            6
          </button>
          <button
            className={cn(
              "layout",
              {
                dark: isDark,
              },
              "operator"
            )}
            onClick={() => handleOperatorClick("+")}
          >
            +
          </button>
        </div>
        <div className="container">
          <div>
            <div className="row">
              <button
                className={cn(
                  "layout",
                  {
                    dark: isDark,
                  },
                  "button"
                )}
                onClick={() => handleNumberClick("1")}
              >
                1
              </button>
              <button
                className={cn(
                  "layout",
                  {
                    dark: isDark,
                  },
                  "button"
                )}
                onClick={() => handleNumberClick("2")}
              >
                2
              </button>
              <button
                className={cn(
                  "layout",
                  {
                    dark: isDark,
                  },
                  "button"
                )}
                onClick={() => handleNumberClick("3")}
              >
                3
              </button>
            </div>
            <div className="row">
              <button
                className={cn(
                  "layout",
                  {
                    dark: isDark,
                  },
                  "operator"
                )}
                onClick={handlePercentClick}
              >
                %
              </button>
              <button
                className={cn(
                  "layout",
                  {
                    dark: isDark,
                  },
                  "button"
                )}
                onClick={() => handleNumberClick("0")}
              >
                0
              </button>
              <button
                className={cn(
                  "layout",
                  {
                    dark: isDark,
                  },
                  "button"
                )}
                onClick={() => handleNumberClick(".")}
              >
                .
              </button>
            </div>
          </div>
          <button
            className={cn(
              "layout",
              {
                dark: isDark,
              },
              "calculate"
            )}
            onClick={handleEqualsClick}
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
