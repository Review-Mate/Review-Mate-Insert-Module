import { Margin } from '@/ui/margin/margin';
import { Fonts } from '@/utils/GlobalFonts';
import { colors } from '@/utils/GlobalStyles';
import React, { useContext, useMemo, useState } from 'react';
import { styled } from 'styled-components';
import { ReactComponent as AIBot } from '@/assets/icons/aibot.svg';
import KeywordStatList from './KeywordStatList';
import { ReactComponent as Down } from '@/assets/icons/down.svg';
import { ReactComponent as Up } from '@/assets/icons/up.svg';
import { useTagStats } from '@/hooks/useStats';
import ProductIdContext from '../contexts/ProductIdContext';
import { reviewTagMatch } from '@/utils/tagMatch';

interface Props {
  reviewCount: number;
}

export default function KeywordStats({ reviewCount }: Props) {
  const { partnerDomain, partnerProductId } = useContext(ProductIdContext);
  const {
    data: KeywordList,
    isLoading,
    isError,
  } = useTagStats({
    partnerDomain: partnerDomain,
    singleTravelProductPartnerCustomId: partnerProductId,
  });

  const getMaxPropertyCount = () => {
    let mx = 0;
    KeywordList?.forEach((keyword) => {
      mx = Math.max(mx, keyword.positiveCount, keyword.negativeCount);
    });

    return mx;
  };

  const maxCount = useMemo(() => getMaxPropertyCount(), [KeywordList]);

  const TAG_NUMBER_LIMIT = 4;

  const [hide, setHide] = useState(true);

  return (
    <Container>
      <Fonts.body1>주요 키워드</Fonts.body1>
      <Margin margin={'6px 0 0 0'} />
      <Fonts.caption color={colors.primary} weight={500}>
        총 {reviewCount}개의 리뷰 중에서 자주 언급된 키워드를 선별했어요!
      </Fonts.caption>
      <Margin margin={'20px 0 0 0'} />
      <AIBox>
        <AIIcon>
          <AIBot />
        </AIIcon>
        <Fonts.caption color={colors.gray01}>
          AI가 리뷰를 분석 중이에요...
        </Fonts.caption>
      </AIBox>

      <StatTitle>
        <Fonts.caption
          weight={700}
          style={{ textAlign: 'right' }}
          color={colors.primary}
          margin="0 4% 0 0"
        >
          긍정
        </Fonts.caption>
        <EmptyTitle />
        <Fonts.caption weight={700} color={colors.red} margin="0 0 0 4%">
          부정
        </Fonts.caption>
      </StatTitle>
      {KeywordList?.map((keyword, index) => {
        const tag = reviewTagMatch[keyword.reviewProperty];
        if (tag === undefined || index >= TAG_NUMBER_LIMIT) return;
        return (
          <div key={index}>
            <Margin margin={'10px 0 0 0'} />
            <KeywordStatList
              title={tag}
              positive={keyword.positiveCount}
              negative={keyword.negativeCount}
              max={maxCount}
            />
          </div>
        );
      })}
      {!hide &&
        KeywordList?.map((keyword, index) => {
          if (index >= TAG_NUMBER_LIMIT)
            return (
              <div key={index}>
                <Margin margin={'10px 0 0 0'} />
                <KeywordStatList
                  title={keyword.reviewProperty}
                  positive={keyword.positiveCount}
                  negative={keyword.negativeCount}
                  max={maxCount}
                />
              </div>
            );
        })}
      <DownIcon>
        {KeywordList && KeywordList?.length > TAG_NUMBER_LIMIT && (
          <button
            onClick={() => {
              setHide(!hide);
            }}
          >
            {hide ? <Down /> : <Up />}
          </button>
        )}
      </DownIcon>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 600px;
  padding: 30px;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: ${colors.gray08};
`;

const AIBox = styled.div`
  position: relative;
  display: flex;
  height: 30px;
  align-items: center;
  padding-left: 55px;
  margin-bottom: 19px;
  border-radius: 5px;
  background-color: ${colors.gray06};
`;

const AIIcon = styled.div`
  position: absolute;
  top: -13px;
  left: 15px;
`;

const StatTitle = styled.div`
  display: grid;
  grid-template-columns: 13fr 1fr 13fr;
  align-items: center;
  justify-content: center;
  padding: 0 4%;
`;

const EmptyTitle = styled.div`
  width: 63px;
`;

const DownIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
`;
