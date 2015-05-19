//Function to run when window is loaded in browser  Sets variables, event handlers, and contains event listener definitions.


var init = function () {

  //Declare local variables
    var equalsButton; //for querySelector
    var clearButton; //for querySelector
    var toggleSignButton; // for querySelector
    var displayArea; //for querySelector
    var decimalButton; //for querySelector
    var percentButton;//for querySelector
    var calculation = []; //Current calculation
    var wasNumberPressedLast = false;
    var wasDecimalPressedLast = false;
    var wasOperatorPressedLast; //not currently used, may need in future

  // Using querySelector to assign variables to DOM elements
  equalsButton = document.querySelector("#button-equal");
  clearButton = document.querySelector("#button-clear");
  displayArea = document.querySelector(".display-digits");
  toggleSignButton = document.querySelector("#button-toggle-sign");
  decimalButton = document.querySelector("#button-decimal");
  percentButton = document.querySelector("#button-percent");

  //Event handler that adds the value of the clicked number button to the calculation
  var numberPressed = function(event) {
    var button = event.target;
    var text = button.textContent;
    console.log(text + " CLICKED");

    if (wasDecimalPressedLast || wasNumberPressedLast) {
      calculation[calculation.length-1] += text; //Sets last value in array
      setDisplayArea(calculation[calculation.length-1], false); //Displays it to screen
    }
    else {
      calculation.push(text);
      setDisplayArea(text, false);
      //displayNumber.innerText = text;
    }

    wasNumberPressedLast = true;
    wasDecimalPressedLast = false;
    wasOperatorPressedLast = false;

    console.log(calculation);
  };

  //Event handler that adds the value of the clicked operator button to the calculation
  var operatorPressed = function(event) {
    var button = event.target;
    var text = button.dataset.operator;
    var previousOperator;
    console.log(text + " CLICKED");

    if (wasNumberPressedLast) {
      calculation.push(text);
      if (calculation.length >= 4) {
        previousOperator = calculation[calculation.length-3];
        if (getPrecedence(previousOperator) === getPrecedence(text)) {
          console.log("precedence of operators matched");
          calculation.pop();
          console.log("calculation is: " + calculation);
          calculation = getResult();
          console.log("display result is: " + calculation);
          setDisplayArea(calculation, false);
          calculation = [calculation];
          calculation.push(text);
          console.log("calculation is: " + calculation);
        }
      }
    }
    else if (calculation.length >=1){
      calculation[calculation.length - 1] = text;
    }

    wasOperatorPressedLast = true;
    wasNumberPressedLast = false;
    wasDecimalPressedLast = false;


    console.log(calculation);
  };

  //Event handler that joins the calculation array into a string, calls eval() to generate an answer, and displays the answer to the screen
  var equalPressed = function(event) {
    var button = event.target;
    var text = button.textContent;
    console.log(text + " CLICKED");

    console.log("calculation is: " + calculation);
    calculation = getResult();
    console.log("display result is: " + calculation);
    setDisplayArea(calculation, false);
    calculation = [calculation];
  };

  //Event handler that toggles the sign of the last pressed number button value
  var toggleSignPressed = function(event) {
    var button = event.target;
    var text = button.textContent;
    var lastValueEntered;
    var lastOperatorEntered;
    console.log(text + " CLICKED");


    if (wasNumberPressedLast) {
      lastValueEntered = calculation[calculation.length - 1];
      lastOperatorEntered = calculation[calculation.length - 2];
      if (lastOperatorEntered === "-") {
        calculation[calculation.length - 2] = "+";
        setDisplayArea(lastValueEntered * -1, false);
      }
      else {
        calculation[calculation.length - 1] = ( lastValueEntered * -1);
        setDisplayArea(calculation[calculation.length-1], false);
      }
    }

    console.log(calculation);
  };

  //Event handler that toggles the sign of the last pressed number button value
  var decimalPressed = function(event) {
    var button = event.target;
    var text = button.textContent;
    console.log(text + " CLICKED");
    if (calculation.length >=1) {
      if (wasOperatorPressedLast) {
        calculation.push("0" + text);
        setDisplayArea(text, false);
        wasDecimalPressedLast = true;
        wasNumberPressedLast = false;
        wasOperatorPressedLast = false;
      }
      else if (wasDecimalPressedLast===false) {
        calculation[calculation.length - 1] += text;
        setDisplayArea(text, true);
        wasDecimalPressedLast = true;
        wasNumberPressedLast = false;
        wasOperatorPressedLast = false;
      }
    }
    else {
      calculation.push("0" + text);
      setDisplayArea(text, true);
      wasDecimalPressedLast = true;
      wasNumberPressedLast = false;
      wasOperatorPressedLast = false;

    }

    console.log(calculation);
  };

  var percentPressed = function(event) {
    var button = event.target;
    var text = button.textContent;
    var numberAsPercent;
    console.log(text + " CLICKED");

    if (wasNumberPressedLast) {
      numberAsPercent = calculation[calculation.length - 1] * 0.01;
      calculation[calculation.length - 1] = numberAsPercent;
      setDisplayArea(calculation[calculation.length - 1], false);
    }
    else {
      numberAsPercent = calculation[calculation.length - 2] * 0.01;
      calculation[calculation.length - 2] = numberAsPercent;
    }

    console.log(calculation);
  };

  //Event handler that resets the calculation and calculator display to zero
  var clearPressed = function(event) {
    var button = event.target;
    var text = button.textContent;
    console.log(text + " CLICKED");


    calculation = [];
    setDisplayArea(0, false);
    wasNumberPressedLast = false;
    wasDecimalPressedLast = false;
    console.log(calculation);
  };


  //Evaluates stringified version of calculation array as if it were an expression.  Returns output of eval() function.
  var getResult = function() {
    var answer = eval(calculation.join(''));
    return answer;
  };

  //Function that sets value of calculator display area.
  var setDisplayArea = function(inputValueFromButton, shouldConcat) {
    if (shouldConcat) {
      displayArea.innerText += inputValueFromButton;
    }
    else {
      displayArea.innerText = inputValueFromButton;
    }
  };

  //Function that returns the precedence of the operator passed in as an argument and returns it as a numerical value.  May include exponents and roots w/ return value of 1 later.
  var getPrecedence = function(operator) {
    switch(operator) {
      case "+":
      case "-":
        return 3;
      case "*":
      case "/":
        return 2;
    }
  };

  // Loop over every element in document. Finds every element w. matching CSS class and binds event listener to 'click' event on that button.  When element is clicked, function alertButtonValue is called.
  [].forEach.call(document.querySelectorAll('.button-number'), function(element){
    element.addEventListener('click', numberPressed);
  }, false);

  [].forEach.call(document.querySelectorAll('.button-operator'), function(element){
    element.addEventListener('click', operatorPressed);}, false);

  // Bind event listener to equals button
  equalsButton.addEventListener('click', equalPressed, false);

  // Bind event listener to AC button
  clearButton.addEventListener('click', clearPressed, false);

  // Bind event listener to toggle-sign button
  toggleSignButton.addEventListener('click', toggleSignPressed, false);

  // Bind event listener to decimal button
  decimalButton.addEventListener('click', decimalPressed, false);

  // Bind event listener to percent button
  percentButton.addEventListener('click', percentPressed, false);
};

window.onload = init;
