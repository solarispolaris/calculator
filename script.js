//handles user input
function keyPress(e){
    const calcDisplay = document.querySelector(".calc-screen");
    let key = e.target.getAttribute("data-key");
    calcDisplay.textContent = key;
}










function setUpCalcGrid(){
    //the position of the keys in the grid of the calculator
    const calcGrid = ["1","2","3","+","4","5","6","-","7","8","9","*","0","C","=","d"];
    const divGrid = document.querySelector(".calc-grid");

    //set up grid with class and data-key
    for(let itr = 0; itr < calcGrid.length; itr++){
        const calcElement = document.createElement("button")
        calcElement.classList.add("calc-grid-element");
        calcElement.setAttribute("data-key", calcGrid[itr]);
        calcElement.textContent = calcGrid[itr];
        calcElement.addEventListener("click",keyPress,0);
        divGrid.appendChild(calcElement);
    }

}