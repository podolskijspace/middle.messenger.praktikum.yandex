import Block from '../../core/Block';
import { onLink } from '../../utils/helpers';

import './link.scss';

interface LinkProps {
  text: string;
  className: string;
  to: string;
}

export class Link extends Block {
  constructor({to, className, ...props}: LinkProps) {
    super({...props, events: { click: (e: MouseEvent) => onLink(e, to) }});

    this.setProps({className})
  }

  render() {
    return `<a class="link {{className}}"> {{text}} </a>`
  }
}
