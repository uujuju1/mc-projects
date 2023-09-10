import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Line, Circle, Txt, Rect, Vector2} from '@motion-canvas/2d/lib/components';
import {CodeBlock, lines} from '@motion-canvas/2d/lib/components/CodeBlock';

import {all, waitFor} from '@motion-canvas/core/lib/flow';
import {createRef} from '@motion-canvas/core/lib/utils';
import {createSignal, DEFAULT} from '@motion-canvas/core/lib/signals';

import {BlackLabel, WhiteLabel, Colors} from '../styles'
import {Container, LabeledBox} from '../components/Container';
import {Dialog} from '../components/Dialog';

import item from '../images/Item-icon.svg';
import method from '../images/Method-icon.svg';

export default makeScene2D(function* (view) {
    const code = createRef();
    const codeBase = createRef();
    const linkFunc = createRef();
    const dialog = createRef();

    const ratioScl = createSignal(0);
    const ratio = createSignal(2);

    view.add(<Dialog ref={dialog} y={440} initialIndex={0} opacity={0} texts={[
        <Txt/>,
        <Txt {...WhiteLabel}>{
        `To create and remove links, HasForce provides two methods
        called link() and unlink().`
        }</Txt>,
        <Txt {...WhiteLabel}>{
        `Link is responsible for merging two different blocks into
        a single graph and calculating the ratio between them.`
        }</Txt>,
        <Txt {...WhiteLabel}>{
        `And unlink does the opposite, it removes the linked block
        from the graph while creating a valid new graph.`
        }</Txt>,
        <Txt {...WhiteLabel}>{
        `Ratio is calculated in link() only for the building being
        linked.`
        }</Txt>,
        <Txt {...WhiteLabel}>{
        `It gets the first build's size divided by the second build's size.`
        }</Txt>,
        <Txt {...WhiteLabel}>{
        `The speed percieved by the block is the result of the base speed
        multiplied by the ratio. The torque on the other hand is divided by
        the base speed.`
        }</Txt>
    ]}/>);

    yield view.add(
        <>
        <Rect layout clip ref={codeBase} height={0} radius={10}>
            <Container fill={Colors.surface} label="HasForce">
                <CodeBlock ref={code} {...WhiteLabel} language="java" code={`
                public void link(Building build) {...}
                public void unlink() {...}`
                } />
            </Container>
        </Rect>
        <Rect layout clip ref={linkFunc} height={() => ratioScl() * 520} radius={10} x={265}>
            <Container fill={Colors.surface} label="ratio">
                <LabeledBox src={item} fill={Colors.sage} name={() => `ratio = ${ratio().toFixed(2)}`}/>
                <LabeledBox src={item} fill={Colors.sage} name={() => `baseSpeed = 5`}/>
                <LabeledBox src={method} fill={Colors.sage} name={() => `speed = ${(5 * ratio()).toFixed(2)}`}/>
                <LabeledBox src={method} fill={Colors.sage} name={() => `torque = ${(5 / ratio()).toFixed(2)}`}/>
            </Container>
        </Rect>
        </>
    );

    view.add(
        <>
            <Circle stroke="white" lineWidth={10} x={-265} size={() => 100 * ratio() * ratioScl()}/>
        </>
    );
    
    yield* all(
        dialog().next(0),
        dialog().opacity(1, 0.5),
        codeBase().height(207, 1),
        waitFor(5)
    );
    yield* all(
        code().selection(lines(0), 0.5),
        dialog().next(0.5),
        waitFor(7)
    );
    yield* all(
        code().selection(lines(1), 0.5),
        dialog().next(0.5),
        waitFor(7)
    );
    yield* all(
        code().selection(DEFAULT, 1),
        codeBase().height(0, 1)
    );
    yield* all(
        ratioScl(1, 1),
        dialog().next(0.5),
        waitFor(4)
    );
    yield* all(
        ratio(0.5, 1),
        dialog().next(0.5),
        waitFor(6)
    );
    yield* all(
        ratio(3, 1),
        dialog().next(0.5),
        waitFor(10)
    );
    yield* all(
        ratioScl(0, 1),
        dialog().opacity(0, 1)
    );
});
