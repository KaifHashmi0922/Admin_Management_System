  import { useState } from "react"
  import { NavLink } from "react-router-dom"
  import {
    HomeIcon,
    UserGroupIcon,
    FolderIcon,
    ArrowRightOnRectangleIcon,
    Bars3Icon,
    XMarkIcon,
    ChevronDownIcon,
    ChartBarIcon,
    DocumentTextIcon,
  } from "@heroicons/react/24/outline"

  const user = {
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzf8hc1xe7dUXAHolP432cE_aivXyPIQ5SvA&s",
    name: "Admin User",

  }


  // Dynamic menu config (can later come from backend / permissions)
  const roleMenus = {
    admin: [
      {
        id: "dashboard",
        title: "Dashboard",
        icon: HomeIcon,
        path: "/dashboard",
        permission: "dashboard",
      },
      {
        id: "employees",
        title: "Employees",
        icon: UserGroupIcon,
        permission: "employees",
        children: [
          {
            title: "All Employees",
            path: "/dashboard/employees-list",
            dotColor: "bg-blue-500",
          },
          {
            title: "Register New",
            path: "/dashboard/employee/register",
            dotColor: "bg-blue-600",
          },
        ],
      },
      {
        id: "projects",
        title: "Projects",
        icon: FolderIcon,
        permission: "projects",
        children: [
          {
            title: "All Projects",
            path: "/dashboard/projects-list",
            dotColor: "bg-blue-500",
          },
          {
            title: "Create Project",
            path: "/dashboard/project/register",
            dotColor: "bg-blue-600",
          },
        ],
      },
      {
        id: "reports",
        title: "Reports",
        icon: ChartBarIcon,
        path: "/dashboard/employee/performance-report",
        permission: "reports",
      },
    ],

    manager: [
      {
        id: "dashboard",
        title: "Dashboard",
        icon: HomeIcon,
        path: "/dashboard",
        permission: "dashboard",
      },
      {
        id: "projects",
        title: "Projects",
        icon: FolderIcon,
        permission: "projects",
        children: [
          {
            title: "All Projects",
            path: "/dashboard/projects-list",
            dotColor: "bg-blue-500",
          },
          {
            title: "My Projects",
            path: "/dashboard/projects/my",
            dotColor: "bg-green-500",
          },
        ],
      },
      {
        id: "reports",
        title: "Team Reports",
        icon: ChartBarIcon,
        path: "/dashboard/teams-report",
        permission: "reports",
      },
    ],

    employee: [
      {
        id: "dashboard",
        title: "Dashboard",
        icon: HomeIcon,
        path: "/dashboard",
        permission: "dashboard",
      },
      {
        id: "my-projects",
        title: "My Tasks",
        icon: DocumentTextIcon,
        path: "/dashboard/tasks",
        permission: "tasks",
      },
    ],

    guest: [],
  }

  export default function Sidebar({
    isMobileMenuOpen,
    onMobileMenuClose,
    isHidden: externalHidden,
    onToggleHide,
    UserRole,
    logout,
    data,
  })  
  
  {
    const [openSections, setOpenSections] = useState({})
    const isHidden = externalHidden ?? false

    const currentMenu = roleMenus[UserRole] || []

    const closeMobile = () => {
      if (isMobileMenuOpen) onMobileMenuClose()
    }

    const toggleHide = () => {
      if (window.innerWidth >= 1024 && onToggleHide) {
        onToggleHide()
      }
      setOpenSections({})
      closeMobile()
    }

    const toggleSection = (sectionId) => {
      setOpenSections((prev) => ({
        ...prev,
        [sectionId]: !prev[sectionId],
      }))
    }
    // alert(user_data)

  console.log("User Role ", UserRole);

    return (
      <>
        {/* Mobile overlay */}
        {isMobileMenuOpen && !isHidden && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
            onClick={closeMobile}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed lg:static top-20 left-0 h-[calc(100vh-5rem)] lg:h-screen z-[60] flex flex-col transition-all duration-500 ease-in-out bg-gradient-to-b from-slate-50 to-blue-50/80 border-r border-blue-100/50 shadow-2xl shadow-blue-100/50 overflow-hidden
          ${isHidden && window.innerWidth >= 1024 ? "w-20 lg:w-20" : "w-72"}
          ${isMobileMenuOpen && !isHidden ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        >
          {/* Header */}
          <div className="h-20 flex items-center justify-between px-4 lg:px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-black text-lg lg:text-xl border-b border-blue-200/30 shadow-xl flex-shrink-0">
            {!isHidden && (
              <div className="flex-shrink-0 w-32 lg:w-48">
                <span className="truncate tracking-tight drop-shadow-lg block leading-tight text-base lg:text-lg">
                  Dashboard
                </span>
              </div>
            )}

            <div className="flex items-center gap-2 flex-shrink-0">
              {isMobileMenuOpen && !isHidden && (
                <button
                  onClick={closeMobile}
                  className="p-2 rounded-lg bg-white/30 hover:bg-white/50 backdrop-blur-sm shadow-md hover:shadow-lg border border-white/30 transition-all duration-200 hover:scale-105 active:scale-95 lg:hidden z-[80]"
                  title="Close menu"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              )}

              <button
                onClick={toggleHide}
                disabled={window.innerWidth < 1024}
                className={`p-2.5 rounded-xl backdrop-blur-sm shadow-lg border border-white/30 transition-all duration-200 hover:scale-105 active:scale-95 z-[80] ${
                  window.innerWidth < 1024
                    ? "bg-white/20 cursor-not-allowed opacity-50"
                    : "bg-white/40 hover:bg-white/60 hover:shadow-xl"
                }`}
                title={
                  window.innerWidth < 1024
                    ? "Collapse only available on desktop"
                    : isHidden
                    ? "Expand sidebar"
                    : "Collapse sidebar"
                }
              >
                <Bars3Icon className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          {!isHidden && (
            <div className="flex-1 overflow-hidden">
              <nav className="flex-1 p-6 space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200/50 scrollbar-track-blue-100/30">
                {currentMenu.map((item) => (
                  <div key={item.id} className="space-y-2">
                    {/* Parent menu item */}
                    <NavLink
                      to={item.path || "#"}
                      onClick={(e) => {
                        if (item.children) {
                          e.preventDefault()
                          toggleSection(item.id)
                        } else {
                          closeMobile()
                        }
                      }}
                      className={({ isActive }) =>
                        `group w-full flex items-center justify-between p-4 rounded-2xl backdrop-blur-sm border transition-all duration-200 ${
                          isActive && item.path
                            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-xl shadow-blue-400/30 border-transparent"
                            : "bg-white text-blue-900 border-blue-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-800 hover:shadow-lg hover:shadow-blue-200/50"
                        }`
                      }
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-white/70 group-hover:bg-white shadow-sm flex-shrink-0">
                          <item.icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <span className="font-semibold text-lg tracking-wide whitespace-nowrap">
                          {item.title}
                        </span>
                      </div>
                      {item.children && (
                        <ChevronDownIcon
                          className={`w-6 h-6 transition-transform duration-200 ${
                            openSections[item.id]
                              ? "rotate-180 text-blue-600"
                              : "text-blue-400"
                          }`}
                        />
                      )}
                    </NavLink>

                    {/* Children (dynamic) */}
                    {item.children && openSections[item.id] && (
                      <div className="ml-12 mt-2 space-y-1 pl-2">
                        {item.children.map((child, index) => (
                          <NavLink
                            key={index}
                            to={child.path}
                            onClick={closeMobile}
                            className={({ isActive }) =>
                              `group flex items-center gap-3 p-3 rounded-xl border bg-white backdrop-blur-sm transition-all duration-200 ${
                                isActive
                                  ? "border-blue-400 bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md shadow-blue-300/60"
                                  : "border-blue-100/40 text-blue-900 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-800 hover:shadow-md"
                              }`
                            }
                          >
                            <div
                              className={`w-2 h-2 rounded-full ${
                                child.dotColor || "bg-blue-500"
                              }`}
                            />
                            <span className="font-medium text-base whitespace-nowrap">
                              {child.title}
                            </span>
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              {/* Footer */}
              <div className="p-6 border-t border-blue-100/50 bg-gradient-to-t from-white/90 to-blue-50/50 backdrop-blur-sm space-y-4 shadow-lg">
                <div className="group cursor-pointer p-4 rounded-2xl bg-gradient-to-r from-white to-blue-50/50 border border-blue-200/50 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-200/50 transition-all duration-200">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={user.imageUrl}
                        className="w-14 h-14 rounded-2xl border-3 border-white shadow-lg ring-2 ring-blue-200/50"
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 border-3 border-white rounded-full shadow-lg" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-xl text-blue-900 truncate tracking-tight">
                        {data?.fullname || "unkonwn"}
                      </p>
                      <p className="text-base text-blue-600 font-semibold bg-blue-100/80 px-3 py-1 rounded-xl inline-block capitalize">
                        {data?.role || "admin"}
                      </p>
                    </div>
                  </div>
                </div>

                <button onClick={logout} className="w-full flex items-center justify-center gap-3 py-4 px-6 font-bold text-lg text-white bg-gradient-to-r from-red-500 to-red-600 rounded-2xl shadow-lg shadow-red-200/50 hover:shadow-xl hover:shadow-red-300/60 border border-red-300/30 transition-all duration-200 hover:scale-[1.02] active:scale-95">
                  <ArrowRightOnRectangleIcon className="w-6 h-6" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </aside>
      </>
    )
  }
