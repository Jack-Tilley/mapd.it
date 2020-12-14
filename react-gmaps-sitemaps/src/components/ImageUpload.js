import React from "react";
import {
  FormControl,
  InputLabel,
  Input,
  TextField,
  FormGroup,
  FormHelperText,
  Button,
} from "@material-ui/core";
const ImageUpload = ({
  handlePictureChange,
  handlePictureSubmit,
  title,
  setTitle,
  desc,
  setDesc,
}) => {
  return (
    <div style={{ display: "inline-block" }}>
      <form onSubmit={handlePictureSubmit}>
        <InputLabel htmlFor="image">Image:</InputLabel>
        <input
          id="image"
          aria-describedby="image"
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) => handlePictureChange(e)}
          required
        />
        {/* <InputLabel htmlFor="title">Title:</InputLabel> */}
        <div>
          <TextField
            id="title"
            autoComplete="off"
            aria-describedby="title"
            type="text"
            name="title"
            placeholder="Title..."
            value={title}
            fullWidth
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <FormHelperText id="my-helper-text">
            Enter a title here
          </FormHelperText>
        </div>
        {/* <InputLabel htmlFor="description">Description:</InputLabel> */}
        <TextField
          id="description"
          aria-describedby="description"
          autoComplete="off"
          multiline={true}
          rows={4}
          type="text"
          placeholder="Description..."
          name="description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          fullWidth
        />
        <FormHelperText id="my-helper-text">
          Enter a description here
        </FormHelperText>

        <Button variant="outlined" type="submit" color="primary" fullWidth>
          Submit Picture
        </Button>
      </form>
      {/* <form style={{ display: "inline-block" }} onSubmit={handlePictureSubmit}>
        <div>
          <label> Add an image:</label>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={(e) => handlePictureChange(e)}
            required
          />
        </div>
        <div>
          <label> Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            // accept="image/*"
            // onChange={(e) => handlePictureChange(e)}
            required
          />
        </div>
        <div>
          <label> Description:</label>

          <textarea
            type="text"
            name="description"
            id="description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            // accept="image/*"
            // onChange={(e) => handlePictureChange(e)}
          />
        </div>
        <div>
          <button variant="outlined" type="submit">
            Submit Picture
          </button>
        </div>
      </form> */}
    </div>
  );
};
export default ImageUpload;
