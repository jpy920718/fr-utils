

# @sbs/file-utils

文件处理公共方法，包括文件读取，大文件hash计算，大文件切片处理。


```bash
yarn add @sbs/file-uitls
```
## 文读取方式

###  FileReader

对原生 FileReader 进行封装，异步获取文件读取结果，已提供的读取方式3中，`readAsArrayBuffer`  `readAsDataURL` `readAsText`,使用方式如下：

```typescript
import { FileReader } from '@sbs/file-utils';

const readFile = async(file: File) => {
  const filereader = new FileReader();
  const result = filereader.readAsArrayBuffer(file);
}


```
## 文件Hash计算
### getMd5 

计算文件MD5值，此方法未使用web-worker独立线程计算。大文件计算MD5会阻塞js线程，对于大文件推荐使用`getMd5WithWorker`。

```typescript
import { getMd5 } from '@sbs/file-utils';
const readMd5 = async(file: File) => {
 const md5 = await getMd5(file);
}
```

### getMd5WithWorker

此方法可用来计算大文件MD5值。

```typescript
import { getMd5WithWorker } from '@sbs/file-utils';

const readMd5 = async() => {
  getMd5WithWorker(file: File).then(md5 => {
    // 其他操作
  })
}
```


## 文件切片

### sliceFile

文件切片方法，默认每片的大小未2M, 返回切片总数，和切片数组。

#### Params

| 参数    | 说明         | 类型                        |
| ------- | ------------ | --------------------------- |
| file    | 文件         | Blob \| File                |
| Options | 文件切割配置 | {<br />size?: number<br />} |

#### Return

| 参数          | 说明                | 类型                    |
| ------------- | ------------------- | ----------------------- |
| chunks        | 切片数量            | number                  |
| fileChunkList | 切片数组            | Blob[]                  |
| getChunksMD5  | 获取每个切片的MD5值 | () => Promise<string[]> |



## feature

- [ ] 使用时间切片 requestIdleCallback 处理 md5 值得计算

  

