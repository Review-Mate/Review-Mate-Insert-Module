import { Fonts } from '@/utils/GlobalFonts';
import { colors } from '@/utils/GlobalStyles';
import React from 'react';
import { styled } from 'styled-components';
import KeywordStatBar from './KeywordStatBar';

interface Props {
  title: string;
  positive: number;
  negative: number;
}

export default function KeywordStatList(props: Props) {
  const { title, positive, negative } = props;

  return (
    <Box>
      <Bar>
        <KeywordStatBar value={positive} max={100} />
      </Bar>
      <Title>
        <Fonts.body3>{title}</Fonts.body3>
      </Title>
      <Bar>
        <KeywordStatBar
          value={negative}
          max={100}
          reverse={1}
          color={colors.red}
        />
      </Bar>
    </Box>
  );
}

const Box = styled.div`
  height: 50px;
  display: grid;
  grid-template-columns: 13fr 1fr 13fr;
  align-items: center;
  justify-content: center;
  padding: 0 4%;
  border: 1px solid ${colors.gray06};
  border-radius: 10px;
  background-color: #ffffff;
`;

const Bar = styled.div`
  margin: 0 2%;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 63px;
  height: 34px;
  border-radius: 100px;
  background-color: ${colors.gray06};
`;
