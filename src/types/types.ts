import { JSX } from "react";

export type routesData = {
  id: number;
  label: string;
  name: JSX.Element;
  path: string;
};

export type Tools = {
  icon: JSX.Element;
  title: string;
  description: string;
  action: string;
  bg: string;
  isNew?: boolean;
};
