import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  Users,
  Briefcase,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { useJobs } from '../../contexts/JobContext';

const AdminDashboard: React.FC = () => {
  const { jobs, deleteJob, toggleJobActive } = useJobs();
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const filteredJobs = jobs.filter(job => {
    if (filter === 'active') return job.isActive;
    if (filter === 'inactive') return !job.isActive;
    return true;
  });

  const stats = [
    {
      name: 'Total Jobs',
      value: jobs.length,
      icon: <Briefcase className="h-6 w-6" />
    },
    {
      name: 'Active Jobs',
      value: jobs.filter(job => job.isActive).length,
      icon: <Eye className="h-6 w-6" />
    },
    {
      name: 'Total Views',
      value: jobs.reduce((sum, job) => sum + job.views, 0),
      icon: <TrendingUp className="h-6 w-6" />
    },
    {
      name: 'Applications',
      value: jobs.reduce((sum, job) => sum + job.applications, 0),
      icon: <Users className="h-6 w-6" />
    }
  ];

  const handleDelete = (jobId: string) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      deleteJob(jobId);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage job postings and view analytics</p>
        </div>
        <Link
          to="/admin/jobs/new"
          className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Job
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="p-3 bg-orange-100 rounded-md">
                  {stat.icon}
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Jobs Management */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <h2 className="text-xl font-semibold text-gray-900">Job Management</h2>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as 'all' | 'active' | 'inactive')}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="all">All Jobs</option>
                <option value="active">Active Jobs</option>
                <option value="inactive">Inactive Jobs</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Job Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Agency
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Posted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{job.title}</div>
                    <div className="text-sm text-gray-500">{job.jobType}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {job.agency}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {job.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      job.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {job.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {job.views}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(job.postedDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <Link
                      to={`/admin/jobs/${job.id}/edit`}
                      className="text-orange-600 hover:text-orange-900 inline-flex items-center"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => toggleJobActive(job.id)}
                      className={`${
                        job.isActive 
                          ? 'text-red-600 hover:text-red-900' 
                          : 'text-green-600 hover:text-green-900'
                      } inline-flex items-center`}
                    >
                      {job.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                    <button
                      onClick={() => handleDelete(job.id)}
                      className="text-red-600 hover:text-red-900 inline-flex items-center"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No jobs found matching your filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;