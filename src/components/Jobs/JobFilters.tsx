import React from 'react';
import { Search, Filter } from 'lucide-react';
import { JobFilter } from '../../types';

interface JobFiltersProps {
  filters: JobFilter;
  onFilterChange: (filters: JobFilter) => void;
}

const JobFilters: React.FC<JobFiltersProps> = ({ filters, onFilterChange }) => {
  const locations = [
    'All Locations',
    'Orange County, CA',
    'Riverside County, CA',
    'San Bernardino County, CA',
    'Los Angeles County, CA',
    'San Diego County, CA'
  ];

  const jobTypes = [
    'All Types',
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

  const experienceLevels = [
    'All Levels',
    'Entry Level',
    'Intermediate',
    'Advanced'
  ];

  const handleFilterChange = (key: keyof JobFilter, value: string) => {
    onFilterChange({
      ...filters,
      [key]: value === 'All Locations' || value === 'All Types' || value === 'All Levels' ? '' : value
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center mb-4">
        <Filter className="h-5 w-5 text-gray-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Filter Jobs</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="lg:col-span-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Jobs
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title, agency, or keywords..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <select
            value={filters.location || 'All Locations'}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          >
            {locations.map(location => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* Job Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Type
          </label>
          <select
            value={filters.jobType || 'All Types'}
            onChange={(e) => handleFilterChange('jobType', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          >
            {jobTypes.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Experience Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Experience Level
          </label>
          <select
            value={filters.experienceLevel || 'All Levels'}
            onChange={(e) => handleFilterChange('experienceLevel', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          >
            {experienceLevels.map(level => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        {/* Pay Rate */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pay Rate
          </label>
          <select
            value={filters.payRate || 'All Rates'}
            onChange={(e) => handleFilterChange('payRate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="All Rates">All Rates</option>
            <option value="$15-20/hour">$15-20/hour</option>
            <option value="$20-25/hour">$20-25/hour</option>
            <option value="$25-30/hour">$25-30/hour</option>
            <option value="$30-35/hour">$30-35/hour</option>
            <option value="$35+/hour">$35+/hour</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default JobFilters;