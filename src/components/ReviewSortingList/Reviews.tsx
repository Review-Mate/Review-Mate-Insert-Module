import { Fonts } from '@/utils/GlobalFonts';
import { colors } from '@/utils/GlobalStyles';
import React, { useEffect } from 'react';
import { styled } from 'styled-components';
import { ReactComponent as StarYellow } from '@/assets/icons/starYellow.svg';
import { Row } from '@/ui/flex/flex';
import { ReviewType } from '@/types/RivewType';

export default function Reviews(props: ReviewType) {
  const {
    title,
    rating,
    content,
    createdAt,
    authorName,
    polarity,
    reviewHighlightPairResponses,
  } = props;

  const formatDate =
    createdAt.substring(0, 4) +
    '. ' +
    createdAt.substring(5, 7) +
    '. ' +
    createdAt.substring(8, 10);

  const wordHighlight = (
    content: string,
    indexList: {
      startIndex: number;
      endIndex: number;
    }[]
  ) => {
    if (indexList.length === 0) return content;

    const sentence = [];
    let lastIndex = 0;
    indexList.forEach((index) => {
      sentence.push(content.slice(lastIndex, index.startIndex));
      sentence.push(
        <Highlight>{content.slice(index.startIndex, index.endIndex)}</Highlight>
      );
      lastIndex = index.endIndex;
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
            {rating}
          </Fonts.body3>
        </Row>
        <Fonts.caption
          color={colors.gray01}
          margin="0 0 20px 0"
          style={{ lineHeight: 1.5 }}
        >
          {wordHighlight(content, reviewHighlightPairResponses)}
        </Fonts.caption>
        <Fonts.body3 weight={500} margin="0 0 5px 0">
          {authorName}
        </Fonts.body3>
        <Fonts.caption color={colors.gray01}>{formatDate}</Fonts.caption>
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
