<script>
new Vue({
    el: "#app",
    data: {
        expression: ""
    },
    methods: {
        addToExpression(char) {
            this.expression += char;
        },
        clearExpression() {
            this.expression = "";
        },
        calculateResult() {
            try {
                const result = this.evaluateExpression(this.expression);
                this.expression = result.toString();
            } catch (error) {
                this.expression = "Error";
            }
        },
        evaluateExpression(expression) {
            // Implement a custom expression parser and evaluator following BODMAS rules
            // This is a simple example, and you can extend it to handle more complex expressions
            let tokens = expression.split(/([+\-*/()])/).filter(token => token.trim() !== '');

            function applyOperator(operators, values) {
                const operator = operators.pop();
                const right = values.pop();
                const left = values.pop();
                if (operator === '+') {
                    values.push(left + right);
                } else if (operator === '-') {
                    values.push(left - right);
                } else if (operator === '*') {
                    values.push(left * right);
                } else if (operator === '/') {
                    values.push(left / right);
                }
            }

            const precedence = {
                '+': 1,
                '-': 1,
                '*': 2,
                '/': 2,
            };

            let values = [];
            let operators = [];
            for (const token of tokens) {
                if (/^\d+(\.\d+)?$/.test(token)) {
                    values.push(parseFloat(token));
                } else if (token in precedence) {
                    while (
                        operators.length > 0 &&
                        operators[operators.length - 1] in precedence &&
                        precedence[operators[operators.length - 1]] >= precedence[token]
                    ) {
                        applyOperator(operators, values);
                    }
                    operators.push(token);
                } else if (token === '(') {
                    operators.push(token);
                } else if (token === ')') {
                    while (operators.length > 0 && operators[operators.length - 1] !== '(') {
                        applyOperator(operators, values);
                    }
                    operators.pop(); // Remove the '('
                }
            }
            while (operators.length > 0) {
                applyOperator(operators, values);
            }
            return values[0];
        }
    }
});
</script>