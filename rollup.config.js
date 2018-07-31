import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';
import filesize from 'rollup-plugin-filesize';
import pkg from './package.json';

const input = 'src/v-select/index.js';

const babelConfig = {
  babelrc: false,
  presets: [
    [
      '@babel/preset-env',
      {
        debug: false,
        modules: false,
      },
    ],
  ],
};

export default [
  {
    input,
    plugins: [resolve(), commonjs(), babel(babelConfig), filesize()],
    output: {
      name: 'vselect',
      file: pkg.browser,
      format: 'umd',
    },
  },
  {
    input,
    plugins: [uglify(), resolve(), commonjs(), babel(babelConfig), filesize()],
    output: {
      name: 'vselect',
      file: pkg.browser.replace('.js', '.min.js'),
      format: 'iife',
    },
  },
  {
    input,
    plugins: [resolve(), commonjs(), filesize()],
    output: [
      {
        name: 'vselect',
        file: pkg.main,
        format: 'cjs',
      },
      {
        name: 'vselect',
        file: pkg.module,
        format: 'es',
      },
    ],
  },
];
