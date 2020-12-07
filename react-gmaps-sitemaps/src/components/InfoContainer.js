import React, { useContext, useState, useEffect } from "react";
import { MapContext } from "./MapContext";
import { InfoWindow, OverlayView } from "@react-google-maps/api";
import EditNodeModal from "./EditNodeModal";
import CommentModal from "./CommentModal";
import ImageModal from "./ImageModal";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";

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
  const [
    myMap,
    setMyMap,
    center,
    setCenter,
    isLoaded,
    draw,
    setDraw,
    nodes,
    setNodes,
    activeNode,
    setActiveNode,
    icon,
    setIcon,
    shapes,
    setShapes,
    checked,
    setChecked,
    selected,
    setSelected,
    color,
    setColor,
    findNode,
    removeNode,
    nodeType,
    setNodeType,
    disabled,
    setDisabled,
    editing,
    setEditing,
    editValue,
    setEditValue,
    replaceNode,
    editCleanup,
    changeIcons,
    description,
    setDescription,
    comment,
    setComment,
    label,
    setLabel,
  ] = useContext(MapContext);
  const classes = useStyles();

  const [editOpen, setEditOpen] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);
  const [imageOpen, setImageOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [value, setValue] = useState("");

  const gatherImages = () => {
    axios
      .get(`http://localhost:8000/api/allNodes/${selected.id}/images`)
      .then((res) => {
        console.log(res.data);
        setImages(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleEditClick = () => {
    setColor(selected.color);
    setIcon(selected.iconValue);
    setValue(selected.label);
    setDescription(selected.description);
    console.log("selected", selected);
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
          value={value}
          setValue={setValue}
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
