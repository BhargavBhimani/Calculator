<template>
    <div class="flex flex-col justify-center w-[80vw] items-end rounded-md h-[25vh] md:h-[36vh]">
        <input type="text" @input="onKeyboardFunc" v-model="inputString" inputmode="numeric" @keydown.enter="calculate"
            id="inputField" ref="myInput"
            class="bg-slate-950 w-full h-20 mx-auto outline-none px-5 text-custom-cursor cursor-pointer text-right text-2xl bottom-0 focus:cursor-text">
        <p class="text-slate-300 text-3xl px-5 ">{{ this.result }}</p>
    </div>
    <div class="grid grid-cols-4 gap-5">
        <OperatorButton @click="clearInput">C</OperatorButton>
        <OperatorButton @click="handleFunction('%')" @input="handleFunction">%</OperatorButton>
        <OperatorButton @click="clearLast">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" style="background-color:inherit;"
                viewBox="0 0 24 24">
                <path fill="currentColor"
                    d="M19 15.59L17.59 17L14 13.41L10.41 17L9 15.59L12.59 12L9 8.41L10.41 7L14 10.59L17.59 7L19 8.41L15.41 12L19 15.59M22 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7c-.69 0-1.23-.36-1.59-.89L0 12l5.41-8.12C5.77 3.35 6.31 3 7 3h15m0 2H7l-4.72 7L7 19h15V5Z" />
            </svg>
        </OperatorButton>
        <OperatorButton @click="handleFunction('/')" @input="checkInput">/</OperatorButton>
        <TheButton @click="handleFunction(7)">7</TheButton>
        <TheButton @click="handleFunction(8)">8</TheButton>
        <TheButton @click="handleFunction(9)">9</TheButton>
        <OperatorButton @click="handleFunction('*')">X</OperatorButton>
        <TheButton @click="handleFunction(4)">4</TheButton>
        <TheButton @click="handleFunction(5)">5</TheButton>
        <TheButton @click="handleFunction(6)">6</TheButton>
        <OperatorButton @click="handleFunction('-')" class="text-3xl">-</OperatorButton>
        <TheButton @click="handleFunction(1)">1</TheButton>
        <TheButton @click="handleFunction(2)">2</TheButton>
        <TheButton @click="handleFunction(3)">3</TheButton>
        <OperatorButton @click="handleFunction('+')" class="text-3xl">+</OperatorButton>
        <TheButton @click="handleFunction('00')">00</TheButton>
        <TheButton @click="handleFunction(0)">0</TheButton>
        <TheButton @click="handleFunction('.')">.</TheButton>
        <EqlsBtn @click="calculate">=</EqlsBtn>
    </div>
</template>

<script>
// import math from 'mathjs';
import Keypad from './keypad.vue';
import OperatorButton from './operator-button.vue';
import TheButton from './the-button.vue';
import EqlsBtn from './eqls-btn.vue';

export default {
    mounted() {
        this.$refs.myInput.focus();
    },
    data() {
        return {
            inputString: '',
            result: 0,
        }
    },
    components: {
        Keypad,
        OperatorButton,
        TheButton,
        EqlsBtn,
    },
    methods: {
        handleFunction(value) {
            this.appendToInput(value);
            this.checkFirstInput(value);
            this.checkOperators(value);
            this.checkInput(value);
            // this.calculate(value);
        },
        onKeyboardFunc() {
            this.checkFirstInput();
            this.checkOperators();
            this.checkInput();
            // this.calculate();
        },
        appendToInput(value) {
            this.inputString += value;
        },
        checkOperators() {
            const regex = /[-+*/%.]{2,}/g;
            this.inputString = this.inputString.replace(regex, (match) => match[1]);
        },
        calculate() {
            try {
                if (this.inputString.length > 0) {
                    const results = this.evaluateExpression(this.inputString);
                    this.result = results;
                    // console.log(this.result);
                }
                else {
                    this.result = 0;
                }
            } catch (error) {
                this.result = "Error";
                console.log(error);
            }

        },
        evaluateExpression(expression) {
            let postfixTokens = this.precedenceLevel(expression);
            // console.log(postfixTokens);
            let stack = [];

            for (let token of postfixTokens) {
                // console.log(token);
                if (parseFloat(token)) {
                    // console.log(token);
                    stack.push(parseFloat(token));
                    // console.log(parseFloat(token));
                } else {
                    // console.log(stack);
                    let rightOperand = stack.pop();
                    let leftOperand = stack.pop();
                    // console.log(leftOperand);
                    // console.log(rightOperand);
                    stack.push(this.evaluateOperation(leftOperand, rightOperand, token));
                }
            }
            return stack.pop();
        },
        precedenceLevel(expression) {
            const precedence = {
                '+': 1,
                '-': 1,
                '*': 2,
                '/': 2,
                '%': 2
            };

            let outputQueue = [];
            let operatorStack = [];

            let tokens = expression.match(/(\d+(\.\d+)?|\+|\-|\*|\/|\(|\)|\[|\]|\%)/g);
            // let tokens = expression.match(/(\d+(\.\d+)?|-?\d+(\.\d+)?|\+|\-|\*|\/|\(|\)|\%)/g);

            for (let token of tokens) {
                if (parseFloat(token)) {
                    // console.log(token);
                    outputQueue.push(token);
                    // console.log(outputQueue);
                } else if (token === '(') {
                    operatorStack.push(token);
                    // console.log(operatorStack);
                } else if (token === ')') {
                    while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
                        outputQueue.push(operatorStack.pop());
                        // console.log(outputQueue);
                    }
                    operatorStack.pop();
                    // console.log(operatorStack);
                } else {
                    while (
                        operatorStack.length > 0 &&
                        precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]

                    ) {
                        // console.log(token);
                        outputQueue.push(operatorStack.pop());
                        // console.log(outputQueue);

                    }
                    operatorStack.push(token);
                    // console.log(operatorStack);
                }
            }

            while (operatorStack.length > 0) {
                outputQueue.push(operatorStack.pop());
            }

            return outputQueue;
        },
        evaluateOperation(leftOperand, rightOperand, operator) {

            switch (operator) {
                case '+':
                    return leftOperand + rightOperand;
                case '-':
                    return leftOperand - rightOperand;
                case '*':
                    return leftOperand * rightOperand;
                case '/':
                    return leftOperand / rightOperand;
                case '%':
                    return leftOperand % rightOperand;
                default:
                    throw Error('Invalid operator: ' + operator);
            }
        },
        checkFirstInput() {
            if (/[0-9\(\)\[\]-]/.test(this.inputString)) {
                this.result = ''
            }
            else {
                this.inputString = this.inputString.slice(0, -1);
            }
        },
        checkInput() {
            this.inputString = this.inputString.trim()
            let pattern = /(\d+(\.\d+)?|\.|\+|\-|\*|\/|\%|\^|\(|\))/g;
            let res = this.inputString.match(pattern);
            if (res != null) {
                this.inputString = res.join('');
                // console.log(res);
            }
            else {
                this.clearInput()
                // console.log('cleared input ');
            }
        },
        clearInput() {
            this.inputString = '';
            this.result = 0;
        },
        clearLast() {
            // this.inputString = this.inputString.slice(0, -1);
            // const cursorPosition = 

            const inputField = document.getElementById('inputField')
            let cursorPosition = inputField.selectionStart;
            if (cursorPosition > 0) {
                let val = this.inputString;
                this.inputString = val.slice(0, cursorPosition - 1) + val.slice(cursorPosition, val.length)
                inputField.focus();
                setTimeout(() => {

                    inputField.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
                }, 1);
            }
        },
    }
}
</script>