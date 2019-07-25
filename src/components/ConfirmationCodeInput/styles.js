// @flow
import { StyleSheet } from 'react-native';
import {fonts} from '../../../../../utils';
import { concatStyles } from '../../styles';

import type { Props } from './types';
import {theme} from '../../../../../components/GlobalStyles';

export const styles = StyleSheet.create({
  maskInput: {
    // Invisible TextInput on top of all container component
    ...StyleSheet.absoluteFillObject,
    opacity: 0.01,
    // By clicking the cursor was always placed at the end of TextInput
    fontSize: 1,
  },
});

const positionMap = {
  center: 'center',
  left: 'flex-start',
  right: 'flex-end',
  'full-width': 'space-between',
};

export const getContainerStyle = ({ inputPosition, containerProps }: Props) =>
  concatStyles(
    {
      flex: 1,
      flexDirection: 'row',
      justifyContent: positionMap[inputPosition],
    },
    containerProps && containerProps.style,
  );

const getBorderWidthStyle = ({ cellBorderWidth, variant }: Props) => {
  switch (variant) {
    case 'clear':
      return { borderWidth: 0 };
    case 'border-b':
      return {
        borderBottomWidth: cellBorderWidth,
      };
    default:
      return { borderWidth: cellBorderWidth };
  }
};

export const getInputSpaceStyle = ({ inputPosition, space }: Props) => {
  switch (inputPosition) {
    case 'left':
      return {
        marginRight: space,
      };
    case 'center':
      return {
        marginRight: space / 2,
        marginLeft: space / 2,
      };
    case 'right':
      return {
        marginLeft: space,
      };
    default:
      return {
        marginRight: 0,
        marginLeft: 0,
      };
  }
};

type Options = {|
  isActive: boolean,
|};

const clampMin = (minValue: number, value: number): number =>
  Math.max(minValue, value);

const MIN_FONT_SIZE = 14;

export const getCellStyle = (props: Props, { isActive }: Options) => {
  const { size, inactiveColor, activeColor, variant } = props;

  return {
    fontFamily: theme.font.hkGroteskBold,
    fontSize: 30,
    letterSpacing: 0,
    textAlign: 'center',
    color: theme.color.black87,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: isActive ? activeColor : inactiveColor,
    borderRadius: 8,
    width: size,
    height: props.cellSize,

    ...getBorderWidthStyle(props),
    ...getInputSpaceStyle(props),
  };
};
