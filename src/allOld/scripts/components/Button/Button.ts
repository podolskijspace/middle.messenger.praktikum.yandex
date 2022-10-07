import { Block } from '../../core';
import template from 'bundle-text:./template.hbs';


interface ButtonProps {
  text: string;
  onClick: () => void;
}

export class Button extends Block {
  constructor({text, onClick}: ButtonProps) {
    super({text, events: {click: onClick}});
  }

  protected render(): string {
    return `
      <div class="button">
        <button class="button__button" type="button">{{text}}</button>
      </div>
    `
  }
}