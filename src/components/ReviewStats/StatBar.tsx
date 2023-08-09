import React from 'react';
import { colors } from '@/utils/GlobalStyles';
import { styled } from 'styled-components';

interface Props {
  value: number;
  max: number;
}

export default function StatBar(props: Props) {
  const { value, max } = props;

  return (
    <div>
      <ProgressBox>
        <Progress value={value} max={max} />
      </ProgressBox>
    </div>
  );
}

const ProgressBox = styled.div`
  position: relative;
  width: 8px;
  height: 100px;
  border-radius: 10px;
  background-color: ${colors.gray06};
`;

const Progress = styled.div<{ value?: number; max?: number }>`
  position: absolute;
  bottom: 0;
  width: 8px;
  height: ${(props) =>
    props.value ? (props.value / (props.max || 100)) * 100 : 0}%;
  border-radius: 10px;
  background-color: ${colors.primary};
`;
