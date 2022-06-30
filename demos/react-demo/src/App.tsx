import { Button, Layout, Upload } from 'antd';
import { FileUtils } from '@sbs/file-utils';
import { useState } from 'react';
function App() {
  const [loading, setLoading] = useState(false);
  const handleUpload = async (options: any) => {
    setLoading(true);
    console.log(options.file);
    const workerUtils = new FileUtils(options.file, { sliceSize: 50 });
    const arraryBuffer = await workerUtils.readAsArrayBuffer();
    const dataURl = await workerUtils.readAsDataURL();
    const text = await workerUtils.readAsText();
    const workerFileMd5 = await workerUtils.md5();
    const workerSlices = await workerUtils.slice();
    // const workermd5 = await workerUtils.md5(workerSlices.fileChunkList[4].file);
    setLoading(false);
    console.log(' end', workerSlices, workerFileMd5);
    console.time();
  };
  return (
    <Upload customRequest={handleUpload} showUploadList={false}>
      <Button loading={loading}>upload</Button>
    </Upload>
  );
}

export default App;
