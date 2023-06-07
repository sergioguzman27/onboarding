import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import {
    Menu as MenuIcon,
    ChevronLeft as ChevronLeftIcon
} from "@material-ui/icons";
import Avatar from "@material-ui/core/Avatar";
import { green } from "@material-ui/core/colors";
import Collapse from "@material-ui/core/Collapse";
import { useHistory } from "react-router-dom";

import logo from "./logo.png";
import "./components/Layout.css";
import OptionComponent from "./components/option-component";
import OptionComponentCollapse from "./components/option-component-collapse";
import { items } from "./containers/menu-items";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    toolbar: {
        paddingRight: 24,
        backgroundColor: "#202e3c",
    },
    toolbarIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 8px",
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: "none",
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        background: "#2b3c4d",
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflow: 'hidden'
    },
    drawerPaperClose: {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
    },
    contentBody: {
        padding: theme.spacing(3),
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    containerTitle: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        paddingLeft: 0,
        paddingright: 0,
    },
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
    },
    fixedHeight: {
        height: 240,
    },
    greenAvatar: {
        color: "#fff",
        backgroundColor: green[500],
        borderStyle: "solid",
        borderWidth: "1 !important",
        borderColor: "white !important",
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
    subMenuCollapse: {
        paddingLeft: theme.spacing(5),
    },
    drawerStyle: { backgroundColor: "#2b3c4d" },
    drawerOption: { color: "white" },
    menuCollapse: {
        paddingLeft: theme.spacing(3),
    },
}));

export default function Layout(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [userName, setUserName] = useState("Usuario");

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setCollapse(null);
        setOpen(false);
    };
    const [collapse, setCollapse] = useState(null);
    const toogleCollapse = (menuId) => {
        setCollapse(menuId === collapse ? null : menuId);
    };
    const history = useHistory();
    const navigateTo = (path) => {
        history.push(path);
    };
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="absolute"
                className={clsx(classes.appBar, open && classes.appBarShift)}
            >
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(
                            classes.menuButton,
                            open && classes.menuButtonHidden
                        )}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        className={classes.title}
                    >
                        <a href="/">
                            <img src={logo} className="ImgLogo" alt="logo" />
                        </a>
                    </Typography>
                    <Avatar
                        alt=""
                        className={classes.greenAvatar}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            window.location.href = "/";
                        }}
                    >
                        U
                    </Avatar>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon style={{ color: "#fff" }} />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <div>
                        {items.map((i) =>
                            i.type === "single" ? (
                                <OptionComponent
                                    key={i.id}
                                    name={i.label}
                                    icon={i.icon}
                                    url={i.to}
                                    estadoBarra={open}
                                    permiso={true}
                                    esSubmenu={false}
                                />
                            ) : i.type === "primarysub" ? (
                                <div key={i.id}>
                                    <OptionComponentCollapse
                                        onClick={() => { toogleCollapse(i.label); handleDrawerOpen(); }}
                                        label={i.label}
                                        icon={i.icon}
                                        collapse={collapse}
                                        estadoBarra={open}
                                    />
                                    <Collapse
                                        in={collapse === i.label}
                                        timeout="auto"
                                        unmountOnExit
                                    >
                                        <List component="div" disablePadding>
                                            {i.subitems.map(
                                                (j) =>

                                                    <OptionComponent
                                                        key={j.id}
                                                        name={j.label}
                                                        icon={j.icon}
                                                        url={j.to}
                                                        estadoBarra={open}
                                                        permiso={true}
                                                        esSubmenu={true}
                                                    />
                                            )}
                                        </List>
                                    </Collapse>
                                </div>
                            ) : undefined
                        )}

                        <Divider />
                    </div>
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                {typeof props.bodyHeader !== "undefined" && !props.bodyHeader ? (
                    <></>
                ) : (
                    <div className="LayoutHeader">
                        <h2 className="Titulo">
                            <span>{typeof !props.title ? props.title : ""}</span>
                        </h2>
                        {props.header}
                    </div>
                )}
                <div className={classes.contentBody}>
                    {props.children}
                </div>
            </main>
        </div>
    );
}
