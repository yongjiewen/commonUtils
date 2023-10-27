# commonUtils
javascript工具库

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