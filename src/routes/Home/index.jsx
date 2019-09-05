import React from "react";
import { renderRoutes } from "react-router-config";

import AppHeader from "./AppHeader";
import { IconStyleGlobalStyle } from "../../assets/resetcss";
import { IconStyle } from "../../assets/iconfont/iconfont";

function Home(props) {
  const { route } = props;

  return (
    <div>
      <IconStyleGlobalStyle></IconStyleGlobalStyle>
      <IconStyle></IconStyle>
      <AppHeader></AppHeader>
      {renderRoutes(route.routes)}
    </div>
  );
}

export default React.memo(Home);
