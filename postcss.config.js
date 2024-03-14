import postcssJitProps from 'postcss-jit-props';
import OpenProps  from 'open-props';

export default {
  // only vars used are in build output
  plugins: [postcssJitProps(OpenProps)],
};