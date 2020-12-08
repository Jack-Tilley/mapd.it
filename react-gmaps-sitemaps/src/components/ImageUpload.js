import React, { useState } from "react";
import ImageUploader from "react-images-upload";
const ImageUpload = ({ handlePictureChange }) => {
  return (
    <div className="App">
      <p>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={(e) => handlePictureChange(e)}
          required
        />
      </p>
      <input type="submit" />
    </div>
  );
};
export default ImageUpload;
