import {makeProject} from '@motion-canvas/core';

import intro from './scenes/intro?scene';
import example from './scenes/example?scene';

export default makeProject({
  scenes: [intro, example],
});
