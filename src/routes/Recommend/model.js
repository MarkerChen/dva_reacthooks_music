import { fromJS } from "immutable";
import { getBannerRequest, getRecommendListRequest } from "./service";
export default {
  namespace: "recommend",

  state: fromJS({
    bannerList: [],
    recommendList: []
  }),

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
    }
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      // eslint-disable-line
      yield put({ type: "save" });
    },
    *getBannerList({ payload }, { call, put }) {
      const bannerList = yield call(getBannerRequest);
      console.log("recommed model 获取到的bannerList", bannerList);
      const data = fromJS(bannerList.banners);
      yield put({ type: "save_bannerList", payload: data });
    },
    *getRecommendList({ payload }, { call, put }) {
      const recommendList = yield call(getRecommendListRequest);
      console.log("recommed model 获取到的recommendList", recommendList);
      const data = fromJS(recommendList.result);
      yield put({ type: "save_recommendList", payload: data });
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    save_bannerList(state, { payload }) {
      return state.set("bannerList", payload);
    },
    save_recommendList(state, { payload }) {
      return state.set("recommendList", payload);
    }
  }
};
