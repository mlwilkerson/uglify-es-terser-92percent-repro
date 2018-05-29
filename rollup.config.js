// rollup.config.js
import resolve from 'rollup-plugin-node-resolve'
import { uglify } from 'rollup-plugin-uglify'
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'src/index.js',
  plugins: [
    resolve(),
    commonjs(),
    uglify()
  ],
  output: {
    file: 'dist/bundle-rollup.js',
    treeshake: true,
    format: 'cjs',
    name: 'fa-test',
    exports: 'named'
  }
};
