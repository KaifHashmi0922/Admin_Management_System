// services/DashboardServices.js
import api from "../axios";

const handleError = (error, defaultMessage) => {
  if (error.response?.data) {
    throw error.response.data;
  }
  throw { message: defaultMessage };
};

export const DashboardServices = {
  AnalyticsDataGet: async () => {
    try {
      const { data } = await api.get("/dashboard/");
      return data;
    } catch (error) {
      handleError(error, "Failed to fetch dashboard data");
    }
  },
};