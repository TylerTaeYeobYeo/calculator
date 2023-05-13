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
  private _acc: number = 0;
  private _operator: Operator | null = null;
  private _operand: number = 0;
  private _currentNumber: string | null = '0';

  private _dom: {
    calculator?: HTMLElement | null;
    keys?: HTMLElement | null;
    display?: HTMLElement | null;
  } = {};

  constructor({
    wrapperElement,
  }: CalculatorProps) {
    console.log('Calculator');
    this._parent = wrapperElement;
    this._calculatorDescription = `
      <div class="calculator">
        <div class="calculator__display">
          <div class="calculator__display__result"></div>
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

    this.init();
  }

  render() {
    const calculator = document.createElement('div');
    calculator.innerHTML = this._calculatorDescription;
    if (this._parent) {
      this._parent.appendChild(calculator);
    }
  }

  init() {
    console.log('init');
    if (!this._parent) return;
    this._dom.calculator = this._parent.querySelector('.calculator');
    this._dom.keys = this._dom.calculator!.querySelector('.calculator__keys');
    this._dom.display = this._dom.calculator!.querySelector('.calculator__display');
    this.displayNumber(this._currentNumber || this._acc.toString());
    this._dom.keys!.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const action = target.getAttribute('data-action');
      if (action === null) return;
      console.log(action);
      if (target?.classList?.contains("calculator__keys__key")) {
        switch (action) {
          case 'decimal':
            if (this._currentNumber === null) this._currentNumber = '0.';
            else if (this._currentNumber?.indexOf('.') === -1) {
              if (this._currentNumber === null) this._currentNumber = '0';
              this._currentNumber += '.';
            }
            break;
          case 'number':
            if (this._currentNumber === '0' || this._currentNumber === null) {
              this._currentNumber = target.innerHTML;
            } else {
              this._currentNumber += target.innerHTML;
            }
            break;
          case 'clear':
            this._acc = 0;
            this._operator = null;
            this._currentNumber = '0';
            break;
          case 'sign':
            if (this._currentNumber === null) {
              this._acc = this._acc * -1;
            }
            else {
              this._currentNumber = (parseFloat(this._currentNumber) * -1).toString();
            }
            break;
          case 'percentage':
            if (this._currentNumber === null) {
              this._acc = this._acc / 100;
            }
            else {
              this._acc = (parseFloat(this._currentNumber) / 100);
              this._currentNumber = null;
            }
            break;
          case Operator.add:
          case Operator.subtract:
          case Operator.multiply:
          case Operator.divide:
            if (this._currentNumber !== null) {
              this._acc = parseFloat(this._currentNumber);
            }
            this._operator = action;
            this._currentNumber = '0';
            break;
          case 'calculate':
            this._operand = this._currentNumber !== null ? parseFloat(this._currentNumber) : this._operand;
            console.log(this._acc, this._operator, this._operand, this._currentNumber);
            if (Number.isNaN(this._operand)) return;
            if (!this._operator) return;
            switch (this._operator) {
              case Operator.add:
                this._acc += this._operand;
                break;
              case Operator.subtract:
                this._acc -= this._operand;
                break;
              case Operator.multiply:
                this._acc *= this._operand;
                break;
              case Operator.divide:
                this._acc /= this._operand;
                break;
            }
            this._currentNumber = null;
            break;
        }
      }
      this.displayNumber(this._currentNumber || this._acc.toString());
    });
  }
  
  displayNumber(number: string) {
    document.querySelector('.calculator__display__result')!.innerHTML = number;
  }
}

export default Calculator;