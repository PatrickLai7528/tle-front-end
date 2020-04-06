import {
  AppstoreOutlined,
  OrderedListOutlined,
  SwapOutlined,
  DashboardOutlined
} from "@ant-design/icons";
import React from "react";
import { RouteConstants } from "./../routes/constants";

export const sideMenuConfigs = [
  {
    label: "workplace",
    route: RouteConstants.WORKPLACE,
    icon: <DashboardOutlined />
  },
  {
    label: "repository management",
    route: RouteConstants.REPOSITORY,
    icon: <AppstoreOutlined />
  },
  {
    label: "requirement management",
    route: "/authed/requirement",
    icon: <OrderedListOutlined />
  },
  {
    label: "trace link management",
    route: "/authed/trace_link",
    icon: <SwapOutlined />
  }
];
