import { styled } from 'styled-components';

export const Row = styled.div<{ margin?: string }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: ${(props) => props.margin || '0'};
`;
