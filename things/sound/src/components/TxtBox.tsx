import {initial, signal} from '@motion-canvas/2d/lib/decorators';
import {Txt, Rect, Node, NodeProps} from '@motion-canvas/2d/lib/components';

import {all} from '@motion-canvas/core';
import {SignalValue, SimpleSignal, unwrap} from '@motion-canvas/core/lib/signals';

export interface TxtBoxProps extends RectProps {
	initialIndex?: SignalValue<number>;
	pad?: SignalValue<number>;
}

export class TxtBox extends Rect {
	@initial(0)
    @signal()
    public declare readonly initialIndex: SimpleSignal<number, this>;

	@initial(0)
    @signal()
    public declare readonly pad: SimpleSignal<number, this>;

    private index: number;

    public constructor(props: TxtBoxProps) {
    	super(props);
    	this.clip(true);
    	this.index = this.initialIndex();
    	for(let i = 0; i < this.children().length; i++) {
    		if (i != this.index) this.children()[i].opacity(0);
    	}
    }

    public *resizeToChild(index: number, time: number) {
    	if (index <= this.children().length) {
    		yield* this.size(
    			this.children()[index].size().add(this.pad()),
    			time
    		);
    	}
    }
    public *nextChild(time: number) {
    	yield* all(
    		this.resizeToChild(this.index + 1, time),
    		this.children()[this.index].opacity(0, time),
    		this.children()[this.index + 1].opacity(1, time)
    	);
    	this.index++
    }
    public *previousChild(time: number) {
    	yield* all(
    		this.resizeToChild(this.index - 1, time),
    		this.children()[this.index].opacity(0, time),
    		this.children()[this.index - 1].opacity(1, time)
    	);
    	this.index--;
    }
    public *setChild(index: number, time: number) {
    	yield* all(
    		this.resizeToChild(index, time),
    		this.children()[this.index].opacity(0, time),
    		this.children()[index].opacity(1, time)
    	);
    	this.index = index;
    }
}