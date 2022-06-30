import { FileUtilsOptions } from 'types';
import defaultOptions from './defaultOptions';

import SliceWorker from 'web-worker:../works/slice.worker.ts';

/**
 * 文件切片
 * @param file
 * @param options
 * @returns
 */

export async function sliceFile(
  file: Blob,
  options: FileUtilsOptions = defaultOptions,
) {
  return new Promise((resolve, reject) => {
    const worker = new SliceWorker();
    worker.postMessage({ file, options });
    worker.onmessage = (e: MessageEvent) => {
      worker.terminate();
      resolve(e.data);
    };
    worker.onerror = (e: ErrorEvent) => {
      reject(e);
    };
  });
}
