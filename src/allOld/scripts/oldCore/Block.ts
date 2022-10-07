// import { EventBus, IEventBus } from "./EventBus";
// import Handlebars from "handlebars";



// class Block implements IBlock{
//   static EVENTS:Record<string, string> = {
//     INIT: "init",
//     FLOW_CDM: "flow:component-did-mount",
//     FLOW_RENDER: "flow:render"
//   };

//   eventBus: IEventBus = new EventBus();
//   source: string;
//   data: object;
//   wrapper:HTMLDivElement;
  
//   constructor(source: string, data: object) {
//     this.source = source;
//     this.data = data
//   }

//   init() {
//     this.wrapper = document.createElement('div');
//     this.wrapper.innerHTML = this.render();

//     this.componentDidMount();
//     return this.wrapper;
//   }

//   componentDidMount() {
    
//   }

//   render() {
//     const template = Handlebars.compile(this.source)

//     return template(this.data)
//   }
// }

// export {Block};

interface IBlock {
  // render(): string;
  init(): void;
  _meta: {
    tagName: string
  };
  props: object,
  eventBus: any,
  _registerEvents(eventBus:any): void;
}


import { EventBus } from "./eventBus";
import Handlebars from "handlebars";

// Нельзя создавать экземпляр данного класса
class Block  implements IBlock {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_RENDER: "flow:render"
  };

  _element: any;
  _meta: {
    tagName: string,
  };
  props: any;
  eventBus: any;

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor(tagName = "div", props = {}) {
    const eventBus = new EventBus();

    this._meta = {
      tagName
    };

    // this.props = this._makePropsProxy(props);
    this.props = props;

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _addListeners() {

  }

  _registerEvents(eventBus: any) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    // eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._addListeners.bind(this));
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

//   _componentDidMount() {
//     this.componentDidMount();
//   }

//   componentDidMount(oldProps) {}

//     dispatchComponentDidMount() {
//         this._eventBus().emit(Block.EVENTS.FLOW_CDM);
//     }

//   _componentDidUpdate(oldProps, newProps) {
    
//   }

//   componentDidUpdate(oldProps, newProps) {
//     return true;
//   }

//   setProps = nextProps => {
//     if (!nextProps) {
//       return;
//     }

//     Object.assign(this.props, nextProps);
//   };

//   get element() {
//     return this._element;
//   }

  _render() {
    const block = this.render();
    // Это небезопасный метод для упрощения логики
    // Используйте шаблонизатор из npm или напишите свой безопасный
    // Нужно компилировать не в строку (или делать это правильно),
    // либо сразу превращать в DOM-элементы и возвращать из compile DOM-ноду
    this._element.innerHTML = block;
  }

//     // Переопределяется пользователем. Необходимо вернуть разметку
  render() {
    
    const template = Handlebars.compile(this.props.source)

    return template(this.props.data)
  }

//   getContent() {
//     return this.element;
//   }

//   _makePropsProxy(props) {
//     // Ещё один способ передачи this, но он больше не применяется с приходом ES6+
//     const self = this;

//         // Здесь вам предстоит реализовать метод
//     return props;
//   }

  _createDocumentElement(tagName:string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName); 
  }
}

export {Block}