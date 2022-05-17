import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL + "/";

axios.interceptors.request.use(async (conf) => {
  const token = localStorage.getItem("token");

  if (token) conf.headers.Authorization = `${token}`;

  return conf;
});

const Authentication = {
  login: (username, password) =>
    axios.post("/auth/signin", {
      username,
      password,
    }),
  signup: (username, password) =>
    axios.post("/auth/signup", {
      username,
      password,
    }),
};

const Acitivty = {
  add: (title, description) =>
    axios.post("/activity/add", { title, description }),
  list: () => axios.get("/activity"),
  details: (id) => axios.get(`/activity/${id}`),
  delete: (id) => axios.delete(`/activity/${id}`),
  edit: (id, title, description) =>
    axios.put(`/activity/${id}`, { title, description }),
};

export default { Authentication, Acitivty };
