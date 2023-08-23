import { Fonts } from '@/utils/GlobalFonts';
import React, { useState } from 'react';
import styled from 'styled-components';
import ReviewRating from './ReviewRating';
import FileInput from './FileInput';
import { colors } from '@/utils/GlobalStyles';
import useInputTimeout from '@/hooks/useInputTimeout';
import { CommentType } from '@/types/Comments';

interface Props {
  comments: CommentType[];
  setComments: React.Dispatch<React.SetStateAction<CommentType[]>>;
}

export default function ReviewEditor(props: Props) {
  const { comments, setComments } = props;

  const [text, setText] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [images, setImages] = useState<Array<string>>([]);

  const CommentList = [
    {
      sort: 1,
      contents: [
        '현지 음식을 맛보거나 특별한 요리를 시도한 소감을 나누어 보세요.',
      ],
    },
    {
      sort: 2,
      contents: [
        '조식과 석식을 호텔에서 먹었는데, 맛과 다양성 모두 훌룡했습니다.',
        '조식과 석식을 호텔에서 먹었는데, 식사 퀄리티가 기대에 미치지 않았습니다.',
      ],
    },
  ];

  const onChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const onClickAdd = () => {
    setText('');
    console.log(rating + '점, ' + text);
    console.log(images);
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
