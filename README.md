# fr-utils

文件处理公共方法，包括文件读取，大文件 hash 计算，大文件切片处理。

## 安装

通过 yarn

```bash
  yarn add fr-utils
```

## 使用方式

```typescript
const filereader = new FileUtils(file, options);
```

## 文读取方式

对原生 FileReader 进行封装，异步获取文件读取结果，已提供的读取方式 3 中，`readAsArrayBuffer` `readAsDataURL` `readAsText`,使用方式如下：

> 通过实例的方式读取文件，file 参数可通过构造函数传递 `new FileUtils(file)`

```typescript
import { FileUtils } from 'fr-utils';

const readFile = async (file: File) => {
  // 1. 通过实例方法
  const filereader = new FileUtils();
  const result = await filereader.readAsArrayBuffer(file);

  // 2. 直接使用FileUtils的静态方法

  const result = await FileUtils.readAsArrayBuffer(file);
};
```

## 文件 Hash 计算

- 不使用 webworker 计算 hash

```typescript
import { FileUtils } from 'fr-utils';
const readMd5 = async (file) => {
  // 1. 通过实例方法
  const reader = new FileUtils();
  const md5 = reader.md5(file, { useWorker: false });
  // 2. 直接使用 FileUtils的静态方法
  const md5 = await FileUtils.md5(file, { useWorker: false });
};
```

- 使用 webworker 计算 hash

```typescript
import { FileUtils } from 'fr-utils';
const readMd5 = async (file) => {
  // 1. 通过实例方法
  const reader = new FileUtils();
  const md5 = reader.md5(file);
  // 2. 直接使用 FileUtils的静态方法
  const md5 = await FileUtils.md5(file);
};
```

## 文件切片

通过调用 `slice` 方法实现文件切片, 文件切片在 `web-worker` 线程里实现切片和 md5 值计算

返回参数:

- chunks 切片数组
  - file 分片文件
  - md5 分片 hash
  - start 分片开始下标
  - end 分片结束下标
  - part_num 分片编号
- file 原文件
- md5 文件 hash
- total 切片总数

```typescript
import { FileUtils } from 'fr-utils';

const sliceFile = async () => {
  // 1. 通过实例方法
  const reader = new FileUtils();
  const { chunks, md5s } = await reader.slice(file);

  // 2. 直接使用FileUtiles的静态方法
  const { chunks, md5s } = await FileUtils.slice(file);
};
```

> 所有的实例方法使用的参数也可通过构造函数传递 `new FileUtils(file, options)`

## 获取图片原始对象

```typescript
import { FileUtils } from 'fr-utils';

// 1. 通过实例方法
const reader = new FileUtils();
const image = await reader.readImage(file);

// 2. 通过静态方法
const image = await FileUtils.readImage(file);
```

### options 说明

| 参数      | 说明                                          | 类型    |
| --------- | --------------------------------------------- | ------- |
| useWorker | 是否使用 worker 线程计算 hash，默认 true      | Boolean |
| useMd5    | 切片操作时是否给分片计算 hash，默认 true      | Boolean |
| sliceSize | 切片操作时文件分片的大小，单位 M，默认每片 2M | Number  |
