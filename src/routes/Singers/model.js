import { fromJS } from "immutable";
import { getHotSingerListRequest, getSingerListRequest } from "./service";
export default {
  namespace: "singers",

  state: fromJS({
    singerList: [], //歌手列表
    enterLoading: true, //控制进场动画
    pullUpLoading: false, //控制上拉加载动画
    pullDownLoading: false, //控制下拉加载动画
    pageCount: 0 // 分页页数
  }),

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
    }
  },

  effects: {
    //第一次加载热门歌手
    *getHotSingerList({ payload }, { call, put }) {
      try {
        const res = yield call(getHotSingerListRequest, 0);
        const data = res.artists;
        console.log("Singers model getHotSingerList new singerList", data);
        yield [
          put({ type: "change_singer_list", payload: data }),
          put({ type: "change_enter_loading", payload: false }),
          put({ type: "change_pulldown_loading", payload: false })
        ];
      } catch (error) {
        console.error(
          "Singers model getHotSingerList catch 热门歌手数据获取失败:",
          error
        );
      }
    },
    //加载更多热门歌手
    *refreshMoreHotSingerList({ payload }, { call, put, select }) {
      try {
        const pageCount = yield select(({ singers }) =>
          singers.get("pageCount")
        );
        const singerList = yield select(({ singers }) =>
          singers.get("singerList").toJS()
        );
        console.log(
          "Singers model refreshMoreHotSingerList meta pageCount",
          pageCount,
          " mate singerList ",
          singerList
        );
        const res = yield call(getHotSingerListRequest, pageCount);
        const data = [...singerList, ...res.artists];
        console.log(
          "Singers model refreshMoreHotSingerList new singerList",
          data
        );
        yield [
          put({ type: "change_singer_list", payload: data }),
          put({ type: "change_pullup_loading", payload: false })
        ];
      } catch (error) {
        console.log(
          "Singers model refreshMoreHotSingerList 热门歌手数据获取失败",
          error
        );
      }
    },
    //加载对应类别的歌手
    *getSingerList({ payload }, { call, put }) {
      try {
        const { category, alpha } = payload;
        const res = yield call(getSingerListRequest, category, alpha, 0);
        console.log(
          "Singers model getSingerList params category",
          category,
          "alpha",
          alpha
        );
        console.log("Singers model getSingerList new singerList", res.artists);
        yield [
          put({ type: "change_singer_list", payload: res.artists }),
          put({ type: "change_enter_loading", payload: false }),
          put({ type: "change_pulldown_loading", payload: false })
        ];
      } catch (error) {
        console.error(
          "Singers model refreshMoreHotSingerList catch 第一次加载对应类别的歌手获取失败:",
          error
        );
      }
    },
    //加载更多歌手
    *refreshMoreSingerList({ payload }, { call, put, select }) {
      try {
        const { category, alpha } = payload;
        const pageCount = yield select(({ singers }) =>
          singers.get("pageCount")
        );
        const singerList = yield select(({ singers }) =>
          singers.get("singerList").toJS()
        );
        console.log(
          `Singers model refreshMoreSingerList mate category: ${category} ,alpha: ${alpha}, pageCount:${pageCount},
          singerList:
          `,
          singerList
        );
        const res = yield call(
          getSingerListRequest,
          category,
          alpha,
          pageCount
        );
        const data = [...singerList, ...res.artists];
        console.log(
          `Singers model refreshMoreSingerList new singerList:`,
          data
        );
        yield [
          put({ type: "change_singer_list", payload: data }),
          put({ type: "change_pullup_loading", payload: false })
        ];
      } catch (error) {
        console.error(
          "Singers model refreshMoreSingerList catch 加载更多歌手获取失败:",
          error
        );
      }
    }
  },

  reducers: {
    change_singer_list(state, { payload }) {
      return state.set("singerList", fromJS(payload));
    },
    change_page_count(state, { payload }) {
      return state.set("pageCount", fromJS(payload));
    },
    change_enter_loading(state, { payload }) {
      return state.set("enterLoading", fromJS(payload));
    },
    change_pullup_loading(state, { payload }) {
      return state.set("pullUpLoading", fromJS(payload));
    },
    change_pulldown_loading(state, { payload }) {
      return state.set("pullDownLoading", fromJS(payload));
    }
  }
};
