import api from "./axios";

export const fetchJobs = ({ page = 1, limit = 12 }) => 
    api.get(`/getAllJobs?page=${page}&limit=${limit}`)