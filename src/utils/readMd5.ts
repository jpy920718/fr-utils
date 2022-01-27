import SparkMD5 from 'spark-md5';

import FileReader from '../FileReader';
import WebWorker from 'web-worker:../work/md5.worker.ts';
/**
 * 获取文件的MD5值，不使用web-worker
 * @param file
 * @returns
 */
export async function readMd5(file: Blob): Promise<string> {
  const filereader = new FileReader();
  const result: any = await filereader.readAsArrayBuffer(file);
  const spark = new SparkMD5.ArrayBuffer();
  spark.append(result);
  const md5: string = spark.end();
  return md5;
}

/**
 * 文件全量MD5计算, 使用web-worker
 *
 * @param file
 */

export function getMd5Sample(file: Blob) {
  return new Promise((resolve, reject) => {
    const worker = new WebWorker();
    worker.postMessage(file);
    worker.onmessage = (e: MessageEvent) => {
      worker.terminate();
      resolve(e.data);
    };
    worker.onerror = (e: ErrorEvent) => {
      reject(e);
    };
  });
}
