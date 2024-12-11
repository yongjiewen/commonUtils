# eventBus事件总线

## 单文件监听使用
 - 示例
 ```js
    import { EventBus } from "tool-common-utils"
    const eventBus = new EventBus();
    // 订阅事件
    eventBus.on('test', (info) => {
        console.log('test hello:', info);
    });

    // 触发事件
    eventBus.emit('test', { userId: 123, name: 'jack' });
 ```

 ## 全局监听
 > 全局监听需要使用 `EventBus.Ins` 进行操作
 - 示例
 ```js
    import { EventBus } from "tool-common-utils"
    const eventBus = EventBus.Ins;
    // 订阅事件
    eventBus.on('test', (info) => {
        console.log('test hello:', info);
    });
    // 触发事件
    eventBus.emit('test', { userId: 123, name: 'jack' });
 ```