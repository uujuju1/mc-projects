import {makeScene2D} from '@motion-canvas/2d';
import {Circle, Rect, Line, Node, Latex, Txt} from '@motion-canvas/2d/lib/components';

import {waitFor, waitUntil, range, all} from '@motion-canvas/core';
import {createSignal} from '@motion-canvas/core/lib/signals';
import {createRef} from '@motion-canvas/core/lib/utils';
import {tween, map} from '@motion-canvas/core/lib/tweening';

export default makeScene2D(function* (view) {
  const size = 200;
  const sineSize = 100;
  const time = createSignal(0);
  const star = createSignal(0);
  const box = createRef();
  const start = createRef();
  const stats = createSignal(0);
  const magnetar = createSignal(0);
  const magnets = createSignal(1);
  const pulsar = createSignal(0);
  const pulse = createSignal(1);


  view.add(
    <Rect clip ref={start} size={0}>
    <Node x={0}>
      <Circle
        size={[150, 200]}
        offset={[-1, 0]}
        rotation={45}
        lineDash={[20, 20]}
        lineDashOffset={() => time()}
        lineWidth={10}
        stroke="a24ccd"
      />
      <Circle
        size={[150, 200]}
        offset={[1, 0]}
        rotation={45}
        lineDash={[20, 20]}
        lineDashOffset={() => -time()}
        lineWidth={10}
        stroke="a24ccd"
      />
      <Circle
        size={[225, 300]}
        offset={[-1, 0]}
        rotation={45}
        lineDash={[20, 20]}
        lineDashOffset={() => time()}
        lineWidth={10}
        stroke="a24ccd"
      />
      <Circle
        size={[225, 300]}
        offset={[1, 0]}
        rotation={45}
        lineDash={[20, 20]}
        lineDashOffset={() => -time()}
        lineWidth={10}
        stroke="a24ccd"
      />
      <Circle size={size} clip fill="b973d8">
        <Circle size={size} fill="d099e3" offset={[-0.25, 0.25]}/>
      </Circle>
    </Node>
    <Rect
      clip
      ref={box}
      fill="141414"
      x={() => -500 + star()}
      size={500}>
      <Node x={() => -star() + 500}>
        <Line 
          closed
          fill="a24ccd"
          lineWidth={10}
          radius={10}
          points={[
            [120, -150],
            [0, 0],
            [150, -120],
            [150, -150]
          ]}
        />
        <Line 
          closed
          fill="a24ccd"
          lineWidth={10}
          radius={10}
          points={[
            [-120, 150],
            [0, 0],
            [-150, 120],
            [-150, 150]
          ]}
        />
        <Circle size={size} clip fill="b973d8">
          <Circle size={size} fill="d099e3" offset={[-0.25, 0.25]}/>
        </Circle>
      </Node>
    </Rect>
    </Rect>
  );

  view.add(
    <Rect clip fill="202020" radius={50} size={() => [600, 800 * stats()]}>
      <Rect clip fill="29272D" radius={20} y={() => -200 * stats()} size={() => [550, 350 * magnetar()]}>
        <Txt 
          position={[-190, -140]}
          fill="d099e3"
          fontFamily="JetBrains Mono"
          fontSize={30}
        >{"Magnetar"}</Txt>

        <Rect clip size={() => [550 * magnets(), 350 * magnets()]}>
          <Latex x={100} width={150}
            tex="{\color{white} > 10^9T}"
          />
          <Node x={-100}>
            <Circle size={[50, 75]} offset={[-1, 0]} lineDash={[10, 10]} lineDashOffset={() => -time()} lineWidth={5} stroke="white"/>
            <Circle size={[50, 75]} offset={[1, 0]} lineDash={[10, 10]} lineDashOffset={() => time()} lineWidth={5} stroke="white"/>
            <Circle size={[100, 150]} offset={[-1, 0]} lineDash={[10, 10]} lineDashOffset={() => -time()} lineWidth={5} stroke="white"/>
            <Circle size={[100, 150]} offset={[1, 0]} lineDash={[10, 10]} lineDashOffset={() => time()} lineWidth={5} stroke="white"/>
          </Node>
        </Rect>


        <Rect x={40} clip size={() => [400 * (1-magnets()), 350 * (1-magnets())]}>
          <Txt
            x={-80}
            y={-10}
            fill="fff"
            fontFamily="JetBrains Mono"
            fontSize={20}
          >{`
            :maior imâ ja feito:

            :imâ geomagnético:

            :estrela de nêutrons:
          `}</Txt>
          <Latex y={-50} x={80} height={20}
            tex="{\color{white} 45T}"
          />
          <Latex x={70} height={20}
            tex="{\color{white} 10^{-5}T}"
          />
          <Latex y={50} x={80} height={20}
            tex="{\color{white} 10^9T}"
          />
        </Rect>
      </Rect>

      <Rect clip fill="29272D" radius={20} y={() => 200 * stats()} size={() => [550, 350 * pulsar()]}>
        <Txt position={[-190, -140]} fill="d099e3" fontFamily="JetBrains Mono" fontSize={30}>{"Pulsar"}</Txt>
        <Rect clip size={() => [550 * pulse(), 350 * pulse()]}>
          <Latex x={100} width={300}
            tex="{\color{white} = 1m < x < 10^9m}"
          />
          <Node x={-140}>
            <Line
              stroke="white"
              lineDash={[10, 10]}
              lineDashOffset={() => time()}
              lineWidth={5}
              radius={5}
              start={0.14}
              end={0.86}
              points={[
                [-100, sineSize],
                [-80, -sineSize],
                [-60, sineSize],
                [-40, -sineSize],
                [-20, sineSize],
                [0, -sineSize],
                [20, sineSize],
                [40, -sineSize],
                [60, sineSize],
                [80, -sineSize]
              ]}
            />
          </Node>
        </Rect>
          

        <Rect clip y={-50} size={() => [400 * (1-pulse()), 350 * (1-pulse())]}>
          <Node>{range(3).map(i => (
            <Circle fill="8f8f8f" x={100*i - 100} size={[20, 20]}/>
          ))}</Node>
          <Line
            stroke="ffffff"
            lineWidth={5}
            endArrow
            startArrow
            points={[
              [-200, 0],
              [200, 0]
            ]}
          />
          <Line
          position={[50, 50]}
            stroke="ffffff"
            opacity={0.5}
            lineWidth={5}
            endArrow
            startArrow
            arrowSize={10}
            points={[
              [-50, 0],
              [50, 0]
            ]}
          />
          <Latex position={[50, 100]} width={75}
            tex="{\color{white} \frac{1}{641} / s}"
          />
        </Rect>
      </Rect>
    </Rect>
  );

  yield tween(50, value => {
    time(map(0, 500, value))
  });
  yield* waitUntil("event1");
  yield* start().size([1920, 1080], 1);
  yield* waitUntil("event2");
  yield* star(500, 1);
  yield* waitUntil("event3");
  yield* box().fill("14141400", 1);
  yield* waitUntil("event4");
  yield* all(
    start().size([0, 0], 1),
    stats(1, 1)
  );
  yield* waitUntil("event5");
  yield* magnetar(1, 1);
  yield* waitUntil("event6");
  yield* magnets(0, 1);
  yield* waitUntil("event7");
  yield* pulsar(1, 1);
  yield* waitUntil("event8");
  yield* pulse(0, 1);
  yield* waitUntil("event9");

  yield* all(
    stats(0, 1.5),
    magnetar(0, 1),
    pulsar(0, 1)
  );
});
