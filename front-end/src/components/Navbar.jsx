import { User, ChevronDown, Bell, CreditCard } from "lucide-react"

const user = {
  imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzf8hc1xe7dUXAHolP432cE_aivXyPIQ5SvA&s",
  name: "Admin User",
}

export default function Navbar({ onMenuClick }) {
  return (
    <div className="flex items-center gap-2 lg:gap-3">
      {/* Notifications */}
      {/* <button className="p-2 rounded-xl bg-slate-100/50 hover:bg-slate-200 backdrop-blur-sm shadow-md hover:shadow-lg border border-slate-200/50 flex-shrink-0 w-12 h-12 flex items-center justify-center active:scale-95 transition-all duration-200">
        <Bell className="w-5 h-5 text-slate-700" />
      </button> */}

      Profile
      {/* <div className="flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 hover:shadow-lg hover:shadow-indigo-100/50 cursor-pointer group border border-indigo-100/50"> */}
        {/* <div className="relative">
          <img src={user.imageUrl} className="w-10 h-10 rounded-2xl ring-2 ring-indigo-200/50" />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full"></div>
        </div>
        <div className="min-w-0 flex-1 hidden lg:block">
          <p className="text-sm font-semibold text-slate-900 truncate">{user.name}</p>
          <p className="text-xs text-indigo-600 font-medium">Administrator</p>
        </div> */}
        {/* <ChevronDown className="w-4 h-4 text-slate-500 group-hover:text-indigo-600 transition-colors" /> */}
      {/* </div> */}
    </div>
  )
}
