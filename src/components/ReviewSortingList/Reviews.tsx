import { Fonts } from '@/utils/GlobalFonts';
import { colors } from '@/utils/GlobalStyles';
import React, { useEffect } from 'react';
import { styled } from 'styled-components';
import { ReactComponent as StarYellow } from '@/assets/icons/starYellow.svg';
import { Row } from '@/ui/flex/flex';

interface Props {
  id: number;
  title: string;
  score: number;
  content: string;
  date: string;
  userId: string;
  image: string;
}

export default function Reviews(props: Props) {
  const { title, score, content, date, userId, image } = props;
  const HighLightIndexList = [
    [23, 26], // 23번째부터 25번째까지 글자를 하이라이팅
  ];

  const wordHighlight = (content: string, indexList: number[][]) => {
    const sentence = [];
    let lastIndex = 0;
    indexList.forEach((index) => {
      sentence.push(content.slice(lastIndex, index[0]));
      sentence.push(<Highlight>{content.slice(index[0], index[1])}</Highlight>);
      lastIndex = index[1];
    });

    sentence.push(content.slice(lastIndex));

    return sentence;
  };

  return (
    <Container>
      <TextBox>
        <Fonts.body2 weight={700}>{title}</Fonts.body2>
        <Row margin="5px 0 8px 0" style={{ height: 20 }}>
          <StarYellow />
          <Fonts.body3 weight={700} margin="3px 0 0 5px">
            {score}
          </Fonts.body3>
        </Row>
        <Fonts.caption
          color={colors.gray01}
          margin="0 0 20px 0"
          style={{ lineHeight: 1.5 }}
        >
          {wordHighlight(content, HighLightIndexList)}
        </Fonts.caption>
        <Fonts.body3 weight={500} margin="0 0 5px 0">
          {userId}
        </Fonts.body3>
        <Fonts.caption color={colors.gray01}>{date}</Fonts.caption>
      </TextBox>
      <Image src="https://cdn.pixabay.com/photo/2016/03/04/19/36/beach-1236581_1280.jpg" />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 30px 0;
  border-top: 1px solid ${colors.gray06};
`;

const Highlight = styled.span`
  background-color: rgba(67, 151, 170, 0.2);
  border-radius: 5px;
  color: ${colors.primary};
  padding: 2px 3px;
`;

const TextBox = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-right: 40px;
`;

const Image = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 10px;
`;
