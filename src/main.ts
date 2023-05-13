import './style.css'
import { Calculator } from './component/calculator';

const app = document.querySelector<HTMLDivElement>('.app');

const calculator = new Calculator({ wrapperElement: app });