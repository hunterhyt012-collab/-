import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ContentArea } from './components/ContentArea';
import { Clock } from './components/Clock';
import { ViewType, User } from './types';
import { Bell, Search } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>(ViewType.DASHBOARD);
  
  const currentUser: User = {
    name: 'Administrator',
    role: 'Super Admin',
    avatar: 'https://picsum.photos/40/40', // Placeholder
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar */}
      <Sidebar onNavigate={setCurrentView} currentView={currentView} />

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 shadow-sm flex items-center justify-between px-8 z-10">
          
          {/* Search Bar (Global) */}
          <div className="flex items-center w-1/3">
            <div className="relative w-full max-w-md">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </span>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-full leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                placeholder="Search anything..."
              />
            </div>
          </div>

          {/* Right Section: Clock & User Profile */}
          <div className="flex items-center space-x-6">
            <Clock />
            
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            
            <button className="relative p-2 text-slate-400 hover:text-indigo-600 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            
            <div className="flex items-center pl-2">
              <div className="text-right mr-3 hidden md:block">
                <p className="text-sm font-bold text-slate-800 leading-tight">{currentUser.name}</p>
                <p className="text-xs text-slate-500 font-medium">{currentUser.role}</p>
              </div>
              <img
                className="h-9 w-9 rounded-full ring-2 ring-indigo-100 cursor-pointer object-cover"
                src={currentUser.avatar}
                alt="User avatar"
              />
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto bg-slate-50/50 p-2 scroll-smooth">
          <ContentArea currentView={currentView} />
        </main>
      </div>
    </div>
  );
};

export default App;