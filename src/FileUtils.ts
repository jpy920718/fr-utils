import SparkMD5 from 'spark-md5';
import { FileUtilsOptions } from 'types';
import { getMd5, getMd5WithWorker, sliceFile } from './utils';
import defaultOptions from './utils/defaultOptions';

type FileReaderMethodType =
  | 'readAsArrayBuffer'
  | 'readAsDataURL'
  | 'readAsText';

const fileExist = (file) => {
  if (!file) {
    throw new Error('The file that needs to be processed cannot be found');
  }
};

// 对文件参数转换处理
const transformParams = function (fn, args, parentsCtx) {
  const argLength = args.length;
  let _file, _options;
  if (argLength === 1) {
    if (args[0] instanceof Blob) {
      _file = args[0];
      _options = parentsCtx.options;
    } else {
      _file = parentsCtx.file;
      _options = args[0];
    }
  } else {
    _file = args[0] || parentsCtx.file;
    _options = args[1] || parentsCtx.options;
  }

  return fn(_file, _options);
};

export default class FileUtils {
  file?: Blob;
  options?: FileUtilsOptions;

  constructor(file?: Blob, options = defaultOptions) {
    this.file = file;
    this.options = options;
  }
  static readAs(
    file: Blob,
    type: FileReaderMethodType,
  ): Promise<string | ArrayBuffer | null> {
    if (typeof window === 'undefined') {
      throw new Error('Can only use FileReader in your browser');
    }
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

  static readAsArrayBuffer(file: Blob) {
    fileExist(file);
    return FileUtils.readAs(file, 'readAsArrayBuffer') as Promise<ArrayBuffer>;
  }
  readAsArrayBuffer(file?: Blob) {
    file = file ?? this.file!;
    return FileUtils.readAsArrayBuffer(file);
  }

  static readAsDataURL(file: Blob) {
    fileExist(file);
    return FileUtils.readAs(file, 'readAsDataURL') as Promise<string>;
  }
  readAsDataURL(file?: Blob) {
    file = file ?? this.file!;
    return FileUtils.readAsDataURL(file);
  }

  static readAsText(file: Blob) {
    fileExist(file);
    return FileUtils.readAs(file, 'readAsText') as Promise<string>;
  }
  readAsText(file?: Blob) {
    file = file ?? this.file!;
    return FileUtils.readAsText(file);
  }

  /**
   * 返回图片原始对象
   * @param file
   * @returns
   */
  static async readImage(file: Blob) {
    fileExist(file);
    const src = await FileUtils.readAsDataURL(file);
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        resolve(image);
      };
      image.onerror = () => {
        reject('oops, something went wrong.');
      };
      image.src = src;
    });
  }

  readImage(file?: Blob) {
    file = file ?? this.file!;
    return FileUtils.readImage(file);
  }

  static async md5(file: Blob, options = defaultOptions) {
    fileExist(file);
    const { useWorker = false } = options as FileUtilsOptions;
    if (useWorker) {
      return getMd5WithWorker(file);
    } else {
      return getMd5(file);
    }
  }
  md5() {
    return transformParams(FileUtils.md5, arguments, this);
  }

  static async slice(file: Blob, options?: FileUtilsOptions) {
    fileExist(file);
    return sliceFile(file, options);
  }
  slice() {
    return transformParams(FileUtils.slice, arguments, this);
  }
}
