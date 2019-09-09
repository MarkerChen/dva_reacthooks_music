import React from "react";
import { LoadingWrapper } from "./style";

function Loading(props) {
  const show = props.show === undefined ? true : props.show;
  console.log("loading props show ", props.show, "new show", show);
  return (
    <div>
      {show ? (
        <LoadingWrapper>
          <div></div>
          <div></div>
        </LoadingWrapper>
      ) : null}
    </div>
  );
}

export default React.memo(Loading);
