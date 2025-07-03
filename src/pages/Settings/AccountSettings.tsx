import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Bell, 
  MapPin, 
  Briefcase, 
  Shield, 
  Trash2,
  Download,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useJobs } from '../../contexts/JobContext';

interface NotificationSettings {
  newJobs: boolean;
  subscriptionReminders: boolean;
  jobAlerts: boolean;
  weeklyDigest: boolean;
}

interface JobAlertSettings {
  locations: string[];
  jobTypes: string[];
  experienceLevels: string[];
  minPayRate: string;
}

interface PrivacySettings {
  profileVisible: boolean;
  emailVisible: boolean;
  allowMarketing: boolean;
}

const AccountSettings: React.FC = () => {
  const { user, updateUser, logout } = useAuth();
  const { jobs } = useJobs();
  const navigate = useNavigate();
  
  const [notifications, setNotifications] = useState<NotificationSettings>({
    newJobs: true,
    subscriptionReminders: true,
    jobAlerts: true,
    weeklyDigest: false
  });

  const [jobAlerts, setJobAlerts] = useState<JobAlertSettings>({
    locations: [],
    jobTypes: [],
    experienceLevels: [],
    minPayRate: ''
  });

  const [privacy, setPrivacy] = useState<PrivacySettings>({
    profileVisible: true,
    emailVisible: false,
    allowMarketing: true
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    // Load saved settings from localStorage
    const savedSettings = localStorage.getItem(`userSettings_${user?.id}`);
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setNotifications(settings.notifications || notifications);
      setJobAlerts(settings.jobAlerts || jobAlerts);
      setPrivacy(settings.privacy || privacy);
    }
  }, [user?.id]);

  const saveSettings = () => {
    const settings = {
      notifications,
      jobAlerts,
      privacy
    };
    localStorage.setItem(`userSettings_${user?.id}`, JSON.stringify(settings));
    setMessage({ type: 'success', text: 'Settings saved successfully!' });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handleNotificationChange = (key: keyof NotificationSettings) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleJobAlertChange = (key: keyof JobAlertSettings, value: string | string[]) => {
    setJobAlerts(prev => ({ ...prev, [key]: value }));
  };

  const handlePrivacyChange = (key: keyof PrivacySettings) => {
    setPrivacy(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleLocationToggle = (location: string) => {
    const newLocations = jobAlerts.locations.includes(location)
      ? jobAlerts.locations.filter(l => l !== location)
      : [...jobAlerts.locations, location];
    handleJobAlertChange('locations', newLocations);
  };

  const handleJobTypeToggle = (jobType: string) => {
    const newJobTypes = jobAlerts.jobTypes.includes(jobType)
      ? jobAlerts.jobTypes.filter(t => t !== jobType)
      : [...jobAlerts.jobTypes, jobType];
    handleJobAlertChange('jobTypes', newJobTypes);
  };

  const exportSavedJobs = () => {
    const savedJobs = jobs.filter(job => user?.savedJobs?.includes(job.id));
    const exportData = {
      exportDate: new Date().toISOString(),
      user: {
        name: `${user?.firstName} ${user?.lastName}`,
        email: user?.email
      },
      savedJobs: savedJobs.map(job => ({
        title: job.title,
        agency: job.agency,
        location: job.location,
        payRate: job.payRate,
        jobType: job.jobType,
        startDate: job.startDate,
        experienceLevel: job.experienceLevel,
        contactEmail: job.contactEmail,
        postedDate: job.postedDate
      }))
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `saved-jobs-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setMessage({ type: 'success', text: 'Saved jobs exported successfully!' });
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== 'DELETE') {
      setMessage({ type: 'error', text: 'Please type DELETE to confirm' });
      return;
    }

    setLoading(true);

    try {
      // Remove user from users array
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = users.filter((u: any) => u.id !== user?.id);
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      // Remove user settings
      localStorage.removeItem(`userSettings_${user?.id}`);

      // Remove user payments
      const payments = JSON.parse(localStorage.getItem('payments') || '[]');
      const updatedPayments = payments.filter((p: any) => p.userId !== user?.id);
      localStorage.setItem('payments', JSON.stringify(updatedPayments));

      logout();
      navigate('/');
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete account' });
    } finally {
      setLoading(false);
    }
  };

  const locations = [
    'Orange County, CA',
    'Riverside County, CA',
    'San Bernardino County, CA',
    'Los Angeles County, CA',
    'San Diego County, CA'
  ];

  const jobTypes = [
    'Hotshot Crew',
    'Engine Crew',
    'Hand Crew',
    'Helitack',
    'Smokejumper',
    'Prevention',
    'Support',
    'Heavy Equipment',
    'Leadership',
    'Medical',
    'Aviation',
    'Investigation'
  ];

  const experienceLevels = ['Entry Level', 'Intermediate', 'Advanced'];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center text-gray-600 hover:text-orange-600 transition-colors mb-4"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Dashboard
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-gray-600 mt-2">Manage your preferences and account options</p>
      </div>

      {message.text && (
        <div className={`mb-6 p-4 rounded-md ${
          message.type === 'success' 
            ? 'bg-green-50 border border-green-200 text-green-700' 
            : 'bg-red-50 border border-red-200 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      <div className="space-y-8">
        {/* Email Notifications */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Bell className="h-5 w-5 mr-2 text-orange-500" />
            Email Notifications
          </h2>
          
          <div className="space-y-4">
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">
                    {key === 'newJobs' && 'New Job Postings'}
                    {key === 'subscriptionReminders' && 'Subscription Reminders'}
                    {key === 'jobAlerts' && 'Job Alerts'}
                    {key === 'weeklyDigest' && 'Weekly Digest'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {key === 'newJobs' && 'Get notified when new jobs matching your preferences are posted'}
                    {key === 'subscriptionReminders' && 'Receive reminders about subscription renewals and billing'}
                    {key === 'jobAlerts' && 'Receive alerts for jobs matching your saved criteria'}
                    {key === 'weeklyDigest' && 'Weekly summary of new job postings and activity'}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => handleNotificationChange(key as keyof NotificationSettings)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Job Alert Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Briefcase className="h-5 w-5 mr-2 text-orange-500" />
            Job Alert Preferences
          </h2>

          <div className="space-y-6">
            {/* Preferred Locations */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                Preferred Locations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {locations.map(location => (
                  <label key={location} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={jobAlerts.locations.includes(location)}
                      onChange={() => handleLocationToggle(location)}
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">{location}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Job Types */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Job Types of Interest</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {jobTypes.map(jobType => (
                  <label key={jobType} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={jobAlerts.jobTypes.includes(jobType)}
                      onChange={() => handleJobTypeToggle(jobType)}
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">{jobType}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Minimum Pay Rate */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Minimum Pay Rate</h3>
              <select
                value={jobAlerts.minPayRate}
                onChange={(e) => handleJobAlertChange('minPayRate', e.target.value)}
                className="w-full md:w-48 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Any pay rate</option>
                <option value="15">$15+/hour</option>
                <option value="20">$20+/hour</option>
                <option value="25">$25+/hour</option>
                <option value="30">$30+/hour</option>
                <option value="35">$35+/hour</option>
              </select>
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Shield className="h-5 w-5 mr-2 text-orange-500" />
            Privacy Settings
          </h2>

          <div className="space-y-4">
            {Object.entries(privacy).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">
                    {key === 'profileVisible' && 'Profile Visibility'}
                    {key === 'emailVisible' && 'Email Visibility'}
                    {key === 'allowMarketing' && 'Marketing Communications'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {key === 'profileVisible' && 'Allow your profile to be visible to employers'}
                    {key === 'emailVisible' && 'Show your email address on your public profile'}
                    {key === 'allowMarketing' && 'Receive marketing emails about new features and updates'}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => handlePrivacyChange(key as keyof PrivacySettings)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Data Export & Account Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Data & Account</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Export Saved Jobs</p>
                <p className="text-sm text-gray-500">Download your saved jobs data as a JSON file</p>
              </div>
              <button
                onClick={exportSavedJobs}
                className="flex items-center px-4 py-2 text-orange-600 border border-orange-300 rounded-md hover:bg-orange-50 transition-colors"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-red-600">Delete Account</p>
                  <p className="text-sm text-gray-500">Permanently delete your account and all associated data</p>
                </div>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="flex items-center px-4 py-2 text-red-600 border border-red-300 rounded-md hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Save Settings Button */}
        <div className="flex justify-end">
          <button
            onClick={saveSettings}
            className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
          >
            Save All Settings
          </button>
          <button
            onClick={() => navigate('/dashboard/profile')}
            className="ml-4 px-6 py-2 text-orange-600 border border-orange-300 rounded-md hover:bg-orange-50 transition-colors"
          >
            Edit Profile & Password
          </button>
        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Delete Account</h3>
            </div>
            
            <p className="text-gray-600 mb-4">
              This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
            </p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type <strong>DELETE</strong> to confirm:
              </label>
              <input
                type="text"
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                placeholder="DELETE"
              />
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmation('');
                }}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={loading || deleteConfirmation !== 'DELETE'}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Deleting...' : 'Delete Account'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSettings;