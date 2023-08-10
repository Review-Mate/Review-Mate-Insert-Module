import { Fonts } from '@/utils/GlobalFonts';
import { colors } from '@/utils/GlobalStyles';
import React from 'react';
import { styled } from 'styled-components';
import { ReactComponent as CheckBlack } from '@/assets/icons/checkBlack.svg';

export default function ReviewSortBar() {
  return (
    <Box>
      <SortTag title={'최신순'} check={true} />
      <Divider />
      <SortTag title={'별점높은순'} check={false} />
      <Divider />
      <SortTag title={'별점낮은순'} check={false} />
      <Divider />
      <SortTag title={'긍정률순'} check={false} />
      <Divider />
      <SortTag title={'부정률순'} check={false} />
    </Box>
  );
}

interface Props {
  title: string;
  check: boolean;
}

const SortTag = ({ title, check }: Props) => {
  return (
    <Tag>
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
