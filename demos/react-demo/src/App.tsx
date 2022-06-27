import { Button, Layout, Upload } from 'antd';
import { FileUtils } from '@sbs/file-utils';
import { useState } from 'react';
function App() {
  const [loading, setLoading] = useState(false);
  const handleUpload = async (options: any) => {
    setLoading(true);
    // const fileUtils = new FileUtils(options.file, {
    //   sliceSize: 3,
    //   useWorker: false,
    // });

    // const fileMd5 = await fileUtils.md5();
    // const slices = await fileUtils.slice();
    // const md5 = await fileUtils.md5(slices.fileChunkList[0].file);

    const workerUtils = new FileUtils(options.file, { sliceSize: 5 });
    // const workerFileMd5 = await workerUtils.md5();
    const workerSlices = await workerUtils.slice();
    // const workermd5 = await workerUtils.md5(workerSlices.chunks[2]);
    setLoading(false);
    console.log(' end', workerSlices);
    console.time();
  };
  return (
    <Upload customRequest={handleUpload} showUploadList={false}>
      <Button loading={loading}>upload</Button>
    </Upload>
  );
}

export default App;
