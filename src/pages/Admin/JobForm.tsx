import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { useJobs } from '../../contexts/JobContext';
import { Job } from '../../types';

const JobForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addJob, updateJob, getJobById } = useJobs();
  const isEditing = !!id;
  const existingJob = id ? getJobById(id) : null;

  const [formData, setFormData] = useState({
    title: '',
    agency: '',
    location: '',
    payRate: '',
    jobType: '',
    startDate: '',
    endDate: '',
    experienceLevel: '',
    description: '',
    requirements: [''],
    applicationMethod: 'email',
    contactEmail: '',
    isActive: true
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditing && existingJob) {
      setFormData({
        title: existingJob.title,
        agency: existingJob.agency,
        location: existingJob.location,
        payRate: existingJob.payRate,
        jobType: existingJob.jobType,
        startDate: existingJob.startDate,
        endDate: existingJob.endDate,
        experienceLevel: existingJob.experienceLevel,
        description: existingJob.description,
        requirements: existingJob.requirements,
        applicationMethod: existingJob.applicationMethod,
        contactEmail: existingJob.contactEmail,
        isActive: existingJob.isActive
      });
    }
  }, [isEditing, existingJob]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: target.checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleRequirementChange = (index: number, value: string) => {
    const newRequirements = [...formData.requirements];
    newRequirements[index] = value;
    setFormData(prev => ({
      ...prev,
      requirements: newRequirements
    }));
  };

  const addRequirement = () => {
    setFormData(prev => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }));
  };

  const removeRequirement = (index: number) => {
    if (formData.requirements.length > 1) {
      const newRequirements = formData.requirements.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        requirements: newRequirements
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate form
      if (!formData.title || !formData.agency || !formData.location) {
        throw new Error('Please fill in all required fields');
      }

      // Filter out empty requirements
      const filteredRequirements = formData.requirements.filter(req => req.trim() !== '');
      
      if (isEditing && id) {
        updateJob(id, {
          ...formData,
          requirements: filteredRequirements
        });
      } else {
        addJob({
          ...formData,
          requirements: filteredRequirements
        });
      }

      navigate('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const agencies = [
    'U.S. Forest Service',
    'CAL FIRE',
    'Orange County Fire Authority',
    'Riverside County Fire',
    'San Bernardino County Fire',
    'Los Angeles County Fire',
    'Bureau of Land Management',
    'National Park Service',
    'Other'
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

  const locations = [
    'Orange County, CA',
    'Riverside County, CA',
    'San Bernardino County, CA',
    'Los Angeles County, CA',
    'San Diego County, CA',
    'Imperial County, CA',
    'Ventura County, CA',
    'Santa Barbara County, CA'
  ];

  const experienceLevels = [
    'Entry Level',
    'Intermediate',
    'Advanced'
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <button
          onClick={() => navigate('/admin')}
          className="flex items-center text-gray-600 hover:text-orange-600 transition-colors mb-4"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Admin Dashboard
        </button>
        <h1 className="text-3xl font-bold text-gray-900">
          {isEditing ? 'Edit Job' : 'Add New Job'}
        </h1>
        <p className="text-gray-600 mt-2">
          {isEditing ? 'Update job details' : 'Create a new job posting'}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Title *
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Agency *
              </label>
              <select
                name="agency"
                required
                value={formData.agency}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Select Agency</option>
                {agencies.map(agency => (
                  <option key={agency} value={agency}>{agency}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <select
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Select Location</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pay Rate
              </label>
              <input
                type="text"
                name="payRate"
                placeholder="e.g., $18-22/hour"
                value={formData.payRate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Type
              </label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Select Job Type</option>
                {jobTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience Level
              </label>
              <select
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Select Experience Level</option>
                {experienceLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Email
              </label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Application Method
              </label>
              <select
                name="applicationMethod"
                value={formData.applicationMethod}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="email">Email</option>
                <option value="online">Online Application</option>
                <option value="phone">Phone</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Description
            </label>
            <textarea
              name="description"
              rows={6}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              placeholder="Describe the job responsibilities, duties, and working conditions..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Requirements
            </label>
            {formData.requirements.map((requirement, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={requirement}
                  onChange={(e) => handleRequirementChange(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter a requirement"
                />
                {formData.requirements.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeRequirement(index)}
                    className="ml-2 text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addRequirement}
              className="text-orange-600 hover:text-orange-800 text-sm"
            >
              + Add Requirement
            </button>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
            />
            <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
              Active (job will be visible to users)
            </label>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              <Save className="h-5 w-5 mr-2" />
              {loading ? 'Saving...' : (isEditing ? 'Update Job' : 'Create Job')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobForm;