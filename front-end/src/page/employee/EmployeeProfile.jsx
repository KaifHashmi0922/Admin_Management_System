// import { Link } from "react-router-dom";
// import { Button } from "../../components/Button";
// import { User, Mail, Phone, Calendar, Briefcase, ShieldCheck, Edit3, Key, Users } from "lucide-react";

// export default function EmployeeProfile() {
//   return (
//     <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-4 py-12">
//       <div className="w-full max-w-4xl mx-auto">
        
//         {/* MAIN PROFILE CARD - GLASSMORPHISM */}
//         <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-100/50 p-10 space-y-10">
          
//           {/* Decorative Background */}
//           <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-r from-blue-600/10 via-purple-600/5 to-indigo-600/10 blur-xl"></div>

//           {/* GOFINANCE HEADER */}
//           <div className="text-center space-y-4 pt-4">
//             <div className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent text-4xl font-black tracking-tight mx-auto">
//               <div className="w-3 h-14 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-2xl shadow-xl p-2.5"></div>
//               <span>GOFinance</span>
//             </div>
//             <h1 className="text-4xl lg:text-5xl font-black text-slate-900 bg-gradient-to-r from-slate-900 to-slate-800 bg-clip-text">
//               Employee Profile
//             </h1>
//           </div>

//           <div className="grid lg:grid-cols-3 gap-8 items-start">
            
//             {/* PROFILE HEADER */}
//             <div className="lg:col-span-1 text-center lg:text-left">
//               <div className="relative mx-auto lg:mx-0 w-32 h-32 lg:w-40 lg:h-40 mb-6 group">
//                 <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full blur-xl group-hover:opacity-75 transition-opacity"></div>
//                 <img
//                   src="https://i.pravatar.cc/200"
//                   className="w-full h-full rounded-3xl border-4 border-white/80 shadow-2xl object-cover ring-4 ring-blue-500/20 hover:ring-blue-500/40 transition-all duration-500 group-hover:scale-105"
//                   alt="Kaif Hashmi"
//                 />
//               </div>
              
//               <div className="bg-gradient-to-r from-slate-50/90 to-blue-50/90 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-slate-200/50">
//                 <h2 className="text-3xl font-black text-slate-900 mb-2">Kaif Hashmi</h2>
//                 <p className="text-blue-600 font-bold text-lg mb-2 bg-blue-100/60 px-3 py-1 rounded-2xl inline-block">EMP2025</p>
//                 <div className="flex items-center justify-center lg:justify-start gap-2 bg-emerald-100/80 px-4 py-2 rounded-2xl backdrop-blur-sm border border-emerald-200/50">
//                   <ShieldCheck className="w-5 h-5 text-emerald-600" />
//                   <span className="font-semibold text-emerald-800">Admin</span>
//                 </div>
//               </div>
//             </div>

//             {/* PROFILE DETAILS */}
//             <div className="lg:col-span-2 space-y-8">
              
//               {/* Profile Information */}
//               <div className="bg-slate-50/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-200/50">
//                 <div className="flex items-center gap-3 mb-6">
//                   <div className="w-12 h-12 bg-blue-100/80 rounded-2xl flex items-center justify-center backdrop-blur-sm">
//                     <User className="w-7 h-7 text-blue-600" />
//                   </div>
//                   <div>
//                     <h3 className="text-2xl font-black text-slate-900">Profile Information</h3>
//                     <p className="text-slate-600">Employee personal & contact details</p>
//                   </div>
//                 </div>
                
//                 <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                   <Info label="Email" value="kaif@gmail.com" icon={Mail} />
//                   <Info label="Phone" value="+91 9876543210" icon={Phone} />
//                   <Info label="Gender" value="Male" icon={User} />
//                   <Info label="Joining Date" value="15 Feb 2024" icon={Calendar} />
//                   <Info label="Department" value="Engineering" icon={Briefcase} />
//                   <Info label="Languages" value="English, Hindi" icon={Users} />
//                 </div>
//               </div>

