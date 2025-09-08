import { useState, useEffect } from 'react';
import axiosClient from '../utils/axiosClient';

const SubmissionHistory = ({ problemId }) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get(`/problem/submittedProblem/${problemId}`);
        setSubmissions(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch submission history');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [problemId]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'accepted':
        return 'badge-success';
      case 'wrong':
        return 'badge-error';
      case 'error':
        return 'badge-warning';
      case 'pending':
        return 'badge-info';
      default:
        return 'badge-neutral';
    }
  };

  const formatMemory = (memory) => {
    if (memory < 1024) return `${memory} kB`;
    return `${(memory / 1024).toFixed(2)} MB`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error shadow-lg my-4 max-w-xl mx-auto">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <h2 className="text-3xl font-bold mb-8 text-center">Submission History</h2>

      {submissions.length === 0 ? (
        <div className="alert alert-info shadow-lg max-w-xl mx-auto flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span className="text-lg">No submissions found for this problem</span>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto shadow rounded-lg border border-base-300">
            <table className="table w-full table-zebra">
              <thead className="bg-base-200 text-base font-semibold text-base-content/80">
                <tr>
                  <th className="w-10">#</th>
                  <th className="font-mono">Language</th>
                  <th>Status</th>
                  <th className="font-mono">Runtime</th>
                  <th className="font-mono">Memory</th>
                  <th className="font-mono">Test Cases</th>
                  <th>Submitted</th>
                  <th className="text-center w-24">Actions</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((sub, index) => (
                  <tr
                    key={sub._id}
                    className="hover:bg-base-100 cursor-pointer transition-colors"
                    onClick={() => setSelectedSubmission(sub)}
                    title="Click to view code"
                  >
                    <td>{index + 1}</td>
                    <td className="font-mono capitalize">{sub.language}</td>
                    <td>
                      <span className={`badge ${getStatusColor(sub.status)} capitalize`}>
                        {sub.status}
                      </span>
                    </td>
                    <td className="font-mono">{sub.runtime}s</td>
                    <td className="font-mono">{formatMemory(sub.memory)}</td>
                    <td className="font-mono">
                      {sub.testCasesPassed} / {sub.testCasesTotal}
                    </td>
                    <td>{formatDate(sub.createdAt)}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-outline btn-primary px-3"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSubmission(sub);
                        }}
                        aria-label={`View code for submission #${index + 1}`}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-sm text-center text-gray-600">
            Showing <strong>{submissions.length}</strong> submission
            {submissions.length > 1 ? 's' : ''}
          </p>
        </>
      )}

      {/* Code View Modal */}
      {selectedSubmission && (
        <div className="modal modal-open">
          <div className="modal-box max-w-5xl w-11/12 max-h-[80vh] overflow-y-auto p-6 rounded-lg">
            <h3 className="font-bold text-2xl mb-6 flex items-center justify-between">
              Submission Details: <span className="capitalize">{selectedSubmission.language}</span>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="btn btn-circle btn-sm btn-ghost hover:bg-base-200"
                aria-label="Close modal"
                title="Close"
              >
                ✕
              </button>
            </h3>

            <div className="flex flex-wrap gap-3 mb-4">
              <span className={`badge ${getStatusColor(selectedSubmission.status)} text-lg capitalize`}>
                {selectedSubmission.status}
              </span>
              <span className="badge badge-outline text-lg">Runtime: {selectedSubmission.runtime}s</span>
              <span className="badge badge-outline text-lg">Memory: {formatMemory(selectedSubmission.memory)}</span>
              <span className="badge badge-outline text-lg">
                Passed: {selectedSubmission.testCasesPassed} / {selectedSubmission.testCasesTotal}
              </span>
            </div>

            {selectedSubmission.errorMessage && (
              <div className="alert alert-error mb-4">
                {selectedSubmission.errorMessage}
              </div>
            )}

            <pre className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-auto whitespace-pre-wrap font-mono text-sm">
              <code>{selectedSubmission.code}</code>
            </pre>

            <div className="modal-action mt-6">
              <button
                className="btn btn-primary"
                onClick={() => setSelectedSubmission(null)}
                aria-label="Close code view modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmissionHistory;
