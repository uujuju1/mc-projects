import type {View2D} from '@motion-canvas/2d/lib/components';

export function applyViewStyles(view: View2D) {
  view.lineHeight(64);
}

export const Colors = {
  whiteLabel: 'rgba(255, 255, 255, 0.87)',
  blackLabel: 'rgba(0, 0, 0, 0.87)',
  background: '#141414',
  surface: '#242424',
  surfaceLight: '#c0b3a3',

  KEYWORD: '#ff6470',
  TEXT: '#ACB3BF',
  FUNCTION: '#ffc66d',
  STRING: '#99C47A',
  NUMBER: '#68ABDF',
  PROPERTY: '#AC7BB5',
  COMMENT: '#808586',

  red: '#ef5350',
  redopac: 'rgba(239, 83, 80, 0.2)',
  green: '#8bc34a',
  blue: '#2196f3',
  sage: '#c9c19f',
  coyote: '#7E6551',
  gray: '#7d7c7a',
};

export const BaseFont = {
  fontFamily: 'JetBrains Mono',
  fontWeight: 700,
  fontSize: 28,
};

export const WhiteLabel = {
  ...BaseFont,
  fill: Colors.whiteLabel,
};

export const BlackLabel = {
  ...BaseFont,
  fill: Colors.blackLabel,
};
