import {makeScene2D} from '@motion-canvas/2d';
import {Rect, Img, Node, Txt} from '@motion-canvas/2d/lib/components';

import {all, waitFor} from '@motion-canvas/core';
import {createRef, range, useLogger} from '@motion-canvas/core/lib/utils';
import {createSignal} from '@motion-canvas/core/lib/signals';

import {Container, LabeledBox, ImgLabeledBox} from '../components/Container';
import {TxtBox} from '../components/TxtBox';
import {Colors, WhiteLabel, BlackLabel} from '../styles';

import connection from '../images/connection.png';

export default makeScene2D(function* (view) {
  const text = createRef();
  const frequencies = createRef();
  const array = createRef();
  const intensity = createSignal(100);
  const image = createSignal(0);

  view.add(
    <>
      <Container
        ref={frequencies}
        label="FREQUENCIES"
        size={0}
        padding={0}
      >
      <Node ref={array}>
        <LabeledBox name={() => "Frequency: " + "Float"} fill={Colors.gray}/>
        <LabeledBox name={() => "Frequency: " + intensity().toFixed(2)} fill={Colors.gray}/>
      </Node>
      </Container>

      <Container
        label=""
        x={243}
        size={() => [784 * image(), 392 * image()]}
        padding={() => 40 * image()}
      >
        <Rect
          clip
          size={() => [704 * image(), 258 * image()]}
        >
          <Img
            clip
            src={connection}
            radius={8}
          >
          </Img>
          
        </Rect>
        <Txt {...WhiteLabel}>{"Total Resistance: 30/s"}</Txt>
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
      <Txt {...WhiteLabel}>{
        `The system's primary way to do work is with one or more
        frequencies, these frequencies usually decay with time
        until they are reduced to nothing`
      }</Txt>
      <Txt {...WhiteLabel}>{
        `The resistance of the whole system is defined by the
        structures whithin the system. The example shown has a
        resistance of 0.5, or 30`
      }</Txt>
      <Txt {...WhiteLabel}>{
        `that means that every second, every frequency is decreased
        by 30, or 0.5 every 1/60th of a second.`
      }</Txt>
    </TxtBox>
  );

  yield* all(
    frequencies().size([406, 320], 1),
    frequencies().padding(40, 1),
    text().setChild(0, 0.5),
    waitFor(5)
  );
  yield* intensity(500, 1);
  yield* intensity(0, 1);
  yield* array().opacity(0, 1);
  yield* all(
    frequencies().size([265, 120], 1),
    frequencies().position.x(-432, 1),
    image(1, 1),
    text().nextChild(0.5),
    waitFor(9)
  );
  yield* all(
    frequencies().size([406, 320], 1),
    array().opacity(1, 1),
    intensity(60),
    text().nextChild(0.5),
    waitFor(7)
  );
  yield* intensity(0, 2);
  yield* all(
    frequencies().size([0, 1], 1),
    array().opacity(0, 0.5),
    image(0, 1),
    text().size(0, 0.5)
  );
  yield* frequencies().padding(0, 0.5);
});
