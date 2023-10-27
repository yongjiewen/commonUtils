import { Local, Session } from "../src/packages/store"
import { Cookie } from "../src/packages/cookie"
import { IndexedDB } from "../src/packages/indexedDB"
// console.log('Storage',Local.get('1'));
// 操作localStorage
console.log('-----------localStorage start');
Local.set('test','set localStorage ...', 1000)
// 取值
Local.get('test')

// 操作sessionStorage
Local.set('test','set sessionStorage ...')
Local.get('test')
console.log('-----------localStorage end');

console.log('-----------Cookie start');
// 操作Cookie
Cookie.set('testKey','ASDSADASDASDA',10000, 'www.baidu.com')
// 取值

console.log(Cookie.get('testKey'));
// 操作Cookie
// Cookie.set('test','set Cookie ...')
// Cookie.get('test')
console.log('-----------Cookie end');

console.log('-----------IndexedDB start');
// 实例化数据库（实例化一张表）
const dbTable = new IndexedDB({dbName: 'tableDb', tbName: 'table_tb', version: 1})
// 获取一条数据
const data = await dbTable.get('id')
// 插入（更新）数据
await dbTable.update('id', "value")
console.log('-----------IndexedDB end');

