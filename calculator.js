function operate(a,b, operator){
    a = Number(a);
    b = Number(b);
    switch(operator){
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "/":
            return a / b;
        case "*":
            return a * b;
    }
};

const screen = document.querySelector("#screen");
const btns = document.querySelectorAll("button");
let operatorCount = 0;

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
    }
    else{
        screen.innerHTML += input;
    }
    
}