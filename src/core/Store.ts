import EventBus from "./EventBus";
import Block from "./Block";
import { isEqualObj, set } from "../utils/helpers";

export enum StoreEvents {
  Updated = "updated",
}

type stateType = {
  user: Record<string, string>;
};

const initialState: stateType = {
  user: {},
};

// наследуем Store от EventBus, чтобы его методы были сразу доступны у экземпляра Store
class Store extends EventBus {
  static state: stateType;

  constructor() {
    super();
    // @ts-ignore
    this.state = initialState;
  }

  public set(path: string, value: unknown) {
    // @ts-ignore
    set(this.state, path, value);
    // метод EventBus
    this.emit(StoreEvents.Updated);
  }

  public getState(): stateType {
    // @ts-ignore
    return this.state;
  }

  // public set(path: string, value: unknown) {
  //     set(this.state, path, value);
  // };
}

const store = new Store();

export default store;

type funcMapStateToProps = (state: stateType) => stateType;

export function connect(
  Component: typeof Block,
  mapStateToProps: funcMapStateToProps
) {
  // используем class expression
  return class extends Component {
    constructor(props: payloadData) {
      // не забываем передать все аргументы конструктора
      super({ ...props, ...mapStateToProps(store.getState()) });

      // подписываемся на событие
      store.on(StoreEvents.Updated, () => {
        // вызываем обновление компонента, передав данные из хранилища
        const newState = mapStateToProps(store.getState());
        // если что-то из используемых данных поменялось, обновляем компонент
        if (!isEqualObj(store.getState(), newState)) {
          this.setProps({ ...newState });
        }
      });
    }
  };
}
