import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/Button";
import { TextInputBox, DateInputBox } from "../../components/InputBox";
import { 
  Folder, DollarSign, Calendar, Clock, FileText, Image, 
  ShieldCheck, CheckCircle2, ArrowLeft, Play, PauseCircle 
} from "lucide-react";
import useProjectUpdate from "../../api/hooks/Project/useProjectUpdate";

export default function ProjectEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const {
    Submitproject,
    toggleStatus,
    handleChange,
    project,
    setProject
  } = useProjectUpdate();

  // Load project data on mount
  useEffect(() => {
    if (id) {
      // Fetch project data here if not handled in hook
      // Example: fetchProject(id).then(data => setProject(data));
    }
  }, [id]);

  const handleCancel = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-4 py-12">
      <div className="w-full max-w-4xl relative">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-1">
          <div className="h-full w-full rounded-3xl bg-gradient-to-br from-slate-50 via-white to-blue-50/50 backdrop-blur-xl"></div>
        </div>

        {/* Main Card */}
        <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-100/50 p-8 lg:p-12 space-y-8">
          
          {/* Header */}
          <div className="text-center space-y-3 pt-4">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent text-3xl lg:text-4xl font-black tracking-tight mx-auto">
              <div className="w-2.5 h-12 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-xl shadow-lg"></div>
              <span>GOFinance</span>
            </div>
            
            <div>
              <h1 className="text-2xl lg:text-3xl font-black text-slate-900 mb-1.5 bg-gradient-to-r from-slate-900 to-slate-800 bg-clip-text">
                Edit Project <span className="text-emerald-600">✏️</span>
              </h1>
              <p className="text-slate-600 text-sm lg:text-base max-w-md mx-auto">
                Update {project?.name || "project"} details below
              </p>
            </div>
          </div>

          {/* Form Grid */}
          <form onSubmit={Submitproject} className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            
            {/* Project Name */}
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-200 z-10">
                <Folder className="w-5 h-5 text-slate-500" />
              </div>
              <TextInputBox
                placeholder="Project Name"
                name="name"
                value={project?.name || ""}
                onChange={handleChange}
                className="pl-16 pr-4 py-3.5 rounded-2xl border border-slate-200/50 bg-white/90 backdrop-blur-sm focus:border-emerald-300 focus:ring-2 focus:ring-emerald-200/50 hover:border-slate-300 transition-all duration-200 text-slate-900 font-semibold"
              />
            </div>

            {/* Project Budget */}
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-200 z-10">
                <DollarSign className="w-5 h-5 text-slate-500" />
              </div>
              <TextInputBox
                placeholder="Project Budget (₹)"
                name="project_budget"
                value={project?.project_budget || ""}
                onChange={handleChange}
                className="pl-16 pr-4 py-3.5 rounded-2xl border border-slate-200/50 bg-white/90 backdrop-blur-sm focus:border-emerald-300 focus:ring-2 focus:ring-emerald-200/50 hover:border-slate-300 transition-all duration-200 text-slate-900 font-mono"
              />
            </div>

            {/* Start Date */}
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-200 z-10">
                <Calendar className="w-5 h-5 text-slate-500" />
              </div>
              <DateInputBox
                name="start_date"
                value={project?.start_date || ""}
                onChange={handleChange}
                className="pl-16 pr-4 py-3.5 rounded-2xl border border-slate-200/50 bg-white/90 backdrop-blur-sm focus:border-emerald-300 focus:ring-2 focus:ring-emerald-200/50 hover:border-slate-300 transition-all duration-200 text-slate-900"
              />
            </div>

            {/* End Date */}
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-200 z-10">
                <Calendar className="w-5 h-5 text-slate-500" />
              </div>
              <DateInputBox
                name="end_date"
                value={project?.end_date || ""}
                onChange={handleChange}
                className="pl-16 pr-4 py-3.5 rounded-2xl border border-slate-200/50 bg-white/90 backdrop-blur-sm focus:border-emerald-300 focus:ring-2 focus:ring-emerald-200/50 hover:border-slate-300 transition-all duration-200 text-slate-900"
              />
            </div>

            {/* Duration */}
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-200 z-10">
                <Clock className="w-5 h-5 text-slate-500" />
              </div>
              <TextInputBox
                placeholder="Duration (days)"
                name="duration"
                value={project?.duration || ""}
                onChange={handleChange}
                className="pl-16 pr-4 py-3.5 rounded-2xl border border-slate-200/50 bg-white/90 backdrop-blur-sm focus:border-emerald-300 focus:ring-2 focus:ring-emerald-200/50 hover:border-slate-300 transition-all duration-200 text-slate-900 font-mono"
              />
            </div>

            {/* Project Logo/Image */}
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-200 z-10">
                <Image className="w-5 h-5 text-slate-500" />
              </div>
              <input
                type="file"
                name="logo"
                onChange={handleChange}
                className="w-full pl-16 pr-4 py-3.5 rounded-2xl border-2 border-dashed border-slate-200/50 bg-white/90 backdrop-blur-sm hover:border-emerald-300 hover:bg-emerald-50/50 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200/50 transition-all duration-300 text-slate-700 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-emerald-500 file:text-white hover:file:bg-emerald-600 cursor-pointer"
                accept="image/*"
              />
            </div>

            {/* Project Description - Full Width */}
            <div className="lg:col-span-2 relative group">
              <div className="absolute left-4 top-4 bg-white/80 backdrop-blur-sm p-2 rounded-2xl shadow-sm group-hover:shadow-md transition-all duration-200 z-10">
                <FileText className="w-6 h-6 text-slate-500" />
              </div>
              <textarea
                name="description"
                placeholder="Project Description..."
                value={project?.description || ""}
                onChange={handleChange}
                rows={4}
                className="pl-16 pt-12 pr-6 pb-6 w-full rounded-3xl border border-slate-200/50 bg-white/90 backdrop-blur-sm focus:border-emerald-300 focus:ring-2 focus:ring-emerald-200/50 hover:border-slate-300 resize-vertical transition-all duration-300 text-slate-900 font-medium text-base leading-relaxed"
              />
            </div>

            {/* ✨ COMPACT STATUS TOGGLE - WORKING PERFECTLY */}
            <div className="lg:col-span-2 bg-gradient-to-r from-slate-50/60 to-emerald-50/60 backdrop-blur-xl p-5 lg:p-6 rounded-2xl border border-slate-200/50 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl backdrop-blur-sm shadow-md ${
                    project?.status 
                      ? 'bg-emerald-100/80' 
                      : 'bg-orange-100/80'
                  }`}>
                    {project?.status ? (
                      <Play className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <PauseCircle className="w-5 h-5 text-orange-600" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Project Status</h4>
                    <p className="text-slate-600 text-xs">
                      {project?.status ? "Project is active" : "Project is paused"}
                    </p>
                  </div>
                </div>
                
                {/* ✅ FIXED TOGGLE BUTTON */}
                <button
                  type="button"
                  onClick={toggleStatus}
                  className={`relative h-8 w-20 rounded-full p-1 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden ${
                    project?.status 
                      ? 'bg-emerald-500 shadow-emerald-500/40' 
                      : 'bg-orange-400 shadow-orange-400/40'
                  }`}
                >
                  {/* Text Labels */}
                  <div className="absolute inset-0 flex items-center justify-between px-2.5 pointer-events-none z-10">
                    <span className={`text-[10px] font-bold text-white transition-opacity duration-300 ${
                      project?.status ? 'opacity-100' : 'opacity-0'
                    }`}>
                      Active
                    </span>
                    <span className={`text-[10px] font-bold text-white transition-opacity duration-300 ${
                      project?.status ? 'opacity-0' : 'opacity-100'
                    }`}>
                      Deactive
                    </span>
                  </div>
                  
                  {/* Sliding Knob - Perfect Animation */}
                  <div 
                    className={`w-6 h-6 bg-white rounded-full shadow-lg transition-all duration-300 ease-in-out z-20 relative ${
                      project?.status ? 'translate-x-12' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="lg:col-span-2 flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200/60">
              <Button
                type="submit"
                className="group flex-1 py-4 rounded-2xl text-lg font-bold text-white shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:via-teal-700 hover:to-emerald-800 hover:-translate-y-0.5 active:scale-[0.98]"
              >
                <CheckCircle2 className="w-5 h-5" />
                Update Project
              </Button>

              <Button
                type="button"
                onClick={handleCancel}
                className="flex-1 py-4 rounded-2xl border-2 border-slate-200/50 bg-white/90 backdrop-blur-xl text-slate-800 font-bold hover:bg-slate-50 hover:border-slate-300/70 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 active:scale-98 flex items-center justify-center gap-2 group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Cancel
              </Button>
            </div>
          </form>

          {/* Footer Back Link */}
          <div className="pt-6 border-t border-slate-200/60 bg-gradient-to-b from-slate-50/60 to-white/60 backdrop-blur-xl rounded-2xl p-6">
            <Link
              to="/dashboard/project/display"
              className="group inline-flex items-center gap-2.5 text-indigo-600 font-bold text-base hover:text-indigo-700 transition-all duration-300 hover:gap-3"
            >
              <div className="w-2 h-2 bg-indigo-500 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
              ← Back to Projects
            </Link>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-8 -right-12 w-32 h-32 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-12 -left-12 w-44 h-44 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
    </div>
  );
}
