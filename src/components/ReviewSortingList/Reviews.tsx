import { Fonts } from '@/utils/GlobalFonts';
import { colors } from '@/utils/GlobalStyles';
import React from 'react';
import { styled } from 'styled-components';
import { ReactComponent as StarYellow } from '@/assets/icons/starYellow.svg';
import { Row } from '@/ui/flex/flex';
import { url } from 'inspector';

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
          style={{ lineHeight: '150%' }}
        >
          {content}
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
