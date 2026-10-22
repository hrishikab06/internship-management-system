import React, { useState } from 'react';
import { Briefcase, Building, CheckCircle, GraduationCap, Users } from 'lucide-react';

export default function StudentDashboard({ user, onLogout }) {
  const [internships, setInternships] = useState([
    { id: 1, company: 'Google Cloud', role: 'Cloud Solutions Intern', status: 'OPEN', applied: false },
    { id: 2, company: 'Amazon AWS', role: 'DevOps & Cloud Engineer Intern', status: 'OPEN', applied: false },
    { id: 3, company: 'Microsoft', role: 'Full Stack Java Intern', status: 'OPEN', applied: true },
    { id: 4, company: 'Goldman Sachs', role: 'Software Engineering Intern', status: 'OPEN', applied: false },
  ]);

  const [appliedCount, setAppliedCount] = useState(1);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [alertMsg, setAlertMsg] = useState('');

  const handleApply = (id) => {
    setInternships(internships.map(item => {
      if (item.id === id) {
        if (!item.applied) {
          setAppliedCount(prev => prev + 1);
          setAlertMsg(`Successfully submitted application for ${item.company} (${item.role})!`);
          setTimeout(() => setAlertMsg(''), 4000);
          return { ...item, applied: true };
        }
      }
      return item;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-4 border-b">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Student Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome, {user.email}</p>
        </div>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold uppercase tracking-wide">
          Student Portal
        </span>
      </div>

      {alertMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          <span>{alertMsg}</span>
        </div>
      )}

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-gray-500">Applications Submitted</div>
            <div className="text-3xl font-bold text-blue-600 mt-1">{appliedCount}</div>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <Briefcase className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-gray-500">Interview Rounds</div>
            <div className="text-3xl font-bold text-amber-500 mt-1">1</div>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-gray-500">Offers Extended</div>
            <div className="text-3xl font-bold text-emerald-600 mt-1">0</div>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
            <GraduationCap className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Internships Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Available Internships</h2>
          <span className="text-xs text-gray-500">Updated just now</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="py-3 px-6">Company</th>
                <th className="py-3 px-6">Role</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {internships.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-900 flex items-center gap-2">
                    <Building className="w-4 h-4 text-gray-400" />
                    {item.company}
                  </td>
                  <td className="py-4 px-6 text-gray-600">{item.role}</td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => handleApply(item.id)}
                      disabled={item.applied}
                      className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
                        item.applied
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                      }`}
                    >
                      {item.applied ? 'Applied' : 'Apply Now'}
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
