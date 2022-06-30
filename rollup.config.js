import typescript from '@rollup/plugin-typescript';

import { defineConfig } from 'rollup';
import { terser } from 'rollup-plugin-terser';
import workerLoader from 'rollup-plugin-web-worker-loader';

export default defineConfig({
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.esm.js',
      format: 'esm',
    },
    {
      file: 'dist/index.js',
      format: 'umd',
      name: 'file-utils',
    },
  ],
  plugins: [workerLoader(), typescript(), terser()],
  watch: {
    exclude: 'node_modules/**',
  },
});
