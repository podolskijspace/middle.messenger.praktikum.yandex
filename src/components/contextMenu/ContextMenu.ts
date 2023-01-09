// @ts-nocheck
import Block from '../../core/Block';
import './contextMenu.scss';

interface ContextMenuProps {
	icon: string;
	onClick: () => void;
}


export class ContextMenu extends Block {
	constructor({icon, elems, onClick}: ContextMenuProps) {
		super({icon, elems, events: {click: onClick}});
	}

	static componentName = "ContextMenu";

	protected render(): string {
		return `
	    <div class="context-menu">
				<ul class="context-menu__list">
					${this.props.elems?.map((elem, i) => (
						`<li class="context-menu__item" data-id=${i}>
							<div class="context-menu__text">
								${elem.title}
							</div>
						</li>	`
					))?.join('')}
				</ul>
	    </div>
    `
	}
}
