import { useState, useEffect } from "react";
import axios from "axios";

export function FeedMonetary() {
  const [msg, setMsg] = useState("Default");

  useEffect(() => {
    const getMsg = async () => {
      const response = await axios.get("http://localhost:3000");
      const { data } = response;
      setMsg(data);
    };

    getMsg();
  }, []);

  return (
    <div>
      <h1>Feed Monetary</h1>
      <p>{msg.msg}</p>
    </div>
  );
}
