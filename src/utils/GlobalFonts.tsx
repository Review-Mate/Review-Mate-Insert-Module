import React from 'react';
import styled from 'styled-components';

interface FontProps {
  size?: number;
  weight?: number | string;
  color?: string;
  margin?: string;
  children: React.ReactNode;
}

const FontWrapper = styled.span<FontProps>`
  font-size: ${(props) => props.size}px;
  font-weight: ${(props) => props.weight};
  color: ${(props) => props.color || 'black'};
  margin: ${(props) => props.margin || '0'};
`;

const Fonts = ({
  size = 16,
  weight = 'regular',
  color = 'black',
  margin = '0',
  children,
}: FontProps) => (
  <FontWrapper size={size} weight={weight} color={color} margin={margin}>
    {children}
  </FontWrapper>
);

export default Fonts;
