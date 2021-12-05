import apiService from "./apiService";

// organizations
export const apiGetAllOrgs = () => 
  apiService.get(`organizations/`);
export const apiCreateOrg = (data) => 
  apiService.post(`organizations/`, data);
export const apiGetOrg = (orgID) => 
  apiService.get(`organizations/${orgID}/`);
export const apiUpdateOrg = (orgID, data) =>
  apiService.patch(`organizations/${orgID}/`, data);
export const apiDeleteOrg = (orgID) =>
  apiService.delete(`organizations/${orgID}/`);
