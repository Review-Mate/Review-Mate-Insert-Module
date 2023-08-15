import { Fonts } from '@/utils/GlobalFonts';
import { colors } from '@/utils/GlobalStyles';
import React from 'react';
import { styled } from 'styled-components';
import { ReactComponent as AIBot } from '@/assets/icons/aibot.svg';
import { Row } from '@/ui/flex/flex';

export default function ReviewAssistant() {
  return (
    <Container>
      <AIBox>
        <Fonts.caption weight={500} color={colors.gray01}>
          AI가 맞춤 리뷰 작성을 도와드립니다.
        </Fonts.caption>
      </AIBox>
      <Comment
        title="리뷰 작성"
        content="호텔 이용 중 불편한 점이 있으셨군요!
해당 상황에 대한 호텔의 조치는 어땠나요?"
      />
    </Container>
  );
}

const Comment = ({ title, content }: { title: string; content: string }) => {
  return (
    <CommentBox>
      <Row margin="0 0 6px 0">
        <AIBot style={{ width: 30 }} />
        <Fonts.body3 weight={500} margin="0 0 0 5px">
          {title}
        </Fonts.body3>
      </Row>
      <Fonts.body3 color={colors.gray01} style={{ lineHeight: '150%' }}>
        {content}
      </Fonts.body3>
    </CommentBox>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: ${colors.gray08};
  padding: 20px;
`;

const AIBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  border-radius: 5px;
  background-color: ${colors.gray06};
  margin-bottom: 10px;
`;

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${colors.gray06};
  border-radius: 5px;
  padding: 16px 20px;
  margin-top: 10px;
  background-color: ${colors.white};
`;
