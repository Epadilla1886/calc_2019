var numberArray = [];


$(document).ready(function(){
    clickEvents();
    displayValue();

});
    function clickEvents() {
        $('.btn_number').click(btnPressed);
        $('.btn_operator').click(handleOperator);
        $('.btn_math').click(do_math);
        $('.btn_decimal').click(btnPressed);
        $('.btn_clear').click(clearArray);
        $('.btn_clear_display').click(displayOpClear);
    }

    function btnPressed(button) {
        var btnValue = $(this).val();
        console.log(btnValue);    //DELETE
        if (numberArray.length === 0) {
            numberArray.push(btnValue);
        } else if (Number(numberArray[numberArray.length - 1])) {
            numberArray[numberArray.length - 1] += btnValue;
        } else if (numberArray.length > 1 && !Number(numberArray[numberArray.length - 1])){
            numberArray.push(btnValue);}
        displayOpClear();
    }

    function handleOperator(button) {
        var opBtnVal = $(this).val();
        var newOpBtnVal = $(this).val();
        console.log(opBtnVal);
        if(!Number(numberArray[numberArray.length-1])){
            numberArray.pop();
            numberArray.push(opBtnVal);
        } else if (numberArray.length >= 0) {
            numberArray.push(opBtnVal);
        }
        displayOpClear();
    }

function do_math() {
    var num1 = Number(numberArray[0]);
    var num2 = Number(numberArray[2]);
    var operator = numberArray[1];

    if(operator === '+'){
         var result = num1+num2;
    } else if ( operator === '-'){
        result = num1-num2;
    } else if ( operator === '*'){
        result = num1*num2;
    } else if ( operator === '/'){
        result =  num1/num2;
    }
    displayResult(result);
    numberArray = [];
}

function clearArray() {
     numberArray = [];
     displayValue();
    }

function displayValue() {
    $('.display').text(numberArray);
    }

function displayOpClear(){

    $('.display').text(numberArray[numberArray.length-1])
    }
function displayResult(result) {
    $('.display').text(result);
}