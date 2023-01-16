import Block from "../../core/Block";
import { isUndefinedOrFalse } from "../../utils/helpers";

interface chatSmallProps {
  icon: string;
  onClick: () => void;
  contextmenu: () => void;
  onContextMenu: () => void;
}

export class ChatSmallComponent extends Block {
  constructor({ onClick, onContextMenu, ...props }: chatSmallProps) {
    super({ ...props, events: { click: onClick, contextmenu: onContextMenu } });
  }

  static componentName = "ChatSmallComponent";

  protected render(): string {
    return `
      <li data-id={{id}} class="chat-small ${
        isUndefinedOrFalse(this.props.active) ? "active" : ""
      }">
        <div class="chat-small__wrapper">
          <div class="chat-small__avatar">
            <div class="chat-small__avatar-img">
            	${
                isUndefinedOrFalse(this.props.avatar)
                  ? `
								<img src="https://ya-praktikum.tech/api/v2/resources${this.props.avatar}">
							`
                  : ""
              }
						</div>
          </div>
          <div class="chat-small__info">
            <div class="chat-small__name">
              {{title}}
            </div>
            <div class="chat-small__last-message">
              ${
                isUndefinedOrFalse(this.props.last_message)
                  ? this.props.last_message
                  : "Нет сообщений"
              }
            </div> 
          </div>
        </div>
      </li>
    `;
  }
}
