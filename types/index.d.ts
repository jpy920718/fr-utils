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

type SliceOptionType = {
  size?: number;
};
interface SliceReturnType {
  chunks: number;
  fileChunkList: Blob[];
  getChunksMD5: () => Promise<string[]>;
}
export declare function getMd5(file: Blob): Promise<string>;
export declare function getMd5WithWorker(file: Blob): Promise<any>;

export declare function sliceFile(
  file: Blob,
  options?: SliceOptionType,
): SliceReturnType;

export declare class FileReaderPromise {
  readAsArrayBuffer(file: Blob): Promise<ArrayBuffer>;
  readAsDataURL(file: Blob): Promise<string>;
  readAsText(file: Blob): Promise<string>;
}
