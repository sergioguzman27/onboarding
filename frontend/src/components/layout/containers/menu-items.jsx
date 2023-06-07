import React from "react";
import {
  AssignmentLate,
  AssignmentTurnedIn,
  AttachFile,
  BugReport,
  EventAvailable,
  Home,
  HowToReg,
  BarChart,
  Inbox,
  Settings
} from "@material-ui/icons";

export const items = [
  {
    id: 0,
    icon: <Home style={{ color: "white" }} />,
    label: "Home",
    type: "single",
    to: "/home",
    permiso: null,
  }
];
