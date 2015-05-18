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
