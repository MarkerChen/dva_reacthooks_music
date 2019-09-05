import React from "react";
import { getCount } from "@/utils/tools.js";
import { ListWrapper, List, ListItem } from "./style";

function RecommendList(props) {
  const { recommendList } = props;

  return (
    <ListWrapper>
      <h1 className="title">推荐歌单</h1>
      <List>
        {recommendList.map(item => {
          return (
            <ListItem>
              <div className="img_wrapper">
                <div className="decorate"></div>
                <img src={item.picUrl} alt={item.name} />
                <div className="play_count">
                  <i className="iconfont play">&#xe885;</i>
                  <span>{getCount(item.playCount)}</span>
                </div>
              </div>
              <div className="desc">{item.name}</div>
            </ListItem>
          );
        })}
      </List>
    </ListWrapper>
  );
}

export default React.memo(RecommendList);
