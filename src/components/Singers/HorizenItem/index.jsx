import React, { memo, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import Scroll from "@/components/Common/Scroll";
import { List, ListItem } from "./style";

function HorizenItem(props) {
  const { list, oldVal, title } = props;
  const { handleClick } = props;
  //加入声明
  const Category = useRef(null);

  //加入初始化内容宽度的逻辑
  useEffect(() => {
    let CategoryDom = Category.current;
    let tagElems = CategoryDom.querySelectorAll("span");
    let totalWidth = 0;
    Array.from(tagElems).forEach(item => {
      totalWidth += item.offsetWidth;
    });
    CategoryDom.style.width = `${totalWidth}px`;
  }, []);

  return (
    <Scroll direction={"horizental"}>
      <List ref={Category}>
        <span>{title}</span>
        {list.map(item => {
          return (
            <ListItem
              key={item.key}
              className={`${oldVal === item.key ? "selected" : ""}`}
              onClick={() => {
                handleClick(item.key);
              }}
            >
              {item.name}
            </ListItem>
          );
        })}
      </List>
    </Scroll>
  );
}

HorizenItem.defaultProps = {
  list: [],
  oldVal: "",
  title: "",
  handleClick: null
};
HorizenItem.propTypes = {
  list: PropTypes.array,
  oldVal: PropTypes.string,
  title: PropTypes.string,
  handleClick: PropTypes.func
};

export default memo(HorizenItem);
