$(document).ready(initializeApp);

function initializeApp() {
	clickHandler();
}

var doMathArray = [];
var decimalToggle = false;

function clickHandler() {
	$(".display").text("0");
	$(".button.number").click(addNumberToEquation);
	$(".button.clear").click(clearMathArray);
	$(".button.clear-e").click(clearMathArray);
	$(".button.operator").click(addOperatorToEquation);
	$(".button.equals").click(equalCheck);
	$(".button.decimal").click(addDecimalToEquation);
	$(".button.negative").click(makeNegative);
}

function addNumberToEquation() {
	var numberClicked = $(this).text();
	if (doMathArray.length === 0) {
		doMathArray.push(numberClicked);
		$(".display").text(doMathArray[doMathArray.length-1]);
	} else if (doMathArray[doMathArray.length-1] === "0.") {
		doMathArray[doMathArray.length-1] += numberClicked;
		$(".display").text(doMathArray[doMathArray.length-1]);
	} else if (Number(doMathArray[doMathArray.length-1])){
		doMathArray[doMathArray.length-1] += numberClicked;
		$(".display").text(doMathArray[doMathArray.length-1]);
	} else if (!Number(doMathArray[doMathArray.length-1])){
		doMathArray.push(numberClicked);
		$(".display").text(doMathArray[doMathArray.length-1]);
		$(".clicked").removeClass("clicked");
	}
}

function addDecimalToEquation() {
	if (decimalToggle === true) {
		return;
	}
	var decimalClicked = $(this).text();
	$(".clicked").removeClass("clicked");
	if (doMathArray.length === 0) {
		doMathArray.push("0" + decimalClicked);
		$(".display").text(doMathArray[doMathArray.length-1]);
	} else if (Number(doMathArray[doMathArray.length-1])){
		doMathArray[doMathArray.length-1] += decimalClicked;
		$(".display").text(doMathArray[doMathArray.length-1]);
	} else if (doMathArray[doMathArray.length-1] === "+" || doMathArray[doMathArray.length-1] === "-" || doMathArray[doMathArray.length-1] === "*" || doMathArray[doMathArray.length-1] === "/") {
		doMathArray.push("0" + decimalClicked);
		$(".display").text(doMathArray[doMathArray.length-1]);
	}
	decimalToggle = true;
}

function addOperatorToEquation() {
	var operatorClicked = $(this).text();
	if (doMathArray.length === 0){
		$(".display").text(operatorClicked);
	} else if (Number(doMathArray[doMathArray.length-1])){
		doMathArray.push(operatorClicked);
		$(".display").text(doMathArray[doMathArray.length-1]);
		$(this).addClass("clicked");
	} else if (!Number(doMathArray[doMathArray.length-1]) && doMathArray[doMathArray.length-1] !== operatorClicked){
		$(".clicked").removeClass("clicked");
		doMathArray.pop(doMathArray[doMathArray.length-1]);
		doMathArray.push(operatorClicked);
		if ( operatorClicked === "*" ) {
			$(".display").text("x");
		} else if ( operatorClicked === "/" ) {
			$(".display").text("÷");
		} else {
			$(".display").text(doMathArray[doMathArray.length-1]);
		}
		$(this).addClass("clicked");
	}
	decimalToggle = false;
}

function equalCheck () {
	displayValue = $(".display").text();
	if (doMathArray.length === 0){
		$(".display").text("Ready");
	} else if (doMathArray.length-1 === 0) {
		var result = doMathArray[doMathArray.length-1];
		$(".display").text(result);
	} else if (doMathArray.length-1 === 1){
		doMathArray.push(doMathArray[doMathArray.length-2]);
		doMath(doMathArray);
	} else if (doMathArray[doMathArray.length-1] === "0" && doMathArray[doMathArray.length-2] === "/"){
		$(".display").text("Error");
	} else if (doMathArray.length > 3) {
		var splicedArray = doMathArray.splice(0,3);
		result = doMath(splicedArray);
		resultToString = result.toString();
		doMathArray.splice(0, 0, resultToString);
		equalCheck();
	} else if (doMath(doMathArray).toString() === displayValue) {
		if (doMathArray.length === 3) {
			doMathArray.splice(0, 1, displayValue);
			doMath(doMathArray);
		} else if (doMathArray.length > 3) {
			doMathArray.splice(0, doMathArray[doMathArray.length-2], displayValue);
			doMath(doMathArray);
		}
	} else {
		doMath(doMathArray);
	}

}

function doMath ( array ) {
	if (array[1] === "+") {
		var result = Number(array[0]) + Number(array[2]);
	} else if (array[1] === "-") {
		result = array[0] - array[2];
	} else if (array[1] === "*") {
		result = array[0] * array[2];
	} else if (array[1] === "/") {
		result = array[0] / array[2];
	}
	$(".display").text(result);
	decimalToggle = false;
	return result;
}

function clearMathArray () {
	var clearButtonClicked = $(this).text();
	if (clearButtonClicked === "C"){
		doMathArray = [];
		$(".display").text("0");
	} else if (clearButtonClicked === "CE"){
		doMathArray.pop();
		$(".display").text("0");
	}
	$(".clicked").removeClass("clicked");
	decimalToggle = false;
}

function makeNegative (){
	var lastNum = doMathArray.pop();
	var negNumber = lastNum*-1;
	doMathArray.push(negNumber);
    $(".display").text(negNumber)
}