//               {/* Skills Section */}
//               <div className="bg-gradient-to-r from-emerald-50/80 to-blue-50/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-200/50">
//                 <div className="flex items-center gap-3 mb-6">
//                   <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
//                     <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M3.269 15.478A6.5 6.5 0 019 17.5c.73 0 1.446-.09 2.13-.26A6.5 6.5 0 0118.5 11c0-3.495-2.307-6.447-5.5-7.404a6.485 6.485 0 00-1.859.22 2 2 0 11-.9-3.87 6.492 6.492 0 002.76-.354C14.153 1.6 16.5 3.947 16.5 7a6.5 6.5 0 01-13 0c0-3.053 1.6-5.4 4-6.254a6.5 6.5 0 013.269 3.978 2 2 0 01-3.5 1.944A6.498 6.498 0 002.5 7c0 3.495 2.307 6.447 5.5 7.404z" clipRule="evenodd" />
//                     </svg>
//                   </div>
//                   <div>
//                     <h3 className="text-2xl font-black text-slate-900">Skills & Expertise</h3>
//                     <p className="text-slate-600">Technical proficiencies</p>
//                   </div>
//                 </div>
                
//                 <div className="flex flex-wrap gap-3">
//                   <Skill text="React" color="blue" />
//                   <Skill text="Tailwind CSS" color="cyan" />
//                   <Skill text="Django" color="indigo" />
//                   <Skill text="REST API" color="purple" />
//                   <Skill text="PostgreSQL" color="emerald" />
//                   <Skill text="Docker" color="gray" />
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="bg-gradient-to-r from-slate-50/90 to-blue-50/90 backdrop-blur-xl rounded-3xl p-8 border border-slate-200/50 shadow-xl">
//                 <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
//                   <Edit3 className="w-7 h-7 text-blue-600" />
//                   Quick Actions
//                 </h3>
//                 <div className="grid sm:grid-cols-2 gap-4">
//                   <ProfileButton primary to="/dashboard/employee/profile/edit">
//                     Edit Profile
//                   </ProfileButton>
//                   <ProfileButton primary to="/dashboard/employee/profile/change-password">
//                     Change Password
//                   </ProfileButton>
//                   <ProfileButton to="/dashboard/employees">
//                     View All Employees
//                   </ProfileButton>
//                   <ProfileButton danger>Deactivate Account</ProfileButton>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Decorative Elements */}
//           <div className="absolute -top-8 -right-12 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
//           <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* REUSABLE COMPONENTS */
// function Info({ label, value, icon: Icon }) {
//   return (
//     <div className="group bg-white/70 backdrop-blur-sm hover:bg-white hover:shadow-xl rounded-2xl p-4 border border-slate-200/50 hover:border-blue-200/60 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
//       <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 -skew-x-12 -translate-x-8 group-hover:translate-x-0 transition-transform duration-700 opacity-0 group-hover:opacity-100" />
//       <div className="relative flex items-center gap-3 mb-2">
//         <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
//           <Icon className="w-5 h-5 text-blue-600" />
//         </div>
//         <div>
//           <p className="text-xs uppercase tracking-wide text-slate-500 font-medium">{label}</p>
//           <p className="font-semibold text-slate-900 text-lg">{value}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// function Skill({ text, color = "blue" }) {
//   const colors = {
//     blue: "from-blue-500 to-blue-600",
//     cyan: "from-cyan-500 to-cyan-600",
//     indigo: "from-indigo-500 to-indigo-600",
//     purple: "from-purple-500 to-purple-600",
//     emerald: "from-emerald-500 to-teal-600",
//     gray: "from-slate-500 to-slate-600"
//   };
  
//   return (
//     <div className="group bg-gradient-to-r from-white/80 to-slate-50/80 backdrop-blur-sm text-slate-800 px-5 py-2.5 rounded-2xl font-semibold shadow-sm hover:shadow-md border border-slate-200/60 hover:border-slate-300 hover:scale-105 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 overflow-hidden">
//       <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${colors[color]}`} />
//       {text}
//     </div>
//   );
// }

// function ProfileButton({ children, primary, danger, to }) {
//   const baseClasses = "px-6 py-4 text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 group overflow-hidden relative";
  
