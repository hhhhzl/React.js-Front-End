import apiService from "./apiService";

// questions
export const apiGetAllQuestions = (params = {}) =>
    apiService.get(`questions/`, { params });
export const apiCreateQuestion = (data) =>
    apiService.post(`questions/`, data);
export const apiGetQuestion = (questionID) =>
    apiService.get(`questions/${questionID}/`);
export const apiUpdateQuestion = (questionID, data) =>
    apiService.patch(`questions/${questionID}/`, data);
export const apiDeleteQuestion = (questionID) =>
    apiService.delete(`questions/${questionID}/`);
