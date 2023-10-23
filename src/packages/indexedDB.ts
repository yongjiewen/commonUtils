type IDB = {
  dbName: string;
  tbName: string;
  version?: number;
  expires?: number;
};

/**
 * @name: IndexedDB本地存储数据库 (一张表为一个实例，多个表请实例化多次)
 * @param {String} dbName 数据库名称
 * @param {String} tbName 表名称
 * @param {String} version 版本号
 * @param {Number} expires 过期时间毫秒
 * @return {*}
 */
export class IndexedDB {
  dbName: string;
  tbName: string;
  version?: number;
  expires?: number;
  db: IDBDatabase | null;
  constructor({ dbName, tbName, version, expires }: IDB) {
    if (!dbName || !tbName) {
      throw new Error(`dbName or tbName is required`);
    }
    this.dbName = dbName;
    this.tbName = tbName;
    this.version = version;
    this.expires = expires;
    this.db = null;
    // 初始化连接数据库
    this.openDatabase();
  }

  // 打开数据库
  openDatabase() {
    return new Promise((resolve, reject) => {
      try {
        const request = window.indexedDB.open(this.dbName, this.version);
        // 打开数据库报错
        request.onerror = (event: Event) => {
          // console.log("打开数据库报错", event);
          reject((event.target as IDBRequest<undefined>).error);
        };
        // 打开数据库成功
        request.onsuccess = (event) => {
          // console.log("event打开数据库成功", event);
          this.db = (event.target as IDBRequest<undefined>).result!;
          resolve((event.target as IDBRequest<undefined>).result);
        };
        // 数据库更新时的回调
        request.onupgradeneeded = (event) => {
          this.db = (event.target as IDBRequest<undefined>).result!;
          this.createdDB();
        };
      } catch (error) {
        console.log("数据库连接失败");
        reject(error);
      }
    });
  }

  // 创建库表
  createdDB() {
    if (!this.db?.objectStoreNames.contains(this.tbName)) {
      this.db?.createObjectStore(this.tbName, {
        keyPath: "id",
        autoIncrement: false, //主键  false必须由用户指定， true自动递增
      });
    }
  }

  /** 根据id获取表数据
   * @param {*} id 数据id
   * @returns
   */
  async get<T>(id: IDBValidKey | IDBKeyRange): Promise<T | null> {
    !this.db && (await this.openDatabase());
    return new Promise<T| null>((resolve, reject) => {
      try {
        const transaction = this.db?.transaction([this.tbName], "readwrite")!;
        const objectStore = transaction.objectStore(this.tbName)!;
        const request = objectStore.get(id);
        request.onerror = (event: Event) => {
          reject((event.target as IDBRequest<undefined>).error);
        };
        request.onsuccess = (event: Event) => {
          if ((event.target as IDBRequest<undefined>).result) {
            let data: any = (event.target as IDBRequest<undefined>).result as T;
            const time = new Date().getTime();
            // 判断数据是否过期，过期则删除
            if (this.expires && data.endTime && time - data.endTime > 0) {
              this.remove(id);
              resolve(null);
            }
            resolve((event.target as IDBRequest<undefined>).result as T);
          } else {
            console.log("未获得数据记录");
            resolve(null);
          }
        };
      } catch (error) {
        console.log("读取失败", error);
        reject(error);
      }
    });
  }

  /**
   * 更新数据库表数据（添加、修改）
   * @param {*} id 数据id
   * @param {*} data 表数据（每一条）
   * @returns
   */
  async update<T>(id: IDBValidKey | IDBKeyRange, data: any): Promise<T | Error> {
    !this.db && (await this.openDatabase());
    return new Promise<T | Error>((resolve, reject) => {
      try {
        const transaction = this.db?.transaction([this.tbName], "readwrite")!;
        const objectStore = transaction.objectStore(this.tbName);
        // 设置数据过期时间
        let params = data;
        if (this.expires) {
          params = {
            ...data,
            startTime: new Date().getTime(),
            endTime: new Date().getTime() + this.expires,
            expires: this.expires,
          };
        }
        const request = objectStore.put({
          id,
          ...params,
        });
        if (request) {
          request.onsuccess = (event: Event) => {
            resolve((event.target as IDBRequest<undefined>).result as T);
          };
          request.onerror = (event: Event) => {
            reject((event.target as IDBRequest<undefined>).error);
          };
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 根据id删除表数据
   * @param {*} id 数据id
   * @returns
   */
  async remove<T>(id: IDBValidKey | IDBKeyRange): Promise<T | Error> {
    !this.db && (await this.openDatabase());
    return new Promise<T | Error>((resolve, reject) => {
      try {
        const transaction = this.db?.transaction([this.tbName], "readwrite")!;
        const objectStore = transaction.objectStore(this.tbName);
        const request = objectStore.delete(id);
        if (request) {
          request.onsuccess = (event) => {
            resolve((event.target as IDBRequest<undefined>).result as T);
          };
          request.onerror = (event) => {
            reject((event.target as IDBRequest<undefined>).error);
          };
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   *  清除整个表数据
   * @returns
   */
  async clearTable<T>(): Promise<T | Error> {
    !this.db && (await this.openDatabase());
    return new Promise<T | Error>((resolve, reject) => {
      try {
        const transaction = this.db?.transaction([this.tbName], "readwrite")!;
        const objectStore = transaction.objectStore(this.tbName);
        const request = objectStore.clear();
        if (request) {
          request.onsuccess = (event: Event) => {
            resolve((event.target as IDBRequest<undefined>).result as T);
          };
          request.onerror = (event: Event) => {
            reject((event.target as IDBRequest<undefined>).error);
          };
        }
      } catch (error) {
        reject(error);
      }
    });
  }
  /**
   * 关闭数据库
   */
  closeDatabase() {
    this.db?.close();
  }
}
