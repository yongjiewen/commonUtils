/**
 * 时间日期转时间戳
 * @param time {String | Date} 日期时间
 * @param millisecond {Boolean} 是否毫秒
 * @returns 返回时间戳 number
 */
export function dateToTimestamp(
  time: string | Date,
  millisecond?: boolean
): number {
  var date = new Date(time);
  var time1 = date.getTime();
  var time3 = Date.parse(date as unknown as string);
  if (millisecond) {
    return time1;
  } else {
    return time3 / 1000;
  }
}

/**
 * 日期格式化 yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合
 * @param timestamp {String | Number | Date} 时间戳或者日期
 * @param fmt {String} 格式(YYYY-MM-DD hh:mm:ss)
 * @returns String
 */
export function formatDate(
  timestamp: string | number | Date = new Date(),
  fmt: string = "YYYY-MM-DD hh:mm:ss"
): string {
  if (typeof timestamp == "number") {
    /**
     * 判断用户输入的时间戳是秒还是毫秒,一般前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
     * 或者存在负数情况
     */
    if (timestamp.toString().length <= 10 || timestamp < 0) {
      timestamp *= 1000;
    }
  }
  // 如果为null,则格式化当前时间

  let date = new Date(timestamp);
  let ret: RegExpExecArray | null;
  let opt: { [key: string]: string } = {
    "Y+": date.getFullYear().toString(), // 年
    "M+": (date.getMonth() + 1).toString(), // 月
    "D+": date.getDate().toString(), // 日
    "h+": date.getHours().toString(), // 时
    "m+": date.getMinutes().toString(), // 分
    "s+": date.getSeconds().toString(), // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };

  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      var tkey = ret[1];
      var val = tkey.length == 1 ? opt[k] : opt[k].padStart(tkey.length, "0");
      fmt = fmt.replace(tkey, val);
    }
  }
  return fmt;
}

/**
 * 时间戳转为多久之前
 * @param timestamp {Number} 时间戳
 * @param format {String | Boolean} 如果为时间格式字符串，超出一定时间范围，返回固定的时间格式；
 * 如果为布尔值false，无论什么时间，都返回多久以前的格式
 * @returns String
 */
export function dateFormatFrom(
  timestamp: number = 0,
  format: string | Boolean = "YYYY-MM-DD"
): string {
  if (timestamp == 0) timestamp = Number(new Date());
  timestamp = parseInt(String(timestamp));
  // 判断用户输入的时间戳是秒还是毫秒,一般前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
  if (timestamp.toString().length == 10) timestamp *= 1000;
  var timer = (new Date().getTime() - timestamp) / 1000;
  // 如果小于5分钟,则返回"刚刚",其他以此类推
  let tips = "";
  // console.log(timer);
  switch (true) {
    case timer < 300:
      tips = "刚刚";
      break;
    case timer >= 300 && timer < 3600:
      tips = parseInt(String(timer / 60)) + "分钟前";
      break;
    case timer >= 3600 && timer < 86400:
      tips = parseInt(String(timer / 3600)) + "小时前";
      break;
    case timer >= 86400 && timer < 2592000:
      tips = parseInt(String(timer / 86400)) + "天前";
      break;
    default:
      // 如果format为false，则无论什么时间戳，都显示xx之前
      if (format === false) {
        if (timer >= 2592000 && timer < 365 * 86400) {
          tips = parseInt(String(timer / (86400 * 30))) + "个月前";
        } else {
          tips = parseInt(String(timer / (86400 * 365))) + "年前";
        }
      } else {
        tips = formatDate(timestamp, format as string);
      }
  }
  return tips;
}

/**
 * 获取某月最后一天的date
 * @param data
 */
export function getLastDateOfAMonth(data: Date): Date {
  const lastDate = new Date(data.getTime());
  lastDate.setMonth(data.getMonth() + 1);
  lastDate.setDate(0);
  return lastDate;
}


/**
 * 判断时间是否相同
 * @param format {String} YYYY-MM-DD hh:mm:ss
 * @param date {Date}
 * @param dates {Date[]}
 * @returns Boolean
 */
export function isSameTime(
  format: string,
  date: Date,
  ...dates: Date[]
): boolean {
  const dt = formatDate(date, format);
  return dates.every((date) => formatDate(date, format) === dt);
}