//   if (primary) {
//     return (
//       <Link to={to} className={`${baseClasses} bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white hover:shadow-blue-500/50 active:scale-95`}>
//         <div className="w-5 h-5 bg-white/30 backdrop-blur-sm rounded-xl p-1.5 group-hover:scale-110 transition-all" />
//         {children}
//       </Link>
//     );
//   }
  
//   if (danger) {
//     return (
//       <button className={`${baseClasses} bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white hover:shadow-red-500/50 active:scale-95`}>
//         <Trash2 className="w-5 h-5 group-hover:scale-110 transition-all" />
//         {children}
//       </button>
//     );
//   }
  
//   return (
//     <Link to={to} className={`${baseClasses} bg-white/90 backdrop-blur-xl border-2 border-slate-200/50 text-slate-800 hover:bg-white hover:border-slate-300/70 hover:shadow-slate-100/50 font-bold`}>
//       {children}
//     </Link>
//   );
// }
import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { User, Mail, Phone, Calendar, Briefcase, ShieldCheck, Edit3, Key, Users, Trash2 } from "lucide-react";

// ✅ COMPLETE EmployeeProfile Component
export default function EmployeeProfile() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-4 py-12">
      <div className="w-full max-w-4xl mx-auto">
        
        {/* MAIN PROFILE CARD - GLASSMORPHISM */}
        <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-100/50 p-10 space-y-10">
         
          {/* Decorative Background */}
          <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-r from-blue-600/10 via-purple-600/5 to-indigo-600/10 blur-xl"></div>

          {/* GOFINANCE HEADER */}
          <div className="text-center space-y-4 pt-4">
            <div className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent text-4xl font-black tracking-tight mx-auto">
              <div className="w-3 h-14 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-2xl shadow-xl p-2.5"></div>
              <span>GOFinance</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 bg-gradient-to-r from-slate-900 to-slate-800 bg-clip-text">
              Employee Profile
            </h1>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            
            {/* PROFILE HEADER */}
            <div className="lg:col-span-1 text-center lg:text-left">
              <div className="relative mx-auto lg:mx-0 w-32 h-32 lg:w-40 lg:h-40 mb-6 group">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full blur-xl group-hover:opacity-75 transition-opacity"></div>
                <img
                  src="https://i.pravatar.cc/200"
                  className="w-full h-full rounded-3xl border-4 border-white/80 shadow-2xl object-cover ring-4 ring-blue-500/20 hover:ring-blue-500/40 transition-all duration-500 group-hover:scale-105"
                  alt="Kaif Hashmi"
                />
              </div>
              
              <div className="bg-gradient-to-r from-slate-50/90 to-blue-50/90 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-slate-200/50">
                <h2 className="text-3xl font-black text-slate-900 mb-2">Kaif Hashmi</h2>
                <p className="text-blue-600 font-bold text-lg mb-2 bg-blue-100/60 px-3 py-1 rounded-2xl inline-block">EMP2025</p>
                <div className="flex items-center justify-center lg:justify-start gap-2 bg-emerald-100/80 px-4 py-2 rounded-2xl backdrop-blur-sm border border-emerald-200/50">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span className="font-semibold text-emerald-800">Admin</span>
                </div>
              </div>
            </div>

            {/* PROFILE DETAILS */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Profile Information */}
              <div className="bg-slate-50/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-200/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-100/80 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <User className="w-7 h-7 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900">Profile Information</h3>
                    <p className="text-slate-600">Employee personal & contact details</p>
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Info label="Email" value="kaif@gmail.com" icon={Mail} />
                  <Info label="Phone" value="+91 9876543210" icon={Phone} />
                  <Info label="Gender" value="Male" icon={User} />
                  <Info label="Joining Date" value="15 Feb 2024" icon={Calendar} />
                  <Info label="Department" value="Engineering" icon={Briefcase} />
                  <Info label="Languages" value="English, Hindi" icon={Users} />
                </div>
              </div>

              {/* Skills Section */}
              <div className="bg-gradient-to-r from-emerald-50/80 to-blue-50/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-200/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.269 15.478A6.5 6.5 0 019 17.5c.73 0 1.446-.09 2.13-.26A6.5 6.5 0 0118.5 11c0-3.495-2.307-6.447-5.5-7.404a6.485 6.485 0 00-1.859.22 2 2 0 11-.9-3.87 6.492 6.492 0 002.76-.354C14.153 1.6 16.5 3.947 16.5 7a6.5 6.5 0 01-13 0c0-3.053 1.6-5.4 4-6.254a6.5 6.5 0 013.269 3.978 2 2 0 01-3.5 1.944A6.498 6.498 0 002.5 7c0 3.495 2.307 6.447 5.5 7.404z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900">Skills & Expertise</h3>
                    <p className="text-slate-600">Technical proficiencies</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <Skill text="React" color="blue" />
                  <Skill text="Tailwind CSS" color="cyan" />
                  <Skill text="Django" color="indigo" />
                  <Skill text="REST API" color="purple" />
                  <Skill text="PostgreSQL" color="emerald" />
                  <Skill text="Docker" color="gray" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-gradient-to-r from-slate-50/90 to-blue-50/90 backdrop-blur-xl rounded-3xl p-8 border border-slate-200/50 shadow-xl">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <Edit3 className="w-7 h-7 text-blue-600" />
                  Quick Actions
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <ProfileButton primary to="/dashboard/employee/profile/edit">
                    Edit Profile
                  </ProfileButton>
                  <ProfileButton primary to="/dashboard/employee/profile/change-password">
                    Change Password
                  </ProfileButton>
                  <ProfileButton to="/dashboard/employees">
                    View All Employees
                  </ProfileButton>
                  <ProfileButton danger>Deactivate Account</ProfileButton>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-8 -right-12 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
      </div>
    </div>
  );
}

