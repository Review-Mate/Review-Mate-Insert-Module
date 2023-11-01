interface ReviewTagMatch {
  [key: string]: string;
}

export const reviewTagMatch: ReviewTagMatch = {
  KINDNESS: '친절도',
  ROOM: '방/객실/청결도',
  RESTROOM: '화장실',
  LOCATION: '위치',
  SIGHT: '풍경',
  PRICE: '가격',
  PARKING: '주차',
  RESERVATION: '예약',
  FOOD: '음식',
  EXTERNAL_FACILITIES: '외부시설',
  INTERNAL_FACILITIES: '내부시설',
  PETS: '애완동물',
  NULL: '기타',
};
