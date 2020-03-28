import {
  AppstoreOutlined,
  OrderedListOutlined,
  SwapOutlined
} from "@ant-design/icons";
import React from "react";

export const sideMenuConfigs = [
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
