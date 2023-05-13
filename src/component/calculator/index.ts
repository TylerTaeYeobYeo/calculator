
export type CalculatorProps = {
  wrapperElement: HTMLElement | null;
};

export class Calculator {
  private _calculatorDescription;
  private _parent;
  private _acc = '0';
  private _queue: (string | number)[] = [];
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
    this._dom.keys!.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const action = target.getAttribute('data-action');
      if (action === null) return;
      console.log(action);
      if (target?.classList?.contains("calculator__keys__key")) {
        switch (action) {
          case 'clear':
            this._queue = [];
            break;
          case 'sign':
            break;
          case 'decimal':
            break;
          case 'number':
            break;
          case 'add':
            break;
          case 'subtract':
            break;
          case 'multiply':
            break;
          case 'divide':
            break;
          case 'calculate':
            break;
        }
      }
      document.querySelector('.calculator__display__result')!.innerHTML = this.getLatestNumber(this._queue);
    });
  }
  
  getLatestNumber(queue: (string| number)[]): string {
    for (let i = queue.length - 1; i >= 0; i--) {
      if (!Number.isNaN(Number(queue[i]))) {
        return queue[i].toString();
      }
    }
    return '0';
  }
}

export default Calculator;