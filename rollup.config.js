import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';

import { terser } from 'rollup-plugin-terser';
import workerLoader from 'rollup-plugin-web-worker-loader';
// 如果需要深度代码混淆，可开启obfuscator
// import obfuscatorPlugin from 'rollup-plugin-javascript-obfuscator';

// 参考：
// https://github.com/SunshowerC/blog/issues/8

// 命中优先级为：
// browser > module > main

// const obfuscatorOptions = {
//   compact: true,
//   controlFlowFlatteningThreshold: 0.75,
//   deadCodeInjectionThreshold: 0.4,
// };

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'esm',
        name: '@sbs/file-utils', // 输出的全局对象名，需要自定义
      },
    ],
    plugins: [
      workerLoader(),
      typescript(),
      replace({
        ENV: JSON.stringify('esm'),
      }),
      terser(),
      // obfuscatorPlugin(obfuscatorOptions),
    ],
    exclude: 'node_modules/**',
  },
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.browser.js',
        format: 'umd',
        name: '@sbs/file-utils', // 输出的全局对象名，需要自定义
      },
    ],
    plugins: [
      workerLoader(),
      typescript(),
      replace({
        ENV: JSON.stringify('browser'),
      }),
      terser(),
      // obfuscatorPlugin(obfuscatorOptions),
    ],
    exclude: 'node_modules/**',
  },
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.cjs.js',
        format: 'cjs',
      },
    ],
    plugins: [
      workerLoader(),
      typescript(),
      replace({
        ENV: JSON.stringify('node'),
      }),
      terser(),
      // obfuscatorPlugin(obfuscatorOptions),
    ],
    exclude: 'node_modules/**',
  },
];
