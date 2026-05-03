// src/api/hooks/Project/useProjectList.js
import { useState, useEffect, useCallback, useMemo } from 'react';
import { ProjectServices } from '../../services/ProjectServices'; // ✅ YOUR REAL SERVICE

export function useProjectList() {
  const [projects, setProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // ✅ YOUR REAL API CALLS
  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ProjectServices.ProjectsGet(); // ✅ YOUR ENDPOINT
      setAllProjects(data || []);
    } catch (err) {
      console.error('Projects fetch error:', err);
      setError('Failed to load projects');
      
      // ✅ FALLBACK DATA (if backend fails)
      setAllProjects([
        { 
          id: 1, name: "Freelancer Marketplace", client: "Your Company", 
          budget: 150000, spent: 75000, progress: 50, status: true, 
          endDate: "30 Jun 2026", teamSize: 3, priority: "High"
        },
        { 
          id: 2, name: "Trolly Mate E-commerce", client: "E-Store Ltd", 
          budget: 120000, spent: 48000, progress: 40, status: true, 
          endDate: "15 Aug 2026", teamSize: 2, priority: "Medium"
        }
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Search integration with YOUR API
  const handleSearch = useCallback(async (query) => {
    if (!query) {
      await fetchProjects();
      return;
    }
    try {
      setLoading(true);
      const data = await ProjectServices.ProjectGetBySearchbar(query); // ✅ YOUR SEARCH
      setAllProjects(data || []);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  }, [fetchProjects]);

  // Filter (client-side fallback)
  const filteredProjects = useMemo(() => {
    if (!searchTerm) return allProjects;
    return allProjects.filter(project =>
      project.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.priority?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allProjects, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const currentProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProjects.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProjects, currentPage]);

  // Reset page on search
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Auto-adjust page
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages || 1);
  }, [filteredProjects.length, totalPages, currentPage]);

  // Initial fetch
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // ✅ YOUR REAL API ACTIONS
  const toggleStatus = useCallback(async (id) => {
    try {
      await ProjectServices.ProjectStatusChange(id); // ✅ YOUR ENDPOINT
      await fetchProjects();
    } catch (err) {
      console.error('Status toggle failed:', err);
    }
  }, [fetchProjects]);

  const deleteProject = useCallback(async (id) => {
    try {
      await ProjectServices.ProjectDeleteById(id); // ✅ YOUR ENDPOINT
      await fetchProjects();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  }, [fetchProjects]);

  return {
    projects: currentProjects,      // Paginated
    filteredProjects,              // Search filtered
    allProjects,                   // Raw data
    loading,
    error,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    totalPages,
    refetch: fetchProjects,
    toggleStatus,
    deleteProject,
    handleSearch
  };
}
