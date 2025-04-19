// Initialize variables to store the current input, operation, and previous input
let currentInput = '';
let currentOperation = '';
let previousInput = '';

// Array to store calculation history
let history = [];

// Function to append a number to the current input
function appendNumber(number) {
    currentInput += number;
    document.getElementById('display').value = `${previousInput} ${currentOperation} ${currentInput}`;
}

// Function to append an operation (+, -, *, /) and prepare for the next input
function appendOperation(operation) {
    if (currentInput === '') return; // Prevent appending an operation without a number
    if (previousInput !== '') {
        calculate(); // Calculate the previous operation before appending a new one
    }
    currentOperation = operation;
    previousInput = currentInput;
    currentInput = '';
    document.getElementById('display').value = `${previousInput} ${currentOperation}`;
}

// Function to update the history list
function updateHistory(result) {
    if (previousInput && currentOperation && currentInput) {
        const calculation = `${previousInput} ${currentOperation} ${currentInput} = ${result}`;
        history.push(calculation);

        // Update the history display
        const historyList = document.getElementById('history-list');
        const historyItem = document.createElement('li');
        historyItem.textContent = calculation;
        historyList.appendChild(historyItem);
    }
}

// Function to toggle the visibility of the history container
function toggleHistory() {
    const historyContainer = document.getElementById('history-container');
    if (historyContainer.style.display === 'none') {
        historyContainer.style.display = 'block';
    } else {
        historyContainer.style.display = 'none';
    }
}

// Function to perform the calculation based on the current operation
function calculate() {
    if (previousInput === '' || currentInput === '') return; // Ensure both inputs are present
    let result;
    let prev = parseFloat(previousInput);
    let current = parseFloat(currentInput);

    // Perform the operation based on the currentOperation variable
    switch (currentOperation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert("Cannot divide by zero");
                return;
            }
            result = prev / current;
            break;
        default:
            return; // Exit if no valid operation is selected
    }

    // Update the display and reset variables
    currentInput = result.toString();
    currentOperation = '';
    previousInput = '';
    document.getElementById('display').value = currentInput;

    // Update the history
    updateHistory(result);
}

// Function to clear the display and reset all inputs
function clearDisplay() {
    currentInput = '';
    previousInput = '';
    currentOperation = '';
    document.getElementById('display').value = '';
}

// Function to calculate the square root of the current input
function calculateSquareRoot() {
    if (currentInput === '') return; // Ensure input is present
    let current = parseFloat(currentInput);
    if (current < 0) {
        alert("Cannot calculate the square root of a negative number");
        return;
    }
    currentInput = Math.sqrt(current).toString();
    document.getElementById('display').value = `${currentInput}`;
}

// Function to remove the last character from the current input
function backspace() {
    if (currentInput !== '') {
        currentInput = currentInput.slice(0, -1); // Remove the last character
        document.getElementById('display').value = `${previousInput} ${currentOperation} ${currentInput}`;
    }
}

// Function to calculate the exponentiation (xⁿ)
function calculateExponent() {
    if (previousInput === '' || currentInput === '') return; // Ensure both inputs are present
    let base = parseFloat(previousInput);
    let exponent = parseFloat(currentInput);
    currentInput = Math.pow(base, exponent).toString();
    currentOperation = '';
    previousInput = '';
    document.getElementById('display').value = currentInput;
}

// Function to calculate the factorial of the current input
function calculateFactorial() {
    if (currentInput === '') return; // Ensure input is present
    let num = parseInt(currentInput);
    if (num < 0) {
        alert("Factorial of a negative number is undefined");
        return;
    }
    let factorial = 1;
    for (let i = 1; i <= num; i++) {
        factorial *= i;
    }
    currentInput = factorial.toString();
    document.getElementById('display').value = currentInput;
}

// Placeholder function for memory functionality
function calculateMemory() {
    alert("Memory functionality is not implemented yet!");
}

// Function to calculate the percentage of the current input
function calculatePercentage() {
    if (currentInput === '') return; // Ensure input is present
    let current = parseFloat(currentInput);
    currentInput = (current / 100).toString();
    document.getElementById('display').value = `${previousInput} ${currentOperation} ${currentInput}`;
}

// Event listener to handle keyboard input
document.addEventListener('keydown', function (event) {
    const key = event.key;

    if (!isNaN(key)) {
        // If the key is a number
        appendNumber(key);
    } else if (['+', '-', '*', '/', '.'].includes(key)) {
        // If the key is an operator
        appendOperation(key);
    } else if (key === 'Enter') {
        // If the Enter key is pressed
        calculate();
    } else if (key === 'Escape') {
        // If the Escape key is pressed
        clearDisplay();
    } else if (key === '%') {
        // If the % key is pressed
        calculatePercentage();
    } else if (key === 'Backspace') {
        // If the Backspace key is pressed
        backspace();
    }
});