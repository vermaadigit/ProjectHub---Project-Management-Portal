import api from "./api";

export const taskService = {
  async getTasks(projectId, params = {}) {
    const response = await api.get(`/projects/${projectId}/tasks`, { params });
    return response.data;
  },

  async createTask(projectId, taskData) {
    const response = await api.post(`/projects/${projectId}/tasks`, taskData);
    return response.data;
  },

  async updateTask(id, taskData) {
    const response = await api.put(`/tasks/${id}`, taskData);
    return response.data;
  },

  async deleteTask(id) {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },
};
