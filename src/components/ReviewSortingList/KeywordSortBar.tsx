import { Fonts } from '@/utils/GlobalFonts';
import { colors } from '@/utils/GlobalStyles';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { ReactComponent as CheckWhite } from '@/assets/icons/checkWhite.svg';
import { ReactComponent as CheckBlack } from '@/assets/icons/checkBlack.svg';
import { useTags } from '@/reactQueryHooks/useTags';
import ProductIdContext from '../contexts/ProductIdContext';
import ProductTagContext from '../contexts/ProductTagContext';
import { reviewTagMatch } from '@/utils/tagMatch';
import { useQueryClient } from 'react-query';

interface Props {
  setSelectedPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function KeywordSortBar({ setSelectedPage }: Props) {
  const { selectedTag, setSelectedTag, selectedBigTag, setSelectedBigTag } =
    useContext(ProductTagContext);

  const { partnerDomain, partnerProductId } = useContext(ProductIdContext);
  const {
    data: tagsData,
    isLoading,
    isError,
  } = useTags({
    partnerDomain: partnerDomain,
    singleTravelProductPartnerCustomId: partnerProductId,
  });

  if (isLoading || isError) return <></>;

  const onBigTagClick = (bigTag: string) => {
    setSelectedTag('');
    if (selectedBigTag === bigTag) {
      setSelectedBigTag('');
      setSelectedTag('');
      return;
    }
    setSelectedBigTag(bigTag);
  };

  const onSmallTagClick = (smallTag: string) => {
    if (selectedTag === smallTag) {
      setSelectedTag('');
      return;
    }
    setSelectedPage(1);
    setSelectedTag(smallTag);
  };

  return (
    <Box>
      <BigBox>
        {tagsData &&
          Object.keys(tagsData)?.map((bigTag, index) => {
            const tag = reviewTagMatch[bigTag];
            if (tag === undefined) return;
            return (
              <BigTag
                key={index}
                title={tag}
                check={selectedBigTag === bigTag}
                onClick={() => {
                  onBigTagClick(bigTag);
                }}
              />
            );
          })}
      </BigBox>
      {selectedBigTag != '' && (
        <SmallBox>
          {tagsData &&
            tagsData[selectedBigTag]?.map((smallTag, index) => (
              <SmallTag
                key={index}
                title={smallTag}
                check={selectedTag === smallTag}
                onClick={() => {
                  onSmallTagClick(smallTag);
                }}
              />
            ))}
        </SmallBox>
      )}
    </Box>
  );
}

interface TagProps {
  title: string;
  check: boolean;
  onClick?: () => void;
}

const BigTag = ({ title, check, onClick }: TagProps) => {
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
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {title}
      </Fonts.body3>
    </Tag>
  );
};

const SmallTag = ({ title, check, onClick }: TagProps) => {
  return (
    <Tag onClick={onClick} bordercolor={check ? colors.gray01 : colors.gray05}>
      {check && <CheckBlack style={{ marginBottom: 2 }} />}
      <Fonts.body3
        color={colors.gray01}
        weight={500}
        margin={check ? '0 0 0 4px' : '0'}
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {title}
      </Fonts.body3>
    </Tag>
  );
};

const Tag = styled.button<{ backgroundcolor?: string; bordercolor?: string }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 'auto';
  max-width: 150px;
  height: 30px;
  border: 1px solid ${(props) => props.bordercolor || colors.primary};
  border-radius: 100px;
  background-color: ${(props) => props.backgroundcolor || colors.white};
  margin: 2px 5px 2px 0;
  padding: 0 10px 0 10px;
  cursor: pointer;
`;

const Box = styled.div`
  width: 100%;
`;

const BigBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 0 10px 13px;
  box-sizing: border-box;
  border-top: 1px solid ${colors.gray03};
  background-color: ${colors.gray08};
  overflow-x: auto;

  // chrome, safari, opera, Edge
  &::-webkit-scrollbar {
    height: 9px;
  }
  &::-webkit-scrollbar-thumb {
    width: 3%;
    background: ${colors.gray04};
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: ${colors.gray08};
  }

  // Firefox
  scrollbar-color: ${colors.gray04} ${colors.gray08};
  scrollbar-width: thin;
`;

const SmallBox = styled.div`
  width: 100%;
  max-height: 115px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 0 10px 13px;
  box-sizing: border-box;
  border-top: 1px solid ${colors.gray06};
  overflow-y: auto;

  // chrome, safari, opera, Edge
  &::-webkit-scrollbar {
    width: 9px;
  }
  &::-webkit-scrollbar-thumb {
    height: 30%;
    background: ${colors.gray04};
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: ${colors.gray08};
  }

  // Firefox
  scrollbar-color: ${colors.gray04} ${colors.gray08};
  scrollbar-width: thin;
`;
