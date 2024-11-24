// 封装axios请求
import axios from "axios";

export const baseURL = "http://localhost:3000";

// 创建axios实例
const service = axios.create({
  baseURL, // 基础URL
  timeout: 5000, // 请求超时时间
});

//  拦截器
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);
export default service;
