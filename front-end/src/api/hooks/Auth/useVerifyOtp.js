import { useState } from "react";
import { AuthServices } from "../../services/AuthServices";
import { useNavigate } from "react-router-dom";

export default function useVerifyOTP(email) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ otp: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ otp: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.otp) {
      setError("OTP is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await AuthServices.EmployeeVerifyOTP({
        email,
        otp: formData.otp,
      });

      navigate("/employee/change-password");

    } catch (err) {
      setError(err?.error || err?.message || "OTP verification failed");
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