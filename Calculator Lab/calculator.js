let firstNumber; 
let secondNumber;
let operation;

let resultElem = document.getElementById('result')

function clickNumber(num) {
    let stringNum = new String(num);
   
    if (!firstNumber) {
        firstNumber = stringNum;
        resultElem.innerText = firstNumber;
    }

    else if (!operation) {
        firstNumber += stringNum;
        resultElem.innerText = firstNumber;
    }

    else if (!secondNumber) {
        secondNumber = stringNum;
        resultElem.innerText = secondNumber;
}
else {
    secondNumber += stringNum;
    resultElem.innerText = secondNumber;
}
}

function clickOperator(op) {
    operation = op;
}

function showResult() {
    let first = parseInt(firstNumber)
    let second =parseInt(secondNumber)
    let calculation = 0;

    switch (operation) {
        case '+': calculation = first + second; break;
        case '-': calculation = first - second; break;
        case '/': calculation = first / second; break;
        case '*': calculation = first * second; break;
    }
    
    clearResult()
    firstNumber = new String(calculation)
    resultElem.innerText = calculation;
}

function clearResult() {

    firstNumber = undefined;
    secondNumber = undefined;
    operation = undefined;

    resultElem.innerText = '';
}