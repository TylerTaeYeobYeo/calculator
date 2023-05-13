import './style.css'
import { Calculator } from './component/calculator';

const app = document.querySelector<HTMLDivElement>('.app');

new Calculator({ wrapperElement: app });