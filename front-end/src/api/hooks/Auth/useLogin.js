import { useState } from "react";
import { AuthServices } from "../../services/AuthServices";
import { useNavigate } from "react-router-dom";

function useLogin() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const LoginSubmit = async (e) => {
    e?.preventDefault();

    try {
      setLoading(true);

      const data = await AuthServices.EmployeeLogin(formData);

      console.log("Login Response:", data);
      // console.log(user_data)
      

      if (data?.access) {
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);

        // save user info
        if (data?.user) {
          localStorage.setItem("email",data.user.email);
         
        }
        
        navigate("/dashboard");
      }
    

    } catch (error) {
      console.log("Login Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    handleChange,
    LoginSubmit,
    loading,
    showPassword,
    setShowPassword,
  

    
  };
}

export default useLogin;