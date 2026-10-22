import React, { useState } from 'react';
import { Users, TrendingUp, ShieldAlert, PlusCircle, Trash2 } from 'lucide-react';

export default function AdminDashboard({ user }) {
  const [usersList, setUsersList] = useState([
    { id: 1, email: 'admin@college.edu', role: 'ADMIN', branch: 'Administration' },
    { id: 2, email: 'prof.sharma@college.edu', role: 'MENTOR', branch: 'Computer Science' },
    { id: 3, email: 'aarav@college.edu', role: 'STUDENT', branch: 'Computer Science' },
    { id: 4, email: 'priya@college.edu', role: 'STUDENT', branch: 'Information Technology' },
    { id: 5, email: 'rohan@college.edu', role: 'STUDENT', branch: 'Electronics' },
  ]);

  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState('STUDENT');
  const [newBranch, setNewBranch] = useState('Computer Science');

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newEmail) return;
    setUsersList([
      ...usersList,
      { id: Date.now(), email: newEmail, role: newRole, branch: newBranch }
    ]);
    setNewEmail('');
  };

  const handleDeleteUser = (id) => {
    setUsersList(usersList.filter(u => u.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-4 border-b">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome, {user.email}</p>
        </div>
        <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold uppercase tracking-wide">
          Administrator
        </span>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-gray-500">Total Registered Users</div>
            <div className="text-3xl font-bold text-gray-900 mt-1">{usersList.length}</div>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-gray-500">Placement Rate</div>
            <div className="text-3xl font-bold text-emerald-600 mt-1">87.5%</div>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-gray-500">Partner Companies</div>
            <div className="text-3xl font-bold text-indigo-600 mt-1">24</div>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
            <ShieldAlert className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Add New User */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-600 mb-3 flex items-center gap-2">
          <PlusCircle className="w-4 h-4 text-blue-500" /> Add New User
        </h2>
        <form onSubmit={handleAddUser} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="User email"
            required
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="STUDENT">Student</option>
            <option value="MENTOR">Mentor</option>
            <option value="ADMIN">Admin</option>
          </select>
          <input
            type="text"
            value={newBranch}
            onChange={(e) => setNewBranch(e.target.value)}
            placeholder="Department / Branch"
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold px-4 py-2 transition"
          >
            Create User
          </button>
        </form>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">User Management</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="py-3 px-6">Username / Email</th>
                <th className="py-3 px-6">Role</th>
                <th className="py-3 px-6">Department</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {usersList.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-6 font-medium text-gray-900">{item.email}</td>
                  <td className="py-3 px-6">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                      item.role === 'ADMIN' ? 'bg-red-100 text-red-700' :
                      item.role === 'MENTOR' ? 'bg-purple-100 text-purple-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {item.role}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-gray-500">{item.branch}</td>
                  <td className="py-3 px-6 text-right">
                    <button
                      onClick={() => handleDeleteUser(item.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition"
                      title="Remove User"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
