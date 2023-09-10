import {makeProject} from '@motion-canvas/core';

import intro from './scenes/intro?scene';
import example from './scenes/example?scene';
import audio from '../audio/voice.mp3';

export default makeProject({
  scenes: [intro, example],
  audio: audio,
});
