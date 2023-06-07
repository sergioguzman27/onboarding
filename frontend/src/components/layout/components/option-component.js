import React, { Component } from "react";
import { useHistory } from "react-router-dom";
import Popover from "@material-ui/core/Popover";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1),
    background: "#000",
    color: "#fff",
  },
  subMenuCollapse: {
    paddingLeft: theme.spacing(4),
  },
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
      <>
      {props.permiso===true &&
      <React.Fragment>
        <ListItem
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
          style={{ color: "#fff", }}
          button
          onClick={() => {
            history.push(props.url);
          }}
          className={`${props.esSubmenu===true ? classes.subMenuCollapse : ""}`}
          
        >
          <ListItemIcon>{props.icon}</ListItemIcon>
          <ListItemText primary={props.name} />
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
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography>{props.name}</Typography>
      </Popover>
      </React.Fragment>}</>
    );
  }



