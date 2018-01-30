import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';
import sizes from 'rollup-plugin-sizes';
import filesize from 'rollup-plugin-filesize';
import pkg from './package.json';

const input = 'src/adloader/index.js';

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
    plugins: [resolve(), commonjs(), babel(babelConfig), sizes(), filesize()],
    output: {
      name: 'adloader',
      file: pkg.browser,
      format: 'umd',
    },
  },
  {
    input,
    plugins: [
      uglify(),
      resolve(),
      commonjs(),
      babel(babelConfig),
      sizes(),
      filesize(),
    ],
    output: {
      name: 'adloader',
      file: pkg.browser.replace('.js', '.min.js'),
      format: 'iife',
    },
  },
  {
    input,
    plugins: [resolve(), commonjs(), sizes(), filesize()],
    output: [
      {
        name: 'adloader',
        file: pkg.main,
        format: 'cjs',
      },
      {
        name: 'adloader',
        file: pkg.module,
        format: 'es',
      },
    ],
  },
];
