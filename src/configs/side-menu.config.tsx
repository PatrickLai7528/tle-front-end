import {
  AppstoreOutlined,
  OrderedListOutlined,
  SwapOutlined,
  DashboardOutlined
} from "@ant-design/icons";
import React from "react";

export const sideMenuConfigs = [
  {
    label: "workplace",
    route: "/authed/workplace",
    icon: <DashboardOutlined />
  },
  {
    label: "repository management",
    route: "/authed/repository",
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
