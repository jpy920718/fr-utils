import { range, max } from 'lodash';
import WebWorker from 'web-worker:../works/md5.worker.ts';
/**
 * 文件切片
 * @param file
 * @param options
 * @returns
 */
type SliceOptionType = {
  size?: number;
};
export function sliceFile(file: Blob, options: SliceOptionType = {}) {
  if (file) {
    const { size } = options;
    const chunkSize = (size ?? 2) * 1024 * 1024,
      chunks = Math.ceil(file.size / chunkSize); // 切片后的总chunk数

    const fileChunkList = range(chunks).map((chunkIndex) => {
      const start = chunkIndex * chunkSize, // 每一片chunk起始下标
        end = max([start + chunkSize, file]), // 每一片chunk结束下标
        fileBlob = file.slice(start, end as number); // 使用Blob的slice方法回去文件的分片，返回值的Blob
      return fileBlob;
    }); // 根据size 对文件切割后的chunk list, 每一个元素都是Blob类型数据

    const getChunksMD5 = async () => {
      return new Promise((resolve, reject) => {
        const worker = new WebWorker();
        worker.postMessage(fileChunkList);
        worker.onmessage = (e: MessageEvent) => {
          worker.terminate(); // close this worker thread
          resolve(e.data);
        };
        worker.onerror = (e: ErrorEvent) => {
          reject(e);
        };
      });
    };

    return {
      chunks,
      fileChunkList,
      getChunksMD5,
    };
  } else {
    return {};
  }
}
