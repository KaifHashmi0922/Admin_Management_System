import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  EmailInputBox,
  PhoneInputBox,
  TextInputBox,
  DateInputBox
} from "../../components/InputBox";
import { Button } from "../../components/Button";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  Calendar,
  Play,
  PauseCircle,
  ArrowLeft
} from "lucide-react";
import useEmployeeUpdate from "../../api/hooks/Employee/useEmployeeEdit";

export default function EmployeeEdit() {
  const { email} = useParams();
  const navigate = useNavigate();

  const {
    formData,
    handleChange,
    handleSubmit,
    Cancel,
    toggleStatus,
    loading,
    employee
  } = useEmployeeUpdate(email);

  const handleCancel = () => {
    if (Cancel) {
      Cancel();
    } else {
      navigate(-1);
    }
  };

  // Determine active status based on the data
const isActive = formData?.status === "active";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading employee details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-4 py-12">
      <div className="w-full max-w-2xl relative">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-1">
          <div className="h-full w-full rounded-3xl bg-gradient-to-br from-slate-50 via-white to-blue-50/50 backdrop-blur-xl"></div>
        </div>

        {/* Main Card */}
        <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-100/50 p-8 lg:p-10 space-y-8">
          
          {/* Header */}
          <div className="text-center space-y-4 pt-4">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent text-4xl font-black tracking-tight">
              <div className="w-3 h-12 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-2xl shadow-lg"></div>
              <span>GOFinance</span>
            </div>
            
            <div>
              <h1 className="text-3xl lg:text-4xl font-black text-slate-900 mb-2 bg-gradient-to-r from-slate-900 to-slate-800 bg-clip-text">
                Edit Employee ✏️
              </h1>
              <p className="text-slate-600 text-sm lg:text-base max-w-sm mx-auto">
                Update {formData.fullname || "employee"} information securely
              </p>
            </div>
          </div>

          {/* Form */}
         <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* Full Name */}
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-200">
                <User className="w-5 h-5 text-slate-500" />
              </div>
              <TextInputBox
                placeholder="Full Name"
                name="fullname"
                value={formData.fullname || ""}
                onChange={handleChange}
                className="pl-16 pr-4 py-4 rounded-2xl border border-slate-200/50 bg-white/90 backdrop-blur-sm focus:border-blue-300 focus:ring-2 focus:ring-blue-200/50 hover:border-slate-300 transition-all duration-200 text-slate-900"
              />
            </div>

            {/* Email */}
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-200">
                <Mail className="w-5 h-5 text-slate-500" />
              </div>
              <EmailInputBox
                placeholder="Email Address"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                className="pl-16 pr-4 py-4 rounded-2xl border border-slate-200/50 bg-white/90 backdrop-blur-sm focus:border-blue-300 focus:ring-2 focus:ring-blue-200/50 hover:border-slate-300 transition-all duration-200 text-slate-900"
              />
            </div>

            {/* Phone */}
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-200">
                <Phone className="w-5 h-5 text-slate-500" />
              </div>
              <PhoneInputBox
                placeholder="Mobile Number"
                name="phone"
                value={formData.phone || ""}
                onChange={handleChange}
                className="pl-16 pr-4 py-4 rounded-2xl border border-slate-200/50 bg-white/90 backdrop-blur-sm focus:border-blue-300 focus:ring-2 focus:ring-blue-200/50 hover:border-slate-300 transition-all duration-200 text-slate-900"
              />
            </div>

            {/* Role */}
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-200">
                <Briefcase className="w-5 h-5 text-slate-500" />
              </div>
              <TextInputBox
                placeholder="Role/Position"
                name="role"
                value={formData.role || ""}
                onChange={handleChange}
                className="pl-16 pr-4 py-4 rounded-2xl border border-slate-200/50 bg-white/90 backdrop-blur-sm focus:border-blue-300 focus:ring-2 focus:ring-blue-200/50 hover:border-slate-300 transition-all duration-200 text-slate-900"
              />
            </div>

            {/* Joining Date */}
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-200">
                <Calendar className="w-5 h-5 text-slate-500" />
              </div>
              <DateInputBox
                name="joining"
                value={formData.joining || ""}
                onChange={handleChange}
                className="pl-16 pr-4 py-4 rounded-2xl border border-slate-200/50 bg-white/90 backdrop-blur-sm focus:border-blue-300 focus:ring-2 focus:ring-blue-200/50 hover:border-slate-300 transition-all duration-200 text-slate-900"
              />
            </div>

            {/* Status Toggle */}
            <div className="bg-gradient-to-r from-slate-50/60 to-blue-50/60 backdrop-blur-xl p-5 lg:p-6 rounded-2xl border border-slate-200/50 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl backdrop-blur-sm shadow-md ${
                    isActive ? 'bg-blue-100/80' : 'bg-orange-100/80'
                  }`}>
                    {isActive ? (
                      <Play className="w-5 h-5 text-blue-600" />
                    ) : (
                      <PauseCircle className="w-5 h-5 text-orange-600" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Account Status</h4>
                    <p className="text-slate-600 text-xs">
                      {isActive ? "Employee is active" : "Employee is inactive"}
                    </p>
                  </div>
                </div>
                
                <button
                  type="button"
                  onClick={toggleStatus}
                  className={`relative h-8 w-20 rounded-full p-1 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden ${
                    isActive ? 'bg-blue-500 shadow-blue-500/40' : 'bg-orange-400 shadow-orange-400/40'
                  }`}
                >
                  {/* Text Labels */}
                  <div className="absolute inset-0 flex items-center justify-between px-2.5 pointer-events-none z-10">
                    <span className={`text-[10px] font-bold text-white transition-opacity duration-300 ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}>
                      Active
                    </span>
                    <span className={`text-[10px] font-bold text-white transition-opacity duration-300 ${
                      isActive ? 'opacity-0' : 'opacity-100'
                    }`}>
                      Inactive
                    </span>
                  </div>
                  
                  {/* Sliding Knob */}
                  <div 
                    className={`w-6 h-6 bg-white rounded-full shadow-lg transition-all duration-300 ease-in-out z-20 relative ${
                      isActive ? 'translate-x-12' : 't  ranslate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                type="submit"
                className="group flex-1 py-5 rounded-2xl text-xl font-black text-white shadow-2xl hover:shadow-3xl transition-all duration-500 flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 hover:shadow-blue-500/50 hover:shadow-3xl hover:-translate-y-1 active:scale-[0.97]"
              >
                <div className="w-6 h-6 bg-white/30 backdrop-blur-sm rounded-xl p-2 shadow-lg group-hover:scale-110 transition-all">
                  <svg className="w-3 h-3 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                Update Employee
              </Button>

              <Button
                type="button"
                onClick={handleCancel}
                className="flex-1 py-5 rounded-2xl border-2 border-slate-200/50 bg-white/90 backdrop-blur-xl text-slate-800 font-black hover:bg-slate-50 hover:border-slate-300/70 hover:shadow-2xl hover:shadow-slate-100/50 hover:-translate-y-0.5 transition-all duration-500 shadow-xl active:scale-98 flex items-center justify-center gap-2 group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Cancel
              </Button>
            </div>

            {/* Footer Links */}
            <div className="pt-8 border-t-2 border-slate-200/60 bg-gradient-to-b from-slate-50/80 to-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-slate-600">
                <Link
                  to="/dashboard/employees-list"
                  className="group inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition-all duration-300 hover:gap-3"
                >
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full group-hover:scale-125 transition-transform"></div>
                  ← Back to Employees
                </Link>
              </div>
            </div>
          </form>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-6 -right-6 w-28 h-28 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-3xl blur-xl animate-pulse"></div>
        <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
    </div>
  );
}
