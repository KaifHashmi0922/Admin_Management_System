import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthServices } from "../../services/AuthServices";

function useChangePassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const isDashboard = location.pathname.includes("dashboard");

  const [formData, setFormData] = useState({
    password: "",
    confirm_password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const Cancel = () => {
    if (isDashboard) {
      navigate("/dashboard/employee-profile");
    } else {
      localStorage.clear();
      navigate("/login");
    }
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.password || !formData.confirm_password) {
      setError("All fields are required");
      return;
    }

    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const email = localStorage.getItem("email");

      await AuthServices.EmployeeChangePassword({
        email,
        password: formData.password,
      });

      alert("Password changed successfully");
      localStorage.clear();

      navigate(isDashboard ? "/dashboard/employee-profile" : "/login");

    } catch (err) {
      setError(err?.error || err?.message || "Password update failed");
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    HandleChange,
    HandleSubmit,
    Cancel,
    loading,
    error,
  };
}

export default useChangePassword;