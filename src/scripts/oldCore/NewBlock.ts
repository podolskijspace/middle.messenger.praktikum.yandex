import { EventBus, IEventBus } from "./eventBus";
import Handlebars from "handlebars";

type Props = {
  source?: string,
  classNames?: 'string',
  data?: object,
}

interface IBlock {
  // render(): string;
  tagName: string
  props: Props,
  eventBus: IEventBus,
  state: object,
  _registerEvents(eventBus:IEventBus): void,
  _mount(): void,
  _update(): void,
  _createElement(): void,
  _createState(): void,
  _addListeners(): void,
  _deleteListeners(): void,
  _createResourse(): void,
  _setState(newState:object): void,
}

// Нельзя создавать экземпляр данного класса
class Block  implements IBlock {
  static EVENTS = {
    MOUNT: "mount",
    UPDATE: "update",
    DELETE: "delete"
  };

  tagName: string;
  props: Props;
  eventBus: IEventBus;
  _element: HTMLElement;
  state: object;

  constructor(tagName = "div", props = {}) {
    this.tagName = tagName;
    this.props = props;

    this.eventBus = new EventBus();

    this._registerEvents(this.eventBus);
    this.eventBus.emit(Block.EVENTS.MOUNT);
  }

  _registerEvents(eventBus: any) {
    eventBus.on(Block.EVENTS.MOUNT, this._mount.bind(this));
    eventBus.on(Block.EVENTS.UPDATE, this._update.bind(this));
  }

  _mount() {
    this._createElement(); //3
    this._createState(); //4
    this._createResourse();//5 и 6 и 11
    this._addListeners();//10
  }

  _update() {
    this._createResourse();//5 и 6 и 11
    this._deleteListeners();//9
    this._addListeners();//10
  }

  _createElement() {
    this._element = document.createElement(this.tagName);
  }

  _createState() {}

  _addListeners() {}

  _deleteListeners() {}

  _createResourse() {
    const template = Handlebars.compile(this.props.source)

    this._element.innerHTML = template({...this.props.data, ...this.state})
  }

  _setState(newState:object) {
    this.state = newState;
    this._update();
  }
}

export {Block}