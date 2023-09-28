import { Fonts } from '@/utils/GlobalFonts';
import React, { useState } from 'react';
import styled from 'styled-components';
import ReviewRating from './ReviewRating';
import FileInput from './FileInput';
import { colors } from '@/utils/GlobalStyles';
import useInputTimeout from '@/hooks/useInputTimeout';
import { ReviewWriteStateType } from '@/types/Comments';
import { CommentList } from '@/data/commentData';
import { useCreateReview } from '@/hooks/useReviews';
import { PARTNER_DOMAIN } from '@/config/api';
import { makeReservation } from '@/temp/makeReservation';

interface Props extends ReviewWriteStateType {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

interface onChangeInputProps {
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

export default function ReviewEditor(props: Props) {
  const { comments, setComments, title, setTitle, content, setContent } = props;
  const [rating, setRating] = useState<number>(0);
  const [images, setImages] = useState<File[]>([]);

  const { mutate: createReviewMutate } = useCreateReview();

  const onChangeInput = ({ e, setState }: onChangeInputProps) => {
    setState(e.target.value);
  };

  const onClickSubmit = async () => {
    if (rating === 0) window.alert('별점을 입력해주세요');
    setContent('');
    setTitle('');

    const date = new Date();
    const formData = intoFormData();
    const reservationId = `${PARTNER_DOMAIN}-${date.getTime().toString()}`;

    await makeReservation(reservationId);

    createReviewMutate({
      partnerDomain: PARTNER_DOMAIN,
      reservationPartnerCustomId: reservationId,
      reviewData: formData,
    });
  };

  const intoFormData = () => {
    const formData = new FormData();

    const reviewCreateRequest = { rating, title, content };
    formData.append(
      'reviewCreateRequest',
      new Blob([JSON.stringify(reviewCreateRequest)], {
        type: 'application/json',
      })
    );

    images.forEach((image, index) => {
      console.log(image);
      formData.append('reviewImageFiles', image);
    });

    return formData;
  };

  const [count, setCount] = useState(0);
  // 1초간 입력이 없을 경우 실행
  useInputTimeout(2000, () => {
    console.log('timeout');
    setComments([...comments, CommentList[count]]);
    setCount(1);
  });

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
        value={content}
        rows={10}
        onChange={(e) => {
          onChangeInput({ e, setState: setContent });
        }}
      />
      <FileInput images={images} setImages={setImages} />
      <Button onClick={onClickSubmit}>
        <Fonts.body2 weight={500} color="white">
          리뷰 작성
        </Fonts.body2>
      </Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 2;
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
