import axios from "axios";

export default {
  // This is happening on the backend code of my project https://github.com/dchicchon/new_portfolio_backend
  getAllPhotos: () => {
    return axios.get("/photos");
  },

  // getMessages: () => {
  //   console.log("Getting Messages");
  //   return axios.get("/messenger");
  // },

  // sendMessage: (message) => {
  //   console.log("Sending Message:", message);
  //   return axios.post("/messenger", message);
  // },
};
