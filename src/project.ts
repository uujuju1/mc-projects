import {makeProject} from '@motion-canvas/core';

import intro from './scenes/intro?scene';
import graph from './scenes/graph?scene';
import storing from './scenes/storing?scene';
import howtolinks from './scenes/howtolinks?scene';

export default makeProject({
  scenes: [intro, graph, storing, howtolinks],
});
