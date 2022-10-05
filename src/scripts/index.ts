import renderDOM from './core/renderDOM';
import { Block } from './core';

class MyComponent extends Block {
  render():string {
    return `
      <div> Hello world </div>
    `
  }
}

document.addEventListener("DOMContentLoaded", ():void => {
  renderDOM(new MyComponent())
})