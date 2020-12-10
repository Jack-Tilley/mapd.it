import React, { useState } from "react";
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
