import apiService from "./apiService";

// submissions
export const apiGetAllSubmissions = (params = {}) =>
    apiService.get(`submissions/`, { params });
export const apiCreateSubmission = (data) =>
    apiService.post(`submissions/`, data);
export const apiGetSubmission = (id) =>
    apiService.get(`submissions/${id}/`);
export const apiUpdateSubmission = (id, data) =>
    apiService.patch(`submissions/${id}/`, data);
