import React, { useState } from 'react';
import Login from './components/Login';
import StudentDashboard from './components/StudentDashboard';
import MentorDashboard from './components/MentorDashboard';
import AdminDashboard from './components/AdminDashboard';
import { LogOut, LayoutDashboard, Briefcase, GraduationCap, Shield } from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (!currentUser) {
    return <Login onLogin={setCurrentUser} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f7f6]">
      {/* Top Header Bar */}
      <header className="bg-white border-b border-gray-200 px-6 py-3.5 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-gray-800 leading-tight">Internship &amp; Placement System</div>
            <div className="text-xs text-gray-500">College Administration Portal</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-sm text-gray-600 font-medium">{currentUser.email}</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              {currentUser.role}
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs font-semibold text-red-600 border border-red-200 hover:bg-red-50 px-3 py-1.5 rounded-lg transition"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </header>

      {/* Main Container with Sidebar + Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-[#2c3e50] text-gray-200 p-5 hidden md:block">
          <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
            Navigation
          </div>

          <nav className="space-y-1">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#34495e] text-white text-sm font-medium">
              <LayoutDashboard className="w-4 h-4 text-blue-400" /> Dashboard
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:bg-[#34495e] hover:text-white text-sm font-medium transition">
              <Briefcase className="w-4 h-4 text-gray-400" /> Opportunities
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:bg-[#34495e] hover:text-white text-sm font-medium transition">
              <GraduationCap className="w-4 h-4 text-gray-400" /> Placements
            </button>
          </nav>

          <div className="mt-8 p-3 bg-[#1e2b37] rounded-xl text-xs space-y-1 text-gray-400">
            <div className="font-semibold text-gray-300">Deployment Status</div>
            <div className="text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span> AWS Amplify Ready
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6 md:p-8 max-w-6xl mx-auto w-full">
          {currentUser.role === 'STUDENT' && <StudentDashboard user={currentUser} onLogout={handleLogout} />}
          {currentUser.role === 'MENTOR' && <MentorDashboard user={currentUser} onLogout={handleLogout} />}
          {currentUser.role === 'ADMIN' && <AdminDashboard user={currentUser} onLogout={handleLogout} />}
        </main>
      </div>
    </div>
  );
}
