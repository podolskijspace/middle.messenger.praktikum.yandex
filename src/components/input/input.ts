import { Block } from '../../core';
import { ValidateRules } from '../../utils/constants';
import { rules } from '../../utils/constants';
import './input.scss';

interface InputProps {
  // onBlur?: () => void;
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
  errorMessage?: string;
  class?: string;
  name?: string;
  text?: string;
  value?: string;
  rule: rules;
  input: () => {};
}

const onChange = (event:any, rule:rules, setProps:any) => {
  const input:HTMLInputElement = event.target;
  const reg:Nullable<RegExp> = rule ? ValidateRules[rule]?.reg : null;
  const value:string = input.value

  if (reg) {
    const match = value.match(reg)
    if (match) {
      setProps({value, error: null} )
    } else {
      setProps({error: 'error', value} )
    }
  }
}

export class Input extends Block {
  // constructor({onBlur = () => {}, type = 'text', error, name, text, placeholder, value}: InputProps) {
  constructor({type = 'text', name, text, placeholder, rule, value, errorMessage="Ошибка валидации",}: InputProps) {
    super({type, placeholder, name, text, rule, value, errorMessage, events: {change: (event:any) => onChange(event, rule, this.setProps)}});
  
    this.setProps({value: '', errorMessage})
  }

  protected render(): string {
    return `
      <div class="input {{class}}">
        <label class="form__label" for="{{name}}">{{text}}</label>
        <input class="form__input" id="{{name}}" name="{{name}}" type="{{type}}" placeholder="{{placeholder}}" value="${this.props.value}">
        <div class="input__error">${this.props.error ? this.props.errorMessage : ''}</div>
      </div>
    `
  }
}
