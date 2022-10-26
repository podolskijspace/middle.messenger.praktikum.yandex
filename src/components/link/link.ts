import Block from '../../core/Block';

import './link.css';

interface LinkProps {
  text: string;
  to: string;
}

export class Link extends Block {
  constructor(props: LinkProps) {
    const onClick = (e: MouseEvent) => {

      e.preventDefault();
    }

    super({...props, events: { click: onClick }});
  }

  render() {
    return `<a href="{{to}}">{{text}}</a>`;
  }
}