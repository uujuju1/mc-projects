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

export function LabeledBox({
  name,
  color,
  textProp = {...BlackLabel},
  ...props
}: {
  name: string;
  color: string;
  src: string;
} & RectProps) {
  return (
    <Rect layout clip radius={8} {...props}>
      <Txt paddingRight={20} paddingLeft={20} {...textProp} lineHeight={80} cache>{name}</Txt>
    </Rect>
  );
}
export function ImgLabeledBox({
  name,
  color,
  src,
  textProp = {...BlackLabel},
  ...props
}: {
  name: string;
  color: string;
  src: string;
} & RectProps) {
  return (
    <Rect layout clip radius={8} {...props}>
      <Img src={src} width={40} height={40} margin={20}/>
      <Txt paddingRight={20} paddingLeft={20} {...textProp} lineHeight={80} cache>{name}</Txt>
    </Rect>
  );
}

export function Container({
  label = '',
  text = {...WhiteLabel},
  refs = {} as ContainerRefs,
  children,
  ref,
  ...rest
}: ContainerProps) {
  return (
    <Rect
      clip
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
        {...text}
      >
        {label}
      </Txt>
      {children}
    </Rect>
  );
}

export const makeContainer = makeRefs<typeof Container>;
