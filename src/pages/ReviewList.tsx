import KeywordStats from '@/components/KeywordStats';
import ReviewSortingList from '@/components/ReviewSortingList';
import ReviewStats from '@/components/ReviewStats';
import ProductIdContext from '@/components/contexts/ProductIdContext';
import { ReviewSort } from '@/config/enum';
import { useProductReviews } from '@/reactQueryHooks/useReviews';
import { Margin } from '@/ui/margin/margin';
import { Fonts } from '@/utils/GlobalFonts';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import LoadingBar from '@/ui/loadingBar/LoadingBar';
import ProductTagContext from '@/components/contexts/ProductTagContext';
import useHeightToParent from '@/hooks/useHeightToParent';
import { useReviewStats } from '@/reactQueryHooks/useStats';

export default function ReviewList() {
  const { componentRef } = useHeightToParent();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  // // 파트너사 도메인
  const partnerDomain = params.get('partner_domain');
  // 파트너가 전달한 상품 아이디
  const partnerProductId = params.get('product_id');

  // 선택된 리뷰 정렬 옵션
  const [selectedOption, setSelectedOption] = useState<ReviewSort>(
    ReviewSort.LATEST
  );
  // 선택된 페이지 번호
  const [selectedPage, setSelectedPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedBigTag, setSelectedBigTag] = useState('');

  // 상품 리뷰 목록 조회
  const {
    data: reviewList,
    isLoading: isLoadingList,
    refetch: reviewListRefetch,
    isError: isErrorList,
  } = partnerProductId && partnerDomain
    ? useProductReviews({
        partnerDomain: partnerDomain,
        travelProductPartnerCustomId: partnerProductId,
        reviewSort: selectedOption,
        reviewPage: selectedPage - 1,
        property: selectedBigTag,
        keyword: selectedTag,
        onSuccess: (data) => {
          setCurrentPage(data.pageable.pageNumber + 1);
        },
      })
    : { data: null, isLoading: true, refetch: undefined, isError: false };

  // 상품 리뷰 통계 조회
  const {
    data: reviewStats,
    isLoading: isLoadingStats,
    isError: isErrorStats,
  } = partnerProductId && partnerDomain
    ? useReviewStats({
        partnerDomain: partnerDomain,
        singleTravelProductPartnerCustomId: partnerProductId,
      })
    : { data: null, isLoading: true, isError: false };

  useEffect(() => {
    if (reviewListRefetch) reviewListRefetch();
  }, [selectedOption, selectedPage, selectedBigTag, selectedTag]);

  if (partnerDomain && partnerProductId)
    return (
      <ProductIdContext.Provider value={{ partnerDomain, partnerProductId }}>
        <ProductTagContext.Provider
          value={{
            selectedTag,
            setSelectedTag,
            selectedBigTag,
            setSelectedBigTag,
          }}
        >
          <Container ref={componentRef}>
            <Title>
              <Fonts.body1>리뷰</Fonts.body1>
            </Title>
            <ReviewStats
              reviewStats={reviewStats}
              isLoading={isLoadingStats}
              isError={isErrorStats}
            />
            <Margin margin={'30px 0 0 0'} />
            <KeywordStats reviewCount={reviewStats?.reviewCount || 0} />
            <Margin margin={'30px 0 0 0'} />
            {isLoadingList && <LoadingBar />}
            {isErrorList && (
              <Fonts.body3>리뷰 목록을 불러오지 못했습니다.</Fonts.body3>
            )}
            {!isLoadingList && reviewList && (
              <ReviewSortingList
                reviewList={reviewList?.content}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                totalPages={reviewList?.totalPages}
                setSelectedPage={setSelectedPage}
                currentPage={currentPage}
              />
            )}
          </Container>
        </ProductTagContext.Provider>
      </ProductIdContext.Provider>
    );

  return <div>상품 아이디가 존재하지 않습니다.</div>;
}

const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  min-width: 600px;
  align-items: center;
  flex-direction: column;
`;
