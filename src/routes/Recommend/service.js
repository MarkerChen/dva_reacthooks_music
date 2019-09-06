import request from "@/utils/axios";

export const getBannerRequest = () => {
  return request.get("/banner");
};

export const getRecommendListRequest = () => {
  return request.get("/personalized");
};
