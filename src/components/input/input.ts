import {Block, registerComponent} from '../../core';

import './input.css';

interface InputProps {
  // onBlur?: () => void;
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
  value?: string;
  error?: string;
  class?: string;
  name?: string;
  text?: string;
  rule: string;
}

interface InputElemProps {
  rule: string;
}


class InputElem extends Block {
  constructor({rule}: InputElemProps) {
    super({rule});

    this.setProps({
      events: {blur: (event: any) => this.onBlur(event, rule)}
    })
  }

  onBlur(event:any, rule:string) {
    console.log(rule)
  }

  protected render():string {
    return (
      `<input >`
    )
  }
}

registerComponent(InputElem)

export class Input extends Block {
  // constructor({onBlur = () => {}, type = 'text', error, name, text, placeholder, value}: InputProps) {
  constructor({type = 'text', error, name, text, placeholder, value, rule}: InputProps) {
    super({type, placeholder, value, error, name, text});

    this.setProps({
      rule
    })
  }

  protected render(): string {
    // language=hbs
    return `
      <div class="input {{class}}">
        <label class="form__label" for="{{name}}">{{text}}</label>
        <input class="form__input auth__input" id="{{name}}" name="{{name}}" type="{{type}}" placeholder="{{placeholder}}" value="{{value}}">
        {{{InputElem rule="${this.props.rule}"}}}
        <div class="input__error">{{#if error}}{{error}}{{/if}}</div>
      </div>
    `
  }
}
