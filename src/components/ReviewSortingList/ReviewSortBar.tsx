import { Fonts } from '@/utils/GlobalFonts';
import { colors } from '@/utils/GlobalStyles';
import React, { useState } from 'react';
import { styled } from 'styled-components';
import { ReactComponent as CheckBlack } from '@/assets/icons/checkBlack.svg';

export default function ReviewSortBar() {
  const [selectedOption, setSelectedOption] = useState(0);
  const SORT_OPTIONS = [
    { id: 0, label: '최신순', isSelected: true },
    { id: 1, label: '별점높은순', isSelected: false },
    { id: 2, label: '별점낮은순', isSelected: false },
    { id: 3, label: '긍정률순', isSelected: false },
    { id: 4, label: '부정률순', isSelected: false },
  ];

  return (
    <Box>
      {SORT_OPTIONS.map((option) => (
        <React.Fragment key={option.id}>
          <SortTag
            title={option.label}
            check={selectedOption === option.id}
            onClick={() => setSelectedOption(option.id)}
          />
          {option.id < SORT_OPTIONS.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </Box>
  );
}

interface Props {
  title: string;
  check: boolean;
  onClick?: () => void;
}

const SortTag = ({ title, check, onClick }: Props) => {
  return (
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
