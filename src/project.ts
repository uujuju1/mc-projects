import {makeProject} from '@motion-canvas/core';

import intro from './scenes/intro?scene';
import graph from './scenes/graph?scene';
import storing from './scenes/storing?scene';
import howtolinks from './scenes/howtolinks?scene';
import draw from './scenes/draw?scene';
import outro from './scenes/outro?scene';

import music from './audio/music.mp3';

export default makeProject({
  scenes: [intro, graph, storing, howtolinks, draw, outro],
  audio: music,
});
