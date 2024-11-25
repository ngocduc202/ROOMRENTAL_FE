import axios from "axios";


const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  let token = window.localStorage.getItem("persist:auth") && JSON.parse(window.localStorage.getItem("persist:auth"))?.token?.slice(1, -1)
  config.headers = {
    Authorization: token ? `Bearer ${token}` : null
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  return Promise.reject(error);
});


export default instance