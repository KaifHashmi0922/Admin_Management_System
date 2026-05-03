import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardServices } from "../../services/DashboardServices";

export function useAnalytics() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    projects: 0,
    employees: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getAnalyticsData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const analytics = await DashboardServices.AnalyticsDataGet();

      setData({
        projects: analytics.projects,
        employees: analytics.employees,
      });

      } catch (err) {
        setError(err?.message || "Failed to load analytics data");

      
      if (err?.status === 401) {
        localStorage.clear();
        navigate("/login");
      }

    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    getAnalyticsData();
  }, [getAnalyticsData]);

  return {
    data,
    loading,
    error,
    refresh: getAnalyticsData,
  };
}