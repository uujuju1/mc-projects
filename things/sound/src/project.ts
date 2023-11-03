import {makeProject} from '@motion-canvas/core';

import intro from './scenes/intro?scene';
import sound from './scenes/sound?scene';
import preRequisites from './scenes/preRequisites?scene';
import propagation from './scenes/propagation?scene';
import rope from './scenes/rope?scene';
import lore from './scenes/lore?scene';
import outro from './scenes/outro?scene';
import thumbnail from './scenes/thumbnail?scene';

import audio from '../audio/sound.ogg';

export default makeProject({
  scenes: [intro, sound, preRequisites, propagation, rope, lore, outro, thumbnail],
  audio: audio,
});
