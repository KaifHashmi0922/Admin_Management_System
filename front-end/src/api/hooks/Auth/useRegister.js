// hooks/useRegister.js
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthServices } from "../../services/AuthServices";

function useRegister() {
  const navigate = useNavigate();
  const location = useLocation();
  const token=localStorage.getItem("access")
  const Dashboard = location.pathname.includes("dashboard");
  const isDashboard=useState(true);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    confirm_Password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.fullname.trim())
      newErrors.fullname = "Full name is required";

    if (!formData.email.trim())
      newErrors.email = "Email is required";

    if (!formData.phone.trim())
      newErrors.phone = "Phone is required";

    if (!formData.password)
      newErrors.password = "Password is required";

    if (formData.password !== formData.confirm_Password)
      newErrors.confirm_Password = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const RegisterSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const { confirm_Password, ...payload } = formData;

      const rep=await AuthServices.EmployeeCreate(payload);
      console.log(rep)

      alert("reposnes")
  
      if (isDashboard) {
        navigate("/dashboard/employees-list");
      } else {
        localStorage.setItem("email", payload.email);
        navigate("/dashboard");
      }
      


      setFormData({
        fullname: "",
        email: "",
        phone: "",
        password: "",
        confirm_Password: "",
      });

    } catch (error) {
      setErrors(error || { general: "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    errors,
    loading,
    handleChange,
    RegisterSubmit,
    token,
  };
}

export default useRegister;