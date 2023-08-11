import { Fonts } from '@/utils/GlobalFonts';
import { colors } from '@/utils/GlobalStyles';
import React, { useState } from 'react';
import { styled } from 'styled-components';
import { ReactComponent as CheckBlack } from '@/assets/icons/checkBlack.svg';

export default function ReviewSortBar() {
  const [selectedOption, setSelectedOption] = useState(0);
  const SORT_OPTIONS = [
    { id: 0, label: '최신순' },
    { id: 1, label: '별점높은순' },
    { id: 2, label: '별점낮은순' },
    { id: 3, label: '긍정률순' },
    { id: 4, label: '부정률순' },
  ];

  return (
    <Box>
      {SORT_OPTIONS.map((option) => (
        <SortTag
          key={option.id}
          title={option.label}
          check={selectedOption === option.id}
          onClick={() => setSelectedOption(option.id)}
          divider={option.id < SORT_OPTIONS.length - 1}
        />
      ))}
    </Box>
  );
}

interface Props {
  title: string;
  check: boolean;
  onClick?: () => void;
  divider?: boolean;
}

const SortTag = ({ title, check, onClick, divider }: Props) => {
  return (
    <>
      <Tag onClick={onClick}>
        {check && <CheckBlack />}
        <Fonts.caption
          color={check ? colors.black : colors.gray01}
          weight={check ? 500 : 400}
          margin={check ? '0 0 0 4px' : '0'}
        >
          {title}
        </Fonts.caption>
      </Tag>
      {divider && <Divider />}
    </>
  );
};

const Tag = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Box = styled.div`
  height: 52px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-left: 13px;
  box-sizing: border-box;
`;

const Divider = styled.div`
  width: 1px;
  height: 11px;
  background-color: ${colors.gray03};
  margin: 0 10px;
`;
