import React from "react";
import {
  PlusOne,
  Home,
  Build,
  Assignment,
  People
} from "@material-ui/icons";

export const items = [
  {
    id: 0,
    icon: <Home style={{ color: "white" }} />,
    label: "Home",
    type: "single",
    to: "/home",
    permiso: null,
  },
  {
    id: 1,
    icon: <PlusOne style={{ color: "white" }} />,
    label: "Niveles",
    type: "single",
    to: "/niveles",
    permiso: null,
  },
  {
    id: 2,
    icon: <Build style={{ color: "white" }} />,
    label: "Recursos",
    type: "single",
    to: "/recursos",
    permiso: null,
  },
  {
    id: 3,
    icon: <Assignment style={{ color: "white" }} />,
    label: "Planes",
    type: "single",
    to: "/planes-listar",
    permiso: null,
  },
  {
    id: 4,
    icon: <People style={{ color: "white" }} />,
    label: "Colaboradores",
    type: "single",
    to: "/colaboradores",
    permiso: null,
  },
];
