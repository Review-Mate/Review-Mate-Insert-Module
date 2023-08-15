import { Fonts } from '@/utils/GlobalFonts';
import React, { useState } from 'react';
import styled from 'styled-components';
import ReviewRating from './ReviewRating';
import FileInput from './FileInput';
import { colors } from '@/utils/GlobalStyles';

export default function ReviewEditor() {
  const [text, setText] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [images, setImages] = useState<Array<string>>([]);

  const onChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const onClickAdd = () => {
    setText('');
    console.log(rating + '점, ' + text);
    console.log(images);
  };

  return (
    <Container>
      <Fonts.body1 margin="0 0 15px 0">이번 여행은 만족하셨나요?</Fonts.body1>
      <ReviewRating rating={rating} setRating={setRating} />
      <Textarea value={text} rows={10} onChange={onChangeInput} />
      <FileInput images={images} setImages={setImages} />
      <Button onClick={onClickAdd}>
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

const Textarea = styled.textarea`
  width: 100%;
  height: 200px;
  border: 1px solid ${colors.gray06};
  border-radius: 10px;
  padding: 20px;
  margin: 50px 0 20px 0;
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
