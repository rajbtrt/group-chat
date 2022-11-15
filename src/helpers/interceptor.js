import axios from "axios";
import { useAuthStore } from "../store/auth";
import { errorToast } from "./toast";
import router from "../router/index";

export function jwtInterceptor() {
  const auth = useAuthStore();
  // Add a request interceptor
  //   axios.interceptors.request.use(
  //     function (config) {
  //       // Do something before request is sent
  //       return config;
  //     },
  //     function (error) {
  //       // Do something with request error
  //       return Promise.reject(error);
  //     }
  //   );

  // Add a response interceptor
  axios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      if (error.response.status) {
        switch (error.response.status) {
          case 400:
            //do something
            errorToast(error.response.data.code, error.response.data.message);
            break;

          case 401:
            errorToast(error.response.data.code, error.response.data.message);
            auth.logout().then(() => {
              router.push({
                name: "Login",
              });
            });
            break;
          case 403:
            // router.replace({
            //   path: "/login",
            //   query: { redirect: router.currentRoute.fullPath },
            // });
            break;
          case 404:
            //do something
            errorToast(error.response.data.code, error.response.data.message);
            break;
          case 500:
            setTimeout(() => {
              router.replace({
                path: "/login",
                query: {
                  redirect: router.currentRoute.fullPath,
                },
              });
            }, 1000);
        }
        return Promise.reject(error.response);
      }
    }
  );
}
