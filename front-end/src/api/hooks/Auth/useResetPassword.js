import { useState } from "react";
import { AuthServices } from "../../services/AuthServices";
import { useNavigate } from "react-router-dom";

export default function useResetPassword() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ email: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email) {
      setError("Email is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await AuthServices.EmployeeResetPassword(formData);

      localStorage.setItem("email", formData.email);
      navigate("/employee/otp-verify");

    } catch (err) {
      setError(err?.error || err?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    loading,
    error,
  };
}