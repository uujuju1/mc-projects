import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Txt, Rect} from '@motion-canvas/2d/lib/components';
import {CodeBlock, lines} from '@motion-canvas/2d/lib/components/CodeBlock';

import {all, waitFor} from '@motion-canvas/core/lib/flow';
import {createRef} from '@motion-canvas/core/lib/utils';
import {createSignal, DEFAULT} from '@motion-canvas/core/lib/signals';

import {BlackLabel, WhiteLabel, Colors} from '../styles'
import {Container} from '../components/Container';
import {Dialog} from '../components/Dialog';

export default makeScene2D(function* (view) {
    const code = createRef();
    const codeBase = createRef();
    const dialog = createRef();

    view.add(<Dialog ref={dialog} y={440} initialIndex={0} opacity={1} texts={[
        <Txt/>,
        <Txt {...WhiteLabel}>{
        `To create and remove links, HasForce provides two methods
        called link() and unlink().`
        }</Txt>,
        <Txt {...WhiteLabel}>{
        `Link is responsible for merging to different blocks into
        a single graph.`
        }</Txt>,
        <Txt {...WhiteLabel}>{
        `And unink does the opposite, it removes the linked block
        from the graph while creating a valid new graph.`
        }</Txt>
    ]}/>);

    yield view.add(
        <Rect layout clip ref={codeBase} fill={Colors.surface} radius={10}>
            <Container label="HasForce">
                <CodeBlock ref={code} {...WhiteLabel} language="java" code={`
                public void link(Building build) {...}
                public void unlink() {...}`
                } />
            </Container>
        </Rect>
    );
    yield dialog().next(0);
    yield* all(
        code().selection(lines(0), 0.5),
        dialog().next(0.5),
        waitFor(1)
    );
    yield* all(
        code().selection(lines(1), 0.5),
        dialog().next(0.5),
        waitFor(1)
    );
    yield* code().selection(DEFAULT, 1);
    yield* waitFor(1);
});
