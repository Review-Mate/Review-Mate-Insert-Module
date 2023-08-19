import React, { useState } from 'react';
import starYellow from '@/assets/icons/starYellow.svg';
import starEmpty from '@/assets/icons/starEmpty.svg';
import { keyframes, styled } from 'styled-components';

interface Props {
  rating: number;
  setRating: (rating: number) => void;
}

export default function ReviewRating(props: Props) {
  const [stars, setStars] = useState([1, 2, 3, 4, 5]);
  const [hover, setHover] = useState(0);

  const { rating, setRating } = props;

  return (
    <div>
      {stars.map((star, index) => (
        <StarIcon
          key={index}
          role="presentation"
          src={star <= (hover || rating) ? starYellow : starEmpty}
          width={40}
          alt="별점"
          onClick={() => setRating(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          animation={star == rating}
        />
      ))}
    </div>
  );
}

const starGrow = keyframes`
  0% {
    width: 40px;
  }
  50% {
    width: 48px;
    margin: -4px;
  }
  100% {
    width: 40px;
  }
`;

const StarIcon = styled.img<{ animation: boolean }>`
  animation-name: ${(props) => (props.animation ? starGrow : false)};
  animation-duration: 0.3s;
  animation-fill-mode: forwards;
  // 드래그 방지
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`;
