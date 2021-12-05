import apiService from "./apiService";

// questionnaires
export const apiGetAllQnaires = () =>
    apiService.get(`questionnaires/`);
export const apiCreateQnaire = (data) =>
    apiService.post(`questionnaires/`, data);
export const apiGetQnaire = (qnaireID) =>
    apiService.get(`questionnaires/${qnaireID}/`);
export const apiUpdateQnaire = (qnaireID, data) =>
    apiService.patch(`questionnaires/${qnaireID}/`, data);
export const apiDeleteQnaire = (qnaireID) =>
    apiService.delete(`questionnaires/${qnaireID}/`);

// indicators
export const apiGetAllIndicators = (qnaireID) =>
    apiService.get(`questionnaires/${qnaireID}/indicators/`);
export const apiCreateIndicator = (qnaireID, data) =>
    apiService.post(`questionnaires/${qnaireID}/indicators/`, data);
export const apiGetIndicator = (qnaireID, indicatorID) =>
    apiService.get(`questionnaires/${qnaireID}/indicators/${indicatorID}/`);
export const apiUpdateIndicator = (qnaireID, indicatorID, data) =>
    apiService.patch(`questionnaires/${qnaireID}/indicators/${indicatorID}/`, data);
export const apiDeleteIndicator = (qnaireID, indicatorID) =>
    apiService.delete(`questionnaires/${qnaireID}/indicators/${indicatorID}/`);
