function operate(a,b, operator){
    a = Number(a);
    b = Number(b);
    let result;
    switch(operator){
        case "+":
             result = a + b;
             break;
        case "-":
            result = a - b;
            break;
        case "/":
            result = a / b;
            break;
        case "*":
            result = a * b;
            break;
    }
    return(Math.round(result * 10000)/10000);
};

const screen = document.querySelector("#screen");
const btns = document.querySelectorAll("button");
let operatorCount = 0;
let floatCount = 0;

btns.forEach(btn => {
    btn.addEventListener("click", function() {
        const input = btn.innerHTML;
        updateScreen(input);
    });
});

function updateScreen(input){
    const operators = ["+","-","*","/"]
    if (operators.includes(input)){
        if(operatorCount == 0){
            screen.innerHTML += ` ${input} `
            operatorCount = 1;
            floatCount = 0;
        }
        else{
            inputs = screen.innerHTML.split(" ");
            screen.innerHTML = `${operate(inputs[0],inputs[2], inputs[1])} ${input} `
        }

    }
    else if(input == "="){
        inputs = screen.innerHTML.split(" ");
        screen.innerHTML = operate(inputs[0],inputs[2], inputs[1]);
        operatorCount = 0;
        floatCount = 0;

    }
    else if(input == "."){
        if (floatCount === 0){
            screen.innerHTML += input;
            floatCount = 1;
        }
    }
    else if(input == "b"){
        screen.innerHTML = screen.innerHTML.slice(0, -1);
    }
    else if(input == "c"){
        screen.innerHTML = "";
        operatorCount = 0;
        floatCount = 0;
    }
    else{
        screen.innerHTML += input;
    }
    
}