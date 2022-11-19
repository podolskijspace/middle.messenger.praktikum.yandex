import Block from '../../core/Block';

import './buttonWithIcon.css';

interface ButtonProps {
  icon: string;
  onClick: () => void;
}

export class ButtonWithIcon extends Block {
  constructor({icon, onClick}: ButtonProps) {
    super({icon, events: {click: onClick}});
  }

  protected render(): string {
    return `
    <div class="button-with-icon">
      <button class="button-with-icon__button" type="button"><i class="fa {{icon}}" aria-hidden="true"></i></button>
    </div>
    `
  }
}
