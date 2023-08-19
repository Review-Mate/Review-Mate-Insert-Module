import { Margin } from '@/ui/margin/margin';
import { Fonts } from '@/utils/GlobalFonts';
import React from 'react';
import { styled } from 'styled-components';
import StatBar from './StatBar';

interface Props {
  scoreList: number[];
}

export default function StatBars(props: Props) {
  const { scoreList } = props;

  return (
    <ProgressBox>
      {scoreList.map((score: number, index: number) => (
        <div key={index}>
          <ProgressGroup>
            <StatBar value={score} max={100} />
            <Margin margin={'5px 0 0 0'} />
            <Fonts.caption>{5 - index}점</Fonts.caption>
          </ProgressGroup>
        </div>
      ))}
    </ProgressBox>
  );
}

const ProgressBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ProgressGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
`;
