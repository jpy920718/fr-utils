# @sbs/file-utils

文件处理公共方法，包括文件读取，大文件 hash 计算，大文件切片处理。

## 安装

通过 yarn

```bash
  yarn add @sbs/file-uitls
```

浏览器引入

```js
<script src="path/@sbs/file-utils/dist/index.js"></script>
//全局使用FileUtils
```

## 使用方式

通过创建示例的方式

```typescript
import { FileUtils } from '@sbs/file-utils';
const reader = new FileUtils(file);
```

通过静态方法

```typescript
import { FileUtils } from '@sbs/file-utils';
```

## Api

### FileUtils.md5

FileUtils.md5(file, opitons)

## 文读取方式

对原生 FileReader 进行封装，异步获取文件读取结果，已提供的读取方式 3 中，`readAsArrayBuffer` `readAsDataURL` `readAsText`,使用方式如下：

```typescript
import { FileUtils } from '@sbs/file-utils';

const readFile = async (file: File) => {
  const filereader = new FileUtils();
  const result = filereader.readAsArrayBuffer(file);
};
```

## 文件 Hash 计算

### getMd5

计算文件 MD5 值，此方法未使用 web-worker 独立线程计算。大文件计算 MD5 会阻塞 js 线程，对于大文件推荐使用`getMd5WithWorker`。

```typescript
import { getMd5 } from '@sbs/file-utils';
const readMd5 = async (file: File) => {
  const md5 = await getMd5(file);
};
```

### getMd5WithWorker

此方法可用来计算大文件 MD5 值。

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

文件切片方法，默认每片的大小未 2M, 返回切片总数，和切片数组。

#### Params

| 参数    | 说明         | 类型                        |
| ------- | ------------ | --------------------------- |
| file    | 文件         | Blob \| File                |
| Options | 文件切割配置 | {<br />size?: number<br />} |

#### Return

| 参数          | 说明                  | 类型                    |
| ------------- | --------------------- | ----------------------- |
| chunks        | 切片数量              | number                  |
| fileChunkList | 切片数组              | Blob[]                  |
| getChunksMD5  | 获取每个切片的 MD5 值 | () => Promise<string[]> |

## feature

- [ ] 使用时间切片 requestIdleCallback 处理 md5 值得计算
