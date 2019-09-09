import { List, ListItem } from "./style";
import LazyLoad from "react-lazyload";
const SingersList = props => {
  const { singerList } = props;
  return (
    <List>
      {singerList.map((item, index) => {
        return (
          <ListItem key={item.accountId + "" + index}>
            <div className="img_wrapper">
              <LazyLoad
                placeholder={
                  <img
                    width="100%"
                    height="100%"
                    src={require("@/assets/singer.png")}
                    alt="music"
                  />
                }
              >
                <img
                  src={`${item.picUrl}?param=300x300`}
                  width="100%"
                  height="100%"
                  alt={item.name}
                />
              </LazyLoad>
            </div>
            <span>{item.name}</span>
          </ListItem>
        );
      })}
    </List>
  );
};
export default SingersList;
