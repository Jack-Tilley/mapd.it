import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import IconButton from "@material-ui/core/IconButton";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import React from "react";

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

const TeamLeave = ({
  teams,
  leaveTeamId,
  setLeaveTeamId,
  profileId,
  updateNodes,
}) => {
  const classes = useStyles();

  const handleChange = (event) => {
    setLeaveTeamId(event.target.value);
  };

  const handleLeaveTeam = () => {
    if (
      leaveTeamId !== "" &&
      leaveTeamId !== null &&
      leaveTeamId !== undefined
    ) {
      axios
        .put(`http://localhost:8000/api/profiles/${profileId}/leave_team/`, {
          id: leaveTeamId,
        })
        .then((res) => {
          console.log(res.data);
          updateNodes();
          setLeaveTeamId("");
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <FormControl className={classes.formControl}>
      <Select
        labelId="leave team"
        displayEmpty
        id="leaveteam"
        value={leaveTeamId}
        onChange={(e) => handleChange(e)}
      >
        <MenuItem key={"N/A"} value="">
          <em>NONE</em>
        </MenuItem>
        {teams.map((team) => (
          <MenuItem key={team.unique_key} value={team.id}>
            <ListItemText
              primary={team.name}
              secondary={"#" + team.unique_key}
            />
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>Leave a team</FormHelperText>
      <IconButton onClick={() => handleLeaveTeam()} size="small">
        <i className="material-icons icon-red">{"delete"}</i>
      </IconButton>
    </FormControl>
  );
};
export default TeamLeave;

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
