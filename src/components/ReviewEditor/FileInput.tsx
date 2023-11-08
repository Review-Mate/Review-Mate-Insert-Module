import React, { useState } from 'react';
import { styled } from 'styled-components';
import Close from '@/assets/icons/close.svg';
import { colors } from '@/utils/GlobalStyles';
import { ReactComponent as Camera } from '@/assets/icons/camera.svg';
import { Fonts } from '@/utils/GlobalFonts';

interface Props {
  images: File[];
  setImages: (images: File[]) => void;
}

export default function FileInput(props: Props) {
  const { images, setImages } = props;

  // 미리보기 이미지
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 10) {
      alert('10개 이하의 이미지만 업로드 가능합니다.');
      return;
    }

    const nowImagePreviewUrls = [...imagePreviewUrls];
    const nowImageFiles = [...images];

    if (files) {
      for (let i = 0; i < files.length; i++) {
        // preview URL 생성
        const ImageUrl = URL.createObjectURL(files[i]);
        nowImagePreviewUrls.push(ImageUrl);
        nowImageFiles.push(files[i]);
      }
      setImagePreviewUrls(nowImagePreviewUrls);
      setImages(nowImageFiles);

      // 사용이 끝난 URL 해제
      for (let i = 0; i < imagePreviewUrls.length; i++) {
        URL.revokeObjectURL(imagePreviewUrls[i]);
      }
    }
  };

  const onClickDelete = (idx: number) => {
    const newImagesPreviewUrls = imagePreviewUrls.filter(
      (_, index) => index != idx
    );
    const newImages = images.filter((_, index) => index != idx);
    setImagePreviewUrls(newImagesPreviewUrls);
    setImages(newImages);
  };

  return (
    <>
      <ImageUpload htmlFor="image">
        <Camera />
        <Fonts.body2 weight={500} margin="0 0 0 5px">
          사진 첨부하기
        </Fonts.body2>
      </ImageUpload>
      <Input
        type="file"
        id="image"
        accept="image/*"
        multiple
        onChange={(e) => onChangeFile(e)}
      />
      {imagePreviewUrls.length > 0 && (
        <ImagePreview>
          {imagePreviewUrls.map((imageUrl, index) => (
            <PreviewImage key={index}>
              <CloseButton
                src={Close}
                alt="삭제"
                onClick={() => onClickDelete(index)}
              />
              <Image src={imageUrl} alt="이미지 미리보기" />
            </PreviewImage>
          ))}
        </ImagePreview>
      )}
    </>
  );
}

const ImageUpload = styled.label`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 230px;
  height: 50px;
  border: 1px solid ${colors.gray06};
  border-radius: 10px;
  background-color: white;
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
  padding: 5px;
  width: 85px;
  height: 85px;
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
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
