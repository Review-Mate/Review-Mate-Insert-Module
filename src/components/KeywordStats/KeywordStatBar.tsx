import React from 'react';
import { colors } from '@/utils/GlobalStyles';
import { styled } from 'styled-components';
import { Fonts } from '@/utils/GlobalFonts';

interface Props {
  value: number;
  max: number;
  horizontal?: number;
  reverse?: number;
  color?: string;
}

export default function KeywordStatBar(props: Props) {
  const { value, max, reverse, color } = props;

  return (
    <ProgressBox>
      <HorizonProgress value={value} max={max} reverse={reverse} color={color}>
        <Circle color={color} reverse={reverse}>
          <Fonts.body3 color={colors.white} weight={700}>
            {value}
          </Fonts.body3>
        </Circle>
      </HorizonProgress>
    </ProgressBox>
  );
}

const ProgressBox = styled.div`
  position: relative;
  width: 100%;
  height: 10px;
  border-radius: 10px;
  background-color: ${colors.gray06};
`;

const Circle = styled.div<{ color?: string; reverse?: number }>`
  position: absolute;
  top: -9px;
  left: ${(props) => (props.reverse ? 'auto' : -13)}px;
  right: ${(props) => (props.reverse ? -13 : 'auto')}px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  width: 26px;
  height: 26px;
  background-color: ${(props) => props.color || colors.primary};
`;

const HorizonProgress = styled.div<{
  value: number;
  max: number;
  reverse?: number;
}>`
  position: absolute;
  left: ${(props) => (props.reverse ? 0 : 'auto')};
  right: ${(props) => (props.reverse ? 'auto' : 0)};
  width: ${(props) =>
    props.value ? (props.value / (props.max || 100)) * 100 : 0}%;
  height: 10px;
  border-radius: 10px;
  background-color: ${(props) => props.color || colors.primary};
`;
