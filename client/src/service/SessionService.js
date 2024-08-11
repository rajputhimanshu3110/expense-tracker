import Keys from "./Keys"

const SessionService = {
  get: {
    header: function () {
      return localStorage.getItem(Keys.userToken);
    },
    loggedInUser: function () {
      return JSON.parse(localStorage.getItem(Keys.loggedInUser));
    },
  },
  set: {
    header: function (token) {
      localStorage.setItem(Keys.userToken, token);
    },
    loggedInUser: function (user) {
      localStorage.setItem(Keys.loggedInUser,JSON.stringify(user));
    },
  },
};

export default SessionService;