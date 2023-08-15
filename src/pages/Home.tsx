import { Row } from '@/ui/flex/flex';
import { Margin } from '@/ui/margin/margin';
import { Fonts } from '@/utils/GlobalFonts';
import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

export default function Home() {
  return (
    <Container>
      <Fonts.Heading>리뷰메이트 위젯</Fonts.Heading>
      <Margin margin="40px 0 0 0" />
      <Fonts.body1>바로가기</Fonts.body1>
      <Row>
        <LinkBox>
          <Link to="/review-write">리뷰 작성 위젯</Link>
        </LinkBox>
        <LinkBox>
          <Link to="/review-list">리뷰 목록 위젯</Link>
        </LinkBox>
      </Row>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const LinkBox = styled.div`
  margin: 20px 30px;
`;
