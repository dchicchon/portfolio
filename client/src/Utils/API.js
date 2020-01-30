import axios from "axios";

export default {
  getAllPhotos: () => {
    return axios.get("/photos");
  }
};
