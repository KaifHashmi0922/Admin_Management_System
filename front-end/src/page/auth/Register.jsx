// import { Link } from "react-router-dom";
// import { useState } from "react";
// import {
//   EmailInputBox,
//   PasswordInputBox,
//   PhoneInputBox,
//   TextInputBox,
// } from "../../components/InputBox";
// import { Button } from "../../components/Button";
// import { User, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react";
// import useRegister from "../../api/hooks/Auth/useRegister";

// export default function Register() {
//   const {
//     formData,
//     errors,
//     loading,
//     handleChange,
//     RegisterSubmit,
//     isdashboard,
//     dashboard,
//     token,
//     Cancel,
//   } = useRegister();

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const isDisabled = loading || !formData.fullname || !formData.email || !formData.phone || !formData.password || !formData.confirm_Password;

//   return (
//     <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-4 py-12">
//       <div className="w-full max-w-md relative">
//         {/* Animated Background - IDENTICAL TO LOGIN */}
//         <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-1">
//           <div className="h-full w-full rounded-3xl bg-gradient-to-br from-slate-50 via-white to-blue-50/50 backdrop-blur-xl"></div>
//         </div>

//         {/* Main Card - IDENTICAL TO LOGIN */}
//         <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-100/50 p-8 lg:p-10 space-y-8">
          
//           {/* Logo & Welcome - IDENTICAL TO LOGIN */}
//           <div className="text-center space-y-4 pt-4">
//             <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent text-4xl font-black tracking-tight">
//               <div className="w-3 h-12 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-2xl shadow-lg p-2"></div>
//               <span>GOFinance</span>
//             </div>
            
//             <div>
//               <h1 className="text-3xl lg:text-4xl font-black text-slate-900 mb-2 bg-gradient-to-r from-slate-900 to-slate-800 bg-clip-text">
//                 {token ? "Create Employee" : "Create Account"}<span className="text-blue-600"> ✨</span>
//               </h1>
//               <p className="text-slate-600 text-sm lg:text-base max-w-sm mx-auto">
//                 {token ? "Add new team member to your organization" : "Join our secure financial platform"}
//               </p>
//             </div>
//           </div>

//           {/* Form - IDENTICAL LOGIN STRUCTURE */}
//           <form className="space-y-6" method="post" onSubmit={RegisterSubmit}>
            
//             {/* Error - IDENTICAL TO LOGIN */}
//             {errors?.general && (
//               <div className="bg-gradient-to-r from-rose-50 to-red-50 border border-red-200/50 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
//                 <div className="flex items-start gap-3 text-sm text-red-800">
//                   <div className="w-5 h-5 bg-red-400/20 rounded-xl p-1.5 mt-0.5 flex-shrink-0">
//                     <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                     </svg>
//                   </div>
//                   <span>{errors.general}</span>
//                 </div>
//               </div>
//             )}

//             {/* Full Name - SAME LOGIN INPUT STYLE */}
//             <div className="relative group">
//               <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-200">
//                 <User className="w-5 h-5 text-slate-500" />
//               </div>
//               <TextInputBox
//                 placeholder="Enter your full name"
//                 name="fullname"
//                 value={formData.fullname || ""}
//                 onChange={handleChange}
//                 className="pl-16 pr-4 py-4 rounded-2xl border border-slate-200/50 bg-white/90 backdrop-blur-sm focus:border-blue-300 focus:ring-2 focus:ring-blue-200/50 hover:border-slate-300 transition-all duration-200 text-slate-900"
//               />
//             </div>

//             {/* Email - SAME LOGIN INPUT STYLE */}
//             <div className="relative group">
//               <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-200">
//                 <Mail className="w-5 h-5 text-slate-500" />
//               </div>
//               <EmailInputBox
//                 placeholder="Enter your email"
//                 name="email"
//                 value={formData.email || ""}
//                 onChange={handleChange}
//                 className="pl-16 pr-4 py-4 rounded-2xl border border-slate-200/50 bg-white/90 backdrop-blur-sm focus:border-blue-300 focus:ring-2 focus:ring-blue-200/50 hover:border-slate-300 transition-all duration-200 text-slate-900"
//               />
//             </div>

//             {/* Phone - SAME LOGIN INPUT STYLE */}
//             <div className="relative group">
//               <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-200">
//                 <Phone className="w-5 h-5 text-slate-500" />
//               </div>
//               <PhoneInputBox
//                 placeholder="Enter your phone"
//                 name="phone"
//                 value={formData.phone || ""}
//                 onChange={handleChange}
//                 className="pl-16 pr-4 py-4 rounded-2xl border border-slate-200/50 bg-white/90 backdrop-blur-sm focus:border-blue-300 focus:ring-2 focus:ring-blue-200/50 hover:border-slate-300 transition-all duration-200 text-slate-900"
//               />
//             </div>

