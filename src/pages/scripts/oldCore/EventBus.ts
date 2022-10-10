interface IEventBus {
  on:(event:string, callback:()=>{}) => void
  off:(event:string, callback:()=>{}) => void
  emit:(event:string, ...args:Array<any>) => void
}

class EventBus implements IEventBus  {
  listeners: Record<string, Array<(...args:any)=>{}>>;
  constructor() {
    this.listeners = {};
  }

  on(event:string, callback:()=>{}) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event:string, callback:()=>{}) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      listener => listener !== callback
    );
  }

  emit(event:string, ...args:Array<()=>{}>) {
    if (!this.listeners[event]) {
      throw new Event(`Нет события: ${event}`);
    }

    this.listeners[event].forEach(listener => {
      listener(...args);
    });
  }
}

export {EventBus, IEventBus}