import React, { useState, useEffect } from "react";
import { forceCheck } from "react-lazyload";
import Horizen from "../../components/Singers/HorizenItem/index.jsx";
import SingerList from "@/components/Singers/SingerList/index";
import Scroll from "@/components/Common/Scroll/index";
import { categoryTypes, alphaTypes } from "../../services/MockCatData";
import { NavContainer, ListContainer } from "./style";
import { connect } from "dva";
import Loading from "@/components/Common/Loading";
function Singers(props) {
  // mock数据
  const {
    pageCount,
    enterLoading,
    singerList,
    getHotSingerList,
    updateDispatch,
    pullUpLoading,
    pullDownLoading,
    pullUpRefreshDispatch,
    pullDownRefreshDispatch
  } = props;

  let [category, setCategory] = useState("");
  let [alpha, setAlpha] = useState("");
  useEffect(() => {
    getHotSingerList();
  }, []);

  useEffect(() => {
    console.log("Scroll useEffect pullUpLoading ", pullUpLoading);
    console.log("Scroll useEffect pullDownLoading ", pullDownLoading);
    console.log("Scroll useEffect enterLoading ", enterLoading);
  }, [pullUpLoading, pullDownLoading, enterLoading]);

  let handleUpdateAlpha = val => {
    setAlpha(val);
    updateDispatch(category, val);
  };

  let handleUpdateCatetory = val => {
    setCategory(val);
    updateDispatch(val, alpha);
  };
  const handlePullUp = () => {
    pullUpRefreshDispatch(category, alpha, category === "", pageCount);
  };

  const handlePullDown = () => {
    pullDownRefreshDispatch(category, alpha);
  };

  return (
    <div>
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
      <ListContainer>
        <Loading show={enterLoading}></Loading>
        <Scroll
          pullUp={handlePullUp}
          pullDown={handlePullDown}
          pullUpLoading={pullUpLoading}
          pullDownLoading={pullDownLoading}
          onScroll={forceCheck}
        >
          <SingerList singerList={singerList.toJS()}></SingerList>
        </Scroll>
      </ListContainer>
    </div>
  );
}
const mapStateToProps = ({ singers, loading }) => {
  return {
    singerList: singers.get("singerList"),
    enterLoading: singers.get("enterLoading"),
    pullUpLoading: singers.get("pullUpLoading"),
    pullDownLoading: singers.get("pullDownLoading"),
    pageCount: singers.get("pageCount"),
    loading
  };
};

// 映射dispatch到props上
const mapDispatchToProps = dispatch => {
  return {
    getHotSingerList() {
      dispatch({ type: "singers/getHotSingerList" });
    },
    updateDispatch(category, alpha) {
      dispatch({ type: "singers/change_page_count", payload: 0 }); //由于改变了分类，所以pageCount清零
      dispatch({ type: "singers/change_enter_loading", payload: true }); //loading，现在实现控制逻辑
      dispatch({ type: "singers/getSingerList", payload: { category, alpha } });
    },
    // 上拉加载
    pullUpRefreshDispatch(category, alpha, hot, count) {
      //开启动画
      dispatch({ type: "singers/change_pullup_loading", payload: true });
      //增加分页
      dispatch({ type: "singers/change_page_count", payload: count + 1 });
      //判断是否是hot还是分类
      if (hot) {
        dispatch({ type: "singers/refreshMoreHotSingerList" });
        return;
      }
      dispatch({
        type: "singers/refreshMoreSingerList",
        payload: { category, alpha }
      });
    },
    //下拉刷新
    pullDownRefreshDispatch(category, alpha) {
      //开启动画
      dispatch({ type: "singers/change_pulldown_loading", payload: true });
      //清空count
      dispatch({ type: "singers/change_page_count", payload: 0 });
      //判断是否有category和alpha
      if (category === "" && alpha === "") {
        dispatch({ type: "singers/getHotSingerList" });
        return;
      }

      dispatch({ type: "singers/getSingerList" });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Singers));
