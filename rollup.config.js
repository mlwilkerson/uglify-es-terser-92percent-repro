// rollup.config.js
import resolve from 'rollup-plugin-node-resolve'
import { uglify } from 'rollup-plugin-uglify'

export default {
  input: 'src/index.js',
  plugins: [
    resolve(),
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
