interface LocalStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  clear(): void;
  length: number;
  key(index: number): string | null;
}
/**
 * localStorage和sessionStorage的，支持设置过期时间和加密
 */
class Storage {
  store: LocalStorage;
	type?: string;
  constructor(type?:string) {
    this.store = type !== 'sessionStorage' ? (localStorage || window.localStorage) : (sessionStorage || window.sessionStorage)
  }
  /**
   * 设置 Storage
   * @param key
   * @param value
   * @param expires 过期时间毫秒
   * @returns {*}
   */
  set(key: string, value: any, expires?: number): void {
    let params = { key, value, expires };
    if (expires) {
      // 记录何时将值存入缓存，毫秒级
      var data = Object.assign(params, { startTime: new Date().getTime() });
      this.store.setItem(key, JSON.stringify(data));
    } else {
      if (Object.prototype.toString.call(value) == "[object Object]") {
        value = JSON.stringify(value);
      }
      if (Object.prototype.toString.call(value) == "[object Array]") {
        value = JSON.stringify(value);
      }
      this.store.setItem(key, value);
    }
  }
  /**
   * 获取某个 Storage 值
   * @param key
   * @returns {*}
   */
  get(key: string): string | null {
    let item: any = this.store.getItem(key);
    // 将json数据转为对象的形式
    try {
      item = JSON.parse(item!);
    } catch (error) {
      //字符串
      item = item;
    }
    // 如果有startTime的值，说明设置了失效时间
    if (item && item.startTime) {
      let date = new Date().getTime();
      // 如果大于就是过期了，如果小于或等于就还没过期
      if (date - item.startTime > item.expires) {
        this.store.removeItem(key);
        return null;
      } else {
        return item.value;
      }
    } else {
      return item;
    }
  }
  /**
   * 清除某个 Storage 值
   * @param key
   * @returns {*}
   */
  remove(key: string): void {
    this.store.removeItem(key);
  }
  /**
   * 清除全部
   */
  clear(): void {
    this.store.clear();
  }
}
export const Local = new Storage()
export const Session = new Storage('sessionStorage')
export const storage: any  = {
	Local,
	Session
}
