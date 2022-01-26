const ctx: WorkerGlobalScope & typeof globalThis & { SparkMd5: any } =
  self as any;
ctx.importScripts(
  'https://cdn.jsdelivr.net/npm/spark-md5@3.0.2/spark-md5.min.js',
);

ctx.addEventListener('message', (e: MessageEvent) => {
  const file = <File | Blob | Blob[]>e.data;
  const spark = new ctx.SparkMD5.ArrayBuffer();
  const filereader = new ctx.FileReaderSync();
  if (Array.isArray(file)) {
    // 生成每个chunk的md5值
    const fileChunkList = file;
    const resultList = fileChunkList.map((blob) =>
      filereader.readAsArrayBuffer(blob),
    );
    const md5list = resultList.map((result) => {
      spark.append(result);
      let sparkStatus = JSON.stringify(spark.getState());
      const md5 = spark.end();
      spark.reset();
      spark.setState(JSON.parse(sparkStatus));
      return md5;
    });
    self.postMessage(md5list);
  } else {
    // 生成全量的md5值
    const arrayBuffer = filereader.readAsArrayBuffer(file);
    spark.append(arrayBuffer);
    const md5: string = spark.end();
    self.postMessage(md5);
  }
});

export default {};
