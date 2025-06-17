import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:3000",
});

const errorCode = {
  10: (res) => {
    const { message } = res.data;
    message.error(message || "token过期了，请重新登录");
    logout();
  },
  100: (res) => {
    const { message } = res.data;
    message.error(message || "没有接口权限");
    logout();
  },
  // ...
};
const httpErrorCode = {
  404: () => {
    message.error(message || "请求资源不存在");
  },
  500: () => {
    message.error(message || "服务器内部错误");
  },
};
instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (!token) {
      // 退出登录
      logout();
    }
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (err) => {
    const { status } = err;
    httpErrorCode[status]?.(err);
    return Promise.reject(err);
  }
);
instance.interceptors.response.use(
  (response) => {
    if (response.data instanceof Blob) {
      return response.data;
    }
    const { code } = response.data;
    if (code === 0) {
      return response.data.data;
    }
    errorCode[code]?.();
  },
  (err) => {
    return Promise.reject(err);
  }
);
