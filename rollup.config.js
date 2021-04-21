import postcss from 'rollup-plugin-postcss';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import { uglify } from 'rollup-plugin-uglify';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  input: 'src/index.js',
  output: [
    {
      file: 'index.js',
      format: 'umd',
      sourcemap: true,
      exports: 'named',
    },
  ],
  plugins: [
    nodeResolve({
      browser: true,
      extensions: ['.js'],
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    json(),
    postcss({
      extensions: ['.css'],
    }),
    babel({
      presets: ['@babel/preset-react'],
    }),
    commonjs(),
    uglify(),
  ],
};
