function PostRequestLoginMaker(payload) {
  return {
    type: "POST",
    endpoint: "api/login",
  };
}

function LogoutRequestConfig(payload) {
  return {
    type: "POST",
    endpoint: "api/auth/logout",
  };
}

const config = {
  loginUser: {
    type: "POST",
    endpoint: "api/login",
  },
  logoutUser: {
    type: "POST",
    endpoint: "api/logout",
  },
};

export { config, PostRequestLoginMaker };
