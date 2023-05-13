export type CalculatorProps = {
  wrapperElement: HTMLElement | null;
};

enum Operator {
  add = 'add',
  subtract = 'subtract',
  multiply = 'multiply',
  divide = 'divide',
}

export class Calculator {
  private _calculatorDescription;
  private _parent;
  private _accumulator: (number | Operator)[] = [];
  private _currentNumber: string | null = '0';
  private readonly _calculatorInputRegExp = /[0-9-+*/=.]$/;

  private _dom: {
    calculator?: HTMLElement | null;
    keys?: HTMLElement | null;
    display?: HTMLInputElement | null;
  } = {};

  constructor({
    wrapperElement,
  }: CalculatorProps) {
    console.log('Calculator');
    this._parent = wrapperElement;
    this._calculatorDescription = `
      <div class="calculator">
        <div class="calculator__display">
          <input class="calculator__display__result" type="text" disabled></input>
        </div>
        <div class="calculator__keys">
          <button class="calculator__keys__key calculator__keys__gray" data-action="clear">C</button>
          <button class="calculator__keys__key calculator__keys__gray" data-action="sign">+/-</button>
          <button class="calculator__keys__key calculator__keys__gray" data-action="percentage">%</button>
          <button class="calculator__keys__key" data-action="divide">÷</button>
          <button class="calculator__keys__key calculator__keys__number" data-action="number">7</button>
          <button class="calculator__keys__key calculator__keys__number" data-action="number">8</button>
          <button class="calculator__keys__key calculator__keys__number" data-action="number">9</button>
          <button class="calculator__keys__key" data-action="multiply">×</button>
          <button class="calculator__keys__key calculator__keys__number" data-action="number">4</button>
          <button class="calculator__keys__key calculator__keys__number" data-action="number">5</button>
          <button class="calculator__keys__key calculator__keys__number" data-action="number">6</button>
          <button class="calculator__keys__key" data-action="subtract">-</button>
          <button class="calculator__keys__key calculator__keys__number" data-action="number">1</button>
          <button class="calculator__keys__key calculator__keys__number" data-action="number">2</button>
          <button class="calculator__keys__key calculator__keys__number" data-action="number">3</button>
          <button class="calculator__keys__key" data-action="add">+</button>
          <button class="calculator__keys__key calculator__keys__number calculator__keys__double" data-action="number">0</button>
          <button class="calculator__keys__key calculator__keys__number" data-action="decimal">.</button>
          <button class="calculator__keys__key" data-action="calculate">=</button>
        </div>
      </div>
    `;

    this.render();

    this._init();
  }

  render() {
    const calculator = document.createElement('div');
    calculator.innerHTML = this._calculatorDescription;
    if (this._parent) {
      this._parent.appendChild(calculator);
    }
  }

