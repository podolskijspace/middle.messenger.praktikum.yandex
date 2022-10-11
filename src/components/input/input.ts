import {Block, registerComponent} from '../../core';
import { rules } from '../../utils/constants';

import './input.css';

interface InputProps {
  // onBlur?: () => void;
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
  errorMessage?: string;
  class?: string;
  name?: string;
  text?: string;
  value?: string;
  rule: string;
  input: () => {};
}

const onChange = (event:any, setProps:any) => {
  const input:HTMLInputElement = event.target;
  const rule = input.dataset.rule
  const value = input.value

  if (rule) {
    const match = value.match(rules[rule])
    console.log(value, match)

    if (match) {
      setProps({value} )
    } else {
      setProps({error: 'error', value} )
    }
    
  }
}

export class Input extends Block {
  // constructor({onBlur = () => {}, type = 'text', error, name, text, placeholder, value}: InputProps) {
  constructor({type = 'text', name, text, placeholder, rule, value, errorMessage="Ошибка валидации",}: InputProps) {
    super({type, placeholder, name, text, rule, value, errorMessage, events: {change: (event:any) => onChange(event, this.setProps)}});
  
    this.setProps({value: '', errorMessage})
  }

  protected render(): string {
    return `
      <div class="input {{class}}">
        <label class="form__label" for="{{name}}">{{text}}</label>
        <input data-rule="{{rule}}" class="form__input" id="{{name}}" name="{{name}}" type="{{type}}" placeholder="{{placeholder}}" value="${this.props.value}">
        <div class="input__error">${this.props.error ? this.props.errorMessage : ''}</div>
      </div>
    `
  }
}
