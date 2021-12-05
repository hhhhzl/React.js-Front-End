import apiService from "./apiService";

// projects
export const apiGetAllProjects = (params = {}) =>
    apiService.get(`projects/`, { params });
export const apiCreateProject = (data) =>
    apiService.post(`projects/`, data);
export const apiGetProject = (projectID) =>
    apiService.get(`projects/${projectID}/`);
export const apiUpdateProject = (projectID, data) =>
    apiService.patch(`projects/${projectID}/`, data);

// progresses
export const apiGetAllProgresses = (projectID) =>
    apiService.get(`projects/${projectID}/progresses/`);
export const apiCreateProgress = (projectID, data) =>
    apiService.post(`projects/${projectID}/progresses/`, data);
export const apiGetProgress = (projectID, progressID) =>
    apiService.get(`projects/${projectID}/progresses/${progressID}/`);
export const apiUpdateProgress = (projectID, progressID, data) =>
    apiService.patch(`projects/${projectID}/progresses/${progressID}/`, data);
