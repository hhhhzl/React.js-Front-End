import apiService from "./apiService";

// scores
export const apiGetAllScores = (params = {}) =>
    apiService.get(`scores/`, params);
// export const apiCreateScore = (data) =>
//     apiService.post(`scores/`, data);
export const apiGetScore = (id) =>
    apiService.get(`scores/${id}/`);
export const apiUpdateScore = (id, data) =>
    apiService.patch(`scores/${id}/`, data);
