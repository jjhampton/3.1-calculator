//Function to run when window is loaded in browser  Sets variables, event handlers, and contains event listener definitions.


var init = function () {

  //Declare local variables
  var equalsButton; //for querySelector
  var clearButton; //for querySelector
  var toggleSignButton; // for querySelector
  var decimalButton; //for querySelector
  var percentButton;//for querySelector
  var $displayArea; //for querySelector, property will be modified by setDisplayArea function
  var calculation = 0; //Number storing result of current calculation
  var displayedValue = 0; //String storing current display value

  var buttonPressedLast; //Stores value of last-pressed button
  var pendingOperation; //Stores value of last pressed operator button

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

  //Function that sets value of calculation value.  Parameter shouldConcat is boolean determining whether or not to concatenate or replace the existing displayedValue.
  var setCalculation = function(inputValue) {
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
    }
  };

  //Event handler for clicked number button
  var numberPressed = function(event) {
    var button = event.target;
    var textString = button.textContent;
    var textNumber = Number(button.textContent);
    console.log(textString + " CLICKED");

    switch (buttonPressedLast)  {
      case undefined:
        setDisplayArea(textString, false);
        setCalculation(textNumber);
        break;
      case "number":
        setDisplayArea(textString, true);
        setCalculation(textNumber);
        break;
      case "decimal":
        setDisplayArea(textString, true);
        setCalculation(textNumber);
        break;
      case "operator":
        setDisplayArea(textString, false);
        setCalculation(textNumber);
        break;
      }
    buttonPressedLast = "number";
    console.log("calculation is: " + calculation);
  };

  // Using querySelector to assign variables to DOM elements
  equalsButton = document.querySelector("#button-equal");
  clearButton = document.querySelector("#button-clear");
  displayArea = document.querySelector(".display-digits");
  toggleSignButton = document.querySelector("#button-toggle-sign");
  decimalButton = document.querySelector("#button-decimal");
  percentButton = document.querySelector("#button-percent");



  // Loop over every element in document. Finds every element w. matching CSS class and binds event listener to 'click' event on that button.  When element is clicked, function alertButtonValue is called.
  [].forEach.call(document.querySelectorAll('.button-number'), function(element){
    element.addEventListener('click', numberPressed);
  }, false);

  [].forEach.call(document.querySelectorAll('.button-operator'), function(element){
    element.addEventListener('click', operatorPressed);}, false);

  // Bind event listeners to their buttons
  equalsButton.addEventListener('click', equalPressed, false);

  clearButton.addEventListener('click', clearPressed, false);

  toggleSignButton.addEventListener('click', toggleSignPressed, false);

  decimalButton.addEventListener('click', decimalPressed, false);

  percentButton.addEventListener('click', percentPressed, false);
};

window.onload = init;
