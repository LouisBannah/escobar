import React from 'react';
import { ArrowRight, Building2, LineChart, Shield, TrendingUp, Truck, CheckCircle } from 'lucide-react';

interface ThemeOption {
  id: 'Sales' | 'Delivery' | 'Quality assurance';
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

interface ThemeSplashProps {
  onThemeSelect: (theme: 'Sales' | 'Delivery' | 'Quality assurance') => void;
}

const themeOptions: ThemeOption[] = [
  {
    id: 'Sales',
    title: 'Sales & Origination',
    description: 'Explore tools and resources for sales activities, loan origination, and client acquisition.',
    icon: <Building2 className="w-8 h-8" />,
    color: 'bg-emerald-50 text-emerald-600'
  },
  {
    id: 'Delivery',
    title: 'Delivery & Operations',
    description: 'Access operational tools, process guides, and efficiency improvements for loan delivery.',
    icon: <LineChart className="w-8 h-8" />,
    color: 'bg-blue-50 text-blue-600'
  },
  {
    id: 'Quality assurance',
    title: 'Quality & Compliance',
    description: 'Review quality assurance tools, compliance checkers, and risk management resources.',
    icon: <Shield className="w-8 h-8" />,
    color: 'bg-purple-50 text-purple-600'
  }
];

const ThemeSplash: React.FC<ThemeSplashProps> = ({ onThemeSelect }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to the Toolkit
          </h1>
          <p className="text-lg text-gray-600">
            Select a theme to explore the available tools and resources
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => onThemeSelect('Sales')}
            className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-emerald-100 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            <div className="relative p-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sales</h3>
              <p className="text-gray-600 text-sm">
                Tools and resources for sales activities, pipeline management, and revenue optimization.
              </p>
            </div>
          </button>

          <button
            onClick={() => onThemeSelect('Delivery')}
            className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            <div className="relative p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <LineChart className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Delivery</h3>
              <p className="text-gray-600 text-sm">
                Resources for delivery processes, logistics, and operational efficiency.
              </p>
            </div>
          </button>

          <button
            onClick={() => onThemeSelect('Quality assurance')}
            className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            <div className="relative p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Assurance</h3>
              <p className="text-gray-600 text-sm">
                Tools for quality control, testing, and maintaining high standards.
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeSplash; 