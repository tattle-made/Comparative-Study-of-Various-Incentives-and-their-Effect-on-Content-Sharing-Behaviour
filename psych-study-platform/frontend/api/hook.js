import { useState, useEffect, useContext } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import { UserState } from "~/UserState";
import { NotificationState } from "~/NotificationState";

const HOST_URL = "https://meshi-staging.tattle.co.in";
// const HOST_URL = "http://localhost:3000";

function useApi(requestConfig, executeImmediately = false) {
  // const [requestConfig, setRequestConfig] = useState(requestConfig);
  const [data, setData] = useState(undefined);
  const [err, setErr] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useRecoilState(UserState);
  const [notification, setNotification] = useRecoilState(NotificationState);

  useEffect(() => {
    if (executeImmediately) {
      trigger();
    }
  }, []);

  async function trigger(payload) {
    console.log({ payload, requestConfig });
    // console.log({ payload, requestConfig, HOST_URL });
    setLoading(true);
    try {
      var options = {
        method: requestConfig.type,
        url: `${HOST_URL}/${requestConfig.endpoint}`,
        headers: {
          "content-type": "application/json",
        },
        data: payload,
      };
      if (user && user.accessToken) {
        options.headers["authorization"] = `Bearer ${user.accessToken}`;
      }
      var response = await axios.request(options);
      if (response.status === 200) {
        setData(response.data);
        setLoading(true);
      } else {
        setErr("Unable to get data");
        setLoading(false);
        setNotification({ message: "Unable to get data" });
      }
    } catch (err) {
      console.log({ err });
      const { response } = err;
      const { request, ...errorObject } = response; // take everything but 'request'
      console.log(errorObject);
      setLoading(false);
      setErr("Something Unexpected Happened.");
      if (errorObject && errorObject.data && errorObject.data.msg) {
        setNotification({ message: errorObject.data.msg });
      }
    }
  }
  return { data, err, loading, trigger };
}

export { useApi };
