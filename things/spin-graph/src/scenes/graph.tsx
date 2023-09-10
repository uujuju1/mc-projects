import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Circle, Layout, Rect, Line, Txt, Img, Node} from '@motion-canvas/2d/lib/components';

import {all, waitFor} from '@motion-canvas/core/lib/flow';
import {createRef, range, useLogger} from '@motion-canvas/core/lib/utils';
import {createSignal} from '@motion-canvas/core/lib/signals';

import {Container, LabeledBox} from '../components/Container';
import {Dialog} from '../components/Dialog';
import {BlackLabel, WhiteLabel, Colors} from '../styles'

import itemModule from '../images/Item-icon.svg';
import liquidModule from '../images/Liquid-icon.svg';
import powerModule from '../images/Power-icon.svg';
import heatModule from '../images/Heat-icon.svg';
import spinModule from '../images/Spin-icon.svg';

export default makeScene2D(function* (view) {
    const renderer = createRef();
    const module = createRef();
    const dialog = createRef();

    const logger = useLogger();

    const radiusSignal = createSignal(0);

    // the animation
    yield view.add(
        <>
            {/*buildings*/}
            <Rect ref={renderer} layout clip height={0}>
                <Container label="BUILDING MODULES">
                    <Node ref={module}>
                        <LabeledBox fill={Colors.sage} name="Item Module" src={itemModule} />
                        <LabeledBox fill={Colors.sage} name="Liquid Module" src={liquidModule} />
                        <LabeledBox fill={Colors.sage} name="Power Module" src={powerModule} />
                        <LabeledBox fill={Colors.sage} name="Heat Module" src={heatModule} />
                    </Node>
                    <LabeledBox fill={Colors.sage} name="Spin Module" src={spinModule} />
                </Container>
            </Rect>

            {/*torque vector*/}
            <Line endArrow stroke={Colors.surface} lineWidth={10}
            start={() => radiusSignal() * 0.25}
            end={() => radiusSignal() * 0.75}
            points={[
                [-200, -50],
                [200, -100]
            ]}
            />
            <Line endArrow stroke={Colors.surface} lineWidth={10}
            start={() => radiusSignal() * 0.25}
            end={() => radiusSignal() * 0.75}
            points={[
                [200, 100],
                [-200, 50]
            ]}
            />
            <Line stroke={Colors.surface} lineWidth={10}
            end={() => radiusSignal()}
            points={[
                [-200, -50],
                [200, -100]
            ]}
            />
            <Line stroke={Colors.surface} lineWidth={10}
            end={() => radiusSignal()}
            points={[
                [200, 100],
                [-200, 50]
            ]}
            />
            <Circle stroke={Colors.red} lineWidth={10} position={[-200, 0]}
                size={() => radiusSignal() * 100}
            />
            <Circle stroke={Colors.green} lineWidth={10} position={[200, 0]}
                size={() => radiusSignal() * 200}
            />
        </>,
    );

    // text bubble code
    view.add(
        <Dialog ref={dialog} y={440} initialIndex={0} opacity={0} texts={[
            <Txt {...WhiteLabel}>
            {`SteamWorks provides two extra modules: Heat and Spin.`}
            </Txt>,
            <Txt {...WhiteLabel}>
            {`Spin is the latest one. Although very buggy, the system's
            basics works in a slightly functional way.
            `}
            </Txt>,
            <Txt {...WhiteLabel}>
            {`It uses graphs to update rotation, speed and torque along
            a network of linked buildings.
            `}
            </Txt>
        ]}/>
    );
    // update
    yield* all(
        dialog().opacity(1, 1),
        renderer().height(620, 1),
        waitFor(4)
    );
    yield* all(
        module().opacity(0.5, 1),
        dialog().next(0.5),
        waitFor(5)
    );
    yield* all(
        renderer().height(0, 1),
        module().opacity(1, 1)
    );
    yield* all(
        radiusSignal(1, 1),
        dialog().next(0.5),
        waitFor(6)
    );
    yield* all(
        radiusSignal(0, 1),
        dialog().opacity(0, 1)
    );
});
