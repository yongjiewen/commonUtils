# dom相关

## download （下载文件）
> 下载文件流文件
 - 参数
 1. `res`({ [p: string]: string; data: any; headers: any }) 接口返回文件流
 2. `fileName`(string) 文件名称（可选）默认值：当前时间
 - 示例
 ```js
    import { fileDownload } from "tool-common-utils"
    fileDownload(res, 'text')
 ```

 ## blobToBase64  （blob转成base64）
 >  blob转成base64
 - 参数
 1. `blob`(Blob)  blob值
 - 返回值： ` Promise<string>`
 - 示例
 ```js
    import { blobToBase64 } from "tool-common-utils"
    const base = await blobToBase64(res)
 ```

## base64ToBlob （base64转成Blob）
 >  base64 转 Blob
 - 参数
 1. `dataURL`(string)  base64值
 - 返回值： `Blob`
 - 示例
 ```js
    import { base64ToBlob } from "tool-common-utils"
    const base =  base64ToBlob('base64;asdasdasd')
 ```

 ## base64ToFile （base转成文件）
 >  blob转成base64
 - 参数
 1. `dataURL`(string)  base64值
 - 返回值： `Blob`
 - 示例
 ```js
    import { base64ToBlob } from "tool-common-utils"
    const base =  base64ToBlob('base64;asdasdasd')
 ```

 ## imgToBlob （图片转成Blob）
 >  图片在线链接转成Blob
 - 参数
 1. `dataURL`(string) 链接
 - 返回值： `Blob`
 - 示例
 ```js
    import { imgToBlob } from "tool-common-utils"
    const blob = await  imgToBlob('https://gw.alipayobjects.com/zos/bmw-prod/881dc458-f20b-407b-947a-95104b5ec82b/k79dm8ih_w144_h144.png')
 ```
 