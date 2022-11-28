import Block from '../../core/Block';

import './button.css';

interface ButtonProps {
  text: string;
  onClick: () => void;
	type?: string;
}

export class Button extends Block {
  constructor({text, type, onClick}: ButtonProps) {
    super({text,type, events: {click: onClick}});
  }

	static componentName = "Button";

  protected render(): string {
		const {type} = this.props;
    return `
    <div class="button">
      <button class="button__button" type="${type ? type : "button"}">{{text}}</button>
    </div>
    `
  }
}
