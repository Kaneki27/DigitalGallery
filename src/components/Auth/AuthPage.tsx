import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-gradient-to-r from-orange-300 to-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-green-300 to-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      {/* Diagonal Moving Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent transform -skew-y-12 h-full w-full animate-pulse"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
          {isLogin ? (
            <LoginForm onToggleForm={() => setIsLogin(false)} />
          ) : (
            <RegisterForm onToggleForm={() => setIsLogin(true)} />
          )}
        </div>
        
        {/* Portal Links */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-gray-600 text-sm">Need administrative access?</p>
          <button
            onClick={() => navigate('/admin/login')}
            className="text-purple-600 hover:text-purple-700 font-medium underline transition-colors"
          >
            Access Admin Portal
          </button>
          <div className="text-gray-400">|</div>
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-700 font-medium underline transition-colors"
          >
            Back to Landing Page
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-16 h-16 bg-yellow-300 rounded-full opacity-20 animate-bounce"></div>
      <div className="absolute bottom-20 right-20 w-12 h-12 bg-pink-300 rounded-full opacity-20 animate-bounce delay-1000"></div>
      <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-green-300 rounded-full opacity-20 animate-bounce delay-2000"></div>
    </div>
  );
};

export default AuthPage;