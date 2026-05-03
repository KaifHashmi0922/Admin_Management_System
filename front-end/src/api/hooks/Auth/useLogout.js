import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthServices } from "../../services/AuthServices";

export default function useLogout() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      setLoading(true);

    const email=localStorage.getItem("email");

     const data= await AuthServices.EmployeeLogout(email);
     alert("Logout !!")

      localStorage.clear();
      navigate("/login");

    } catch (error) {
      alert("Logout Failed");
    } finally {
      setLoading(false);
    }
  };

  return {
    logout,
    loading,
  };
}