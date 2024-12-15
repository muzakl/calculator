import classes from './modules/App.module.scss';
import { useState } from 'react';

const App = () => {
    const [operandOne, setOperandOne] = useState('');
    const [operandTwo, setOperandTwo] = useState('');
    const [operator, setOperator] = useState(null);
    const [result, setResult] = useState(null);

    const functionHandler = (input) => {
        if (typeof input === 'number' || input === '.') {
            if (operator) {
                setOperandTwo((prev) => prev + input.toString());
            } else {
                setOperandOne((prev) => prev + input.toString());
            }
        } else if (['+', '-', 'x', '/'].includes(input)) {
            setOperator(input);
        } else if (input === '=') {
            const num1 = parseFloat(operandOne);
            const num2 = parseFloat(operandTwo);
            let calcResult = 0;

            switch (operator) {
                case '+':
                    calcResult = num1 + num2;
                    break;
                case '-':
                    calcResult = num1 - num2;
                    break;
                case 'x':
                    calcResult = num1 * num2;
                    break;
                case '/':
                    calcResult = num2 !== 0 ? num1 / num2 : 'Error';
                    break;
                default:
                    calcResult = 'Error';
            }

            setResult(calcResult);
            setOperandOne(calcResult.toString());
            setOperandTwo('');
            setOperator(null);
        } else if (input === 'DEL') {
            if (operandTwo) {
                setOperandTwo((prev) => prev.slice(0, -1));
            } else if (operator) {
                setOperator(null);
            } else {
                setOperandOne((prev) => prev.slice(0, -1));
            }
        } else if (input === 'RESET') {
            setOperandOne('');
            setOperandTwo('');
            setOperator(null);
            setResult(null);
        }
    };

    return (
        <div className={classes['container']}>
            <div className={classes['calculator']}>
                <h1>calc</h1>
                <div className={classes['display']}>
                    {result !== null ? `${operandOne} ${operator || ''} ${operandTwo}`.trim() : operandTwo || operandOne || '0'}
                </div>
                <div className={classes['buttons']}>
                    <button onClick={() => functionHandler(7)}>7</button>
                    <button onClick={() => functionHandler(8)}>8</button>
                    <button onClick={() => functionHandler(9)}>9</button>
                    <button onClick={() => functionHandler('DEL')}>DEL</button>
                    <button onClick={() => functionHandler(4)}>4</button>
                    <button onClick={() => functionHandler(5)}>5</button>
                    <button onClick={() => functionHandler(6)}>6</button>
                    <button onClick={() => functionHandler('+')}>+</button>
                    <button onClick={() => functionHandler(1)}>1</button>
                    <button onClick={() => functionHandler(2)}>2</button>
                    <button onClick={() => functionHandler(3)}>3</button>
                    <button onClick={() => functionHandler('-')}>-</button>
                    <button onClick={() => functionHandler('.')}>.</button>
                    <button onClick={() => functionHandler(0)}>0</button>
                    <button onClick={() => functionHandler('/')}>/</button>
                    <button onClick={() => functionHandler('x')}>x</button>
                    <button onClick={() => functionHandler('RESET')}>RESET</button>
                    <button onClick={() => functionHandler('=')}>=</button>
                </div>
            </div>
        </div>
    );
};

export default App;
