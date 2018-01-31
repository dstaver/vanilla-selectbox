import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import sizes from 'rollup-plugin-sizes';
import filesize from 'rollup-plugin-filesize';
import scss from 'rollup-plugin-scss';

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
  plugins: [
    scss({
      output: 'dist/adloader.css',
    }),
    resolve(),
    commonjs(),
    babel(babelConfig),
    sizes(),
    filesize(),
  ],
  output: {
    name: 'index',
    file: 'dist/index.js',
    format: 'iife',
    sourcemap: true,
  },
};
