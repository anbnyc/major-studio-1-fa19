import * as d3 from 'd3';

import name from './name.js';

d3.select('body')
  .append('div')
  .text(`Hello from D3! I'm, ${name}.`);