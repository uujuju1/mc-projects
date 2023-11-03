import {makeScene2D} from '@motion-canvas/2d';
import {Rect, Img, Txt, Line} from '@motion-canvas/2d/lib/components';

import {all, waitFor} from '@motion-canvas/core';
import {createRef} from '@motion-canvas/core/lib/utils';

import {Container} from '../components/Container';
import {TxtBox} from '../components/TxtBox';
import {Colors, WhiteLabel} from '../styles';

import rebuilder from '../images/rebuilder-press.png';
import densepress from '../images/dense-press.png';

export default makeScene2D(function* (view) {
  const text = createRef();

  const usage = createRef();
  const rebuilderRect = createRef();
  const densepressRect = createRef();
  const arrow = createRef();
  
  view.add(
    <>
      <Container
        ref={usage}
        direction={'row'}
        gap={0}
        size={0}
        padding={0}
      >
          <Rect
            radius={8}
            size={400}
            marginRight={20}
            fill={Colors.background}
          >
            <Rect clip layout={false} ref={rebuilderRect}>
              <Img 
                layout={false}
                antialiased={false}
                smoothing={false}
                size={192}
                y={-50}
                src={rebuilder}
              />
              <Txt 
                layout={false}
                y={100}
                {...WhiteLabel}
                fontSize={20}
              >
              {`
                4/s Titanium
                6/s Graphite
                output: 5/s Dense Alloy
              `}
              </Txt>
            </Rect>
          </Rect>

        
          <Rect
            radius={8}
            size={400}
            marginLeft={20}
            fill={Colors.background}
          >
            <Rect clip layout={false} ref={densepressRect}>
              <Img 
                layout={false}
                antialiased={false}
                smoothing={false}
                size={192}
                y={-50}
                src={densepress}
              />
              <Txt 
                layout={false}
                y={100}
                {...WhiteLabel}
                fontSize={20}
              >
              {`
                1/s Titanium
                1/s Nickel
                output: 1/s Dense Alloy
              `}
              </Txt>
            </Rect>
          </Rect>
      </Container>
      <Line
        ref={arrow}
        endArrow
        end={0}
        arrowSize={50}
        lineWidth={24}
        radius={400}
        points={[
          [210, -220],
          [0, -400],
          [-210, -220]
        ]}
        stroke={Colors.FUNCTION}
      />
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
        `All structures with a Vibration module requires atleast
        one of the system's materials to be constructed, but the
        first material to be made is Dense Alloy.`
      }</Txt>
      <Txt {...WhiteLabel}>{
        `It can be made on a Rebuilder, provided with the impact
        press module, but costs may not be updated in here`
      }</Txt>
      <Txt {...WhiteLabel}>{
        `It also can be made on a Dense Press, which is a structure
        made specifically to make Dense Alloy, but it's quite old 
        and not nearly as efficient as the Rebuilder Impact Press`
      }</Txt>
      <Txt {...WhiteLabel}>{
        `However, impact press module of a Rebuilder needs Dense Alloy
        to be made, so a Dense Press is required to evolve to a Rebuilder`
      }</Txt>
    </TxtBox>
  );

  yield* all(
    usage().size([880, 480], 1),
    usage().padding(40, 1),
    text().setChild(0, 0.5),
    waitFor(8)
  );
  yield* all(
    rebuilderRect().size(400, 1),
    text().nextChild(0.5),
    waitFor(7)
  );
  yield* all(
    densepressRect().size(400, 1),
    text().nextChild(0.5),
    waitFor(9)
  );
  yield arrow().end(1, 1);
  yield* text().nextChild(0.5)
  yield* arrow().start(1, 1);
  yield* waitFor(8)
  yield* all(
    usage().size(0, 1),
    densepressRect().size(0, 0.5),
    rebuilderRect().size(0, 0.5),
    text().size(0, 0.5)
  );
  yield* usage().padding(0, 0.5);
});
