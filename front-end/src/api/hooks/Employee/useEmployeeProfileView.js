// src/api/hooks/Employee/useEmployeeProfileView.js
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EmployeesServices } from "../../services/EmployeeServices";

export function useEmployeeProfileView(email) {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      if (!email) return;

      setLoading(true);
      setError(null);

      try {
        const data = await EmployeesServices.EmployeesGetByEmail(email);

        if (data) {
          setEmployee(data);

          // Static demo data – replace with API calls when ready
          setTasks([
            {
              id: 1,
              title: "Complete Dashboard UI Design",
              description:
                "Finalize responsive design for admin dashboard with glassmorphism effects",
              status: "in-progress",
              priority: "High",
              dueDate: "Mar 15, 2026"
            },
            {
              id: 2,
              title: "API Integration Testing",
              description:
                "Test employee management APIs and authentication endpoints",
              status: "completed",
              priority: "Medium",
              dueDate: "Mar 10, 2020"
            },
            {
              id: 3,
              title: "Freelancer Platform MVP",
              description:
                "Build core features for Upwork clone (profile, bids, payments)",
              status: "pending",
              priority: "High",
              dueDate: "Mar 20, 2026"
            }
          ]);

          setProjects([
            {
              id: 1,
              name: "Freelancer Marketplace",
              description:
                "Complete Upwork clone with React frontend + Django backend",
              role: "Full Stack Developer",
              startDate: "Jan 15, 2026",
              endDate: "Jun 30, 2026",
              skills: [
                "React",
                "Django",
                "PostgreSQL",
                "Tailwind CSS",
                "JWT Auth"
              ]
            },
            {
              id: 2,
              name: "E-commerce Platform - Trolly Mate",
              description:
                "Admin + Customer dashboard with payment integration",
              role: "Frontend Developer",
              startDate: "Feb 01, 2026",
              endDate: "Apr 30, 2020",
              skills: ["React", "FastAPI", "Stripe", "PostgreSQL"]
            }
          ]);
        }
      } catch (err) {
        console.error("Error fetching employee data:", err);
        setError("Failed to load employee data");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, [email]);

  return {
    employee,
    tasks,
    projects,
    loading,
    error,
    navigate
  };
}
