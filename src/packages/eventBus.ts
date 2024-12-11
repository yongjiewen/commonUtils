type Callback = (...args: any[]) => void;
// 事件总线(Event Bus)系统
export class EventBus {
  private static instance?: EventBus;
  private events: { [key: string]: Array<Callback> } = {};

  public static get Ins(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }

  public getCallbackList(eventName: string): Callback[] {
    if (!Array.isArray(this.events[eventName])) {
      this.events[eventName] = [];
    }
    return this.events[eventName] as Callback[];
  }
  // 订阅事件
  on(eventName: string, callback: Callback) {
    const list = this.getCallbackList(eventName);
    list.push(callback);
  }
  // 一次性订阅事件（触发一次后自动取消订阅）
  once(eventName: string, callback: Callback) {
    const callbackWra = (...params: any[]) => {
      callback(...params);
      this.off(eventName, callbackWra);
    };
    const list = this.getCallbackList(eventName);
    list.push(callbackWra);
  }
  // 订阅指定次数的事件
  times(times: number, eventName: string, callback: Callback) {
    const callbackWra = () => {
      let count = 0;
      const newCallBack = (...params: any[]) => {
        callback(...params);
        count++;
        if (count === times) {
          this.off(eventName, newCallBack);
        }
      };
      return newCallBack;
    };
    const list = this.getCallbackList(eventName);
    list.push(callbackWra());
  }
  // 触发事件
  emit(eventName: string, ...params: any[]) {
    const list = this.getCallbackList(eventName);
    list.forEach((item) => {
      item(...params);
    });
  }
  // 取消特定事件的订阅
  off(eventName: string, callback: Callback) {
    const list = this.getCallbackList(eventName);
    const index = list.findIndex((i) => i === callback);
    index > -1 && list.splice(index, 1);
  }
  // 取消所有事件订阅
  offAll() {
    this.events = {};
  }
}
