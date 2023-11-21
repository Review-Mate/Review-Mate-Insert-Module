import React from 'react';
import star01 from '@/assets/icons/star01.svg';
import star02 from '@/assets/icons/star02.svg';
import star03 from '@/assets/icons/star03.svg';
import star04 from '@/assets/icons/star04.svg';
import star05 from '@/assets/icons/star05.svg';
import star06 from '@/assets/icons/star06.svg';
import star07 from '@/assets/icons/star07.svg';
import star08 from '@/assets/icons/star08.svg';
import star09 from '@/assets/icons/star09.svg';
import starGreen from '@/assets/icons/starGreen.svg';
import starEmpty from '@/assets/icons/starEmpty.svg';

interface Props {
  rating: number;
}

export default function RatingStatBox({ rating }: Props) {
  const stars = [1, 2, 3, 4, 5];

  const starIcons = [
    starEmpty,
    star01,
    star02,
    star03,
    star04,
    star05,
    star06,
    star07,
    star08,
    star09,
  ];

  return (
    <div>
      {stars.map((star, index) => {
        return (
          <img
            key={index}
            src={
              star <= rating
                ? starGreen
                : star > rating + 1
                ? starEmpty
                : starIcons[Math.round((rating * 10) % 10)]
            }
            width={20}
            alt="별점"
          />
        );
      })}
    </div>
  );
}
