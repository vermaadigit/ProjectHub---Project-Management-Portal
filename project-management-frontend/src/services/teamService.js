import api from "./api";

export const teamService = {
  async getTeamMembers(projectId) {
    const response = await api.get(`/projects/${projectId}/teams`);
    return response.data;
  },

  async addTeamMember(projectId, memberData) {
    const response = await api.post(`/projects/${projectId}/teams`, memberData);
    return response.data;
  },

  async removeTeamMember(id) {
    const response = await api.delete(`/teams/${id}`);
    return response.data;
  },
};
