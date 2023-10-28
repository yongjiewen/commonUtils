# 日期时间

## formatDate (日期格式化)
> 日期格式化日期格式化 YYYY:MM:DD|YYYY:MM|YYYY年MM月DD日|YYYY年MM月DD日 hh时mm分等,可自定义组合
 - 参数
 1. `timestamp`(string | number | Date) 时间戳或者日期。默认值： 当前时间
 2. `fmt`(string) 日期格式(可选) 默认值：(YYYY-MM-DD hh:mm:ss)
 - 返回值： `string` 格式化后的显示日期
 - 示例
 ```js
 import { formatDate } from "tool-common-utils"
 const data = formatDate(new Date(1698427756))
 ```

## dateToTimestamp (日期转时间戳)
> 时间日期转时间戳
 - 参数
 1. `time`(String | Date): 日期时间 （必填）
 2. `millisecond`(Boolean): 是否毫秒 (可选)
 - 返回值： 时间戳(number)
 - 示例
 ```js
 import { dateToTimestamp } from "tool-common-utils"
 const data = dateToTimestamp(new Date())
 ```

## dateFormatFrom (时间戳转为多久之前)
> 时间戳转为多久之前
 - 参数
 1. `timestamp`(Number): 时间戳 : 默认值： 当前时间
 2. `format`(String | Boolean): 如果为时间格式字符串，超出一定时间范围，返回固定的时间格式； (可选) 如果为布尔值false，无论什么时间，都返回多久以前的格式
 - 返回值： String
 - 示例
 ```js
 import { dateFormatFrom } from "tool-common-utils"
 const data = dateFormatFrom()
 ```
## getLastDateOfAMonth （月份的最后一天时间）
> 获取某月最后一天的date时间
 - 参数
 1. `data`(Date): 当前月份时间 (必填)
 - 返回值： 最后一天日期Date
 - 示例
 ```js
 import { getLastDateOfAMonth } from "tool-common-utils"
 const data = getLastDateOfAMonth(new Date('2023-08'))
 ```

## isSameTime （时间是否相等）
> 获取某月最后一天的date时间
 - 参数
 1. `format`(String): 日期格式 (必填)
 2. `date`(Date): 第一个时间
 2. `dates`(Date[]): 第n个时间
 - 返回值： `Boolean`
 - 示例
 ```js
 import { isSameTime } from "tool-common-utils"
 const flag = isSameTime('YYYY-MM-DD hh:mm:ss',new Date(),new Date('2023-10-28 01:10:16'))
 ```