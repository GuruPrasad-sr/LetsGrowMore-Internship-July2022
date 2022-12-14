const calculatorDisplay =document.querySelector('h1');
const inputBtns=document.querySelectorAll('button');
const clearBtn=document.getElementById('clr-btn');


//global variables
let firstValue=0;
let operatorValue ='';
let awaitingNextValue=false;



function sendNumberValue(number){
    //replace the current display value if first value is entered
if(awaitingNextValue){
    calculatorDisplay.textContent=number;
    awaitingNextValue=false;
    }
else{
    //if current display value is zero , we want to replace it . if now we want to add the value 
    const displayValue=calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue ==='0'? number : displayValue + number;
    }
} 

function addDecimal () {
    //if operator pressed ,dont add decimal
    if(awaitingNextValue) return;
 
    //if no decimal, add one
    if (!calculatorDisplay.textContent.includes('.')){
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.` ;
    }
}

//Calculate first and second values depending on operators
const calculate ={
    '/' : (firstValue,secondNumber) => firstValue / secondNumber,
    '*' : (firstValue,secondNumber) => firstValue * secondNumber,
    '+' : (firstValue,secondNumber) => firstValue + secondNumber,
    '-' : (firstValue,secondNumber) => firstValue - secondNumber,
    '=' : (firstValue,secondNumber) => secondNumber
};

function useOperator(operator){
    const currentValue=Number(calculatorDisplay.textContent);
    
    //Prevent Multiple Operators before calculation
    if(operator&& awaitingNextValue) {
        operatorValue=operator;
        return;
    };

    //assign first value if no value already there as first value 
    if(!firstValue){
        firstValue=currentValue;
    }
    else{
        
        const calculation=calculate[operatorValue](firstValue,currentValue);
        calculatorDisplay.textContent=calculation;
        firstValue=calculation;
    }
    //ready for next value,store operator
    awaitingNextValue=true;
    operatorValue =operator;
   
}


// add event listeners for numbers , operators, decimal buttons

inputBtns.forEach((inputBtn)=>{
    if(inputBtn.classList.length===0)
        {
            inputBtn.addEventListener('click',() => sendNumberValue(inputBtn.value));

        }
    else if(inputBtn.classList.contains('operator')){
        inputBtn.addEventListener('click',() => useOperator(inputBtn.value));

    } 
    else if(inputBtn.classList.contains('decimal')){
        inputBtn.addEventListener('click',() => addDecimal());
    }
});

//Reset All Values, Display

function resetAll(){
    firstValue=0;
    operatorValue ='';
    awaitingNextValue=false;
    calculatorDisplay.textContent = '0'
}

//event listener for clear btn
clearBtn.addEventListener('click',resetAll);