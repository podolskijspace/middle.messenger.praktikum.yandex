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

const onChange = (event:InputEvent, rule:rules, setProps: (p:object)=>void) => {
  const input:HTMLInputElement = event.target as HTMLInputElement;
  const reg:Nullable<RegExp> = rule ? ValidateRules[rule]?.reg : null;
  const value:string = input.value

  if (reg) {
    const isValid = value.match(reg)
    setProps({error: isValid ? 'error' : null, value})
  }
}

export class Input extends Block {
  // constructor({onBlur = () => {}, type = 'text', error, name, text, placeholder, value}: InputProps) {
  constructor({type = 'text', errorMessage="Ошибка валидации", ...rest}: InputProps) {
    super({...rest, type, errorMessage, events: {change: (event:any) => onChange(event, rest.rule, this.setProps)}});
  
    this.setProps({value: '', errorMessage})
  }

	static componentName = "Input";

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
