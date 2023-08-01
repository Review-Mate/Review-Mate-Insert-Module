import React, { useState } from 'react';
import styled from 'styled-components';
import Rating from './ReviewRating';
import FileInput from '../FileInput';

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
      <Rating rating={rating} setRating={setRating} />
      <Textarea value={text} rows={10} onChange={onChangeInput} />
      <FileInput images={images} setImages={setImages} />
      <button onClick={onClickAdd}>리뷰 작성</button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
`;

const Textarea = styled.textarea`
  width: 40%;
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
  resize: none;
`;
