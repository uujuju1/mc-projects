import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Circle, Rect} from '@motion-canvas/2d/lib/components';

import {all, waitFor} from '@motion-canvas/core/lib/flow';
import {createRef} from '@motion-canvas/core/lib/utils';
import {createSignal} from '@motion-canvas/core/lib/signals';

const light = "BDB8D0";
const dark = "413B57";
const medium = "968EB4";
const cloud = "FFF8";
const bg = "141414";
export default makeScene2D(function* (view) {
    const signal1 = createSignal(1);
    const base = createRef();
    const background = createRef();

    view.add(
        <Rect clip ref={background} radius={50}>
            <Circle ref={base} fill={light} size={[250, 250]}/>
            <Circle fill={medium} size={[() => signal1() * 40, () => signal1() * 40]} position={[-20, -30]}/>
            <Circle fill={medium} size={[() => signal1() * 20, () => signal1() * 20]} position={[-70, 0]}/>
            <Rect fill={cloud} size={[250, () => signal1() * 40]} position={[-35, -110]} rotation={-50}/>
            <Rect fill={cloud} size={[250, () => signal1() * 30]} position={[0, -20]} rotation={-35}/>
            <Circle fill={medium} size={[200, 220]} position={[() => 240 / ( 1 + signal1()),20]}/>
            <Circle fill={dark} size={[300, 200]} position={[0, () => 260 / ( 1 + signal1())]}/>
        </Rect>
    );

    yield* background().size(200, 0.5);
    yield signal1(0, 0.5);
    yield* waitFor(1);
    yield* base().position.y(300, 0.5);


    
});
