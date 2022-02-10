import typescript from '@rollup/plugin-typescript';

import { defineConfig } from 'rollup';
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
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

export default defineConfig({
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      name: 'FileUtils',
    },
    {
      file: 'dist/index.js',
      format: 'umd',
      name: 'FileUtils',
    },
  ],
  plugins: [workerLoader(), typescript(), terser()],
  watch: {
    exclude: 'node_modules/**',
  },
});
