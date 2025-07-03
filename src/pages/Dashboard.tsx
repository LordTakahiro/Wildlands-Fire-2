import React from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  CreditCard, 
  Bookmark, 
  FileText, 
  Settings,
  Calendar,
  DollarSign,
  Eye,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useJobs } from '../contexts/JobContext';

const Dashboard: React.FC = () => {
  const { user, isSubscribed } = useAuth();
  const { jobs } = useJobs();

  const savedJobs = jobs.filter(job => user?.savedJobs?.includes(job.id));
  const subscriptionExpiry = user?.subscriptionExpiry ? new Date(user.subscriptionExpiry) : null;
  const daysUntilExpiry = subscriptionExpiry ? Math.ceil((subscriptionExpiry.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0;

  const stats = [
    {
      name: 'Saved Jobs',
      value: savedJobs.length,
      icon: <Bookmark className="h-6 w-6" />
    },
    {
      name: 'Applications',
      value: '0',
      icon: <FileText className="h-6 w-6" />
    },
    {
      name: 'Profile Views',
      value: '24',
      icon: <Eye className="h-6 w-6" />
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="text-gray-600 mt-2">
          Manage your profile, subscriptions, and job applications
        </p>
      </div>

      {/* Subscription Status */}
      <div className="mb-8">
        {isSubscribed ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-5 w-5 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-green-800 font-medium">Subscription Active</p>
                <p className="text-green-700 text-sm">
                  Your subscription expires in {daysUntilExpiry} days on {subscriptionExpiry?.toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-orange-600" />
              </div>
              <div className="ml-3">
                <p className="text-orange-800 font-medium">Subscription Required</p>
                <p className="text-orange-700 text-sm">
                  Subscribe to access full job details and apply to positions
                </p>
              </div>
              <div className="ml-auto">
                <Link
                  to="/subscribe"
                  className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm hover:bg-orange-600 transition-colors"
                >
                  Subscribe Now
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              to="/jobs"
              className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FileText className="h-5 w-5 text-orange-500 mr-3" />
              <span className="text-gray-700">Browse Jobs</span>
            </Link>
            <Link
              to="/dashboard/profile"
              className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <User className="h-5 w-5 text-orange-500 mr-3" />
              <span className="text-gray-700">Edit Profile</span>
            </Link>
            <Link
              to="/dashboard/billing"
              className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <CreditCard className="h-5 w-5 text-orange-500 mr-3" />
              <span className="text-gray-700">Billing & Subscription</span>
            </Link>
            <Link
              to="/dashboard/settings"
              className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Settings className="h-5 w-5 text-orange-500 mr-3" />
              <span className="text-gray-700">Account Settings</span>
            </Link>
          </div>
        </div>

        {/* Saved Jobs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Saved Jobs</h2>
          {savedJobs.length > 0 ? (
            <div className="space-y-3">
              {savedJobs.slice(0, 3).map(job => (
                <Link
                  key={job.id}
                  to={`/jobs/${job.id}`}
                  className="block p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                >
                  <h3 className="font-medium text-gray-900">{job.title}</h3>
                  <p className="text-sm text-gray-600">{job.agency}</p>
                  <p className="text-sm text-gray-500">{job.location}</p>
                </Link>
              ))}
              {savedJobs.length > 3 && (
                <Link
                  to="/dashboard/saved-jobs"
                  className="block text-center py-2 text-orange-600 hover:text-orange-700 transition-colors"
                >
                  View all {savedJobs.length} saved jobs
                </Link>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <Bookmark className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">No saved jobs yet</p>
              <Link
                to="/jobs"
                className="text-orange-600 hover:text-orange-700 transition-colors"
              >
                Browse jobs to save your favorites
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;