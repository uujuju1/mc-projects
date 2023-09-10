import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Circle, Rect, Layout, Img, Line, Txt} from '@motion-canvas/2d/lib/components';

import {all, any, chain, waitFor} from '@motion-canvas/core/lib/flow';
import {createRef} from '@motion-canvas/core/lib/utils';
import {createSignal} from '@motion-canvas/core/lib/signals';

import {Container} from '../components/Container';
import {Dialog} from '../components/Dialog';
import {WhiteLabel, Colors} from '../styles';

import belt from '../images/belt-node-large.png';

export default makeScene2D(function* (view) {
	const lines = createSignal(3);
	const line = createSignal(0);
	const separation = createSignal(0);

	const dialog = createRef();
	const drawer = createSignal(0);

	function* loop(time: number) {
		for(let i = 0; i < time; i++) {
			yield* line(100, 1);
			yield* line(-100, 1);
		}
	}


	view.add(
		<Dialog ref={dialog} y={440} initialIndex={0} opacity={0} texts={[
			<Txt/>,
			<Txt {...WhiteLabel}>{
			`To give some feedback to the player, Every build that has force
			has a convenient drawBelt() method. It's job is to draw a belt
			circling below two buildings.`
			}</Txt>,
			<Txt {...WhiteLabel}>{
			`The belt is composed of 4 continuous lines and a bunch of smaller
			lines which gives the illusion of movement.`
			}</Txt>,
			<Txt {...WhiteLabel}>{
			`At first, everything is rendered in a layer slightly below the usual.
			The offset from the center is calculated. Then the base continuous lines
			are drawn in the calculated positions to give a base for the rest of the
			animation lines.`
			}</Txt>,
			<Txt {...WhiteLabel}>{
			`With some lerps, a varying amount of smaller lines are drawn between
			the two positions.`
			}</Txt>
		]}/>
	);

	view.add(
		<Rect layout clip height={() => (308 * drawer() + (separation() * 3 * 128))}>
			<Container fill={Colors.surface} height={() => 308 * drawer() + (separation() * 3 * 128)} label="Draw()">
				<Rect fill={Colors.background} size={() => [192 * 2 + 40, (128 + 40 + separation() * 3 * 128)]} radius={10}>
					<Layout layout={false}>
						<Line stroke="6B5A55" end={() => lines()} lineWidth={18} points={() => [
							[128, -36 - separation() * 192],
							[-128, -36 - separation() * 192]
						]}/>
						<Line stroke="6B5A55" end={() => lines()} lineWidth={18} points={() => [
							[-128, 36 - separation() * 192],
							[128, 36 - separation() * 192]
						]}/>
						<Line stroke="A6918A" end={() => lines() - 1} lineWidth={6} points={() => [
							[128, -36 - separation() * 64],
							[-128, -36 - separation() * 64]
						]}/>
						<Line stroke="A6918A" end={() => lines() - 1} lineWidth={6} points={() => [
							[-128, 36 - separation() * 64],
							[128, 36 - separation() * 64]
						]}/>
						<Line stroke="BEADA7" end={() => lines() - 2} lineDashOffset={() => line()} lineDash={[18, 36]} lineWidth={6} points={() => [
							[128, -36 + separation() * 64],
							[-128, -36 + separation() * 64]
						]}/>
						<Line stroke="BEADA7" end={() => lines() - 2} lineDashOffset={() => line()} lineDash={[18, 36]} lineWidth={6} points={() => [
							[-128, 36 + separation() * 64],
							[128, 36 + separation() * 64]
						]}/>
						<Img antialiased={false} smoothing={false} y={() => separation() * 192} x={-128} src={belt} size={128}/>
						<Img antialiased={false} smoothing={false} y={() => separation() * 192} x={128} src={belt} size={128}/>
					</Layout>
				</Rect>
			</Container>
		</Rect>
	);

	yield dialog().next(0);
	yield loop(38, i => line(100 * (i%2), 1));
	yield* all(
		dialog().opacity(1, 0.5),
		drawer(1, 1),
		waitFor(10)
	);
	yield* all(
		separation(1, 1),
		dialog().next(0.5),
		waitFor(7)
	);
	yield* all(
		separation(0, 1),
		lines(0, 1),
		dialog().next(0.5),
		waitFor(3)
	);
	yield* chain(
		lines(1, 1),
		lines(2, 1)
	);
	yield* waitFor(5);
	yield* all(
		lines(3, 1),
		dialog().next(0.5),
		waitFor(6)
	);
	yield* all(
		dialog().opacity(0, 0.5),
		drawer(0, 1)
	);
});
