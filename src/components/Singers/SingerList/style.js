import styled from "styled-components";
import style from "@/assets/global-style";

export const NavContainer = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 95px;
  width: 100%;
  padding: 5px;
  overflow: hidden;
`;
export const ListContainer = styled.div`
  position: fixed;
  top: 160px;
  bottom: 0;
  width: 100%;
  overflow: hidden;
`;

export const List = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const ListItem = styled.div`
  display: flex;
  flex-direction: row;
  /* line-height: 60px; */
  align-items: center;
  margin: 0 5px;
  padding: 5px 0px;
  box-sizing: border-box;
  border-bottom: 1px solid ${style["border-color"]};
  .img_wrapper {
    margin-right: 20px;
    img {
      width: 50px;
      height: 50px;
      border-radius: 3px;
    }
  }
  span {
    font-size: ${style["font-size-m"]};
    font-weight: 500;
  }
`;
