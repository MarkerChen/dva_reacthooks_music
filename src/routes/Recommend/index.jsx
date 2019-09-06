import React, { useEffect, useReducer } from "react";
import Slider from "@/components/Recommend/Slider/index";
import RecommendList from "@/components/Recommend/RecommendList/index";
import Scroll from "@/components/Common/Scroll/index";
import Loading from "@/components/Common/Loading/index";
import { Content } from "./style";
import { getBannerRequest } from "./service";
import { connect } from "dva";
import { forceCheck } from "react-lazyload";

function Recommend(props) {
  const { bannerList, recommendList, songsCount } = props;

  const { getBannerDataDispatch, getRecommendListDataDispatch } = props;
  //数据列表在加载状态
  const loading = props.loading.effects["recommend/getRecommendList"];

  //如果页面有数据，则不发请求
  //immutable数据结构中长度属性size,防止banner重复加载
  useEffect(() => {
    if (!bannerList.size) {
      getBannerDataDispatch();
    }
    if (!recommendList.size) {
      getRecommendListDataDispatch();
    }
  }, []);

  const bannerListJS = bannerList ? bannerList.toJS() : [];
  const recommendListJS = recommendList ? recommendList.toJS() : [];

  // console.log("bannerListJS,", bannerListJS,'recommendListJS',recommendListJS);

  return (
    <Content>
      <Scroll className="list" onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS}></RecommendList>
        </div>
      </Scroll>
      {loading ? <Loading></Loading> : null}
    </Content>
  );
}

const mapStateToProps = ({ recommend, loading }) => {
  return {
    bannerList: recommend.get("bannerList"),
    recommendList: recommend.get("recommendList"),
    loading
  };
};

// 映射dispatch到props上
const mapDispatchToProps = dispatch => {
  return {
    getBannerDataDispatch() {
      dispatch({ type: "recommend/getBannerList" });
    },
    getRecommendListDataDispatch() {
      dispatch({ type: "recommend/getRecommendList" });
    }
  };
};

// 将ui组件包装成容器组件
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Recommend));
