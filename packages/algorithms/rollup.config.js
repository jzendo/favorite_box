import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import injectProcessEnv from 'rollup-plugin-inject-process-env'
import { uglify } from 'rollup-plugin-uglify'

export default [
  {
    input: 'src/abc.js',
    output: {
      file: 'build/abc.js',
      name: 'abc',
      format: 'umd'
    },
    plugins: [
      json(),
      injectProcessEnv({
        NODE_ENV: 'production'
      }),
      resolve(),
      babel({
        presets: [['@babel/env', { modules: false }]]
      }),
      uglify()
    ]
  }
]
