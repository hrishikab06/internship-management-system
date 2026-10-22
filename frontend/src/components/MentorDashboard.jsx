import React, { useState } from 'react';
import { UserCheck, Star, Award, CheckCircle } from 'lucide-react';

export default function MentorDashboard({ user }) {
  const [students, setStudents] = useState([
    { id: 1, name: 'Aarav Sharma', roll: 'CS2021001', role: 'Full Stack Java Intern', company: 'Microsoft', rating: 4, evaluated: true },
    { id: 2, name: 'Priya Patel', roll: 'CS2021045', role: 'Cloud Solutions Intern', company: 'Google Cloud', rating: null, evaluated: false },
    { id: 3, name: 'Rohan Verma', roll: 'EC2021088', role: 'DevOps Intern', company: 'Amazon AWS', rating: null, evaluated: false },
  ]);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');
  const [showModal, setShowModal] = useState(false);

  const openEvaluation = (student) => {
    setSelectedStudent(student);
    setRating(student.rating || 5);
    setFeedback('');
    setShowModal(true);
  };

  const submitEvaluation = () => {
    if (!selectedStudent) return;
    setStudents(students.map(s => s.id === selectedStudent.id ? { ...s, evaluated: true, rating } : s));
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-4 border-b">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Mentor Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome, {user.email}</p>
        </div>
        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold uppercase tracking-wide">
          Mentor / Faculty Portal
        </span>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Assigned Students</h2>
            <p className="text-xs text-gray-500">Review student internship progress and perform evaluations</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="py-3 px-6">Student Name</th>
                <th className="py-3 px-6">Roll No</th>
                <th className="py-3 px-6">Company &amp; Role</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Evaluation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-900 flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-purple-500" />
                    {student.name}
                  </td>
                  <td className="py-4 px-6 text-gray-500">{student.roll}</td>
                  <td className="py-4 px-6 text-gray-700">
                    <div className="font-medium">{student.role}</div>
                    <div className="text-xs text-gray-400">{student.company}</div>
                  </td>
                  <td className="py-4 px-6">
                    {student.evaluated ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-800">
                        <CheckCircle className="w-3.5 h-3.5" /> Evaluated ({student.rating}/5)
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800">
                        Pending Review
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => openEvaluation(student)}
                      className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-semibold shadow-sm transition"
                    >
                      {student.evaluated ? 'Re-evaluate' : 'Evaluate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Evaluation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-gray-800">Evaluate {selectedStudent?.name}</h3>
            <p className="text-xs text-gray-500">{selectedStudent?.company} — {selectedStudent?.role}</p>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Performance Rating (1-5)</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`p-2 rounded-lg border text-sm font-bold flex-1 ${
                      rating >= star ? 'bg-amber-400 text-white border-amber-500' : 'bg-gray-50 text-gray-400'
                    }`}
                  >
                    ★ {star}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Feedback &amp; Remarks</label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Good performance in sprint delivery..."
                className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={submitEvaluation}
                className="px-4 py-2 text-sm bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-sm"
              >
                Save Evaluation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
