import React from "react";
import { Redirect } from "react-router-dom";
import Home from "./Home/index";
import Recommend from "./Recommend/index";
import Singers from "./Singers/index";
import Rank from "./Rank/index";

export default [
  {
    path: "/",
    component: Home,
    routes: [
      {
        path: "/",
        exact: true,
        render: () => <Redirect to={"/recommend"} />
      },
      {
        path: "/recommend",
        component: Recommend
      },
      {
        path: "/singers",
        component: Singers
      },
      {
        path: "/rank",
        component: Rank
      }
    ]
  }
];
