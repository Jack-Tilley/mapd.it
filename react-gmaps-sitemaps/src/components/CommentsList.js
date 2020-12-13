import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { formatTime } from "../utils/utils";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

const CommentsList = ({ comments, bottomRef, scrollToBottom }) => {
  const classes = useStyles();

  return comments.length > 0 ? (
    <List className={classes.root}>
      {comments.map((comment) => (
        <>
          <ListItem alignItems="flex-start" key={comment.created}>
            <ListItemAvatar>
              <Avatar>{comment.profile.user.username.charAt(0)} </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={comment.content}
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {comment.profile.user.username}
                  </Typography>
                  {"   - " + formatTime(comment.created)}
                </>
              }
            />
          </ListItem>
          <Divider key={comment.created + "divider"} />
        </>
      ))}
    </List>
  ) : (
    <div>No comments posted yet... Be the first!</div>
  );
};
export default CommentsList;
