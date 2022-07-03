//handles user input
function keyPress(e){
    const calcDisplay = document.querySelector(".calc-text");
    let key = e.target.getAttribute("data-key");
    calcDisplay.textContent = calcDisplay.textContent + key;
}

function clearScreen(){
    const calcDisplay = document.querySelector(".calc-text");
    calcDisplay.textContent = "";
}

function checkIfCorrectIndex(index, arrayLength){
    return (index-1 >= 0) && (index+1 < arrayLength);
}

//check for symbols to decide the math
function decideMath(tempArray){
    let index = -1;
    let mathType = "";
    index = tempArray.indexOf("×");
    //check if there is a * symbol to multiply
    if(index !== -1) {
        if(!checkIfCorrectIndex(index, tempArray.length)) return [-1, "ERR"];
        return [index, "multiply"];
    }
    //check if there is a d symbol to divide
    index = tempArray.indexOf("÷");
    if(index !== -1) {
        if(!checkIfCorrectIndex(index, tempArray.length)) return [-1, "ERR"];
        return [index, "divide"];
    }
    //check if there is a + symbol to add
    index = tempArray.indexOf("+");
    if(index !== -1) {
        if(!checkIfCorrectIndex(index, tempArray.length)) return [-1, "ERR"];
        return [index, "add"];
    }
    //check if there is a - symbol to subtract
    index = tempArray.indexOf("-");
    if(index !== -1) {
        if(!checkIfCorrectIndex(index, tempArray.length)) return [-1, "ERR"];
        return [index, "subtract"];
    }

    //default case for no symbols found
    return [-1, ""];
}







function completeExpression(textArray){

    const tempArray = textArray;
    let index = -1;
    let calculate = "";
    let result = 0;
    //continue until tempArray is only of length 1
    while(tempArray.length !== 1){
        
        //get the preceding math symbol to execute first
        const resultArray = decideMath(tempArray);
        index = resultArray[0];
        switch (resultArray[1]){
            case "multiply":
                result = (multiply(tempArray[index-1], tempArray[index+1])).toString();
                break;
            case "divide":
                result = (divide(tempArray[index-1], tempArray[index+1])).toString();
                break;
            case "add":
                result = (add(tempArray[index-1], tempArray[index+1])).toString();
                break;
            case "subtract":
                result = (subtract(tempArray[index-1], tempArray[index+1])).toString();
                break;
            case "ERR":
                return "ERR"
        }
        tempArray.splice(index-1, 3, result);
        
    }
    return tempArray;
}




function evaluateString(){
    const calcDisplay = document.querySelector(".calc-text");
    if(calcDisplay.textContent === "") return;
    const textArray = Array.from(calcDisplay.textContent);
    //new array to combine numbers together, separated from symbols
    const conciseArray = [];
    let tempString = "";

    for(let itr = 0; itr < textArray.length; itr++){
        //convert string into a number and check to see if it is not a symbol
        const num = Number(textArray[itr]);
        if(Number.isInteger(num)) tempString = tempString + textArray[itr];
        else{
            //push the joined number into the array if it currently exists
            if(tempString !== ""){
                conciseArray.push(tempString);
                tempString = "";
            }
            //push the symbol into the array
            conciseArray.push(textArray[itr]);
        }
    }
    //push the last number if it exists
    if(tempString !== ""){
        conciseArray.push(tempString);
        tempString = "";
    }
    calcDisplay.textContent = completeExpression(conciseArray);

}



//Basic Math Functions
function multiply(a,b){
    return Number(a)*Number(b);
}
function divide(a,b){
    return Number(a)/Number(b);
}
function add(a,b){
    return Number(a)+Number(b);
}
function subtract(a,b){
    return Number(a)-Number(b);
}






function setUpCalcGrid(){
    //the position of the keys in the grid of the calculator
    const calcGrid = ["1","2","3","+","4","5","6","-","7","8","9","×","0","C","=","÷"];
    const divGrid = document.querySelector(".calc-grid");

    //set up grid with class and data-key
    for(let itr = 0; itr < calcGrid.length; itr++){
        const calcElement = document.createElement("button")
        calcElement.classList.add("calc-grid-element");
        calcElement.setAttribute("data-key", calcGrid[itr]);
        calcElement.textContent = calcGrid[itr];
        switch (calcGrid[itr]){
            case "C":
                calcElement.addEventListener("click",clearScreen,0);
                break;
            case "=":
                calcElement.addEventListener("click",evaluateString,0);
                break;
            default:
                calcElement.addEventListener("click",keyPress,0);
        }
        
        divGrid.appendChild(calcElement);
    }

}