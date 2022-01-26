type FileReaderMethodType =
  | 'readAsArrayBuffer'
  | 'readAsDataURL'
  | 'readAsText';

export default class FileReaderPromise {
  static _readAs(
    file: Blob,
    type: FileReaderMethodType,
  ): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve: any, reject: any) => {
      const filereader = new FileReader();
      filereader.onload = () => {
        resolve(filereader.result);
      };
      filereader.onerror = function () {
        reject('oops, something went wrong.');
      };
      filereader[type](file);
    });
  }

  readAsArrayBuffer(file: Blob) {
    return FileReaderPromise._readAs(
      file,
      'readAsArrayBuffer',
    ) as Promise<ArrayBuffer>;
  }

  readAsDataURL(file: Blob) {
    return FileReaderPromise._readAs(file, 'readAsDataURL') as Promise<string>;
  }
  readAsText(file: Blob) {
    return FileReaderPromise._readAs(file, 'readAsText') as Promise<string>;
  }
}
