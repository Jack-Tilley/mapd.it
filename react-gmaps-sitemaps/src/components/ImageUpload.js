import React, { useState } from "react";
import ImageUploader from "react-images-upload";
const ImageUpload = ({ handlePictureChange }) => {
  //   const [picture, setPicture] = useState(null);
  //   const onDrop = (newPicture) => {
  //     setPicture(newPicture);
  //     console.log(picture);
  //   };
  return (
    <ImageUploader
      withIcon={false}
      withPreview={true}
      label=""
      buttonText="Upload Image"
      onChange={handlePictureChange}
      imgExtension={[".jpg", ".jpeg", ".png", ".svg"]}
      maxFileSize={1048576}
      fileSizeError="file size is too big"
      singleImage={true}
    />
  );
};
export default ImageUpload;
