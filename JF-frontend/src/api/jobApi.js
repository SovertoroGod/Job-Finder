import api from "./axios";

export const fetchJobs = ({ page = 1, limit = 12 }) => 
    api.get(`/getAllJobs?page=${page}&limit=${limit}`)


export const searchJobs = ({
  title = "",
  location = "",
  skills = "",
  page = 1,
  limit = 12,
}) =>
  api.get("/searchJobs", {
    params: {
      title,
      location,
      skills,
      page,
      limit,
    },
  });