//             {/* Password - IDENTICAL LOGIN PASSWORD */}
//             <div className="relative group">
//               <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-200">
//                 <Lock className="w-5 h-5 text-slate-500" />
//               </div>
//               <PasswordInputBox
//                 placeholder="Create password"
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 value={formData.password || ""}
//                 onChange={handleChange}
//                 className="pl-16 pr-12 py-4 rounded-2xl border border-slate-200/50 bg-white/90 backdrop-blur-sm focus:border-blue-300 focus:ring-2 focus:ring-blue-200/50 hover:border-slate-300 transition-all duration-200 text-slate-900"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-white/70 rounded-xl transition-all duration-200 hover:scale-105 group-hover:shadow-md"
//               >
//                 {showPassword ? (
//                   <EyeOff className="w-5 h-5 text-slate-500" />
//                 ) : (
//                   <Eye className="w-5 h-5 text-slate-500" />
//                 )}
//               </button>
//             </div>

//             {/* Confirm Password - IDENTICAL LOGIN PASSWORD */}
//             <div className="relative group">
//               <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-200">
//                 <Lock className="w-5 h-5 text-slate-500" />
//               </div>
//               <PasswordInputBox
//                 placeholder="Confirm password"
//                 name="confirm_Password"
//                 type={showConfirmPassword ? "text" : "password"}
//                 value={formData.confirm_Password || ""}
//                 onChange={handleChange}
//                 className="pl-16 pr-12 py-4 rounded-2xl border border-slate-200/50 bg-white/90 backdrop-blur-sm focus:border-blue-300 focus:ring-2 focus:ring-blue-200/50 hover:border-slate-300 transition-all duration-200 text-slate-900"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-white/70 rounded-xl transition-all duration-200 hover:scale-105 group-hover:shadow-md"
//               >
//                 {showConfirmPassword ? (
//                   <EyeOff className="w-5 h-5 text-slate-500" />
//                 ) : (
//                   <Eye className="w-5 h-5 text-slate-500" />
//                 )}
//               </button>
//             </div>

//             {/* Submit Button - IDENTICAL TO LOGIN */}
//             <Button
//               type="submit"
//               disabled={isDisabled}
//               className={`group w-full py-4 rounded-2xl text-lg font-bold text-white shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3
//                 ${isDisabled || loading
//                   ? "bg-gradient-to-r from-slate-400 to-slate-500 cursor-not-allowed"
//                   : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:-translate-y-1 hover:shadow-blue-500/25 active:scale-95"
//                 }`}
//             >
//               {loading ? (
//                 <>
//                   <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                   Creating...
//                 </>
//               ) : token ? (
//                 <>
//                   <div className="w-5 h-5 bg-white/20 rounded-lg backdrop-blur-sm p-1.5 group-hover:scale-110 transition-transform duration-200">
//                     <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                     </svg>
//                   </div>
//                   Create Employee
//                 </>
//               ) : (
//                 <>
//                   <div className="w-5 h-5 bg-white/20 rounded-lg backdrop-blur-sm p-1.5 group-hover:scale-110 transition-transform duration-200">
//                     <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                     </svg>
//                   </div>
//                   Create Account
//                 </>
//               )}
//             </Button>

//             {/* Footer Links - IDENTICAL TO LOGIN */}
//                       {/* Footer Links - FIXED */}
//           <div className="pt-6 border-t border-slate-200/50">
//             {!token ? (
//               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-slate-600">
//                 <button
//                   type="button"
//                   onClick={Cancel}
//                   className="px-6 py-2 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/50 text-slate-700 font-semibold hover:bg-slate-50 hover:border-slate-300 hover:shadow-md transition-all duration-200"
//                 >
//                   Cancel
//                 </button>
//                 <Link
//                   to="/login"
//                   className="group inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition-all duration-200 hover:gap-3 text-center"
//                 >
//                   <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full group-hover:scale-125 transition-transform"></div>
//                   Have Account? Login
//                 </Link>
//               </div>
//             ) : (
//               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-slate-600">
//                 <Link
//                   to="/dashboard/employees"  // ADD PROPER BACK LINK
//                   className="px-6 py-2 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/50 text-slate-700 font-semibold hover:bg-slate-50 hover:border-slate-300 hover:shadow-md transition-all duration-200 inline-flex items-center gap-2"
//                 >
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                   </svg>
//                   Back to Employees
//                 </Link>
//                 <div className="flex items-center gap-4">
//                   <Link
//                     to="/login"
//                     className="group inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition-all duration-200 hover:gap-3"
//                   >
//                     <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full group-hover:scale-125 transition-transform"></div>
//                     Login Instead
//                   </Link>
//                   <Link
//                     to="/employee/reset-password"
//                     className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors duration-200"
//                   >
//                     Forgot Password?
//                   </Link>
//                 </div>
//               </div>
//             )}
//           </div>

