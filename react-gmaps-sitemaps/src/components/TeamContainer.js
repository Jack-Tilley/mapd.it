import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
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
const TeamContainer = ({
  teams,
  // selectedTeams,
  // setSelectedTeams,
  handleSelectedTeamChange,
  teamObjects,
  teamError,
  // setTeamObjects,
}) => {
  const classes = useStyles();

  // converts ids back to the team object. is slow!
  const getTeams = (ids) => {
    let checkedTeams = [];
    for (let id of ids) {
      checkedTeams.push(teams.find((team) => team.id === id));
    }
    return checkedTeams;
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel error={teamError} id="team-mutiple-checkbox-label">
        Teams
      </InputLabel>
      <Select
        error={teamError}
        label="Team Select"
        // labelId="demo-mutiple-checkbox-label"
        id="team-mutiple-checkbox"
        multiple
        value={teamObjects}
        onChange={handleSelectedTeamChange}
        input={<Input />}
        MenuProps={MenuProps}
        renderValue={(checkedTeams) => (
          <List dense>
            {getTeams(checkedTeams).map((checkedTeam) => (
              <ListItemText
                primary={checkedTeam.name}
                key={checkedTeam.unique_key}
              ></ListItemText>
            ))}
          </List>
        )}
      >
        {teams.map((team) => (
          <MenuItem key={team.unique_key} value={team.id}>
            <Checkbox checked={teamObjects.indexOf(team.id) > -1} />
            <ListItemText
              primary={team.name}
              secondary={"#" + team.unique_key}
            />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default TeamContainer;
