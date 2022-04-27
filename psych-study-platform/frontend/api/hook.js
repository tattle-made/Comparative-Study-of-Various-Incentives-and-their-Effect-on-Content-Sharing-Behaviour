import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { get, post, postWithToken } from "./index";
import { UserContext } from "../context";

const HOST_URL = "http://localhost:3000";

function useApi(requestConfig) {
  // const [requestConfig, setRequestConfig] = useState(requestConfig);
  const [data, setData] = useState(undefined);
  const [err, setErr] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useContext(UserContext);

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
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      setErr("Something Unexpected Happened.");
    }
  }
  return { data, err, loading, trigger };
}

export { useApi };
