import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { formatTime } from "../utils/utils";
import React, { useState } from "react";
import ImageUpload from "./ImageUpload";
import { useSelectedContext } from "./MapContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  title: {},
  titleBar: {},
}));

const urlbase = "http://localhost:8000";
const ImageModal = ({
  imageOpen,
  setImageOpen,
  images,
  setImages,
  gatherImages,
}) => {
  const { selected } = useSelectedContext();
  const [picture, setPicture] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [rendered, setRendered] = useState("show");
  const classes = useStyles();

  const handleViewClick = () => {
    setRendered("show");
  };

  const handleAddClick = () => {
    setRendered("add");
  };

  const handleClose = () => {
    setImageOpen(false);
  };
  const handlePictureChange = (e) => {
    e.preventDefault();
    // console.log("picture", e.target.files[0]);
    setPicture(e.target.files[0]);
  };
  const handlePictureSubmit = (e) => {
    e.preventDefault();

    if (picture === null) {
      return;
    }
    // console.log("picFile", picture);
    let data = new FormData(); // creates a new FormData object
    data.append("image", picture);
    data.append("title", title);
    data.append("description", desc);
    data.append("node", selected.id);
    axios
      .post("https://backend-mapdit.herokuapp.com/api/images/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        // console.log(res.data);
        gatherImages();
        setPicture(null);
        setTitle("");
        setDesc("");
      })
      .catch((err) => {
        setPicture(null);
        setTitle("");
        setDesc("");
        console.log(err);
      });
    e.target.reset();
  };
  const renderImages = () => {
    // console.log("images", images);
    return (
      <div className={classes.root}>
        <GridList cellHeight={300} className={classes.gridList} cols={1.5}>
          {images.map((image) => (
            <GridListTile key={image.id}>
              <img src={urlbase + image.image} alt={image.title} />
              <GridListTileBar
                title={image.title}
                subtitle={formatTime(image.created)}
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  };

  return (
    <div>
      <Dialog
        open={imageOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        scroll="paper"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">
          Images - {selected.label}
        </DialogTitle>
        {rendered === "show" ? (
          <DialogContent scroll="paper" dividers={true}>
            {images.length > 0 ? (
              renderImages()
            ) : (
              <div>No images posted yet...</div>
            )}
          </DialogContent>
        ) : (
          <DialogContent scroll="paper" dividers={true}>
            <ImageUpload
              handlePictureChange={handlePictureChange}
              handlePictureSubmit={handlePictureSubmit}
              title={title}
              setTitle={setTitle}
              desc={desc}
              setDesc={setDesc}
            />
          </DialogContent>
        )}
        <DialogActions>
          <div>
            <Button
              style={{
                position: "absolute",
                left: "1.5em",
                bottom: "2.5em",
              }}
              onClick={handleClose}
              color="default"
              variant="contained"
            >
              Done
            </Button>
            <Button
              onClick={handleViewClick}
              color={rendered === "show" ? "default" : "primary"}
              variant="contained"
              style={{
                height: "50px",
                width: "80px",
              }}
            >
              View All
            </Button>
            <Button
              onClick={handleAddClick}
              color={rendered !== "show" ? "default" : "primary"}
              variant="contained"
              style={{
                height: "80px",
                width: "80px",
                marginLeft: "5px",
                marginRight: "5px",
              }}
            >
              Upload New Image
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ImageModal;
