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

  return (
    <Box>
      <BigBox>
        {tagsData &&
          Object.keys(tagsData)?.map((tagName, index) => {
            const tag = reviewTagMatch[tagName];
            if (tag === undefined) return;
            return (
              <BigTag
                key={index}
                title={tag}
                check={selectedBigTag === tagName}
                onClick={() => {
                  setSelectedTag('');
                  if (selectedBigTag === tagName) {
                    setSelectedBigTag('');
                    setSelectedTag('');
                    return;
                  }
                  setSelectedBigTag(tagName);
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
                  if (selectedTag === smallTag) {
                    setSelectedTag('');
                    return;
                  }
                  setSelectedPage(1);
                  setSelectedTag(smallTag);
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
  margin: 0 5px 0 0;
  padding: 0 10px 0 10px;
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
  height: 60px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-left: 13px;
  box-sizing: border-box;
  border-top: 1px solid ${colors.gray06};
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
