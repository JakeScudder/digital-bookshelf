import axios from "axios";

export function getData(url, config, callback, errorcallback) {
  axios
    .get(url, config)
    .then((res) => {
      //do something
      if (callback != null) {
        callback(res);
      }
    })
    .catch((err) => {
      // catch error
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
}
