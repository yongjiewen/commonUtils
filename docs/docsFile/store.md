# 浏览器存储
> 操作浏览的存储localStorage、sessionStorage、Cookie、indexedDb

## Local (localStorage)
> 操作localStorage

- 设置localStorage
    - 参数
    1. `key`(string): 设置的key值 (必填)
    2. `value`(string): 需要设置value的值 (必填)
    3. `expires`(number): 过期时间 (可选)
    - 例子
    ```js
    import { Local } from "tool-common-utils"
    Local.set('test', 'test...', 10000)
    ```
- 获取localStorage
    - 参数
    1. `key`(string): 设置的key值 (必填)
    2. `value`(string): 需要设置value的值 (必填)
    3. `expires`(number): 过期时间 (可选)
    - 例子
    ```js
    import { Local } from "tool-common-utils"
    const val = Local.get('test')
    ```

## Session (sessionStorage)
> 操作sessionStorage

- 设置sessionStorage
    - 参数
    1. `key`(string): 设置的key值 (必填)
    2. `value`(string): 需要设置value的值 (必填)
    3. `expires`(number): 过期时间 (可选)
    - 例子
    ```js
    import { Session } from "tool-common-utils"
    Session.set('test', 'test...', 10000)
    ```
- 获取sessionStorage
    - 参数
    1. `key`(string): 设置的key值 (必填)
    2. `value`(string): 需要设置value的值 (必填)
    3. `expires`(number): 过期时间 (可选)
    - 例子
    ```js
    import { Session } from "tool-common-utils"
    const val = Session.get('test')
    ```

## Cookie
- 设置Cookie
    - 参数
    1. `name`(string): cookie name
    2. `value`(string): cookie value
    3. `expires`(number): 过期时间 (可选)
    4. `path`(string) cookie path (可选)
    - 例子
    ```js
    import { Cookie } from "tool-common-utils"
    Cookie.set('testKey','ASDSADASDASDA',10000, 'www.baidu.com')
    ```
- 获取Cookie
   > 不同path下可以重名，但无法根据path获取
    - 参数
    1. `name`(string): cookie name
    - 返回值
      `string[]`: 返回一个字符串数组
    - 例子
    ```js
    import { Cookie } from "tool-common-utils"
    const cookieArr = Cookie.get('testKey')
    ```

- 删除Cookie
    - 参数
    1. `name`(string): cookie name
    2. `path`(string): cookie path 默认值 `/`
    - 例子
    ```js
    import { Cookie } from "tool-common-utils"
    Cookie.remove('testKey')
    ```




## IndexedDB
> 浏览器数据库 `new` 一个实例为创建一张表，如需操作多个表，请实例化多次  所有操作为异步
- 实例化参数
    1. `dbName`(string): 数据库名称 (必填)
    2. `tbName`(string): 表名称 (必填)
    3. `version`(number): 版本号 (可选)
    4. `expires`(number): 数据过期时间毫秒 (可选)
    ```js
        const dbTable = new IndexedDB({dbName: 'tableDb', tbName: 'table_tb', version: 1})
    ```
### 获取数据（get）
- 参数
    1. `id（string|number）`: 数据id
- 返回值：`any|null`
- 示例
```js
const data = await dbTable.get('id')
```

### 插入更新（update）
> 更新数据库表数据（添加、修改）
- 参数
    1. `id（string|number）`: 数据id
    2. `data（string）`: 数据(每一条) 
- 返回值：`any|null`
- 示例
```js
const data = await dbTable.update('id',JSON.stringify({key:"tets"}))
```

### 删除（remove）
> 根据id删除表数据
- 参数
    1. `id（string|number）`: 数据id
- 返回值：`any|null`
- 示例
```js
const data = await dbTable.remove('id')
```

### 删除整个表数据（clearTable）
> 根据id删除表数据
- 示例
```js
const data = await dbTable.clearTable()
```

### 关闭数据库
- 示例
```js
dbTable.closeDatabase()
```