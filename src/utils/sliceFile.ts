import { range, max } from 'lodash';
import { FileUtilsOptions } from 'types';
import defaultOptions from './defaultOptions';
import FileUtils from '../FileUtils';
import SparkMD5 from 'spark-md5';
import WebWorker from 'web-worker:../works/md5.worker.ts';

const getMd5sWithWorker = (chunks: Blob[]) => {
  return new Promise((resolve, reject) => {
    const worker = new WebWorker();
    worker.postMessage(chunks);
    worker.onmessage = (e: MessageEvent) => {
      worker.terminate(); // close this worker thread
      resolve(e.data);
    };
    worker.onerror = (e: ErrorEvent) => {
      reject(e);
    };
  });
};

const getMd5s = async (chunks: Blob[]) => {
  const spark = new SparkMD5.ArrayBuffer();
  const resultList = await Promise.all(
    chunks.map((chunk) => FileUtils.readAsArrayBuffer(chunk)),
  );

  return resultList.map((result) => {
    spark.append(result);
    let sparkStatus = JSON.stringify(spark.getState());
    const md5 = spark.end();
    spark.reset();
    spark.setState(JSON.parse(sparkStatus));
    return md5;
  });
};

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
  const { sliceSize, useMd5 = true, useWorker = false } = options;
  const chunkSize = (sliceSize ?? 2) * 1024 * 1024,
    sliceTotal = Math.ceil(file.size / chunkSize); // 切片后的总chunk数

  const chunks = range(sliceTotal).map((chunkIndex) => {
    const start = chunkIndex * chunkSize, // 每一片chunk起始下标
      end = max([start + chunkSize, file]), // 每一片chunk结束下标
      fileBlob = file.slice(start, end as number); // 使用Blob的slice方法回去文件的分片，返回值的Blob
    return fileBlob;
  }); // 根据size 对文件切割后的chunk list, 每一个元素都是Blob类型数据

  // 如果useMd5为false 只返回文件切片数组
  if (!useMd5) {
    return { chunks };
  }

  const getChunksMD5 = async () => {
    if (useWorker) {
      return await getMd5sWithWorker(chunks);
    }
    return await getMd5s(chunks);
  };

  const md5s = await getChunksMD5();

  return {
    chunks,
    md5s,
  };
}
