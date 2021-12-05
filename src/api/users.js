import apiService from "./apiService";

// users
export const apiGetAllUsers = () =>
    apiService.get(`users/`);
export const apiGetUser = (userID) =>
    apiService.get(`users/${userID}/`);
export const apiUpdateUser = (userID, data) =>
    apiService.patch(`users/${userID}/`, data);

// auth
export const apiRegisterUser = (data) =>
    apiService.post(`users/register/`, data);
export const apiLoginUser = (username, password) =>
    apiService.post(`users/login/`, { username, password });
export const apiGetTokenProfile = () =>
    apiService.get(`users/token_profile/`);
