import { Link, useLocation, useNavigate } from "react-router-dom";
import { TextInputBox } from "../../components/InputBox";
import { Button } from "../../components/Button";
import { Shield, CheckCircle } from "lucide-react";
import useVerifyOTP from "../../api/hooks/Auth/useVerifyOtp";
import { useEffect } from "react";

export default function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || localStorage.getItem("email");

  // Redirect if no email (page refreshed or direct access)
  useEffect(() => {
    if (!email) {
      navigate("/employee/reset-password", { replace: true });
    }
  }, [email, navigate]);

  const {
    formData,
    handleChange,
    handleSubmit,
    loading,
    error,
  } = useVerifyOTP(email);

  const isDisabled = loading || !formData.otp;

  // Prevent rendering before redirect logic
  if (!email) return null;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-4 py-12">
      <div className="w-full max-w-md relative">
        {/* Animated Background - IDENTICAL TO LOGIN */}
        <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-1">
          <div className="h-full w-full rounded-3xl bg-gradient-to-br from-slate-50 via-white to-blue-50/50 backdrop-blur-xl"></div>
        </div>

        {/* Main Card - IDENTICAL TO LOGIN */}
        <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-100/50 p-8 lg:p-10 space-y-8">
          
          {/* Logo & Welcome - IDENTICAL TO LOGIN */}
          <div className="text-center space-y-4 pt-4">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent text-4xl font-black tracking-tight">
              <div className="w-3 h-12 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-2xl shadow-lg p-2"></div>
              <span>GOFinance</span>
            </div>
            
            <div>
              <h1 className="text-3xl lg:text-4xl font-black text-slate-900 mb-2 bg-gradient-to-r from-slate-900 to-slate-800 bg-clip-text">
                Verify OTP<span className="text-blue-600"> 🔐</span>
              </h1>
              <p className="text-slate-600 text-sm lg:text-base max-w-sm mx-auto">
                Enter the 6-digit code sent to your registered email
              </p>
            </div>
          </div>

          {/* Form - IDENTICAL LOGIN STRUCTURE */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* Error - IDENTICAL TO LOGIN */}
            {error && (
              <div className="bg-gradient-to-r from-rose-50 to-red-50 border border-red-200/50 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                <div className="flex items-start gap-3 text-sm text-red-800">
                  <div className="w-5 h-5 bg-red-400/20 rounded-xl p-1.5 mt-0.5 flex-shrink-0">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>{error}</span>
                </div>
              </div>
            )}

            {/* OTP Input - IDENTICAL LOGIN STYLE */}
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-200">
                <Shield className="w-5 h-5 text-slate-500" />
              </div>
              <TextInputBox
                placeholder="Enter 6-digit OTP"
                name="otp"
                value={formData.otp || ""}
                onChange={handleChange}
                autoFocus
                maxLength={6}
                inputMode="numeric"
                className="pl-16 pr-4 py-4 rounded-2xl border border-slate-200/50 bg-white/90 backdrop-blur-sm focus:border-blue-300 focus:ring-2 focus:ring-blue-200/50 hover:border-slate-300 transition-all duration-200 text-slate-900 font-mono tracking-wider text-lg"
              />
            </div>

            {/* Submit Button - IDENTICAL LOGIN STYLE */}
            <Button
              type="submit"
              disabled={isDisabled}
              className={`group w-full py-4 rounded-2xl text-lg font-bold text-white shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3
                ${isDisabled || loading
                  ? "bg-gradient-to-r from-slate-400 to-slate-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:-translate-y-1 hover:shadow-blue-500/25 active:scale-95"
                }`}
            >
              {loading ? (
                <>
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Verifying...
                </>
              ) : (
                <>
                  <div className="w-5 h-5 bg-white/20 rounded-lg backdrop-blur-sm p-1.5 group-hover:scale-110 transition-transform duration-200">
                    <CheckCircle className="w-3 h-3" />
                  </div>
                  Verify OTP
                </>
              )}
            </Button>

            {/* Footer Links - IDENTICAL TO LOGIN */}
            <div className="pt-6 border-t border-slate-200/50">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-slate-600">
                <Link
                  to="/login"
                  onClick={() => localStorage.removeItem("email")}
                  className="group inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition-all duration-200 hover:gap-3"
                >
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full group-hover:scale-125 transition-transform"></div>
                  Back to Login
                </Link>
              </div>
            </div>
          </form>
        </div>

        {/* Decorative Elements - IDENTICAL TO LOGIN */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-3xl blur-xl animate-pulse"></div>
        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
    </div>
  );
}
