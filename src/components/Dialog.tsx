import {initial, signal} from '@motion-canvas/2d/lib/decorators';
import {Txt, Rect, Node, NodeProps} from '@motion-canvas/2d/lib/components';

import {all} from '@motion-canvas/core/lib/flow';
import {createRef, useLogger} from '@motion-canvas/core/lib/utils';
import {SignalValue, SimpleSignal, unwrap} from '@motion-canvas/core/lib/signals';

import {Colors} from '../styles';

export interface DialogProps extends NodeProps {
    initialIndex?: SignalValue<number>;
    texts?: SignalValue<SignalValue<Txt>[]>
}

export class Dialog extends Node {
    @initial(0)
    @signal()
    public declare readonly initialIndex: SimpleSignal<number, this>;

    @initial([])
    @signal()
    public declare readonly texts: SimpleSignal<
        SignalValue<Txt>[],
        this
    >;

    private index: number;
    private rect = createRef();

    public constructor(props: DialogProps) {
        super(props);

        this.index = props.initialIndex;
        this.initialIndex = props.initialIndex;
        this.texts = props.texts;

        for (let i = 0; i < props.texts.length; i++) {
            if (i != props.initialIndex) {
                props.texts[i].opacity(0)
            }
        }

        this.add(
            <Rect clip ref={this.rect} fill={Colors.surface}
                size={[
                    this.texts[this.initialIndex].width() + 40,
                    this.texts[this.initialIndex].height() + 40
                ]} radius={20}
            >
            {props.texts}
            </Rect>
        );
    }

    public *next(time: number) {
        yield* all(
            this.rect().width(this.texts[this.index + 1].width() + 40, time),
            this.rect().height(this.texts[this.index + 1].height() + 40, time),
            this.texts[this.index].opacity(0, time),
            this.texts[this.index + 1].opacity(1, time)
        );
        this.index ++;
    }
    public *previous(time: number) {
        yield* all(
            this.rect().width(this.texts[this.index + 1].width + 40, time),
            this.rect().height(this.texts[this.index + 1].height + 40, time),
            this.texts[this.index].opacity(0, time),
            this.texts[this.index + 1].opacity(1, time)
        );
        this.index ++;
    }
    public *set(time: number, index: number) {
        yield* all(
            this.rect().width(this.texts[index].width + 40, time),
            this.rect().height(this.texts[index].height + 40, time),
            this.texts[this.index].opacity(0, time),
            this.texts[index].opacity(1, time)
        );
        this.index = index;
    }
}
