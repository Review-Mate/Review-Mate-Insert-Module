import { keyframes, styled } from 'styled-components';
import loadingIcon from '@/assets/icons/loading.png';
import React from 'react';

function LoadingBar() {
  return (
    <>
      <LoadingIcon src={loadingIcon} />
    </>
  );
}

export default LoadingBar;

const spin = keyframes`
0% {
  transform: rotate(0deg);
}
100% {
  transform: rotate(360deg);
}`;

const LoadingIcon = styled.img`
  width: 30px;
  animation: ${spin} 0.8s linear infinite;
`;
