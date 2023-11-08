import { Fonts } from '@/utils/GlobalFonts';
import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { styled } from 'styled-components';
import ReviewRating from './ReviewRating';
import FileInput from './FileInput';
import { colors } from '@/utils/GlobalStyles';
import { useCreateReview } from '@/reactQueryHooks/useReviews';
import { useLocation } from 'react-router-dom';
import useMessageToParent from '@/hooks/useMessageToParent';

interface Props {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  reviewInput: string;
  setReviewInput: React.Dispatch<React.SetStateAction<string>>;
  handleInputChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

interface onChangeInputProps {
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

export default function ReviewEditor({
  title,
  setTitle,
  reviewInput,
  setReviewInput,
  handleInputChange,
}: Props) {
  const location = useLocation();

  // 파트너사 도메인
  const partnerDomain = new URLSearchParams(location.search).get(
    'partner_domain'
  );
  // 파트너가 전달한 예약 아이디
  const reservationId = new URLSearchParams(location.search).get(
    'reservation_id'
  );

  const [rating, setRating] = useState<number>(0);
  const [images, setImages] = useState<File[]>([]);

  const { sendMessageToParent } = useMessageToParent();
  const { mutate: createReviewMutate } = useCreateReview({
    onSuccess: () => {
      window.alert(
        '리뷰가 등록되었습니다. 리뷰 목록에서 등록된 리뷰를 확인해보세요!'
      );
      sendMessageToParent({ message: 'success' });
      setReviewInput('');
      setTitle('');
      setRating(0);
    },
    onError: (err) => {
      window.alert('리뷰 등록에 실패했습니다.');
    },
  });

  const onChangeInput = ({ e, setState }: onChangeInputProps) => {
    setState(e.target.value);
  };

  const validationCheck = () => {
    if (rating === 0) window.alert('별점을 입력해주세요');
    else if (title.length === 0) window.alert('제목을 입력해주세요');
    else if (reviewInput.length === 0) window.alert('내용을 입력해주세요');

    return rating !== 0 && title.length !== 0 && reviewInput.length !== 0;
  };

  const onClickSubmit = async () => {
    if (!reservationId || !partnerDomain) {
      window.alert('예약 아이디가 없습니다.');
      return;
    }
    if (!validationCheck()) return;

    const formData = intoFormData();

    createReviewMutate({
      partnerDomain: partnerDomain,
      reservationPartnerCustomId: reservationId,
      reviewData: formData,
    });
  };

  const intoFormData = () => {
    const formData = new FormData();

    const reviewCreateRequest = { rating, title, content: reviewInput };
    formData.append(
      'reviewCreateRequest',
      new Blob([JSON.stringify(reviewCreateRequest)], {
        type: 'application/json',
      })
    );

    images.forEach((image) => {
      formData.append('reviewImageFiles', image);
    });

    return formData;
  };

  return (
    <Container>
      <Fonts.body1 margin="0 0 15px 0">이번 여행은 만족하셨나요?</Fonts.body1>
      <ReviewRating rating={rating} setRating={setRating} />
      <TitleInput
        placeholder="제목"
        value={title}
        onChange={(e) => {
          onChangeInput({ e, setState: setTitle });
        }}
      />
      <Textarea
        placeholder="내용"
        value={reviewInput}
        rows={10}
        onChange={(e) => handleInputChange(e)}
      />
      <FileInput images={images} setImages={setImages} />
      <Button onClick={onClickSubmit}>
        <Fonts.body2 weight={500} color="white" textalign="center">
          리뷰 작성
        </Fonts.body2>
      </Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1.5;
  margin: 0 auto;
  align-items: center;
  flex-direction: column;
  background-color: ${colors.gray08};
  padding: 40px;
  padding-top: 50px;
`;

const TitleInput = styled.input`
  width: 100%;
  height: 30px;
  border: 1px solid ${colors.gray06};
  border-radius: 10px;
  padding: 20px;
  margin: 50px 0 10px 0;
  resize: none;
  font-size: 16px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 200px;
  border: 1px solid ${colors.gray06};
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  resize: none;
  font-size: 16px;
`;

const Button = styled.button`
  width: 143px;
  height: 50px;
  border-radius: 5px;
  background-color: ${colors.black};
  color: white;
  margin-top: 40px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;
