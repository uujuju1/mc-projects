import {makeScene2D} from '@motion-canvas/2d';
import {Circle, Rect, Line, Node} from '@motion-canvas/2d/lib/components';

import {all, waitFor, useLogger} from '@motion-canvas/core';

import {Colors, WhiteLabel, BlackLabel} from '../styles';

export default makeScene2D(function* (view) {
  
  view.add(
    <Rect layout>
      <Rect size={150}>
        <Line
          layout={false}
          stroke="fff"
          lineWidth={15}
          points={[
            [-50, 35],
            [-50, -35]
          ]}/>
        <Line
          layout={false}
          stroke="fff"
          lineWidth={15}
          points={[
            [-50, 0],
            [0, 0]
          ]}/>
        <Line
          layout={false}
          stroke="fff"
          lineWidth={15}
          points={[
            [0, -50],
            [0, 10],
            [50, 10]
          ]}/>
        <Line
          layout={false}
          stroke="fff"
          lineWidth={15}
          points={[
            [50, 50],
            [50, -50]
          ]}/>
        <Circle
          layout={false}
          fill="fff"
          size={20}
          position={[-50, -55]}/>
      </Rect>
      <Rect size={[100, 150]}>
        <Line
          layout={false}
          stroke="fff"
          lineWidth={15}
          points={[
          [25, 0],
          [-25, 0],
          [-25, -50],
          [5, -50]
          ]}/>
        <Line
          layout={false}
          stroke="fff"
          lineWidth={15}
          points={[
          [25, -35],
          [25, 35]
          ]}/>
        <Circle
          layout={false}
          fill="fff"
          size={20}
          position={[25, -55]}/>
      </Rect>
      <Rect size={[125, 150]}>
        <Line
          layout={false}
          stroke="fff"
          lineWidth={15}
          radius={50}
          points={[
          [-37.5, -50],
          [-37.5, 0],
          [0, 0],
          [0, -50]
          ]}/>
        <Line
          layout={false}
          stroke="fff"
          lineWidth={15}
          points={[
          [37.5, -35],
          [37.5, 35]
          ]}/>
        <Line
          layout={false}
          stroke="fff"
          lineWidth={15}
          points={[
          [-25, 0],
          [37.5, 0]
          ]}/>
        <Circle
          layout={false}
          fill="fff"
          size={20}
          position={[37.5, -55]}/>
      </Rect>
    </Rect>
  );

});
