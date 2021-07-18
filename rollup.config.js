import typescript from '@rollup/plugin-typescript'

export default {
  input: 'src/index.ts',
  output: {
    dir: 'lib',
  },
  plugins: [
    typescript({lib: ["es5", "es6","es7", "dom"], target: "es5"})
  ]
};