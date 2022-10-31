import EventBus from "./EventBus";
import Block from "./Block";

export enum StoreEvents {
  Updated = 'updated',
}

// наследуем Store от EventBus, чтобы его методы были сразу доступны у экземпляра Store
class Store extends EventBus {

  public set(path: string, value: unknown) {
    set(this.state, path, value);

        // метод EventBus
        this.emit(StoreEvents.Updated);
  };
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
          if (!isEqual(state, newState)) {
            this.setProps({...newState});
          }
        });
    }
  } 
} 


/* 
1. Добавить метод set
2. Добавить методы getState в Store
3. Функция isEqual
*/