import Block from '../../core/Block';

import './buttonWithIcon.css';

interface ButtonProps {
  icon: string;
	className?: string;
  onClick: () => void;
}

export class ButtonWithIcon extends Block {
  constructor({icon, onClick, className}: ButtonProps) {
    super({icon, className, events: {click: onClick}});
  }

  protected render(): string {
		const {className, type} = this.props;
    return `
    <div class="button-with-icon ${className ? className : ""}">
      <button class="button-with-icon__button" type="${type ? type : "button"}"><i class="fa {{icon}}" aria-hidden="true"></i></button>
    </div>
    `
  }
}
