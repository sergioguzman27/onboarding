import React, { Component } from "react";
import { useHistory } from "react-router-dom";
import Popover from "@material-ui/core/Popover";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { ExpandLess, ExpandMore } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    popover: {
      pointerEvents: "none",
    },
    paper: {
      padding: theme.spacing(1),
      background: "#000",
      color: "#fff",
    },
    drawerStyle: { backgroundColor: "#2b3c4d" },
    drawerOption: { color: "white" },
    menuCollapse: {
      paddingLeft: theme.spacing(3),
    },
    subMenuCollapse: {
      paddingLeft: theme.spacing(5),
    }
}));

export default function OptionComponent(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handlePopoverOpen(event) {
    if (props.estadoBarra === false) {
      setAnchorEl(event.currentTarget);
    } else {
      setAnchorEl(null);
    }
  }

  function handlePopoverClose() {
    setAnchorEl(null);
  }
  const open = Boolean(anchorEl);

  let history = useHistory();

  return (
    <React.Fragment>
      <ListItem
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        button
        onClick={props.onClick}
      >
        <ListItemIcon className={classes.drawerOption}>
          {props.icon}
        </ListItemIcon>

        <ListItemText className={classes.drawerOption} primary={props.label} />

        {props.collapse === props.label ? (
          <ExpandLess className={classes.drawerOption} />
        ) : (
          <ExpandMore className={classes.drawerOption} />
        )}
      </ListItem>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography>{props.label}</Typography>
      </Popover>
    </React.Fragment>
  );
}
