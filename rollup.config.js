// rollup.config.js
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'src/index.js',
  plugins: [
    resolve()
  ],
  output: {
    file: 'dist/bundle-rollup.js',
    treeshake: true,
    format: 'cjs',
    name: 'fa-test',
    exports: 'named'
  }
};
