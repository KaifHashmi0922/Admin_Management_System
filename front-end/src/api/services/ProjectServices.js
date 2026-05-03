/* The code you provided is a JavaScript module that defines a set of functions related to project
management. Here's a breakdown of what each part of the code is doing: */
import api from "../axios";

export const ProjectServices = {

  // ==============================
  // Register Project
  // ==============================
  ProjectCreate: async (data) => {
    const response = await api.post("/project/register/", data);
    return response.data;
  },

  // ==============================
  // Update Project By ID
  // ==============================
  ProjectUpdateById: async (id, data) => {
    const response = await api.patch("/project-update/", {
      id,
      ...data,
    });
    return response.data;
  },

  // ==============================
  // Search Project
  // ==============================
  ProjectGetBySearchbar: async (query) => {
    const response = await api.get("/project-search/", {
      params: { q: query },
    });
    return response.data;
  },

  // ==============================
  // Get All Projects
  // ==============================
  ProjectsGet: async () => {
    const response = await api.get("/projects_list/");
    return response.data;
  },

  // ==============================
  // Get Project By ID
  // ==============================
  ProjectsGetById: async (id) => {
    const response = await api.get(`/project/${id}/`);
    return response.data;
  },

  // ==============================
  // Change Project Status
  // ==============================
  ProjectStatusChange: async (id) => {
    const response = await api.patch("/project-status-change/", { id });
    return response.data;
  },

  // ==============================
  // Delete Project
  // ==============================
  ProjectDeleteById: async (id) => {
    const response = await api.delete("/project-delete/", {
      data: { id },
    });
    return response.data;
  },

};