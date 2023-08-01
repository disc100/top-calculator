// Variables for easier selection of elements

const numBtnWrapper = document.querySelector("#num-btn-wrapper");
const otherBtnWrapper = document.querySelector("#other-btn-wrapper");
const opBtnWrapper = document.querySelector("#operator-btn-wrapper");
const displayWrapper = document.querySelector("#display-wrapper");
const displayVal = document.querySelector("#display");

const numBtns = numBtnWrapper.childNodes;
const otherBtns = otherBtnWrapper.childNodes;
const opBtns = opBtnWrapper.childNodes;
const clearBtn = document.querySelector("#clear-btn");
const backBtn = document.querySelector("#back-btn");

// Arrays for button creation

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const others = ["+/-", 0, "."];

// Global variables

const defaultNum = 0;
const maxLength = 10;
let currentNum;
let storedNum;

document.body.onload = () => {
  createBtn(numbers);
  createBtn(others);
  createOperatorBtn();
  createClickListener();
  displayVal.textContent = defaultNum;
  currentNum = defaultNum;

  clearBtn.addEventListener("click", () => {
    storedNum = null;
    currentNum = defaultNum;
    displayVal.textContent = currentNum;
  });

  backBtn.addEventListener("click", () => {
    let string = displayVal.textContent;
    if (string.length > 1) {
      string = string.slice(0, string.length - 1);
    } else {
      string = defaultNum;
    }

    currentNum = string;
    displayVal.textContent = currentNum;
  });
};

// Creates the number pad buttons and assigns classes & ids

const createBtn = (param) => {
  let wrapper;
  for (let i = 0; i < param.length; i++) {
    const button = document.createElement("button");
    const classes = button.classList;
    button.id = param[i];
    if (isNumber(param[0])) {
      classes.add("num-btn");
      wrapper = numBtnWrapper;
    } else if (!isNumber()) {
      classes.add("other-btn");
      wrapper = otherBtnWrapper;
    }
    classes.add("calc-btn");
    button.type = "button";
    button.textContent = param[i];
    wrapper.appendChild(button);
  }
};

// Creates event listeners for the number pad buttons

const createClickListener = () => {
  numBtns.forEach((button) => {
    button.addEventListener("click", () => {
      if (isZero() && !checkDecimal()) {
        currentNum = button.id;
        updateVal(currentNum);
      } else {
        currentNum += button.id;
        updateVal(currentNum);
      }
    });
  });

  otherBtns.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.id == "0") {
        if (!isZero()) {
          currentNum += button.id;
          updateVal(currentNum);
        } else if (isZero()) {
          if (!checkDecimal()) {
            updateVal(currentNum);
          } else if (checkDecimal()) {
            currentNum += button.id;
            updateVal(currentNum);
          }
        }
      } else if (button.id == "." && !checkDecimal()) {
        if (!checkDecimal()) {
          currentNum += button.id;
          updateVal(currentNum);
        } else if (checkDecimal()) {
          updateVal(currentNum);
        }
      } else if (button.id == "+/-") {
        currentNum *= -1;
        updateVal(currentNum);
      }
    });
  });
};

const updateVal = (value) => {
  displayVal.textContent = value;
};

// Checks if the current value is zero

const isZero = () => {
  if (currentNum == defaultNum) {
    return true;
  } else return false;
};

// Checks if the value of a button id is a number to facilitate adding the correct class

const isNumber = (value) => {
  if (typeof value == "number") {
    return true;
  } else return false;
};

// Checks if the current value already has a decimal point.

const checkDecimal = () => {
  if (displayVal.textContent.includes(".")) {
    return true;
  } else {
    return false;
  }
};

// Creates the operator buttons (+  - * / =)

const createOperatorBtn = () => {
  const operators = ["+", "-", "*", "/", "="];
  for (let i = 0; i < operators.length; i++) {
    const button = document.createElement("button");
    button.classList.add("calc-btn", "operator-btn");
    button.id = operators[i];
    button.type = "button";
    button.textContent = operators[i];
    if (button.id == "+") {
      button.addEventListener("click", () => {
        add();
      });
    } else if (button.id == "-") {
      button.addEventListener("click", () => {
        subtract();
      });
    } else if (button.id == "*") {
      button.addEventListener("click", () => {
        multiply();
      });
    } else if (button.id == "/") {
      button.addEventListener("click", () => {
        divide();
      });
    } else {
      button.addEventListener("click", () => {
        operate();
      });
    }
    opBtnWrapper.appendChild(button);
  }
};

const storeValue = () => {
  if (storedNum == null) {
    storedNum = currentNum;
  }
  currentNum = defaultNum;
};

const add = () => {
  if (storedNum != null) {
    operate();
  } else {
    storeValue();
    updateVal(currentNum);
  }
  operator = "add";
};

const subtract = () => {
  storeValue();
  updateVal(currentNum);
  operator = "subtract";
};

const multiply = () => {
  storeValue();
  updateVal(currentNum);
  operator = "multiply";
};

const divide = () => {
  storeValue();
  updateVal(currentNum);
  operator = "divide";
};

const operate = () => {
  let result;
  storedNum = parseInt(storedNum);
  currentNum = parseInt(currentNum);
  if (operator == "add") {
    result = (storedNum + currentNum).toString();
  } else if (operator == "subtract") {
    result = storedNum - currentNum;
  } else if (operator == "multiply") {
    result = storedNum * currentNum;
  } else if (operator == "divide") {
    if (currentNum == 0) {
      result = "Why?";
    } else {
      result = storedNum / currentNum;
    }
  }
  updateVal(result);
  storedNum = result;
  currentNum = result;
};
