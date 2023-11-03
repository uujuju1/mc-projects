import {makeScene2D} from '@motion-canvas/2d';
import {Rect, Img, Txt} from '@motion-canvas/2d/lib/components';

import {all, waitFor, useLogger} from '@motion-canvas/core';
import {createRef} from '@motion-canvas/core/lib/utils';

import {Container, LabeledBox, ImgLabeledBox} from '../components/Container';
import {TxtBox} from '../components/TxtBox';
import {Colors, WhiteLabel, BlackLabel} from '../styles';

import denseAlloy from '../images/dense-alloy.png';
import thermite from '../images/thermite.png';
import scorch from '../images/scorch.png';
import compound from '../images/compound.png';
import bismuth from '../images/bismuth.png';
import graphene from '../images/graphene.png';

export default makeScene2D(function* (view) {
  const text = createRef();

  const log = useLogger();

  const implementation = createRef();
  const forceSystem = createRef();
  const vibrationSystem = createRef();
  
  view.add(
    <>
      <Container
        ref={implementation}
        label="IMPLEMENTATION"
        size={[390, 320]}
      >
        <LabeledBox name="Force Module" fill={Colors.sage}/>
        <LabeledBox name="Vibration Module" fill={Colors.gray}/>
      </Container>

      <Container 
        ref={vibrationSystem} 
        text={BlackLabel}
        label="VIBRATION SYSTEM"
        x={-420}
        size={[390, 420]} 
        fill={Colors.gray}
      >
        <ImgLabeledBox src={denseAlloy} name="Dense Alloy" textProp={WhiteLabel} fill={Colors.surface}/>
        <ImgLabeledBox src={thermite} name="Thermite" textProp={WhiteLabel} fill={Colors.surface}/>
        <ImgLabeledBox src={scorch} name="Scorch" textProp={WhiteLabel} fill={Colors.surface}/>
      </Container>
  
      <Container 
        ref={forceSystem}
        text={BlackLabel}
        label="FORCE SYSTEM"
        size={[390, 420]}
        x={420}
        fill={Colors.sage}
      >
        <ImgLabeledBox src={compound} name="Compound" textProp={WhiteLabel} fill={Colors.coyote}/>
        <ImgLabeledBox src={bismuth} name="Bismuth" textProp={WhiteLabel} fill={Colors.coyote}/>
        <ImgLabeledBox src={graphene} name="Graphene" textProp={WhiteLabel} fill={Colors.coyote}/>
      </Container>
    </>
  );

  view.add(
    <TxtBox
      ref={text}
      fill={Colors.surface}
      radius={8}
      pad={40}
      y={400}
    >
      <Txt {...WhiteLabel}>{`There are 2 extra modules in some structures, Force and Vibration`}</Txt>
      <Txt {...WhiteLabel}>{
        `Vibration enables access to the Vibration system,
        which uses the items: Dense Alloy, Thermite and Scorch`
      }</Txt>
      <Txt {...WhiteLabel}>{
        `Force enables access to the Force system,
        which uses the items: Compound, Bismuth and Graphene`
      }</Txt>
      <Txt {...WhiteLabel}>{
        `The system in focus here is the Vibration system
        It's a sound based system, with focus on frequencies`
      }</Txt>
    </TxtBox>
  );

  yield all(
    implementation().height(0, 0),
    vibrationSystem().width(0, 0),
    forceSystem().width(0, 0),
    implementation().padding(0, 0),
    vibrationSystem().padding(0, 0),
    forceSystem().padding(0, 0)
  );
  yield* all(
    implementation().height(320, 1),
    implementation().padding(40, 1),
    text().setChild(0, 0.5),
    waitFor(4)
  );
  yield* all(
    vibrationSystem().width(420, 1),
    vibrationSystem().padding(40, 1),
    text().nextChild(0.5),
    waitFor(5.5)
  );
  yield* all(
    forceSystem().width(420, 1),
    forceSystem().padding(40, 1),
    text().nextChild(0.5),
    waitFor(6.5)
  );
  yield* all(
    forceSystem().width(0, 1),
    forceSystem().padding(0, 1),
    implementation().height(0, 1),
    implementation().padding(0, 1),
    vibrationSystem().position.x(0, 1),
    text().nextChild(0.5),
    waitFor(6)
  );
  yield* all(
    vibrationSystem().width(0, 1),
    vibrationSystem().padding(0, 1),
    text().size(0, 0.5)
  );
});
