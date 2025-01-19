const operate = function(op, num1, num2) {
    if (op == "+") {
        return num1 + num2;
    } else if (op == "-") {
        return num1 - num2;
    } else if (op == "*") {
        return num1 * num2;
    } else {
        return num1 / num2;
    }
}

const buttons = document.querySelectorAll("button");
let display = document.querySelector(".display");
const operators = ["+", "-", "*", "/"];
let evaluated = false;
let hasOp = false;
buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
        if (e.target.id === "clear") {
            display.textContent = "0";
            return;
        } else if (e.target.id === "=") {
            let args = display.textContent.split("");

            let opIndex = args.findIndex((arg) => operators.includes(arg));
            let val1 = args.slice(0, opIndex).join("");
            let operator = args[opIndex];
            let val2 = args.slice(opIndex + 1).join("");

            display.textContent = operate(operator, parseInt(val1), parseInt(val2));
            evaluated = true;
            hasOp = false;
            return;
        } else if (e.target.id === "back") {
            if (operators.includes(display.textContent.slice(-1))) {
                hasOp = false;
            }
            display.textContent = display.textContent.slice(0, -1);
            if (!display.textContent) { display.textContent = "0"}
            return;
        }

        if (e.target.parentElement.classList.contains("nums")) {
            if (evaluated) {
                display.textContent = e.target.textContent;
                evaluated = false;
            } else {
                display.textContent == 0 ? display.textContent = e.target.textContent : display.textContent += e.target.textContent;
                evaluated = false;
            }
        }

        if (e.target.parentElement.classList.contains("ops")) {
            if (hasOp) {
                return;
            }
            display.textContent += e.target.textContent;
            evaluated = false;
            hasOp = true;
        }
    })
})