import {Colors, WhiteLabel, BlackLabel} from '../styles';
import {Rect, RectProps, Txt, Img} from '@motion-canvas/2d/lib/components';
import {makeRef, makeRefs} from '@motion-canvas/core/lib/utils';

interface ContainerRefs {
  rect: Rect;
  label: Txt;
}

export interface ContainerProps extends RectProps {
  label?: string;
  refs?: ContainerRefs;
}

export function LabeledBox({ name, src, color, ref, ...props}: {
    name: string;
    src: string;
    color: string;
} & RectProps) {
    return (
        <Rect layout radius={8} ref={ref} {...props}>
            <Img opacity={0.87} width={40} height={40} margin={20} src={src} />
            <Txt paddingRight={40} {...BlackLabel} fill={color} lineHeight={80} cache>{name}</Txt>
        </Rect>
    );
}

export function Container({
  label = '',
  refs = {} as ContainerRefs,
  children,
  ref,
  ...rest
}: ContainerProps) {
  return (
    <Rect
      ref={ref ?? makeRef(refs, 'rect')}
      fill={Colors.surface}
      direction={'column'}
      radius={8}
      padding={40}
      gap={20}
      layout
      {...rest}
    >
      <Txt
        ref={makeRef(refs, 'label')}
        lineHeight={60}
        marginTop={-20}
        {...WhiteLabel}
      >
        {label}
      </Txt>
      {children}
    </Rect>
  );
}

export const makeContainer = makeRefs<typeof Container>;
