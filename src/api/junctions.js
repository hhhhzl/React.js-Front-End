import apiService from "./apiService";

// project-organization
export const apiGetAllProjectOrgs = () =>
	apiService.get(`junctions/project_org/`);
export const apiCreateProjectOrg = (data) =>
	apiService.post(`junctions/project_org/`, data);
export const apiGetProjectOrg = (projectID, orgID) =>
	apiService.get(`junctions/project_org/projects/${projectID}/organizations/${orgID}/`);
export const apiUpdateProjectOrg = (projectID, orgID, data) =>
	apiService.patch(`junctions/project_org/projects/${projectID}/organizations/${orgID}/`, data);
export const apiDeleteProjectOrg = (projectID, orgID) =>
	apiService.delete(`junctions/project_org/projects/${projectID}/organizations/${orgID}/`);

// question-expert
export const apiGetAllQuestionExperts = () =>
	apiService.get(`junctions/question_expert/`);
export const apiCreateQuestionExpert = (data) =>
	apiService.post(`junctions/question_expert/`, data);
export const apiGetQuestionExpert = (projectID, orgID) =>
	apiService.get(`junctions/question_expert/projects/${projectID}/organizations/${orgID}/`);
export const apiUpdateQuestionExpert = (projectID, orgID, data) =>
	apiService.patch(`junctions/question_expert/projects/${projectID}/organizations/${orgID}/`, data);
export const apiDeleteQuestionExpert = (projectID, orgID) =>
	apiService.delete(`junctions/question_expert/projects/${projectID}/organizations/${orgID}/`);
