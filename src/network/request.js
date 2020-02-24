import axios from "axios";
import vue from "vue";
import router from "../router/index";
const http = axios.create({
  baseURL:process.env.VUE_APP_API_URL || "/api/"
});
//请求拦截
http.interceptors.request.use(
  res => {
    if (localStorage.token) {
      res.headers.Authorization = "Baerer " + localStorage.token;
    }
    return res;
  },
  err => {
    Promise.reject(err);
  }
);

//响应拦截
http.interceptors.response.use(
  res => {
    return res;
  },
  err => {
    if (err.response.data.message) {
      vue.prototype.$message({
        type: "error",
        message: err.response.data.message
      });
      if (err.response.status === 401) {
        console.log(err);

        router.push("/login");
      }
      return Promise.reject(err);
    }
  }
);
export default http;
