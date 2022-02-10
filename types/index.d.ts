/// <reference lib="webworker" />
declare module 'web-worker:*' {
  const WorkerFactory: new () => Worker;
  export default WorkerFactory;
}
declare module 'shared-worker:*' {
  const WorkerFactory: new () => Worker;
  export default WorkerFactory;
}
declare function importScripts(...urls: string[]): void;

interface SliceReturnType {
  chunks: number;
  fileChunkList: Blob[];
  getChunksMD5: () => Promise<string[]>;
}

type SliceOptionType = {
  useMd5?: boolean; // 是否返回分片md5 默认true
  sliceSize?: number; // 切片的分片大小 单位 M 默认为2
};
declare interface FileUtilsOptions extends SliceOptionType {
  useWorker?: boolean; // 是否使用web-worker 计算文件hash, 默认：false
}

export declare class FileUtils {
  constructor(file?: Blob, options?: FileUtilsOptions);
  static readAsArrayBuffer(file: Blob): Promise<ArrayBuffer>;
  static readAsDataURL(file: Blob): Promise<string>;
  static readAsText(file: Blob): Promise<string>;
  static md5(file: Blob, options?: FileUtilsOptions): Promise<string>;
  static slice(
    file: Blob,
    options?: FileUtilsOptions,
  ): Promise<{
    blobList: Blob[];
    md5List: string[];
  }>;
  readAsArrayBuffer(file?: Blob): Promise<ArrayBuffer>;
  readAsDataURL(file?: Blob): Promise<string>;
  readAsText(file?: Blob): Promise<string>;

  md5(options?: FileUtilsOptions): Promise<string>;
  md5(file: Blob, options?: FileUtilsOptions): Promise<string>;
  slice(options?: FileUtilsOptions): Promise<{
    blobList: Blob[];
    md5List: string[];
  }>;
  slice(
    file?: Blob,
    options?: FileUtilsOptions,
  ): Promise<{
    blobList: Blob[];
    md5List: string[];
  }>;
}
