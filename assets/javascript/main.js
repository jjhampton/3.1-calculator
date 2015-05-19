//Function to run when window is loaded in browser  Sets variables, event handlers, and contains event listener definitions.
var init = function () {
  //"use strict";

  //Declare local variables
  var equalsButton; //for querySelector
  var clearButton; //for querySelector
  var toggleSignButton; // for querySelector
  var decimalButton; //for querySelector
  var percentButton;//for querySelector
  var $displayArea; //for querySelector, property will be modified by setDisplayArea function
  var calculation = 0; //Number storing result of current calculation
  var displayedValue = "0"; //String storing current display value

  var buttonPressedLast; //Stores value of last-pressed button --*** CHANGE TO OBJECT PROPERTY***
  var pendingOperation; //Stores value of last pressed operator button
  var lastCalculatedInputValue; //Stores last number value calculated for later use


  /*var wasNumberPressedLast = false;
  var wasDecimalPressedLast = false;
  var wasOperatorPressedLast; //not currently used, may need in future */

  // Using querySelector to assign variables to DOM elements
  equalsButton = document.querySelector("#button-equal");
  clearButton = document.querySelector("#button-clear");
  toggleSignButton = document.querySelector("#button-toggle-sign");
  decimalButton = document.querySelector("#button-decimal");
  percentButton = document.querySelector("#button-percent");
  $displayArea = document.querySelector(".display-digits");


  //Function that sets value of calculator display area.  Parameter shouldConcat is boolean determining whether or not to concatenate or replace the existing displayedValue.
  var setDisplayArea = function(inputValue, shouldConcat) {
    if (shouldConcat) {
      displayedValue += inputValue;
    }
    else {
      displayedValue = inputValue;
    }
    $displayArea.innerText = displayedValue;
  };

  //Function that sets value of calculation value.  Parameter inputValue is used in arithmetic with pendingOperation to generate new calculation value, or when no operation needed, to replace calculation value.
  var setCalculation = function(inputValue) {
    /*Refactor to use pendingOperation as parameter*/
    switch (pendingOperation) {
      case "+":
        calculation += inputValue;
        break;
      case "-":
        calculation -= inputValue;
        break;
      case "*":
        calculation *= inputValue;
        break;
      case "/":
        calculation /= inputValue;
        break;
      case "replace":
        calculation = inputValue;
        break;
      //case "decimal-addon":
        //calculation = calculation + inputValue;
    }
    lastCalculatedInputValue = inputValue;
    console.log("LCIV is: " + lastCalculatedInputValue);
  };

  //Event handler for clicked number button
  var numberPressed = function(event) {
    var button = event.target;
    var textString = button.textContent;
    var textNumber = Number(button.textContent);
    console.log(textString + " CLICKED");

    switch (buttonPressedLast)  {
      case undefined:
      case "clear":
        setDisplayArea(textString, false);
        pendingOperation = "+";
        setCalculation(textNumber);
        break;
      case "number":
        setDisplayArea(textString, true);
        pendingOperation = "replace";
        setCalculation(lastCalculatedInputValue * 10 +  textNumber);
        break;
      case "decimal":
        setDisplayArea(textString, true);
        pendingOperation = "+";
        setCalculation(textNumber * 0.1);
        break;
      case "operator":
        setDisplayArea(textString, false);
        setCalculation(textNumber);
        break;
      case "decimalAfterOperator":
      setDisplayArea(textString, true);
      setCalculation(Number(displayedValue));
      break;
      }
    buttonPressedLast = "number";
    console.log("calculation is: " + calculation);
  };

  //Event handler for clicked operator button.  Queues pressed operator value into pendingOperation variable.
  var operatorPressed = function(event) {
    var button = event.target;
    var textString = button.dataset.operator;
    var textNumber = Number(button.textContent);
    console.log(textString + " CLICKED");

    pendingOperation = textString;

    buttonPressedLast = "operator";
    console.log("calculation is: " + calculation);
  };

  //Event handler for equals button.
  var equalsPressed = function(event) {
    var button = event.target;
    var text = button.textContent;
    console.log(text + " CLICKED");

    if (buttonPressedLast === "equals") {
      setCalculation(lastCalculatedInputValue);
    }
    setDisplayArea(calculation, false);

    buttonPressedLast = "equals";
    console.log("calculation is: " + calculation);
  };

  //Event handler that resets the calculation and calculator display to zero
  var clearPressed = function(event) {
    var button = event.target;
    var text = button.textContent;
    console.log(text + " CLICKED");

    calculation = 0;
    setDisplayArea(0, false);
    buttonPressedLast = 0;
    pendingOperation = undefined;
    lastCalculatedInputvalue = undefined;
    operationIfEqualsPressedConsecutive = undefined;

    buttonPressedLast = "clear";
    console.log("calculation is: " + calculation);
  };

  var toggleSignPressed = function(event) {
    var button = event.target;
    var text = button.textContent;
    console.log(text + " CLICKED");

    setDisplayArea(displayedValue * -1, false);
    setCalculation(displayedValue * 2);

    console.log("calculation is: " + calculation);
  };

  var decimalPressed = function(event) {
    var button = event.target;
    var text = button.textContent;
    console.log(text + " CLICKED");


    if (buttonPressedLast === "number" || buttonPressedLast === undefined) {
      if (displayedValue.indexOf(".") === -1) {
        setDisplayArea(text, true);
        pendingOperation = "replace";
        setCalculation(Number(calculation.toFixed(1)));
      }
      buttonPressedLast = "decimal";
    }
    if (buttonPressedLast === "operator") {
      setDisplayArea("0" + text, false);
      buttonPressedLast = "decimalAfterOperator";
    }

    console.log("calculation is: " + calculation);
  };

  var percentPressed = function(event) {
    var button = event.target;
    var text = button.textContent;
    var numberAsPercent = lastCalculatedInputvalue * 0.01;
    console.log(text + " CLICKED");

    if (buttonPressedLast === "number") {
      setDisplayArea(numberAsPercent);
      setCalculation(numberAsPercent, "replace");
    }

  };

  // Loop over every element in document. Finds every element w. matching CSS class and binds event listener to 'click' event on that button.  When element is clicked, function alertButtonValue is called.
  [].forEach.call(document.querySelectorAll('.button-number'), function(element){
    element.addEventListener('click', numberPressed);
  }, false);

  [].forEach.call(document.querySelectorAll('.button-operator'), function(element){
    element.addEventListener('click', operatorPressed);}, false);

  // Bind event listeners to their buttons
  equalsButton.addEventListener('click', equalsPressed, false);

  clearButton.addEventListener('click', clearPressed, false);

  toggleSignButton.addEventListener('click', toggleSignPressed, false);

  decimalButton.addEventListener('click', decimalPressed, false);

  percentButton.addEventListener('click', percentPressed, false);
};

window.onload = init;
