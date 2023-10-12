import { Fonts } from '@/utils/GlobalFonts';
import { colors } from '@/utils/GlobalStyles';
import React from 'react';
import { styled } from 'styled-components';
import { ReactComponent as CheckBlack } from '@/assets/icons/checkBlack.svg';
import { SORT_OPTIONS } from '@/config/constants';
import { ReviewSort } from '@/config/enum';

interface Props {
  selectedOption: ReviewSort;
  setSelectedOption: React.Dispatch<React.SetStateAction<ReviewSort>>;
}

export default function ReviewSortBar({
  selectedOption,
  setSelectedOption,
}: Props) {
  return (
    <Box>
      {SORT_OPTIONS.map((option) => (
        <SortTag
          key={option.id}
          title={option.title}
          check={selectedOption === option.label}
          onClick={() => setSelectedOption(option.label)}
          divider={option.id < SORT_OPTIONS.length - 1}
        />
      ))}
    </Box>
  );
}

interface SortTagProps {
  title: string;
  check: boolean;
  onClick?: () => void;
  divider?: boolean;
}

const SortTag = ({ title, check, onClick, divider }: SortTagProps) => {
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
