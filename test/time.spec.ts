import { dateToTimestamp,formatDate ,dateFormatFrom ,isSameTime, getLastDateOfAMonth} from "../src/packages/time"

// 时间日期转时间戳
console.log('dateToTimestamp()',dateToTimestamp('2023-10-28 1:29:16'));

// 格式化日期 
console.log('formatDate()',formatDate());

// 时间戳转为多久之前
console.log('dateFormatFrom()',dateFormatFrom(1698427756));

// 获取某月的最后一天
console.log('getLastDateOfAMonth(new Date())',formatDate(getLastDateOfAMonth(new Date('2023-8'))));
// 判断两个时间是否相同
console.log('isSameTime',isSameTime('YYYY-MM-DD hh:mm:ss',new Date(),new Date('2023-10-28 1:29:16')));