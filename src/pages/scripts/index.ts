import {renderDOM, registerComponent} from './core';
import { MainPage } from './pages/Main/MainPage';
import Button from './components/Button';
import Input from './components/Input';

// registerComponent(Button)
registerComponent(Input)

document.addEventListener("DOMContentLoaded", ():void => {
  renderDOM(new MainPage())
})