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
    // Limits result to 4 decimal places to prevent overflow/rounding errors
    if(result == Infinity){
        zero = 1;
        return "please don't try to divide by zero"
    }
    return(Math.round(result * 10000)/10000); 
};

const screen = document.querySelector("#screen");
const btns = document.querySelectorAll("button");
const operators = ["+","-","*","/"]
const numbers = ["0","1","2","3","4","5","6","7","8","9"];
let operatorCount = 0; // Tracks if an operator is currently active in the expression
let floatCount = 0;    // Prevents multiple decimals in a single number
let result = 0;        // Flag to check if the screen is displaying a final calculation result
let zero = 0;          // Checks if the "don't divide by zero" message is displayed

// Maps keyboard presses to calculator functions
btns.forEach(btn => {
    btn.addEventListener("click", function(){
        const input = btn.innerHTML;
        updateScreen(input);
    });
});

document.addEventListener("keydown", function(Event){
   const input = Event.key;
   if (input == "Enter"){
    updateScreen("=");
   }
   else if (input == "," || input == "."){
    updateScreen(".");
   }
    else if (input == "Backspace"){
    updateScreen("b");
   }
   else if (operators.includes(input) || numbers.includes(input)){
    updateScreen(input);
   }
});

function updateScreen(input){
    const lastDigit = screen.innerHTML.at(-1);

    // reset the "don't divide by zero" message 
    if (zero == 1){
        screen.innerHTML = "";
        zero = 0;
    }
    
    if (operators.includes(input)){

        // If an operator is clicked immediately after another, replace the old one
        if(lastDigit == " "){
            screen.innerHTML = screen.innerHTML.slice(0, -3);
            screen.innerHTML += ` ${input} `
        }

        // First operator in the expression
        else if(operatorCount == 0){
            screen.innerHTML += ` ${input} `
            operatorCount = 1;
            floatCount = 0;
            result = 0;
        }

        // Second operator triggers automatic evaluation of the first pair
        else{
            inputs = screen.innerHTML.split(" ");
            screen.innerHTML = `${operate(inputs[0],inputs[2], inputs[1])} ${input} `
            result = 1;
        }

    }
    else if(input == "="){
        // Only evaluate if we have a full equation (num op num)
        if(numbers.includes(lastDigit) && operatorCount == 1){
            inputs = screen.innerHTML.split(" ");
            screen.innerHTML = operate(inputs[0],inputs[2], inputs[1]);
            operatorCount = 0;
            floatCount = 0;
            result = 1;
        }
    }

    else if(input == "."){
        // Prevent multiple dots in one number and appending dot to a result
        if (floatCount === 0 && numbers.includes(lastDigit) && result == 0){
            screen.innerHTML += input;
            floatCount = 1;
        }
    }

    else if(input == "b"){
        if (lastDigit == " "){
            screen.innerHTML = screen.innerHTML.slice(0, -3);
            operatorCount = 0;
            return;
        }
        else if(lastDigit == "."){
            floatCount = 0;
        }
        result = 0;
        screen.innerHTML = screen.innerHTML.slice(0, -1);       
    }

    else if(input == "clear"){
        screen.innerHTML = "";
        operatorCount = 0;
        floatCount = 0;
        result = 0;
    }

    // If a number is pressed after a result is shown, start a fresh calculation
    else if(result == 1 && numbers.includes(lastDigit)){
        screen.innerHTML = input;
        operatorCount = 0;
        floatCount = 0;
        result = 0;
    }

    else{
        screen.innerHTML += input;
    }
    
}