---
home: true
heroImage: /logo.png
heroText: commonUtils
tagline: 一款集成业务场景的javascript工具库
actionText: 快速开始 →
actionLink: /docsFile/start
features:
- title: 开箱即用
  details: 提供大量开箱即用的 js/ts 函数
- title: 按需使用
  details: 按需使用, 不产生冗余代码
- title: 多平台
  details: 同样的API,支持node和浏览器
# footer: Copyright © 备案号 [粤ICP备2022017345号-1](https://beian.miit.gov.cn/)
---



## 安装 
1. npm模块引入
```shell
npm i tool-common-utils
```

2. cdn引入
```html
<script src="https://cdn.jsdelivr.net/npm/tool-common-utils/dist/index.umd.js"></script>
```

## 使用示例
1. npm示例
```javascript
// 方式一:按需使用
import { Local } from "tool-common-utils";
Local.set('name','value...')
// 方式二： 全局导入
import commonUtils from "tool-common-utils"
commonUtils.Local.set('name','value...')
```

2. cdn示例
```html
<script src="https://cdn.jsdelivr.net/npm/tool-common-utils/dist/index.umd.js"></script>
<script >commonUtils.Local.set('name','value...')</script>
```

::: slot footer
Copyright © 2022-至今 [备案号: 粤ICP备2022017345号-1](https://beian.miit.gov.cn/)
:::
