import {makeProject} from '@motion-canvas/core';

import light from './scenes/light?scene';
import dark from './scenes/dark?scene';

export default makeProject({
  scenes: [light, dark],
});
