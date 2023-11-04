import { formatDate } from "./time";
/**
 * 下载文件
 * @param res {any} 文件流
 * @param fileName {string} 文件名称
 */
export const fileDownload = (
  res: { [p: string]: string; data: any; headers: any },
  fileName?: string
) => {
  let blob = new Blob([res.data], {
    type: res.data.type, // 'application/vnd.ms-excel;charset=utf-8'
  });
  const date = formatDate();
  let filename = fileName
    ? fileName
    : res.headers["content-disposition"]
    ? decodeURIComponent(
        res.headers["content-disposition"].replace("attachment; filename=", "")
      )
    : date;
  let a = document.createElement("a");
  let href = window.URL.createObjectURL(blob); // 创建链接对象
  a.href = href;
  a.download = filename; // 自定义文件名
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(href);
  document.body.removeChild(a); // 移除a元素
};
