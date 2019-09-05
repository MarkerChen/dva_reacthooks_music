import React from "react";
import { Router } from "dva/router";
import { renderRoutes } from "react-router-config";
import routes from "./routes/";
function RouterConfig({ history }) {
  return <Router history={history}>{renderRoutes(routes)}</Router>;
}

export default RouterConfig;
