import request from "../utils/request";

// 获取成员数据
export const getMemberDataAPI = () => {
  return request({
    url: "/users",
    method: "get",
  });
};

