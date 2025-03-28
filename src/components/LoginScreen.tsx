import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { Eye, EyeOff, LogIn } from 'lucide-react';

const LoginScreen: React.FC = () => {
  const { login } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      login(email);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 w-full h-full z-0" 
        style={{
          backgroundImage: "url('/documents/background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.8
        }}
      ></div>
      
      <div className="relative w-full max-w-md z-10">
        {/* Decorative elements */}
        <div className="absolute -top-14 -left-14 w-40 h-40 bg-emerald-400 rounded-full opacity-10 blur-2xl"></div>
        <div className="absolute -bottom-14 -right-14 w-40 h-40 bg-blue-400 rounded-full opacity-10 blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-400 rounded-full opacity-5 blur-3xl"></div>
        
        <div className="relative z-10 bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="mb-8 text-center">
            <div className="text-emerald-600 font-semibold text-2xl mb-3">
              Converge™ <span className="text-gray-700">Toolkit</span>
            </div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-emerald-600 via-blue-500 to-purple-600 text-transparent bg-clip-text">Welcome Back</h1>
            <p className="text-gray-600">Sign in to access the toolkit</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
                placeholder="you@example.com"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div className="mt-1 flex justify-end">
                <button type="button" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                  Forgot password?
                </button>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 flex items-center justify-center rounded-lg text-white font-medium transition-all ${
                isLoading
                  ? 'bg-emerald-400 cursor-wait'
                  : 'bg-emerald-600 hover:bg-emerald-700 shadow-md hover:shadow-lg'
              }`}
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              ) : (
                <>
                  <LogIn size={18} className="mr-2" />
                  Sign In
                </>
              )}
            </button>
          </form>
          
        </div>
      </div>
    </div>
  );
};

export default LoginScreen; 