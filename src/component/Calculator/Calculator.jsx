import React from "react";
import { useState } from "react";
import "./Calculator.style.css";
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

import arrowLeft from "../image/svg/arrow-left.svg";
import cross from "../image/svg/cross.svg";

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

  const [activePage, setActivePage] = useState("main"); // Управляем отображением страниц
  const [setting, setSetting] = useState(false);

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
      if (result.toString().length > 16) {
        result = result.toExponential(10); // Преобразует в научную нотацию с 10 знаками после запятой
      } else if (Number.isInteger(+result)) {
        result = +result;
      } else {
        result = result.toString();
      }
    } else {
      setDisplay("результат не является числом");
      setCurrentValue(null);
      setPreviousValue(null);
      setOperator(null);
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

    if (integerPart.includes("-")) {
      integerPart = integerPart.replace("-", "");
      isNegative = true;
    } else {
      isNegative = false;
    }
    let formattedNumber = (isNegative ? "-" : "") + integerPart + decimalPart;
    const returnFormattedNumber = parseFloat(formattedNumber)
      .toFixed(6)
      .replace(/\.?0+$/, "");
    return returnFormattedNumber;
  }

  function handleNumberClick(number) {
    const proverka = display.includes(".");

    if (resultCalculated) {
      setCurrentValue(null);
      setOperator("");
      return;
    }

    if (
      (currentValue && currentValue.toString().length >= 19) ||
      (previousValue && previousValue.toString().length >= 19) ||
      display.length >= 41
    )
      return;

    if (display === "0" && number === ".") {
      setDisplay("0.");
      setCurrentValue("0.");
    } else if (
      currentValue !== null &&
      number === "." &&
      previousValue === null
    ) {
      if (proverka === false) {
        if (accumulator !== null) {
          const newResult = `${accumulator} ${operator} ${
            currentValue + number
          }`;
          setDisplay(newResult);
          setCurrentValue(currentValue + number);
          return;
        }
        const newResult = currentValue + number;
        setDisplay(newResult);
        setCurrentValue(newResult);
        return;
      } else if (proverka === true && accumulator !== null) {
        const proverka3 = currentValue.includes(".");

        if (proverka3 === false) {
          if (accumulator !== null) {
            const newResult = `${accumulator} ${operator} ${
              currentValue + number
            }`;
            setDisplay(newResult);
            setCurrentValue(currentValue + number);
            return;
          }
        } else if (proverka3 === true) {
          return;
        }
      }
      return;
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
      accumulator === null &&
      previousValue === null &&
      operator === ""
    ) {
      const newResult = currentValue + number;
      if (newResult.length >= 16) return;
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

      if (newResult.length >= 16) return;
      setCurrentValue(newResult);
      setDisplay(
        `${previousValue.replace(
          /\B(?=(\d{3})+(?!\d))/g,
          " "
        )} ${operator} ${newResult.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}`
      );
    } else if (currentValue !== null && operator !== "") {
      const newResult = currentValue + number;
      setCurrentValue(newResult);
      setDisplay(
        `${accumulator
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ${operator} ${newResult
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}`
      );
    } else if (
      currentValue === null &&
      operator !== "" &&
      accumulator !== null
    ) {
      setCurrentValue(number);
      setDisplay(
        `${accumulator
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ${operator} ${number}`
      );
      return;
    } else {
      console.log("error");
      return;
    }
  }

  function handleOperatorClick(operatorValue) {
    const currentNumber = +currentValue;
    const previousNumber = +previousValue;
    let result;

    if (resultCalculated) {
      setOperator(operatorValue);
      setCurrentValue(null);
      if (accumulator !== null) {
        setDisplay(
          `${accumulator
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ${operatorValue}`
        );
      } else {
        setDisplay(
          `${previousValue
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ${operatorValue}`
        );
      }
      setResultCalculated(false);
      return;
    }

    if (operator !== "") {
      if (operator === "+") {
        console.log("currentValue :", currentValue);
        if (currentValue === null && accumulator === null ) {
          setDisplay(operatorValue);
          setOperator(operatorValue);
          return;
        } else if (
          currentValue === null &&
          accumulator !== null &&
          previousValue !== null
        ) {
          console.log("currentValue :", currentValue);
          result = new Decimal(accumulator).plus(previousValue).toNumber();
          return;
        } else if (accumulator !== null && currentValue !== null) {
          console.log("currentValue :", currentValue);
          result = new Decimal(accumulator).plus(currentValue).toNumber();
          setAccumulator(result);
        } else if (previousValue !== null && currentValue !== null) {
          console.log("currentValue :", currentValue);
          result = new Decimal(previousValue).plus(currentValue).toNumber();
          setAccumulator(result);
        } else {
          console.log("currentValue :", currentValue);
          console.log("operator :", operator);
          let formattedAccumulator = accumulator
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
          setOperator(operatorValue);
          setDisplay(`${formattedAccumulator} ${operatorValue}`);
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
          let formattedAccumulator = accumulator
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
          setOperator(operatorValue);
          setDisplay(`${formattedAccumulator} ${operatorValue}`);
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
      console.log("currentValue :", currentValue);
      setOperator(operatorValue);
      setDisplay(`${operatorValue}`);
      setCurrentValue("0");
    }

    if (operator === "") {
      setPreviousValue(currentValue);
      setCurrentValue(null);

      if (currentValue !== null) {
        setOperator(operatorValue);
        setDisplay(
          `${currentValue.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            " "
          )} ${operatorValue}`
        );
      } else {
        return;
      }
    } else if (
      operatorValue !== operator &&
      currentValue === null &&
      (previousValue !== null || accumulator !== null)
    ) {
      setOperator(operatorValue);
      if (accumulator !== null) {
        setDisplay(
          `${accumulator
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ${operatorValue}`
        );
      } else {
        setDisplay(
          `${previousValue
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ${operatorValue}`
        );
      }
    } else if (
      operatorValue === operator &&
      currentValue === null &&
      (previousValue !== null || accumulator !== null)
    ) {
      console.log("currentValue :", currentValue);
      if (accumulator !== null) {
        console.log("currentValue :", currentValue);
        setDisplay(
          `${accumulator
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ${operatorValue}`
        );
      } else {
        console.log("currentValue :", currentValue);
        setDisplay(
          `${previousValue
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ${operatorValue}`
        );
      }
    } else if (operator !== null && currentValue !== null) {
      console.log("currentValue :", currentValue);
      if (accumulator === null) {
        calculateResult();
        setDisplay(`${result + operatorValue}`);
        setOperator(operatorValue);
      } else {
        console.log("currentValue :", currentValue);
        calculateResult();
        setDisplay(`${result + operatorValue}`);
        setOperator(operatorValue);
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
    if (currentValue === null && accumulator === null) {
      // console.log(
      //   "первое событие, выходим парни!...",
      //   accumulator,
      //   operator,
      //   currentValue,
      //   previousValue
      // );
      return;
    } else if (currentValue !== null && operator === "") {
      // console.log(
      //   "второе событие, выходим парни!...",
      //   accumulator,
      //   operator,
      //   currentValue,
      //   previousValue
      // );
      return;
    } else if (
      accumulator !== null &&
      currentValue === null &&
      operator !== ""
    ) {
      // console.log(
      //   "второе событие, выходим парни!...",
      //   accumulator,
      //   operator,
      //   currentValue,
      //   previousValue
      // );
      return;
    } else if (previousValue !== null && operator !== "") {
      // setAccumulator(previousValue);
      // setDisplay(previousValue);
      // setOperator("");
      // setCurrentValue(null);
      // setPreviousValue(null);

      calculateResult();
      setResultCalculated(true);
      return;
    } else {
      // console.log(
      //   "третье событие, работаем парни!...",
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
    let result;

    if (currentValue === null) return;

    if (operator === "+" || operator === "-") {
      if (accumulator) {
        result = (accumulator * currentValue) / 100;
      } else result = (previousValue * currentValue) / 100;
    } else if (operator === "*" || operator === "/") {
      result = currentValue / 100;
    } else {
      result = currentValue / 100;
      console.log("error", currentValue);
      setCurrentValue(result.toString());
      setDisplay(result.toString());
      return
    }

    setCurrentValue(result);
    setDisplay(
      `${previousValue ? previousValue : accumulator} ${
        operator ? operator : ""
      } ${result}`
    );
  }

  function getFontSizeClass(textLength) {
    if (typeof textLength === "undefined") {
      return "";
    }

    if (textLength > 26) {
      return "sMOLLExtra ";
    } else if (textLength > 20) {
      return "sMOLL";
    } else if (textLength > 16) {
      return "extra-small-font";
    } else if (textLength > 14) {
      return "smaller-font";
    } else if (textLength > 12) {
      return "small-font";
    } else {
      return "";
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
      {setting && (
        <div className="settings">
          {activePage === "main" && (
            <div>
              <button
                onClick={() => setSetting(!setting)}
                className="settingsButton settingsCross"
              >
                <img src={cross} alt="cross" width={24} height={24} />
              </button>

              <ul>
                <li onClick={() => setActivePage("theme")}>
                  {" "}
                  <h3>Other Theme</h3>{" "}
                </li>
                <li onClick={() => setActivePage("help")}>
                  <h3>Help</h3>
                </li>
                <li onClick={() => setActivePage("about")}>
                  <h3>About us</h3>
                </li>
              </ul>
            </div>
          )}
          {activePage === "theme" && (
            <div className="themePage">
              <button
                onClick={() => setActivePage("main")}
                className="settingsArrowLeft settingsButton"
              >
                <img src={arrowLeft} alt="arrowLeft" width={24} height={24} />
              </button>
              <button
                onClick={() => {
                  setSetting(!setting);
                  setActivePage("main");
                }}
                className="settingsCross settingsButton"
              >
                <img src={cross} alt="cross" width={24} height={24} />
              </button>
              <h2 className="settingsTitle">Theme Options</h2>
            </div>
          )}

          {activePage === "help" && (
            <div className="helpPage">
              <button
                onClick={() => setActivePage("main")}
                className="settingsArrowLeft settingsButton"
              >
                <img src={arrowLeft} alt="arrowLeft" width={24} height={24} />
              </button>
              <button
                onClick={() => {
                  setSetting(!setting);
                  setActivePage("main");
                }}
                className="settingsCross settingsButton"
              >
                <img src={cross} alt="cross" width={24} height={24} />
              </button>
              <h2 className="settingsTitle">Help Options</h2>
            </div>
          )}

          {activePage === "about" && (
            <div className="aboutPage">
              <button
                onClick={() => setActivePage("main")}
                className="settingsArrowLeft settingsButton"
              >
                <img src={arrowLeft} alt="arrowLeft" width={24} height={24} />
              </button>
              <button
                onClick={() => {
                  setSetting(!setting);
                  setActivePage("main");
                }}
                className="settingsCross settingsButton"
              >
                <img src={cross} alt="cross" width={24} height={24} />
              </button>
              <h2 className="settingsTitle">About Us</h2>
            </div>
          )}
        </div>
      )}

      <div
        className={cn(
          "layout",
          {
            dark: isDark,
          },
          "generalBtn"
        )}
      >
        <div className="btnOperator">
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
            "btnOperator"
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
        <div className="btnOperator" onClick={() => setSetting(!setting)}>
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
              "clear buttonsNumber operator"
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
              "buttonsNumber operator"
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
              "buttonsNumber operator"
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
              "buttonsNumber operator"
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
              "buttonsNumber"
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
              "buttonsNumber"
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
              "buttonsNumber"
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
              "operator buttonsNumber"
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
              "buttonsNumber"
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
              "buttonsNumber"
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
              "buttonsNumber"
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
              "operator buttonsNumber"
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
                  "buttonsNumber"
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
                  "buttonsNumber"
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
                  "buttonsNumber"
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
                  "operator buttonsNumber"
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
                  "buttonsNumber"
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
                  "buttonsNumber"
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
              "calculate buttonsNumber"
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
