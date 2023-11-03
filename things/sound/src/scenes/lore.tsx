import {makeScene2D} from '@motion-canvas/2d';
import {Rect, Img} from '@motion-canvas/2d/lib/components';

import {all, waitFor} from '@motion-canvas/core';
import {createSignal} from '@motion-canvas/core/lib/signals';

import {Container, LabeledBox} from '../components/Container';
import {Colors, WhiteLabel, BlackLabel} from '../styles';

import denseAlloy from '../images/dense-alloy.png';
import thermite from '../images/thermite.png';
import scorch from '../images/scorch.png';
import compound from '../images/compound.png';
import bismuth from '../images/bismuth.png';
import graphene from '../images/graphene.png';

export default makeScene2D(function* (view) {
  const log = createSignal(0);  
  view.add(
    <>
      <Container
        label="RECOVERED DATA"
        size={() => [1279 * log(), 660 * log()]}
        padding={() => 40 * log()}
      >
        <LabeledBox name={
          `?1??5?: Vibrations can cause strange behaviour in matter, from mixing 
          dust onto ripping chunks of metal from the inside, prototypes abusing
          these strange properties are under research and development.`
        } fill={Colors.gray}/>
        <LabeledBox name={
          `?1??9?: A set of structures was built with the sole purpose of use of
          vibration with the purpose of construction, synthesis, and defense`
        } fill={Colors.gray}/>
        <LabeledBox name={
          `715319: Data recovered. Found logs placed above this log.`
        } fill={Colors.gray}/>
      </Container>
    </>
  );

  yield* log(1, 1);
  yield* waitFor(20);
  yield* log(0, 1);
});
