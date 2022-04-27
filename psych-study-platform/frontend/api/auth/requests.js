function PostRequestLoginMaker(payload) {
  return {
    type: "POST",
    endpoint: "login",
  };
}

function LogoutRequestConfig(payload) {
  return {
    type: "POST",
    endpoint: "/auth/logout",
  };
}

const config = {
  loginUser: {
    type: "POST",
    endpoint: "login",
  },
  logoutUser: {
    type: "POST",
    endpoint: "/logout",
  },
};

export { config, PostRequestLoginMaker };