  private _init() {
    console.log('_init');
    if (!this._parent) return;
    this._dom.calculator = this._parent.querySelector('.calculator');
    this._dom.keys = this._dom.calculator!.querySelector('.calculator__keys');
    this._dom.display = this._dom.calculator!.querySelector('.calculator__display__result')
    this._displayNumber();
    this._dom.keys!.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const action = target.getAttribute('data-action');
      if (action === null) return;
      console.log(action);
      if (target?.classList?.contains("calculator__keys__key")) {
        switch (action) {
          case 'decimal':
            this._writeDecimal();
            break;
          case 'number':
            this._writeNumber(target.textContent!);
            break;
          case 'clear':
            this._clear();
            break;
          case 'sign':
            this._writeSign();
            break;
          case 'percentage':
            break;
          case Operator.add:
          case Operator.subtract:
          case Operator.multiply:
          case Operator.divide:
            this._writeOperator(action);
            break;
          case 'calculate':
            this._calculate();
            break;
        }
      }
      this._displayNumber();
    });
    this._dom.display?.addEventListener('input', (e) => {
      const event = e as InputEvent;
      const target = event.target as HTMLInputElement;
      console.log(e);
      let input: string | null = event.data;
      if (input === null) {
        this._currentNumber = null;
        return;
      }
      else if (!this._calculatorInputRegExp.test(input)) {
        this._displayNumber();
        return;
      }
      if (input === '.') {
        this._currentNumber = target.value;
        this._removeWrongDecimal();
        this._displayNumber();
      }
      // operand
      else if (/[-+*/]/.test(input)) {
        console.log("hit");
        this._writeOperator(this._enumarteOperator(input)!);
        this._currentNumber = null;
        this._displayNumber();
      }
      else if (input === "=") {

      }
      else if (event.target) {
        this._currentNumber = null;
        this._writeNumber(target.value);
        this._displayNumber();
      }
    });
  }

  private _writeDecimal() {
    if (this._currentNumber === null) {
      this._currentNumber = '0.';
    }
    else if (this._currentNumber.indexOf('.') === -1) {
      this._currentNumber += '.';
    }
  }

  private _removeWrongDecimal() {
    if (this._currentNumber === null) return;
    const index: number = this._currentNumber.indexOf('.');
    if (index === -1) return;
    const valueWithoutDecimal = this._currentNumber?.split('.').join('');
    this._currentNumber = valueWithoutDecimal?.substring(0, index) + '.' + valueWithoutDecimal?.substring(index);
  }

  private _writeNumber(value: string) {
    if (this._currentNumber === '0' ||
      this._currentNumber === null
    ) {
      if (this._accumulator.length === 1) this._accumulator.pop();
      this._currentNumber = value;
    } else if (this._currentNumber === '-0') {
      this._currentNumber = '-' + value;
    } else {
      this._currentNumber += value;
    }
    console.log("write number:", this._currentNumber);
  }

  private _enumarteOperator(value: string): Operator | null {
    switch (value) {
      case "+": return Operator.add;
      case "-": return Operator.subtract;
      case "*": return Operator.multiply;
      case "/": return Operator.divide;
      default: return null;
    }
  }

  private _writeOperator(operator: Operator) {
    if (this._currentNumber === null) {
      if (this._accumulator.length === 0) {
        this._accumulator.push(0);
      }
      else if (typeof this._accumulator[this._accumulator.length - 1] !== 'number') {
        this._accumulator.pop();
      }
    }
    else this._accumulator.push(parseFloat(this._currentNumber));
    this._accumulator.push(operator);
    this._currentNumber = null;
    console.log("write operator:", this._accumulator);
  }

  private _writeSign() {
    if (this._currentNumber === null) {
      const queued = this._getLatestQueuedNumber();
      if (queued !== null) {
        this._accumulator = [];
        this._currentNumber = this._reverseSign(queued.toString());
        return;
      }
      this._currentNumber = '-0';
    } else {
      this._currentNumber = this._reverseSign(this._currentNumber);
    }
  }

  private _reverseSign(value: string) {
    return value.charAt(0) === '-' ? value.slice(1) : '-' + value;
  }

  private _clear() {
    this._accumulator = [];
    this._currentNumber = null;
  }

  private _getLatestQueuedNumber(): number | null {
    let int: number | null = null;
    for (let i = this._accumulator.length - 1; i >= 0; i--) {
      if (typeof this._accumulator[i] === 'number') {
        int = this._accumulator[i] as number;
        break;
      }
    }
    return int;
  }

  private _displayNumber() {
    const number = this._currentNumber ?? this._getLatestQueuedNumber()?.toString() ?? '0';
    console.log("display number:", number);
    if (this._dom.display) {
      this._dom.display.value = number;
    }
  }
  
  private _calculate() {
    if (this._accumulator.length === 0) {
      if (this._currentNumber !== null) {
        this._accumulator.push(parseFloat(this._currentNumber));
        this._currentNumber = null;
      }
    }
    else {
      if (this._currentNumber !== null) {
        this._accumulator.push(parseFloat(this._currentNumber));
        this._currentNumber = null;
      }
      else {
        if (typeof this._accumulator[this._accumulator.length - 1] !== 'number') {
          this._accumulator.pop();
        }
      }
    }
    this._accumulator = [this.calculate(this._accumulator)];
    this._currentNumber = null;
  }

  private _calcTwoNumber(a: number, b: number, operator: Operator): number {
    switch (operator) {
      case Operator.add:
        return a + b;
      case Operator.subtract:
        return a - b;
      case Operator.multiply:
        return a * b;
      case Operator.divide:
        return  a / b;
    }
  }
  
  calculate(equation: (number | Operator)[]): number {
    if (equation.length === 0) return 0;
    // multiplication/division
    const eqCopy = [...equation];
    for (let i = 0; i < eqCopy.length; i++) {
      if (eqCopy[i] === Operator.multiply || eqCopy[i] === Operator.divide) {
        const result = this._calcTwoNumber(eqCopy[i - 1] as number, eqCopy[i + 1] as number, eqCopy[i] as Operator);
        if (Number.isNaN(result)) return result;
        eqCopy.splice(i - 1, 3, result);
        i--;
      }
    }
    // add/subtract
    for (let i = 0; i < eqCopy.length; i++) {
      if (eqCopy[i] === Operator.add || eqCopy[i] === Operator.subtract) {
        const result = this._calcTwoNumber(eqCopy[i - 1] as number, eqCopy[i + 1] as number, eqCopy[i] as Operator);
        if (Number.isNaN(result)) return result;
        eqCopy.splice(i - 1, 3, result);
        i--;
      }
    }
    return eqCopy[0] as number;
  }
}

export default Calculator;