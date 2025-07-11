import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-gradient-to-r from-orange-300 to-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-green-300 to-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-4xl px-6">
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-white font-bold text-4xl">R</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Welcome to Rejoice</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose your portal to access the Rejoice platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Employee Portal */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300 group">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-2xl">👥</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Employee Portal</h2>
              <p className="text-gray-600 mb-6">
                Access your workspace, upload content, view events, and connect with your team.
              </p>
              <button
                onClick={() => navigate('/employee')}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
              >
                Enter Employee Portal
              </button>
            </div>
          </div>

          {/* Admin Portal */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300 group">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-2xl">⚙️</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Admin Portal</h2>
              <p className="text-gray-600 mb-6">
                Manage users, moderate content, view analytics, and control system settings.
              </p>
              <button
                onClick={() => navigate('/admin/login')}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all"
              >
                Enter Admin Portal
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            Secure access to your workspace and administrative controls
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-16 h-16 bg-yellow-300 rounded-full opacity-20 animate-bounce"></div>
      <div className="absolute bottom-20 right-20 w-12 h-12 bg-pink-300 rounded-full opacity-20 animate-bounce delay-1000"></div>
      <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-green-300 rounded-full opacity-20 animate-bounce delay-2000"></div>
    </div>
  );
};

export default LandingPage; 