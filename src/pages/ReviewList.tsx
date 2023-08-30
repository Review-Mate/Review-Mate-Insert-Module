import KeywordStats from '@/components/KeywordStats';
import ReviewSortingList from '@/components/ReviewSortingList';
import ReviewStats from '@/components/ReviewStats';
import { Margin } from '@/ui/margin/margin';
import React, { useEffect } from 'react';
import { styled } from 'styled-components';

export default function ReviewList() {
  const componentRef = React.useRef<HTMLDivElement>(null);

  const [heightChange, setHeightChange] = React.useState(false);

  const [rating, setRating] = React.useState(5.0);

  // 5,4,3,2,1점
  const [scoreList, setScoreList] = React.useState([80, 60, 40, 20, 30]);

  const [reviewList, setReviewList] = React.useState([
    {
      id: 1,
      title: '직원들이 친절함',
      score: 5.0,
      content:
        '룸 서비스와 함께 온 머스터드 병 입구에 곰팡이가 있었음. 다행히 섭취하지 않아 문제는 없지만 그래도 식자재 보관에 대한 염려가 있음. 투숙 중 특이한 것이라면 입차 직원, 엑스트라 베드를 가져다주던 직원, 전화를 받던 직원, 룸서비스를 가져다준 직원, 예기치 못한 상황에 룸을 방문했던 직원, 야간 당직 지배인 모두가 친절하며 자기가 맡은 업무적 위치에서 최선을 다하는 것이 느껴졌음. 이 부분에서는 날고 가는 5성급 이상의 다른 숙소들보다 우수하다 평가하고 싶음.',
      date: '2021. 07. 07',
      userId: '작성자 아이디',
      image: '',
    },
    {
      id: 2,
      title: '직원들이 친절함',
      score: 5.0,
      content:
        '룸 서비스와 함께 온 머스터드 병 입구에 곰팡이가 있었음. 다행히 섭취하지 않아 문제는 없지만 그래도 식자재 보관에 대한 염려가 있음. 투숙 중 특이한 것이라면 입차 직원, 엑스트라 베드를 가져다주던 직원, 전화를 받던 직원, 룸서비스를 가져다준 직원, 예기치 못한 상황에 룸을 방문했던 직원, 야간 당직 지배인 모두가 친절하며 자기가 맡은 업무적 위치에서 최선을 다하는 것이 느껴졌음. 이 부분에서는 날고 가는 5성급 이상의 다른 숙소들보다 우수하다 평가하고 싶음.',
      date: '2021. 07. 07',
      userId: '작성자 아이디',
      image: '',
    },
    {
      id: 3,
      title: '직원들이 친절함',
      score: 5.0,
      content:
        '룸 서비스와 함께 온 머스터드 병 입구에 곰팡이가 있었음. 다행히 섭취하지 않아 문제는 없지만 그래도 식자재 보관에 대한 염려가 있음. 투숙 중 특이한 것이라면 입차 직원, 엑스트라 베드를 가져다주던 직원, 전화를 받던 직원, 룸서비스를 가져다준 직원, 예기치 못한 상황에 룸을 방문했던 직원, 야간 당직 지배인 모두가 친절하며 자기가 맡은 업무적 위치에서 최선을 다하는 것이 느껴졌음. 이 부분에서는 날고 가는 5성급 이상의 다른 숙소들보다 우수하다 평가하고 싶음.',
      date: '2021. 07. 07',
      userId: '작성자 아이디',
      image: '',
    },
    {
      id: 4,
      title: '직원들이 친절함',
      score: 5.0,
      content:
        '룸 서비스와 함께 온 머스터드 병 입구에 곰팡이가 있었음. 다행히 섭취하지 않아 문제는 없지만 그래도 식자재 보관에 대한 염려가 있음. 투숙 중 특이한 것이라면 입차 직원, 엑스트라 베드를 가져다주던 직원, 전화를 받던 직원, 룸서비스를 가져다준 직원, 예기치 못한 상황에 룸을 방문했던 직원, 야간 당직 지배인 모두가 친절하며 자기가 맡은 업무적 위치에서 최선을 다하는 것이 느껴졌음. 이 부분에서는 날고 가는 5성급 이상의 다른 숙소들보다 우수하다 평가하고 싶음.',
      date: '2021. 07. 07',
      userId: '작성자 아이디',
      image: '',
    },
  ]);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (!e.data.type) return;
      if (e.data.type === 'loaded') sendHeightToParent();
      console.log('부모로 부터 온 메세지:', e.data);
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const sendHeightToParent = () => {
    if (!componentRef.current) return;
    const message = componentRef.current?.offsetHeight + 30;
    window.parent.postMessage({ type: 'height', message: message }, '*');
  };

  useEffect(() => {
    sendHeightToParent();
  }, [heightChange]);

  return (
    <Container ref={componentRef}>
      <ReviewStats rating={rating} scoreList={scoreList} />
      <Margin margin={'30px 0 0 0'} />
      <KeywordStats setHeightChange={setHeightChange} />
      <Margin margin={'30px 0 0 0'} />
      <ReviewSortingList reviewList={reviewList} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 90%;
  margin: 0 auto;
  min-width: 600px;
  align-items: center;
  flex-direction: column;
  padding-top: 30px;
`;
