import { Redirect } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import Recommend from "./Recommend/index";
import Singers from "./Singers/index";
import Rank from "./Rank/index";

const HomeComponent = lazy(() => import("./Home/index"));

const Home = props => {
  return (
    <Suspense fallback={null}>
      <HomeComponent {...props}></HomeComponent>
    </Suspense>
  );
};
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
