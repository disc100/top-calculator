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

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const others = ["+/-", 0, "."];

const defaultNum = 0;
let currentNum;
let num1;
let num2;

document.body.onload = () => {
  createBtn(numbers);
  createBtn(others);
  createOperatorBtn();
  createClickListener();
  displayVal.textContent = defaultNum;
  currentNum = defaultNum;

  clearBtn.addEventListener("click", () => {
    displayVal.textContent = defaultNum;
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
    console.log(currentNum);
  });
};

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

const createClickListener = () => {
  numBtns.forEach((element) => {
    element.addEventListener("click", () => {
      updateVal(element.id);
      if (isZero()) {
        displayVal.textContent = element.id;
      } else {
        displayVal.textContent += element.id;
      }
    });
  });

  otherBtns.forEach((element) => {
    element.addEventListener("click", () => {
      button = checkButton(element);
      if (button == "0" && isZero()) {
        displayVal.textContent = button;
      }
    });
  });
};

const updateVal = (button) => {
  if (isNumber(button)) {
  }
};

const isZero = () => {
  if (displayVal.textContent == defaultNum) {
    return true;
  } else return false;
};

isNumber = (element) => {
  if (typeof element == "number") {
    return true;
  } else return false;
};

const checkButton = (element) => {
  if (element.id == "+/-") {
    return "+/-";
  } else if (element.id == "0") {
    return "0";
  } else {
    return ".";
  }
};

const createOperatorBtn = () => {
  const operators = ["+", "-", "*", "/", "="];
  for (let i = 0; i < operators.length; i++) {
    const button = document.createElement("button");
    button.classList.add("calc-btn", "operator-btn");
    button.id = operators[i];
    button.type = "button";
    button.textContent = operators[i];
    if (i == 0) {
      button.addEventListener("click", () => {
        operator = "add";
        num1 = currentNum;
        displayVal.textContent = defaultNum;
      });
    } else if (i == 1) {
      button.addEventListener("click", () => {
        operator = "subtract";
      });
    } else if (i == 2) {
      button.addEventListener("click", () => {
        operator = "multiply";
      });
    } else if (i == 3) {
      button.addEventListener("click", () => {
        operator = "divide";
      });
    } else {
      button.addEventListener("click", () => {
        operate(operator, num1, num2);
      });
    }
    opBtnWrapper.appendChild(button);
  }
};

const add = () => {};

const subtract = () => {};

const multiply = () => {};

const divide = () => {};

const operate = (operator, num1, num2) => {};
