import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import { InfoWindow } from "@react-google-maps/api";
import axios from "axios";
import React, { useContext, useState } from "react";
import CommentModal from "./CommentModal";
import EditNodeModal from "./EditNodeModal";
import ImageModal from "./ImageModal";
import {
  MapContext,
  useAddEditContext,
  useSelectedContext,
} from "./MapContext";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
});

const urlbase = "http://localhost:8000";
const InfoContainer = () => {
  const { setIcon, setColor, setDescription } = useAddEditContext();
  const { selected, setSelected } = useSelectedContext();
  // const {
  //   setIcon,
  //   selected,
  //   setSelected,
  //   setColor,
  //   setDescription,
  // } = useContext(MapContext);

  const [editOpen, setEditOpen] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);
  const [imageOpen, setImageOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [label, setLabel] = useState("");

  const gatherImages = () => {
    axios
      .get(`http://localhost:8000/api/allNodes/${selected.id}/images`)
      .then((res) => {
        setImages(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleEditClick = () => {
    setColor(selected.color);
    setIcon(selected.iconValue);
    setLabel(selected.label);
    setDescription(selected.description);
    setEditOpen(true);
  };

  const handleCommentClick = () => {
    setCommentOpen(true);
  };
  const handleImageClick = () => {
    setImageOpen(true);
    gatherImages();
  };

  return selected ? (
    <InfoWindow
      position={{
        lat: parseFloat(selected.latLngArr[0]),
        lng: parseFloat(selected.latLngArr[1]),
      }}
      onCloseClick={() => {
        setSelected(null);
      }}
    >
      <div>
        <h4 style={{ color: "black" }}>{selected.label}</h4>
        <p style={{ color: "black" }}>{selected.description}</p>
        <IconButton onClick={handleEditClick}>
          <i className="material-icons icon-black">edit</i>
        </IconButton>
        <IconButton onClick={handleCommentClick}>
          <i className="material-icons icon-black">comment</i>
        </IconButton>
        <IconButton onClick={handleImageClick}>
          <i className="material-icons icon-black">image</i>
        </IconButton>
        <EditNodeModal
          editOpen={editOpen}
          setEditOpen={setEditOpen}
          label={label}
          setLabel={setLabel}
        />
        <CommentModal
          commentOpen={commentOpen}
          setCommentOpen={setCommentOpen}
        />
        <ImageModal
          imageOpen={imageOpen}
          setImageOpen={setImageOpen}
          images={images}
          setImages={setImages}
          gatherImages={gatherImages}
        />
        <a
          href={
            "http://maps.google.com/maps?daddr=" +
            selected.latLngArr[0] +
            "," +
            selected.latLngArr[1]
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          Get Directions
        </a>
      </div>
    </InfoWindow>
  ) : null;
};

export default InfoContainer;
