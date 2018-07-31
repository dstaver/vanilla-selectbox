import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import filesize from 'rollup-plugin-filesize';

const babelConfig = {
  babelrc: false,
  presets: [
    [
      '@babel/preset-env',
      {
        debug: false,
        targets: {
          browsers: ['last 2 versions', 'safari >= 9'],
        },
        useBuiltIns: 'entry',
        modules: false,
      },
    ],
  ],
};

export default {
  input: 'src/index.js',
  plugins: [resolve(), commonjs(), babel(babelConfig), filesize()],
  output: {
    name: 'index',
    global: 'vanilla-selectbox',
    file: 'dist/index.js',
    format: 'iife',
    sourcemap: true,
  },
};
