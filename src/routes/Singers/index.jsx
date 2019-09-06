import React, { useState } from "react";
import Horizen from "../../components/Singers/HorizenItem/index.jsx";
import { categoryTypes, alphaTypes } from "../../services/MockCatData";
import { NavContainer } from "./style";
function Singers(props) {
  let [category, setCategory] = useState("");
  let [alpha, setAlpha] = useState("");
  let handleUpdateAlpha = val => {
    setAlpha(val);
  };

  let handleUpdateCatetory = val => {
    setCategory(val);
  };
  return (
    <NavContainer>
      <Horizen
        list={categoryTypes}
        title={"分类(默认热门):"}
        oldVal={category}
        handleClick={val => handleUpdateCatetory(val)}
      ></Horizen>
      <Horizen
        list={alphaTypes}
        title={"首字母:"}
        oldVal={alpha}
        handleClick={val => handleUpdateAlpha(val)}
      ></Horizen>
    </NavContainer>
  );
}

export default React.memo(Singers);
