import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EmployeesServices } from "../../services/EmployeeServices";

function useEmployeeUpdate(email) {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [originalEmail, setOriginalEmail] = useState("");

  const [formData, setFormData] = useState({
    id:"",
    fullname: "",
    email: "",
    phone: "",
    role: "",
    date: "",
    status: ""
  });

  // ===============================
  // Fetch Employee
  // ===============================
  const fetchEmployee = async () => {

    if (!email) {
      setLoading(false);
      return;
    }

    try {

      const data = await EmployeesServices.EmployeesGetByEmail(email);

      console.log("Employee Data:", data);

      if (data) {

        setOriginalEmail(data.email);

        setFormData({
          id:data.id||"",
          fullname: data.fullname || "",
          email: data.email || "",
          phone: data.phone || "",
          role: data.role || "",
          date: data.date || "",
          status: data.status== true ? "active" : "inactive"
        });

      }

    } catch (error) {

      console.error("Error fetching employee:", error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    fetchEmployee();
  }, [email]);

  // ===============================
  // Handle Input Change
  // ===============================
  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

  };

  // ===============================
  // Toggle Status
  // ===============================


  const toggleStatus = () => {

    setFormData((prev) => ({
      ...prev,
      status: prev.status === "active" ? "inactive" : "active"
    }));

  };

  // ===============================
  // Submit Update
  // ===============================
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      console.log("Submitting:", formData);

      await EmployeesServices.EmployeeUpdateByEmail(
        originalEmail,
        formData
      );

      alert("Employee Updated Successfully!");

      navigate("/dashboard/employees-list");

    } catch (error) {

      console.error("Update Error:", error);
      alert("Employee update failed");

    }

  };

  // ===============================
  // Cancel
  // ===============================
  const Cancel = () => {
    navigate("/dashboard/employees-list");
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    toggleStatus,
    Cancel,
    loading
  };

}

export default useEmployeeUpdate;