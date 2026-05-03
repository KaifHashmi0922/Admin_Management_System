import { useState } from "react";
import { EmployeesServices } from "../../services/EmployeeServices";

export function useEmployeeStatus() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleStatus = async (email) => {
    if (!email) return;

    setLoading(true);
    setError(null);

    try {
      await EmployeesServices.EmployeeStatusChange(email);
      return { success: true };
    } catch (error) {
      console.error("Status update failed", error);
      setError("Failed to update status");
      return { success: false, error: true };
    } finally {
      setLoading(false);
    }
  };

  return {
    toggleStatus,
    loading,
    error
  };
}
