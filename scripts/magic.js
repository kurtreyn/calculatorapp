'use strict';
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

const setNum = function () {
  if (resultNum) {
    currentNum = this.getAttribute('data-num');
    resultNum = '';
  } else {
    currentNum += this.getAttribute('data-num');
  }
  screen.innerText = currentNum;
};

for (const num of nums) {
  num.onclick = setNum;
}

const storeNum = function () {
  oldNum = currentNum;
  currentNum = '';
  operator = this.getAttribute('data-op');
  equals.setAttribute('data-result', '');
  console.log(`operator: ${operator}`);
  console.log(`oldNum: ${oldNum}`);
  console.log(`currentNum: ${currentNum}`);
};

// for (let i = 0; i < ops.length - 1; i++) {
//   ops[i].addEventListener('click', storeNum);
// }

for (const op of ops) {
  op.addEventListener('click', storeNum);
}

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

const delNum = function () {
  screen.innerText = screen.innerText.slice(0, -1);
};

const clearAll = function () {
  oldNum = '';
  currentNum = '';
  screen.innerText = '';
};

del.addEventListener('click', delNum);
equals.addEventListener('click', display);
clear.addEventListener('click', clearAll);
