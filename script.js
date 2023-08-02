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
let lastPress;

document.body.onload = () => {
  createBtn(numbers);
  createBtn(others);
  createOperatorBtn();
  createClickListener();
  displayVal.textContent = defaultNum;
  currentNum = defaultNum;

  clearBtn.addEventListener("click", () => {
    lastPress = null;
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
      if (lastPress == "=") {
        currentNum = 0;
        lastPress = button.id;
      }
      if (displayVal.textContent.length == 10) {
        return;
      }
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
      lastPress = button.id;

      if (displayVal.textContent.length == 10) {
        return;
      }

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
        lastPress = button.id;
      });
    } else if (button.id == "-") {
      button.addEventListener("click", () => {
        subtract();
      });
    } else if (button.id == "*") {
      button.addEventListener("click", () => {
        multiply();
        lastPress = button.id;
      });
    } else if (button.id == "/") {
      button.addEventListener("click", () => {
        divide();
        lastPress = button.id;
      });
    } else {
      button.addEventListener("click", () => {
        operate();
        lastPress = button.id;
      });
    }
    opBtnWrapper.appendChild(button);
  }
};

const storeValue = () => {
  storedNum = currentNum;
  currentNum = defaultNum;
};

const add = () => {
  if (storedNum != null) {
    operate();
    storeValue();
  } else {
    storeValue();
    updateVal(currentNum);
  }
  operator = "add";
};

const subtract = () => {
  if (storedNum != null) {
    operate();
    storeValue();
  } else {
    storeValue();
    updateVal(currentNum);
  }
  operator = "subtract";
};

const multiply = () => {
  if (storedNum != null) {
    operate();
    storeValue();
  } else {
    storeValue();
    updateVal(currentNum);
  }
  operator = "multiply";
};

const divide = () => {
  if (storedNum != null) {
    operate();
    storeValue();
  } else {
    storeValue();
    updateVal(currentNum);
  }
  operator = "divide";
};

const operate = () => {
  let result;
  storedNum = parseFloat(storedNum);
  currentNum = parseFloat(currentNum);
  if (operator == "add") {
    result = storedNum + currentNum;
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

  if (result > 9999999999) {
    result = parseFloat(result.toExponential());
  }

  if (Number.isInteger(result)) {
    result = result.toPrecision(6);
  } else {
    result = parseFloat(result.toPrecision(10));
    result = result.toFixed(3);
  }

  updateVal(result);
  storedNum = null;
  currentNum = result;
};
