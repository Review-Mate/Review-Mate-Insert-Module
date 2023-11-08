import React from 'react';
import { Margin } from '@/ui/margin/margin';
import styled, { keyframes } from 'styled-components';
import Dot from '@/assets/icons/dot.svg';

export const ThreeDotsLoadingBar = () => {
  return (
    <React.Fragment>
      <DotIcon alt="." src={Dot} delay={0} />
      <Margin margin="0 2px 0 0" />
      <DotIcon alt="." src={Dot} delay={0.2} />
      <Margin margin="0 2px 0 0" />
      <DotIcon alt="." src={Dot} delay={0.4} />
      <Margin margin="0 6px 0 0" />
    </React.Fragment>
  );
};

const dotJump = keyframes`
  0% {
    margin-bottom: 0px;
  }
  100% {
    margin-bottom: 5px;
  }
`;

const DotIcon = styled.img<{ delay: number }>`
  width: 4px;
  animation-name: ${dotJump};
  animation-duration: 0.7s;
  animation-delay: ${(props) => props.delay}s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-direction: alternate;
`;
