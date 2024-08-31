import React from "react";
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

  function addToHistory(entry) {
    // Функция для добавления записи в историю
    setHistory([entry, ...history]);
    setIsHistoryVisible(true);
  }

  function calculateResult() {
    let result = "0";
    console.log("было дело ", operator);
    // console.log("accum ", accumulator);
    switch (operator) {
      // case "+":
      //   if (currentValue === "" && accumulator === null) {
      //     console.log("currentValue ", currentValue);
      //     return;
      //   } else if (currentValue === "" && accumulator !== null) {
      //     console.log("currentValue ", currentValue);
      //     result = +accumulator + +previousValue;
      //   } else if (
      //     previousValue !== 0 &&
      //     currentValue !== 0 &&
      //     accumulator !== null
      //   ) {
      //     console.log("currentValue ", currentValue);
      //     result = parseFloat(+accumulator + +currentValue);
      //   } else {
      //     result = +previousValue + +currentValue;
      //   }
      //   break;

      // case "-":
      //   if (currentValue === "" && accumulator === null) {
      //     return;
      //   } else if (currentValue === "" && accumulator !== null) {
      //     result = +accumulator - +previousValue;
      //   } else if (
      //     previousValue !== 0 &&
      //     currentValue !== 0 &&
      //     accumulator !== null
      //   ) {
      //     result = parseFloat(+accumulator - +currentValue);
      //   } else {
      //     result = +previousValue - +currentValue;
      //   }
      //   break;

      // case "*":
      //   if (currentValue === "" && accumulator === null) {
      //     return;
      //   } else if (currentValue === "" && accumulator !== null) {
      //     result = +accumulator * +previousValue;
      //   } else if (
      //     previousValue !== 0 &&
      //     currentValue !== 0 &&
      //     accumulator !== null
      //   ) {
      //     result = parseFloat(+accumulator * +currentValue);
      //     setAccumulator(result);
      //   } else {
      //     result = +previousValue * +currentValue;
      //     setAccumulator(currentValue);
      //   }
      //   break;

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

    // console.log("previousValue ", previousValue);
    // console.log("currentValue ", currentValue);
    // console.log("accum ", accumulator);
    // console.log("newResult ", newResult);

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
        // .replace(/(\.\d*?)0+$/, "$1")
        // .replace(/\.$/, "");
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
    // console.log("currentValue", currentValue);
    // console.log("previousValue", previousValue);
    if (display.length >= 33) return; // Проверка на максимальную длину ввода

    if (display === "0" && number === ".") {
      setDisplay("0.");
      setCurrentValue("0.");
    } else if (
      currentValue !== null &&
      number === "." &&
      previousValue === null
    ) {
      if (proverka === false) {
        const newResult = currentValue + number;
        setDisplay(newResult);
        setCurrentValue(newResult);
        return;
      } else if (proverka === true) {
        return;
      }
    } else if (
      previousValue !== null &&
      currentValue !== null &&
      number === "."
    ) {
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
      let newResult;
      if (currentValue !== null) {
        newResult = currentValue + number;
      } else {
        newResult = number;
      }

      if (newResult.length >= 16) return; // Проверка на максимальную длину ввода
      setCurrentValue(newResult);
      setDisplay(
        `${previousValue.replace(
          /\B(?=(\d{3})+(?!\d))/g,
          " "
        )} ${operator} ${newResult.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}`
      );
    } else if (currentValue !== null) {
      const newResult = currentValue + number;
      setCurrentValue(newResult);
      setDisplay(
        `${accumulator} ${operator} ${
          // formatNumber(newResult)
          newResult
        }`
      );
    } else if (currentValue === null) {
      // console.log("currentValue ", currentValue);
      setCurrentValue(number);
      setDisplay(`${accumulator} ${operator} ${number}`);
      return;
    } else {
      console.log("error");
      return;
    }
  }

  function handlePercentClick() {
    let result;
    if (currentValue === null) return;

    if (operator === "+" || operator === "-") {
      result = (previousValue * currentValue) / 100;
    } else if (operator === "*" || operator === "/") {
      result = (currentValue / 100) * previousValue;
    } else {
      result = currentValue / 100;
    }

    setCurrentValue(result);
    setDisplay(
      `${previousValue ? previousValue : ""} ${
        operator ? operator : ""
      } ${result}`
    );
  }

  function handleOperatorClick(operatorValue) {
    if (operator === "") {
      // первая операция, установили оператор
      setOperator(operatorValue);

      setPreviousValue(currentValue); // Устанавливаем предыдущее значение
      // setCurrentValue(""); // Сбрасываем текущее значение для нового ввода
      setCurrentValue(null); // Сбрасываем текущее значение для нового ввода

      if (currentValue !== null) {
        setDisplay(`${currentValue} ${operatorValue}`);
      }
    } else if (
      operatorValue !== operator
      // && currentValue === null
    ) {
      console.log("operatorValue !== operator");
      setOperator(operatorValue);
      if (accumulator !== null) {
        setDisplay(`${accumulator} ${operatorValue}`);
      } else {
        setDisplay(`${previousValue} ${operatorValue}`);
      }
    }
     else if (operatorValue === operator && currentValue === null) {
      console.log("operatorValue === operator");
      console.log("currentValueК", currentValue);
      console.log("accumК ", accumulator);
      if (accumulator !== null) {
        setDisplay(`${accumulator} ${operatorValue}`);
      } else {
        setDisplay(`${previousValue} ${operatorValue}`);
      }
    } 
    // else if (operator !== null && accumulator !== null) {
    //   console.log("error, парни! все сюда", operator);
    //   setDisplay(`${accumulator} ${operator}`);
    // }
    else if (operatorValue !== null && currentValue !== null) {
      // setOperator(operatorValue);
      // console.log("accumL ", accumulator);
      // console.log("currentValue", currentValue);
      // console.log("previousValue", previousValue);

      // Преобразование переменных в числа
      const currentNumber = +currentValue;
      const previousNumber = +previousValue;

      let result;

      // В зависимости от значения оператора, выполняем соответствующую операцию
      if (operatorValue === "+") {
        result = currentNumber + previousNumber;
      } else if (operatorValue === "-") {
        result = previousNumber - currentNumber;
      } else if (operatorValue === "*") {
        result = previousNumber * currentNumber;
      } else if (operatorValue === "/") {
        result = previousNumber / currentNumber;
      }
      if (accumulator === null) {
        calculateResult();
        // setDisplay(`${result}`);
        // setOperator('');
        // console.log("error1");
      } else {
        // const result2 = +accumulator + previousNumber;
        calculateResult();
        // setDisplay(`${result2}`);
        // setOperator('');
        // console.log("error2");
      }
    }

    // ======================
    // else if (
    //   operatorValue !== null &&
    //   accumulator !== null &&
    //   currentValue !== null
    // ) {
    //   console.log("previousValue ", previousValue);
    //   console.log("currentValue ", currentValue);
    //   console.log("accumulator ", accumulator);
    //   // console.log("number ", number);
    //   // console.log("newResult ", newResult);
    //   setOperator(operatorValue);
    //   console.log("error2");
    //   // result = +previousValue - +currentValue;
    //   calculateResult(); // Рассчитываем и устанавливаем новый результат

    //   // Теперь предполагаем, что calculateResult обновит accumulator
    //   // setOperator(operatorValue); // Устанавливаем новый оператор

    //   // Обновляем отображение, используя новое значение аккумулятора
    //   // setDisplay(`${accumulator} ${operatorValue}`);
    // }
    // ==========================
     else {
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
  }

  function handleEqualsClick() {
    calculateResult();
  }

  const deleteLastDigit = () => {
    // Выводим текущие значения для отладки
    console.log("currentValue", currentValue);
    console.log("operator", operator);
    console.log("previousValue", previousValue);
    console.log("accumulator", accumulator);

    if (currentValue !== null && currentValue === accumulator) {
      console.log("выходим парни");
      return; // Возвращаемся, если currentValue равно аккумулятору
    } else if (accumulator !== null && currentValue === null) {
      console.log("выходим парни");
      return; // Возвращаемся, если accumulator не равно null и currentValue пустая строка
    } else if (currentValue === null && operator !== "") {
      console.log("выходим парни!");
      return; // Возвращаемся, если currentValue пустое и установлен оператор
    } else if (display === "0") {
      console.log("выходим парни!!");
      return; // Возвращаемся, если текущее отображение равно "0"
    } else if (currentValue !== "0" && operator === "") {
      console.log("1");
      // Удаляем последний символ из currentValue
      setCurrentValue(currentValue.slice(0, -1));
      // Обновляем отображение
      setDisplay((prevDisplay) => {
        const newDisplay = currentValue.slice(0, -1);
        if (newDisplay === "") {
          return "0";
        }
        return newDisplay;
      });
    } else if (previousValue !== null && operator !== "") {
      console.log("12");
      // Удаляем последний символ из currentValue
      setCurrentValue(currentValue.slice(0, -1));
      // Обновляем отображение
      setDisplay((prevDisplay) => {
        const newDisplay = currentValue.slice(0, -1);
        return `${previousValue} ${operator} ${newDisplay}`;
      });
    } else {
      console.log("error");
      return; // Возвращаемся в случае ошибки или непредвиденного состояния
    }
  };

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
