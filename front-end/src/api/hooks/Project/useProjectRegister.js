import React from 'react'
import { useState ,useEffect } from 'react'
// import { ProjectServices } from '../../services/ProjectServices';

function useRegister() {
    const [error,setError]=useState(null);


    const [formData,setFormData]=useState({
        projectName:'',

        projectEmail:'',
        projectPhone:'',
        projectType:'',
        projectBudget:'',
        projectImage:'',
        startingDate:'',
        endingDate:'',
        projectDescription:'',
        projectStatus:'',
        
    })
    console.log("formData ", formData);
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const toggleStatus = () => {
    setProject({ ...project, status: !project.status });
  };


    const SubmitProject= async(e)=>{
        e.preventDefault();
        try {
            // const response = await ProjectServices.createProject(formData);
            // console.log("Project created:", response);
        } catch (err) {
            setError(err.message);
        }
    }

    
    return {
        formData,
        setFormData,
        handleChange,
        SubmitProject   ,
        toggleStatus
    }
 
}

export default useRegister