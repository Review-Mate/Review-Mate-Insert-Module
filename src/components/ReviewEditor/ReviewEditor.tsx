import React, { useState } from 'react';
import styled from 'styled-components';
import Rating from './ReviewRating';
import FileInput from '../FileInput';
import Fonts from '../../utils/GlobalFonts';
import { colors } from '../../utils/GlobalStyles';

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
      <Fonts size={18} weight="bold" margin="0 0 15px 0">
        이번 여행은 만족하셨나요?
      </Fonts>
      <Rating rating={rating} setRating={setRating} />
      <Textarea value={text} rows={10} onChange={onChangeInput} />
      <FileInput images={images} setImages={setImages} />
      <Button onClick={onClickAdd}>
        <Fonts weight="medium" color="white">
          리뷰 작성
        </Fonts>
      </Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 40%;
  align-items: center;
  flex-direction: column;
  background-color: ${colors.background};
  padding: 40px;
  padding-top: 50px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 200px;
  border: 1px solid ${colors.gray200};
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
