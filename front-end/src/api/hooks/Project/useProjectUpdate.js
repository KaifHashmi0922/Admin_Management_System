import React from 'react'
import { useState ,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function useProjectUpdate() {
   const { id } = useParams();
     const navigate = useNavigate();
   
     const [project, setProject] = useState({
       name: "",
       description: "",
       project_budget: "",
       start_date: "",
       end_date: "",
       duration: "",
       project_logo: "",
       status:"",
     });

     const handleChange =(e)=>{
      setProject({...project,[e.target.name]:e.target.value})

     }
     
    
   
     const toggleStatus = () => {
       setProject({ ...project, status: !project.status });
     };
   
     const Submitproject = (e) => {
       e.preventDefault();
   
   
       console.log("Updated project:", project);
   
       alert("Project Updated Successfully!");
       navigate("/dashboard/project/display");
     };
    return {
    
        handleChange,
        Submitproject,
        toggleStatus,
        project,
        setProject
    }
 
}

export default useProjectUpdate