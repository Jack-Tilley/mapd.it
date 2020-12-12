import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
    maxHeight: 100,
    overflow: "auto",
  },
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const TeamViewer = ({ profileId }) => {
  const [myTeams, setMyTeams] = useState([]);
  const [activeTeam, setActiveTeam] = useState("");

  const viewTeam = (e) => {
    setActiveTeam(e.target.value);
    // console.log(activeTeam);
  };

  const renderTeam = () => {
    if (activeTeam !== "") {
      return (
        <div>
          <h4>{activeTeam.name}</h4>
          <p>{activeTeam.description}</p>
          <ul style={{ overflow: "auto" }}>
            {"members ids"}
            {activeTeam.members.map((member) => (
              <li key={member.id}>
                <p>{member.id}</p>
              </li>
            ))}
          </ul>
        </div>
      );
    } else {
      return <></>;
    }
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/profiles/${profileId}/view_teams/`)
      .then((res) => {
        // console.log(res.data);
        setMyTeams(res.data);
      })
      .catch((err) => console.log(err));
  }, [profileId]);
  const classes = useStyles();
  return (
    <>
      <FormControl className={classes.formControl}>
        <Select
          labelId="view my teams"
          displayEmpty
          id="my teams"
          value={activeTeam}
          onChange={(e) => viewTeam(e)}
        >
          {myTeams.map((team) => (
            <MenuItem key={team.unique_key} value={team}>
              <ListItemText
                primary={team.name}
                secondary={"#" + team.unique_key}
              />
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>View a team</FormHelperText>
      </FormControl>
      <div>
        {/* {console.log("activeTeam", activeTeam)} */}
        {renderTeam()}
      </div>
    </>
  );
};
export default TeamViewer;

// const [
//     myMap,
//     setMyMap,
//     center,
//     setCenter,
//     isLoaded,
//     draw,
//     setDraw,
//     nodes,
//     setNodes,
//     activeNode,
//     setActiveNode,
//     icon,
//     setIcon,
//     shapes,
//     setShapes,
//     checked,
//     setChecked,
//     selected,
//     setSelected,
//     color,
//     setColor,
//     findNode,
//     removeNode,
//     nodeType,
//     setNodeType,
//     disabled,
//     setDisabled,
//     editing,
//     setEditing,
//     editValue,
//     setEditValue,
//     replaceNode,
//     editCleanup,
//     changeIcons,
//     description,
//     setDescription,
//     comment,
//     setComment,
//     label,
//     setLabel,
//     auth,
//     setAuth,
//     profileId,
//     setProfileId,
//     teams,
//     setTeams,
//     selectedTeams,
//     setSelectedTeams,
//   ] = useContext(MapContext);
