'use strict';

//set variables
const screen = document.querySelector('.screen');
const nums = document.querySelectorAll('[data-num]');
const ops = document.querySelectorAll('.ops');
const equals = document.querySelector('#equals');
const clear = document.querySelector('#clear');
const del = document.querySelector('[data-del]');
let currentNum = '';
let oldNum = '';
let resultNum;
let operator;

//function: sets entered number to the current number, then displays it on screen
const setNum = function () {
  if (resultNum) {
    currentNum = this.getAttribute('data-num');
    resultNum = '';
  } else {
    currentNum += this.getAttribute('data-num');
  }
  screen.innerText = currentNum;
};

//for of loop for number buttons which has onclick attribute which executes the setNum function
for (const num of nums) {
  num.onclick = setNum;
}

//function which stores the current number into another variable, oldNum, once an operator is clicked
const storeNum = function () {
  oldNum = currentNum;
  currentNum = '';
  operator = this.getAttribute('data-op');
  equals.setAttribute('data-result', '');
  console.log(`operator: ${operator}`);
  console.log(`oldNum: ${oldNum}`);
  console.log(`currentNum: ${currentNum}`);
};

//for of loop for operator keys which use addEventListener instead of onclick, executes the storeNum function when clicked
for (const op of ops) {
  op.addEventListener('click', storeNum);
}

//function that converts string to floating point decimal number, determines what to do based on which operator was selected, or if an invalid entry was made (i.e. clicking an operator before the first number), then displays the result to the screen
const display = function () {
  oldNum = parseFloat(oldNum);
  currentNum = parseFloat(currentNum);

  if (operator === 'add') {
    resultNum = oldNum + currentNum;
  } else if (operator === 'subtract') {
    resultNum = oldNum - currentNum;
  } else if (operator === 'multiply') {
    resultNum = oldNum * currentNum;
  } else if (operator === 'divide') {
    resultNum = oldNum / currentNum;
  } else {
    resultNum = currentNum;
  }
  console.log('displayFunction');

  if (!isFinite(resultNum)) {
    if (isNaN(resultNum)) {
      resultNum = `does not compute`;
    } else {
      resultNum = `danger will robinson`;
    }
  }
  screen.innerText = resultNum;
  equals.setAttribute('data-result', resultNum);
  oldNum = '';
  currentNum = resultNum;
};

//delte button which uses the slice method to remove last character entered each time DEL is clicked
const delNum = function () {
  screen.innerText = screen.innerText.slice(0, -1);
};

//function which resets all variables and clears screen
const clearAll = function () {
  oldNum = '';
  currentNum = '';
  screen.innerText = '';
};

//event listeners for DEL, EQUAL, and AC buttons
del.addEventListener('click', delNum);
equals.addEventListener('click', display);
clear.addEventListener('click', clearAll);
