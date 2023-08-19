import { styled } from 'styled-components';

export const Margin = styled.div<{ margin: string }>`
  margin: ${(props) => props.margin};
`;
