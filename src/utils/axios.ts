import axios from "axios";
import { getToken, purgePersist } from "./localstorage";

    axios.interceptors.request.use(
        async (config) => {
            const token = await getToken();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );

      axios.interceptors.response.use(
        (response) => {
          return response;
        },
        (error) => {
          console.log('error :>> ', error);
          if (error.response?.status === 403 ) {
            console.log('error :>> ', error);
            purgePersist();
          }
          return Promise.reject(error);
        }
      );
export default axios;