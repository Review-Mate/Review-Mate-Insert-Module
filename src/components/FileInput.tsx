import React from 'react';
import styled from 'styled-components';
import close from '../assets/icons/close.png';

interface Props {
  images: Array<string>;
  setImages: (images: Array<string>) => void;
}

export default function FileInput(props: Props) {
  const { images, setImages } = props;

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 10) {
      alert('10개 이하의 이미지만 업로드 가능합니다.');
      return;
    }

    const nowImages = [...images];

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const imageUrl = URL.createObjectURL(files[i]);
        nowImages.push(imageUrl);
      }
      setImages(nowImages);
    }
  };

  const onClickDelete = (image: string) => {
    const newImages = images.filter((nowImage) => nowImage !== image);
    setImages(newImages);
  };

  return (
    <>
      <ImageUpload htmlFor="image">이미지 업로드</ImageUpload>
      <Input
        type="file"
        id="image"
        accept="image/*"
        multiple
        onChange={(e) => onChangeFile(e)}
      />
      {images.length > 0 && (
        <ImagePreview>
          {images.map((image, index) => (
            <PreviewImage key={index}>
              <CloseButton
                src={close}
                alt="삭제"
                onClick={() => onClickDelete(image)}
              />
              <img src={image} alt="이미지 미리보기" width={150} />
            </PreviewImage>
          ))}
        </ImagePreview>
      )}
    </>
  );
}

const ImageUpload = styled.label`
  border: 1px dashed black;
  padding: 10px;
  cursor: pointer;
`;

const ImagePreview = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
`;

const PreviewImage = styled.div`
  position: relative;
  margin: 5px;
  width: 150px;
`;

const Input = styled.input`
  display: none;
`;

const CloseButton = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 20px;
  margin: 5px;
  cursor: pointer;
`;
