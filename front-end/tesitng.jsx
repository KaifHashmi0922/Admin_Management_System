     {/* EMPLOYEES GRID - FULLY RESPONSIVE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
        {currentEmployees.map((emp) => (
          <div key={emp.email} className="bg-white/90 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl lg:shadow-2xl border border-white/50 p-6 lg:p-8 relative overflow-hidden">
            
            {/* Status Badge */}
            <div className={`absolute top-4 right-4 w-7 h-7 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg border-2 sm:border-4 ${
              emp.active 
                ? 'bg-emerald-400 border-emerald-300 shadow-emerald-300/50' 
                : 'bg-red-400 border-red-300 shadow-red-300/50'
            }`}>
              {emp.active ? (
                <UserCheck className="w-3.5 sm:w-5 h-3.5 sm:h-5 text-white" />
              ) : (
                <UserX className="w-3.5 sm:w-5 h-3.5 sm:h-5 text-white" />
              )}
            </div>

            {/* Content Header */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6 lg:mb-8 pt-2 lg:pt-4 gap-4 lg:gap-0">
              <div className="flex items-center gap-3 lg:gap-4 flex-1">
                <div className="w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Users className="w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 leading-tight">{emp.name}</h3>
                  <p className="text-sm sm:text-base lg:text-lg font-semibold text-slate-600 bg-slate-100 px-2 sm:px-3 py-1 rounded-lg sm:rounded-xl mt-1">{emp.role}</p>
                </div>
              </div>

              {/* ✨ RESPONSIVE TOGGLE BUTTONS */}
              <div className="flex flex-col items-end gap-3 lg:gap-4 w-full lg:w-auto lg:ml-4">
                {/* 📱 MOBILE: Stack vertically */}
                <div className="flex items-center justify-between w-full lg:hidden gap-3 py-1">
                  <span className="text-xs font-medium text-slate-600 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    {emp.active ? 'Active' : 'Deactive'}
                  </span>
                  <ToggleButton 
                    isActive={emp.active}
                    onToggle={() => toggleActiveStatus(emp.id)}
                    activeColor="emerald"
                    inactiveColor="red"
                    size="sm"
                  />
                </div>

                <div className="flex items-center justify-between w-full lg:hidden gap-3 py-1">
                  <span className="text-xs font-medium text-slate-600 flex items-center gap-1">
                    <LogIn className="w-3 h-3" />
                    {emp.isLoggedIn ? 'On' : 'Off'}
                  </span>
                  <ToggleButton 
                    isActive={emp.isLoggedIn}
                    onToggle={() => toggleLoginStatus(emp.email)}
                    activeColor="green"
                    inactiveColor="gray"
                    size="sm"
                  />
                </div>

                {/* 💻 DESKTOP: Compact side-by-side */}
                <div className="hidden lg:flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                    <CheckCircle className="w-3 h-3" />
                    Status
                  </div>
                  <ToggleButton 
                    isActive={emp.active}
                    onToggle={() => toggleActiveStatus(emp.id)}
                    activeColor="emerald"
                    inactiveColor="red"
                  />
                  
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                    <LogIn className="w-3 h-3" />
                    Session
                  </div>
                  <ToggleButton 
                    isActive={emp.isLoggedIn}
                    onToggle={() => toggleLoginStatus(emp.id)}
                    activeColor="green"
                    inactiveColor="gray"
                  />
                </div>
              </div>
            </div>

            {/* Employee Info - Responsive */}
            <div className="space-y-3 sm:space-y-4 mb-8 lg:mb-10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/70 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-slate-100/50">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                  <Mail className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                </div>
                <span className="text-slate-800 font-semibold text-sm sm:text-base break-words">{emp.email}</span>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/70 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-slate-100/50">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-green-400 to-green-500 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                  <Phone className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                </div>
                <span className="text-slate-800 font-semibold text-sm sm:text-base">{emp.phone}</span>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/70 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-slate-100/50">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                  <Calendar className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                </div>
                <span className="text-slate-800 font-semibold text-sm sm:text-base">
                  Joined: <span className="text-blue-600 font-bold">{emp.joining}</span>
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-5 sm:pt-6 border-t border-slate-100/50 bg-white/50 rounded-b-xl sm:rounded-b-2xl p-4 backdrop-blur-sm">
              <Link to={`/dashboard/employee/edit/${emp.email}`} className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-5 sm:py-4 sm:px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg font-semibold text-sm sm:text-base" aria-label={`Edit ${emp.name}`}>
                <Edit3 className="w-4 h-4 sm:w-5 sm:h-5" /> Edit
              </Link>
              <button onClick={() => handleDelete(emp.email)} className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl flex items-center justify-center gap-2 shadow-lg font-semibold text-sm sm:text-base" aria-label={`Delete ${emp.name}`}>
                <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" /> Delete
              </button>
              <Link to={`/dashboard/employee/view/${emp.email}`} className="w-11 sm:w-14 h-11 sm:h-14 bg-gradient-to-r from-slate-100 to-slate-200 rounded-xl flex items-center justify-center shadow-lg" aria-label={`View ${emp.name}`}>
                <Eye className="w-5 sm:w-6 h-5 sm:h-6 text-slate-600" />
              </Link>
            </div>
          </div>
        ))}
      </div>