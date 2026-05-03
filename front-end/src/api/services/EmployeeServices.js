import api from "../axios";

export const EmployeesServices = {

  // ==============================
  // Register Employee
  // ==============================
  EmployeeCreate: async (data) => {
    const response = await api.post("/register/", data);
    return response.data;
  },

  // ==============================
  // Login Employee
  // ==============================
  EmployeeLogin: async (data) => {
    const response = await api.post("/login/", data);
    return response.data;
  },

  // ==============================
  // Logout Employee
  // ==============================
  EmployeeLogout: async (email) => {
    const response = await api.post("/employee_logout/",email);
    return response.data;
  },

  // ==============================
  // Forget Password
  // ==============================
  EmployeeForgetPassword: async (data) => {
    const response = await api.post("/forget-password/", data);
    return response.data;
  },

  // ==============================
  // Change Password
  // ==============================
  EmployeeChangePassword: async (data) => {
    const response = await api.post("/change-password/", data);
    return response.data;
  },

  // ==============================
  // Update Employee By ID
  // ==============================
     EmployeeUpdateByEmail: async (email, data) => {
    const payload = {
      email: email,
      ...data 
    };

    const response = await api.patch("/employee_update/", payload);
    return response.data;
  },
  // ==============================
  // Update Employee Profile
  // ==============================
  EmployeeProfileUpdate: async (id, data) => {
    const response = await api.patch("/employee_profile_update/", {
      id,
      ...data,
    });
    return response.data;
  },

  // ==============================
  // Search Employee
  // ==============================
    EmployeeQuery: async (query) => {
      const response = await api.get("/employee_query/", {
        params: { q: query },
      });
      return response.data;
    },

  // ==============================
  // Get All Employees
  // ==============================
  EmployeesList: async () => {
    const response = await api.get("/employees_list/");
    return response.data;
  },

  // ==============================
  // Get Employee By ID
  // ==============================
  EmployeesGetByEmail: async (email) => {
    const response = await api.post("/employee_profile/", { email });
    return response.data;
  },

  // ==============================
  // Change Employee Status
  // ==============================
   EmployeeStatusChange: async (email) => {
    // Ensure the endpoint matches your Django URL config
    const response = await api.patch("/employee_status_change/", { email });
    return response.data;
  },
  // ==============================
  // Delete Employee
  // ==============================
  EmployeeDeleteByEmail: async (email) => {
    const response = await api.delete("/employee-delete/",email);
    return response.data;
  },
    EmployeeProfile: async () => {
    const response = await api.get("/profile/");
    return response.data;
  },

};