import EventBus from "./EventBus";
import Block from "./Block";
import {isEqualObj, set} from "../utils/helpers";

export enum StoreEvents {
  Updated = 'updated',
}

const initialState = {
  user: {
    name: null,
    avatar: null
  }
}

// наследуем Store от EventBus, чтобы его методы были сразу доступны у экземпляра Store
class Store extends EventBus {
  static state;

  constructor() {
    super();
    this.state = initialState
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);
      // метод EventBus
      this.emit(StoreEvents.Updated);
  };

    public getState() {
      return this.state;
    }

    // public set(path: string, value: unknown) {
    //     set(this.state, path, value);
    // };
}

const store = new Store()

export default store 

export function connect(Component: typeof Block, mapStateToProps) {
  // используем class expression
  return class extends Component {
    constructor(...props) {
            // не забываем передать все аргументы конструктора
          super({...props, ...mapStateToProps(store.getState())});

      // подписываемся на событие
        store.on(StoreEvents.Updated, () => {
          // вызываем обновление компонента, передав данные из хранилища
          const newState = mapStateToProps(store.getState());
          // если что-то из используемых данных поменялось, обновляем компонент
          if (!isEqualObj(store.getState(), newState)) {
            this.setProps({...newState});
          }
        });
    }
  } 
} 


/* 
1. Добавить метод set
2. Добавить методы getState в Store
3. Функция isEqual // DONE
*/