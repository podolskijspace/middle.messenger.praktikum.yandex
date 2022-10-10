import { Block } from '../../core';
import template from 'bundle-text:./template.hbs';


interface InputProps {
  onChange?: () => void;
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
  value?: string;
  error?: string;
}

export class Input extends Block {
  constructor({onChange = () => {}, type = 'text', error, placeholder, value}: InputProps) {
    super({type, placeholder, value, error, events: {input: onChange}});
  }

  protected render(): string {
    return template;
  }
}