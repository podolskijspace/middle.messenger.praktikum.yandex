import { EventBus } from "./eventBus";
import Handlebars from "handlebars";

interface IBlock {
  // render(): string;
  tagName: string
  props: object,
  eventBus: any,
  _registerEvents(eventBus:any): void;
}

// Нельзя создавать экземпляр данного класса
class Block  implements IBlock {
  static EVENTS = {
    MOUNT: "mount",
    UPDATE: "update",
    DELETE: "delete"
  };

  tagName: any;
  props: any;
  eventBus: any;
  _element: any;
  state: any;

  constructor(tagName = "div", props = {}) {
    const eventBus = new EventBus();

    this.tagName = tagName;

    // this.props = this._makePropsProxy(props);
    this.props = props;

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.MOUNT);
  }

  _registerEvents(eventBus: any) {
    eventBus.on(Block.EVENTS.MOUNT, this._mount.bind(this));
    eventBus.on(Block.EVENTS.UPDATE, this._update.bind(this));
    // eventBus.on(Block.EVENTS.DELETE, this._addListeners.bind(this));
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

  setState(newState:any) {
    this.state = newState;
    this._update();
  }
}

export {Block}