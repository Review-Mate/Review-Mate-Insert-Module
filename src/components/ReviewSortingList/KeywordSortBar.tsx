import { Fonts } from '@/utils/GlobalFonts';
import { colors } from '@/utils/GlobalStyles';
import React, { useState } from 'react';
import { styled } from 'styled-components';
import { ReactComponent as CheckWhite } from '@/assets/icons/checkWhite.svg';
import { ReactComponent as CheckBlack } from '@/assets/icons/checkBlack.svg';

export default function KeywordSortBar() {
  const [selectedBigTag, setSelectedBigTag] = useState(0);
  const [selectedSmallTag, setSelectedSmallTag] = useState(0);

  const BIG_TAGS = [
    { id: 0, label: '청결' },
    { id: 1, label: '서비스' },
  ];

  const SMALL_TAGS = [
    { id: 0, parId: 0, label: '먼지' },
    { id: 1, parId: 0, label: '곰팡이' },
    { id: 2, parId: 0, label: '냄새' },
    { id: 3, parId: 1, label: '서비스1' },
    { id: 4, parId: 1, label: '서비스2' },
  ];

  return (
    <Box>
      <BigBox>
        {BIG_TAGS.map((option) => (
          <React.Fragment key={option.id}>
            <BigTag
              title={option.label}
              check={selectedBigTag === option.id}
              onClick={() => setSelectedBigTag(option.id)}
            />
          </React.Fragment>
        ))}
      </BigBox>
      <SmallBox>
        {SMALL_TAGS.map(
          (option) =>
            selectedBigTag == option.parId && (
              <React.Fragment key={option.id}>
                <SmallTag
                  title={option.label}
                  check={selectedSmallTag === option.id}
                  onClick={() => setSelectedSmallTag(option.id)}
                />
              </React.Fragment>
            )
        )}
      </SmallBox>
    </Box>
  );
}

interface Props {
  title: string;
  check: boolean;
  onClick?: () => void;
}

const BigTag = ({ title, check, onClick }: Props) => {
  return (
    <Tag
      onClick={onClick}
      backgroundcolor={check ? colors.primary : colors.white}
    >
      {check && <CheckWhite style={{ marginBottom: 2 }} />}
      <Fonts.body3
        color={check ? colors.white : colors.primary}
        weight={500}
        margin={check ? '0 0 0 4px' : '0'}
      >
        {title}
      </Fonts.body3>
    </Tag>
  );
};

const SmallTag = ({ title, check, onClick }: Props) => {
  return (
    <Tag onClick={onClick} bordercolor={check ? colors.gray03 : colors.gray06}>
      {check && <CheckBlack style={{ marginBottom: 2 }} />}
      <Fonts.body3
        color={colors.gray01}
        weight={500}
        margin={check ? '0 0 0 4px' : '0'}
      >
        {title}
      </Fonts.body3>
    </Tag>
  );
};

const Tag = styled.button<{ backgroundcolor?: string; bordercolor?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 66px;
  height: 30px;
  border: 1px solid ${(props) => props.bordercolor || colors.primary};
  border-radius: 100px;
  background-color: ${(props) => props.backgroundcolor || colors.white};
  margin: 0 5px 0 0;
  cursor: pointer;
`;

const Box = styled.div`
  width: 100%;
`;

const BigBox = styled.div`
  height: 52px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 13px;
  box-sizing: border-box;
  border-top: 1px solid ${colors.gray03};
  background-color: ${colors.gray08};
`;

const SmallBox = styled.div`
  height: 52px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 13px;
  box-sizing: border-box;
  border-top: 1px solid ${colors.gray06};
`;