/* ✅ REUSABLE COMPONENTS - ALL DEFINED */

function Info({ label, value, icon: Icon }) {
  return (
    <div className="group bg-white/70 backdrop-blur-sm hover:bg-white hover:shadow-xl rounded-2xl p-4 border border-slate-200/50 hover:border-blue-200/60 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 -skew-x-12 -translate-x-8 group-hover:translate-x-0 transition-transform duration-700 opacity-0 group-hover:opacity-100" />
      <div className="relative flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500 font-medium">{label}</p>
          <p className="font-semibold text-slate-900 text-lg">{value}</p>
        </div>
      </div>
    </div>
  );
}

function Skill({ text, color = "blue" }) {
  const colors = {
    blue: "from-blue-500 to-blue-600",
    cyan: "from-cyan-500 to-cyan-600",
    indigo: "from-indigo-500 to-indigo-600",
    purple: "from-purple-500 to-purple-600",
    emerald: "from-emerald-500 to-teal-600",
    gray: "from-slate-500 to-slate-600"
  };
  
  return (
    <div className="group bg-gradient-to-r from-white/80 to-slate-50/80 backdrop-blur-sm text-slate-800 px-5 py-2.5 rounded-2xl font-semibold shadow-sm hover:shadow-md border border-slate-200/60 hover:border-slate-300 hover:scale-105 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 overflow-hidden">
      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${colors[color]}`} />
      {text}
    </div>
  );
}

function ProfileButton({ children, primary, danger, to, onClick }) {
  const baseClasses = "px-6 py-4 text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 group overflow-hidden relative";
  
  if (primary) {
    return (
      <Link to={to} className={`${baseClasses} bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white hover:shadow-blue-500/50 active:scale-95`}>
        <div className="w-5 h-5 bg-white/30 backdrop-blur-sm rounded-xl p-1.5 group-hover:scale-110 transition-all" />
        {children}
      </Link>
    );
  }
  
  if (danger) {
    return (
      <button 
        onClick={onClick || (() => alert('Deactivate account?'))}
        className={`${baseClasses} bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white hover:shadow-red-500/50 active:scale-95`}
      >
        <Trash2 className="w-5 h-5 group-hover:scale-110 transition-all" />
        {children}
      </button>
    );
  }
  
  return (
    <Link to={to} className={`${baseClasses} bg-white/90 backdrop-blur-xl border-2 border-slate-200/50 text-slate-800 hover:bg-white hover:border-slate-300/70 hover:shadow-slate-100/50 font-bold`}>
      {children}
    </Link>
  );
}
