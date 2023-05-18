import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Circle, Line, Layout, Rect, Img, Txt} from '@motion-canvas/2d/lib/components';

import {all, waitFor} from '@motion-canvas/core/lib/flow';
import {createRef, makeRef} from '@motion-canvas/core/lib/utils';
import {createSignal} from '@motion-canvas/core/lib/signals';

import {BlackLabel, WhiteLabel, Colors} from '../styles'
import {Container, LabeledBox} from '../components/Container';
import {Dialog} from '../components/Dialog';

import box from '../images/Item-icon.svg';
import method from '../images/Method-icon.svg';

export default makeScene2D(function* (view) {
    const sizeScl = createSignal(0);
    const distanceScl = createSignal(1);
    const updateScl = createSignal(0);
    const updateProgress = createSignal(1);
    const updateBox = createRef();
    const dialog = createRef();

    const boxes: LabeledBox = [];

    view.add(
        <>
            <Rect layout clip fill={Colors.surface} size={[368, () => 320 * sizeScl()]} position={[() => -214 * distanceScl(), 0]} radius={10}>
                <Container label="BUILDS">
                    <LabeledBox src={box} name="Building#1" fill={Colors.red}/>
                    <LabeledBox src={box} name="Building#2" fill={Colors.red}/>
                </Container>
            </Rect>
            <Rect layout clip fill={Colors.surface} size={[300, () => 220 * sizeScl()]} position={[() => 200 * distanceScl(), 0]} radius={10}>
                <Container label="LINKS">
                    <LabeledBox src={box} name="Link#1" fill={Colors.FUNCTION}/>
                </Container>
            </Rect>
            <Rect layout clip ref={updateBox} fill={Colors.surface} height={0} radius={10}>
                <Container label="UPDATE()">
                    <LabeledBox ref={makeRef(boxes, 0)} src={method} name="PropagateSpeed" fill={Colors.sage}/>
                    <LabeledBox ref={makeRef(boxes, 1)} src={method} name="UpdateSpeed" fill={Colors.sage}/>
                </Container>
            </Rect>

            <Rect layout clip fill={Colors.surface} x={-460} height={() => updateScl() * 290} radius={10}>
                <Container label="UPDATE(): PropagateSpeed">
                    <Rect height={150}>
                        <Rect layout={false}>
                            <Line stroke={Colors.background} lineWidth={10} radius={80} points={[[-50, 0], [75, 0]]}/>
                            <Circle stroke={Colors.sage} lineWidth={10} position={[100, 0]} size={50}>
                                <Circle fill={Colors.sage} size={() => 50 / (1 + (1 - updateProgress()))}/>
                            </Circle>
                            <Circle stroke={Colors.sage} lineWidth={10} position={[-100, 0]} size={100}>
                                <Circle fill={Colors.sage} size={() => (1 - updateProgress()) * 50}/>
                            </Circle>
                        </Rect>
                    </Rect>
                </Container>
            </Rect>
            <Rect layout clip fill={Colors.surface} x={435} height={() => updateScl() * 290} radius={10}>
                <Container label="UPDATE(): UpdateSpeed">
                    <Rect height={150}>
                        <Rect layout={false}>
                            <Circle stroke={Colors.sage} lineWidth={10} size={[100, 100]}/>
                            <Line endArrow end={() => updateProgress()} stroke={Colors.background} lineWidth={10} radius={80} points={[[0, 80], [-80, 80], [-80, 0]]}/>
                            <Line endArrow end={() => updateProgress()} stroke={Colors.background} lineWidth={10} radius={80} points={[[0, -80], [80, -80], [80, 0]]}/>
                        </Rect>
                    </Rect>
                </Container>
            </Rect>
        </>
    );

    view.add(
        <Dialog ref={dialog} y={440} initialIndex={0} opacity={0} texts={[
            <Txt/>,
            <Txt {...WhiteLabel}>{
            `The graph stores the buildins it has in two
            different forms: in links and in actual buildings.`
            }</Txt>,
            <Txt {...WhiteLabel}>{
            `Both of these Arrays are used in the graph's update()
            method. It uses them to spread speed and update it.`
            }</Txt>,
            <Txt {...WhiteLabel}>{
            `Speed is spread between links by calculating the average of the two
            buildings inside it. Speed also get slower over time when it's updated.`
            }</Txt>
        ]}/>
    );

    yield* all(
        dialog().next(0),
        sizeScl(1, 1),
        dialog().opacity(1, 1),
        waitFor(5)
    );
    yield* distanceScl(2, 1);
    yield* all(
        updateBox().height(320, 1),
        dialog().next(0.5),
        waitFor(6)
    );
    yield* all(
        boxes[1].fill(Colors.red, 1),
        boxes[0].fill(Colors.FUNCTION, 1)
    );
    yield* all(
        sizeScl(0, 1),
        distanceScl(1, 1),
        dialog().next(0.5)
    );
    yield* all(
        updateBox().height(0, 1),
        updateScl(1, 1)
    );
    yield* updateProgress(0.0001, 7);
    yield* all(
        updateScl(0, 1),
        dialog().opacity(0, 1)
    );
});
