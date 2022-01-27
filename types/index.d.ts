type SliceOptionType = {
  size?: number;
};
interface SliceReturnType {
  chunks: number;
  fileChunkList: Blob[];
  getChunksMD5: () => Promise<string[]>;
}
declare function getMd5(file: Blob): Promise<string>;
declare function getMd5WithWorker(file: Blob): Promise<any>;

declare function sliceFile(
  file: Blob,
  options: SliceOptionType,
): SliceReturnType;

declare class FileReaderPromise {
  readAsArrayBuffer(file: Blob): Promise<ArrayBuffer>;
  readAsDataURL(file: Blob): Promise<string>;
  readAsText(file: Blob): Promise<string>;
}
