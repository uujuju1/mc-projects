import {makeScene2D} from '@motion-canvas/2d';
import {Rect, Img, Line, Node, Txt} from '@motion-canvas/2d/lib/components';

import {all, waitFor} from '@motion-canvas/core';
import {createRef, range} from '@motion-canvas/core/lib/utils';

import {TxtBox} from '../components/TxtBox';
import {Colors, WhiteLabel} from '../styles';

import wire from '../images/vibration-wire.png';

export default makeScene2D(function* (view) {
  const text = createRef();
  const rect = createRef();

  view.add(
    <>
      <Rect
        clip
        ref={rect}
        radius={8}
        fill={Colors.surface}
      >
        <Line
          stroke="565666"
          lineWidth={32}
          points={[
            [192, 0],
            [-190, 0]
          ]}>
          <Line
            antialiased={false}
            smoothing={false}
            stroke="989AA4"
            lineWidth={32/3}
            points={[
              [192, 0],
              [-190, 0]
            ]}
          >
            {range(10).map(i => (
              <Rect
                layout={false}
                antialiased={false}
                smoothing={false}
                fill="6E7080"
                x={38.4 * i - 192}
                size={[32/3, 50]}
              />  
            ))}
          </Line>
        </Line>
        <Img
          antialiased={false}
          smoothing={false}
          src={wire}
          size={96}
          x={192}/>
        <Img
          antialiased={false}
          smoothing={false}
          src={wire}
          size={96}
          x={-192}/>
      </Rect>
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
        `The connections between wires are made with a flexible
        rope made with one of the system's materials.`
      }</Txt>
      <Txt {...WhiteLabel}>{
        `although very durable, it's still flexible, allowing
        frequency spread through all of the system's structures`
      }</Txt>
      <Txt {...WhiteLabel}>{
        `there is some recovered data regarding the structures's
        development, but the date was corrupted, the log will be
        shown soon.`
      }</Txt>
    </TxtBox>
  );

  yield* all(
    rect().size([510, 128], 1),
    text().setChild(0, 0.5),
    waitFor(4)
  );
  yield* all(
    text().nextChild(0.5),
    waitFor(5)
  )
  yield* all(
    text().nextChild(0.5),
    waitFor(7)
  )
  yield* all(
    rect().size(0, 1),
    text().size(0, 0.5)
  );
});
