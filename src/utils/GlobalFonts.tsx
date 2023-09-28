import { styled } from 'styled-components';
import { colors } from './GlobalStyles';

const Heading = styled.h1<FontProps>`
  font-size: 28px;
  margin: ${(props) => props.margin || '0'};
  font-weight: bold;
  color: ${(props) => (props.color ? props.color : colors.black)};
`;

const Title = styled.h2<FontProps>`
  font-size: 24px;
  margin: ${(props) => props.margin || '0'};
  font-weight: bold;
  color: ${(props) => (props.color ? props.color : colors.black)};
`;

const SubTitle = styled.h3<FontProps>`
  font-size: 20px;
  margin: ${(props) => props.margin || '0'};
  font-weight: bold;
  color: ${(props) => (props.color ? props.color : colors.black)};
`;

const body1 = styled.p<FontProps>`
  font-size: 18px;
  margin: ${(props) => props.margin || '0'};
  font-weight: bold;
  color: ${(props) => (props.color ? props.color : colors.black)};
`;

const body2 = styled.p<FontProps>`
  font-size: 16px;
  margin: ${(props) => props.margin || '0'};
  color: ${(props) => (props.color ? props.color : colors.black)};
  font-weight: ${(props) => (props.weight ? props.weight : 'normal')};
`;

const body3 = styled.p<FontProps>`
  font-size: 14px;
  margin: ${(props) => props.margin || '0'};
  color: ${(props) => (props.color ? props.color : colors.black)};
  font-weight: ${(props) => (props.weight ? props.weight : 'normal')};
`;

const caption = styled.p<FontProps>`
  font-size: 13px;
  margin: ${(props) => props.margin || '0'};
  color: ${(props) => (props.color ? props.color : colors.black)};
  font-weight: ${(props) => (props.weight ? props.weight : 'normal')};
`;

const num1 = styled.p<FontProps>`
  font-family: 'GmarketBold';
  font-size: 30px;
  margin: ${(props) => props.margin || '0'};
  color: ${(props) => (props.color ? props.color : colors.black)};
  font-weight: ${(props) => (props.weight ? props.weight : 'normal')};
`;

const num2 = styled.p<FontProps>`
  font-family: 'GmarketBold';
  font-size: 24px;
  margin: ${(props) => props.margin || '0'};
  color: ${(props) => (props.color ? props.color : colors.black)};
  font-weight: ${(props) => (props.weight ? props.weight : 'normal')};
`;

const num3 = styled.p<FontProps>`
  font-family: 'GmarketBold';
  font-size: 20px;
  margin: ${(props) => props.margin || '0'};
  color: ${(props) => (props.color ? props.color : colors.black)};
  font-weight: ${(props) => (props.weight ? props.weight : 'normal')};
`;

const num4 = styled.p<FontProps>`
  font-family: 'GmarketBold';
  font-size: 14px;
  margin: ${(props) => props.margin || '0'};
  color: ${(props) => (props.color ? props.color : colors.black)};
  font-weight: ${(props) => (props.weight ? props.weight : 'normal')};
`;

interface FontProps {
  color?: string;
  margin?: string;
  weight?: number;
}

export const Fonts = {
  Heading,
  Title,
  SubTitle,
  body1,
  body2,
  body3,
  caption,
  num1,
  num2,
  num3,
  num4,
};
