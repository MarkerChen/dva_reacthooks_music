import styled from "styled-components";
import style from "@/assets/global-style";


export const ListWrapper = styled.div`
  max-width: 100%;
  .title {
    font-weight: 700;
    font-size: 14px;
    line-height: 60px;
    padding-left: 6px;
  }
`;
export const List = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;
export const ListItem = styled.div`
  position: relative;
  width: 32%;
  .img_wrapper {
    position: relative;
    height: 0;
    /* 参照内容高度 */
    padding-bottom: 100%;
    img {
      width: 120px;
      height: 120px;
    }
    .play_count {
      position: absolute;
      right: 2px;
      top: 2px;
      font-size: ${style["font-size-s"]};
      line-height: 15px;
      color: ${style["font-color-light"]};
      .play {
        vertical-align: top;
      }
    }
    .decorate {
      position: absolute;
      top: 0;
      width: 100%;
      height: 35px;
      background: linear-gradient(hsla(0, 0%, 43%, 0.4), hsla(0, 0%, 100%, 0));
      border-radius: 3px;
    }
  }

  .desc {
    margin-top: 2px;
    height: 50px;
    overflow: hidden;
    color: ${style["font-color-desc"]};
    font-size: ${style["font-size-s"]};
    line-height: 1.4;
    padding: 0 2px;
    text-align: left;
  }
`;
