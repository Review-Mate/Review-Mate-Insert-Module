import { Fonts } from '@/utils/GlobalFonts';
import { colors } from '@/utils/GlobalStyles';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { ReactComponent as CheckWhite } from '@/assets/icons/checkWhite.svg';
import { ReactComponent as CheckBlack } from '@/assets/icons/checkBlack.svg';
import { useTags } from '@/hooks/useTags';
import ProductIdContext from '../contexts/ProductIdContext';
import ProductTagContext from '../contexts/ProductTagContext';

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
          Object.keys(tagsData)?.map((tagName, index) => (
            <React.Fragment key={index}>
              <BigTag
                title={tagName}
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
            </React.Fragment>
          ))}
      </BigBox>
      <SmallBox>
        {tagsData &&
          tagsData[selectedBigTag]?.map((smallTag, index) => (
            <React.Fragment key={index}>
              <SmallTag
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
            </React.Fragment>
          ))}
      </SmallBox>
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
      >
        {title}
      </Fonts.body3>
    </Tag>
  );
};

const SmallTag = ({ title, check, onClick }: TagProps) => {
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