//           </form>
//         </div>

//         {/* Decorative Elements - IDENTICAL TO LOGIN */}
//         <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-3xl blur-xl animate-pulse"></div>
//         <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
//       </div>
//     </div>
//   );
// }
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  EmailInputBox,
  PasswordInputBox,
  PhoneInputBox,
  TextInputBox,
} from "../../components/InputBox";
import { Button } from "../../components/Button";
import { User, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react";
import useRegister from "../../api/hooks/Auth/useRegister";

export default function Register() {
  const {
    formData,
    errors,
    loading,
    handleChange,
    RegisterSubmit,
    token,
    Cancel,
  } = useRegister();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isDisabled =
    loading ||
    !formData.fullname ||
    !formData.email ||
    !formData.phone ||
    !formData.password ||
    !formData.confirm_Password;

  const isDashboardMode = !!token;

  return (
    <div
      className={`min-h-screen w-full flex items-center justify-center ${
        isDashboardMode
          ? "bg-slate-100/80"
          : "bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900"
      } px-4 py-10 sm:py-16`}
    >
      {/* Outer container width shrinks inside dashboard for subtle look */}
      <div
        className={`w-full ${
          isDashboardMode ? "max-w-lg" : "max-w-xl"
        } relative`}
      >
        {/* Background wrapper: darker & more dramatic for public, softer for dashboard */}
        <div
          className={`absolute inset-0 -z-10 rounded-3xl ${
            isDashboardMode
              ? "bg-gradient-to-r from-slate-200 via-blue-100 to-slate-200 p-[1px]"
              : "bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 p-[1px]"
          }`}
        >
          <div
            className={`h-full w-full rounded-3xl ${
              isDashboardMode
                ? "bg-slate-50/95"
                : "bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-950/80"
            } backdrop-blur-2xl`}
          />
        </div>

        <div
          className={`relative rounded-3xl border ${
            isDashboardMode
              ? "bg-white/90 border-slate-100/70 shadow-xl"
              : "bg-white/10 border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
          } px-6 py-7 sm:px-10 sm:py-10 space-y-7`}
        >
          {/* Header */}
          <div className="text-center space-y-4 pt-2">
            {!isDashboardMode && (
              <div className="inline-flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-sky-500 shadow-lg flex items-center justify-center">
                  <span className="text-xs font-bold text-white tracking-tight">
                    GO
                  </span>
                </div>
                <div className="text-left">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-300">
                    GoFinance
                  </p>
                  <p className="text-sm text-slate-300">
                    Smart finance dashboard for teams
                  </p>
                </div>
              </div>
            )}

            <div>
              <h1
                className={`font-black mb-2 ${
                  isDashboardMode
                    ? "text-2xl sm:text-3xl text-slate-900"
                    : "text-3xl sm:text-4xl bg-gradient-to-r from-white via-blue-100 to-sky-200 bg-clip-text text-transparent"
                }`}
              >
                {token ? "Create Employee" : "Create Account"}
                {!isDashboardMode && (
                  <span className="text-blue-300 align-middle"> ✨</span>
                )}
              </h1>
              <p
                className={`max-w-sm mx-auto text-sm sm:text-base ${
                  isDashboardMode ? "text-slate-600" : "text-slate-300"
                }`}
              >
                {token
                  ? "Add a new team member to your organization with secure access."
                  : "Join our secure financial platform and manage your money with confidence."}
              </p>
            </div>
          </div>

          <form className="space-y-5" method="post" onSubmit={RegisterSubmit}>
            {/* Global error */}
            {errors?.general && (
              <div className="bg-gradient-to-r from-rose-50 to-red-50 border border-red-200/60 backdrop-blur-sm rounded-2xl p-4 shadow-md">
                <div className="flex items-start gap-3 text-sm text-red-800">
                  <div className="w-5 h-5 bg-red-400/20 rounded-xl p-1.5 mt-0.5 flex-shrink-0">
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-[13px]">
                      Something went wrong
                    </p>
                    <p className="mt-0.5 text-xs">{errors.general}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Fullname */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                <span>Full name</span>
                <span className="text-rose-500">*</span>
              </label>
              <div className="relative group">
                <div
                  className={`absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-200 ${
                    isDashboardMode ? "" : "border border-white/10"
                  }`}
                >
                  <User
                    className={`w-4 h-4 ${
                      isDashboardMode ? "text-slate-500" : "text-slate-200"
                    }`}
                  />
                </div>
                <TextInputBox
                  placeholder="Enter your full name"
                  name="fullname"
                  value={formData.fullname || ""}
                  onChange={handleChange}
                  className={`pl-35 pr-4 py-3.5 rounded-2xl border text-sm ${
                    isDashboardMode
                      ? "border-slate-200/70 bg-white/95"
                      : "border-white/15 bg-white/5 text-slate-100 placeholder:text-slate-400"
                  } backdrop-blur-sm focus:border-blue-300 focus:ring-2 focus:ring-blue-200/50 hover:border-slate-300 transition-all duration-200`}
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                <span>Email</span>
                <span className="text-rose-500">*</span>
              </label>
              <div className="relative group">
                <div
                  className={`absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-200 ${
                    isDashboardMode ? "" : "border border-white/10"
                  }`}
                >
                  <Mail
                    className={`w-4 h-4 ${
                      isDashboardMode ? "text-slate-500" : "text-slate-200"
                    }`}
                  />
                </div>
                <EmailInputBox
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  className={`pl-35 pr-4 py-3.5 rounded-2xl border text-sm ${
                    isDashboardMode
                      ? "border-slate-200/70 bg-white/95"
                      : "border-white/15 bg-white/5 text-slate-100 placeholder:text-slate-400"
                  } backdrop-blur-sm focus:border-blue-300 focus:ring-2 focus:ring-blue-200/50 hover:border-slate-300 transition-all duration-200`}
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                <span>Phone number</span>
                <span className="text-rose-500">*</span>
              </label>
              <div className="relative group">
                <div
                  className={`absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-200 ${
                    isDashboardMode ? "" : "border border-white/10"
                  }`}
                >
                  <Phone
                    className={`w-4 h-4 ${
                      isDashboardMode ? "text-slate-500" : "text-slate-200"
                    }`}
                  />
                </div>
                <PhoneInputBox
                  placeholder="Enter your phone"
                  name="phone"
                  value={formData.phone || ""}
                  onChange={handleChange}
                  className={`pl-42 pr-4 py-3.5 rounded-2xl border text-sm ${
                    isDashboardMode
                      ? "border-slate-200/70 bg-white/95"
                      : "border-white/15 bg-white/5 text-slate-100 placeholder:text-slate-400"
                  } backdrop-blur-sm focus:border-blue-300 focus:ring-2 focus:ring-blue-200/50 hover:border-slate-300 transition-all duration-200`}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                <span>Password</span>
                <span className="text-rose-500">*</span>
              </label>
              <div className="relative group">
                <div
                  className={`absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-200 ${
                    isDashboardMode ? "" : "border border-white/10"
                  }`}
                >
                  <Lock
                    className={`w-4 h-4 ${
                      isDashboardMode ? "text-slate-500" : "text-slate-200"
                    }`}
                  />
                </div>
                <PasswordInputBox
                  placeholder="Create password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password || ""}
                  onChange={handleChange}
                  className={`pl-35 pr-11 py-3.5 rounded-2xl border text-sm ${
                    isDashboardMode
                      ? "border-slate-200/70 bg-white/95"
                      : "border-white/15 bg-white/5 text-slate-100 placeholder:text-slate-400"
                  } backdrop-blur-sm focus:border-blue-300 focus:ring-2 focus:ring-blue-200/50 hover:border-slate-300 transition-all duration-200`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-white/70 rounded-xl transition-all duration-200 hover:scale-105 group-hover:shadow-md"
                >
                  {showPassword ? (
                    <EyeOff
                      className={`w-4 h-4 ${
                        isDashboardMode ? "text-slate-500" : "text-slate-200"
                      }`}
                    />
                  ) : (
                    <Eye
                      className={`w-4 h-4 ${
                        isDashboardMode ? "text-slate-500" : "text-slate-200"
                      }`}
                    />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                <span>Confirm password</span>
                <span className="text-rose-500">*</span>
              </label>
              <div className="relative group">
                <div
                  className={`absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-200 ${
                    isDashboardMode ? "" : "border border-white/10"
                  }`}
                >
                  <Lock
                    className={`w-4 h-4 ${
                      isDashboardMode ? "text-slate-500" : "text-slate-200"
                    }`}
                  />
                </div>
                <PasswordInputBox
                  placeholder="Confirm password"
                  name="confirm_Password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirm_Password || ""}
                  onChange={handleChange}
                  className={`pl-35 pr-11 py-3.5 rounded-2xl border text-sm ${
                    isDashboardMode
                      ? "border-slate-200/70 bg-white/95"
                      : "border-white/15 bg-white/5 text-slate-100 placeholder:text-slate-400"
                  } backdrop-blur-sm focus:border-blue-300 focus:ring-2 focus:ring-blue-200/50 hover:border-slate-300 transition-all duration-200`}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-white/70 rounded-xl transition-all duration-200 hover:scale-105 group-hover:shadow-md"
                >
                  {showConfirmPassword ? (
                    <EyeOff
                      className={`w-4 h-4 ${
                        isDashboardMode ? "text-slate-500" : "text-slate-200"
                      }`}
                    />
                  ) : (
                    <Eye
                      className={`w-4 h-4 ${
                        isDashboardMode ? "text-slate-500" : "text-slate-200"
                      }`}
                    />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isDisabled}
              className={`group w-full py-3.5 rounded-2xl text-base font-bold text-white flex items-center justify-center gap-3 transition-all duration-300 ${
                isDisabled || loading
                  ? "bg-gradient-to-r from-slate-400 to-slate-500 cursor-not-allowed shadow-none"
                  : isDashboardMode
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg active:scale-[0.98]"
                  : "bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 hover:from-sky-500 hover:via-blue-500 hover:to-indigo-600 shadow-[0_15px_40px_rgba(56,189,248,0.6)] hover:-translate-y-0.5 active:scale-[0.98]"
              }`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Creating...</span>
                </>
              ) : token ? (
                <>
                  <div className="w-5 h-5 bg-white/20 rounded-lg backdrop-blur-sm p-1.5 group-hover:scale-110 transition-transform duration-200">
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span>Create Employee</span>
                </>
              ) : (
                <>
                  <div className="w-5 h-5 bg-white/20 rounded-lg backdrop-blur-sm p-1.5 group-hover:scale-110 transition-transform duration-200">
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span>Create Account</span>
                </>
              )}
            </Button>

            {/* Footer */}
            <div className="pt-5 border-t border-slate-200/50">
              {!token ? (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm">
                  <button
                    type="button"
                    onClick={Cancel}
                    className={`px-6 py-2 rounded-xl border text-slate-200 font-semibold transition-all duration-200 ${
                      isDashboardMode
                        ? "bg-white/80 border-slate-200/50 text-slate-700 hover:bg-slate-50 hover:border-slate-300 hover:shadow-md"
                        : "bg-white/5 border-white/15 hover:bg-white/10 hover:border-white/30"
                    }`}
                  >
                    Cancel
                  </button>
                  <Link
                    to="/login"
                    className={`group inline-flex items-center gap-2 font-semibold transition-all duration-200 hover:gap-3 ${
                      isDashboardMode
                        ? "text-indigo-600 hover:text-indigo-700"
                        : "text-sky-300 hover:text-sky-200"
                    }`}
                  >
                    <div className="w-1.5 h-1.5 bg-current rounded-full group-hover:scale-125 transition-transform" />
                    Have an account? Login
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-slate-600">
                  <Link
                    to="/dashboard/employees-list"
                    className="px-6 py-2 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/50 text-slate-700 font-semibold hover:bg-slate-50 hover:border-slate-300 hover:shadow-md transition-all duration-200 inline-flex items-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    Back to Employees
                  </Link>
                  <div className="flex flex-wrap items-center gap-4">
                    <Link
                      to="/login"
                      className="group inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition-all duration-200 hover:gap-3"
                    >
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full group-hover:scale-125 transition-transform" />
                      Login instead
                    </Link>
                    <Link
                      to="/employee/reset-password"
                      className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors duration-200"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Decorative blobs only for public (no token) */}
        {!isDashboardMode && (
          <>
            <div className="absolute -top-6 -right-6 w-28 h-28 bg-gradient-to-r from-blue-500/30 to-indigo-500/30 rounded-3xl blur-2xl animate-pulse" />
            <div className="absolute -bottom-10 -left-8 w-40 h-40 bg-gradient-to-r from-purple-500/25 to-pink-500/25 rounded-full blur-3xl animate-pulse delay-1000" />
          </>
        )}
      </div>
    </div>
  );
}
