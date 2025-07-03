import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import JobCard from '../../components/Jobs/JobCard';
import JobFilters from '../../components/Jobs/JobFilters';
import { Job, JobFilter } from '../../types';
import { useJobs } from '../../contexts/JobContext';
import { useAuth } from '../../contexts/AuthContext';

const JobList: React.FC = () => {
  const [filters, setFilters] = useState<JobFilter>({
    location: '',
    jobType: '',
    payRate: '',
    experienceLevel: '',
    search: ''
  });
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [sortBy, setSortBy] = useState<'date' | 'payRate' | 'title'>('date');
  
  const { jobs, incrementJobViews } = useJobs();
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let filtered = jobs.filter(job => job.isActive);

    // Apply filters
    if (filters.location) {
      filtered = filtered.filter(job => 
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.jobType) {
      filtered = filtered.filter(job => 
        job.jobType.toLowerCase().includes(filters.jobType.toLowerCase())
      );
    }

    if (filters.experienceLevel) {
      filtered = filtered.filter(job => 
        job.experienceLevel.toLowerCase().includes(filters.experienceLevel.toLowerCase())
      );
    }

    if (filters.payRate && filters.payRate !== 'All Rates') {
      if (filters.payRate === '$35+/hour') {
        filtered = filtered.filter(job => {
          const payMatch = job.payRate.match(/\$(\d+)/);
          return payMatch && parseInt(payMatch[1]) >= 35;
        });
      } else {
        filtered = filtered.filter(job => 
          job.payRate.includes(filters.payRate.replace('/hour', ''))
        );
      }
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchTerm) ||
        job.agency.toLowerCase().includes(searchTerm) ||
        job.description.toLowerCase().includes(searchTerm) ||
        job.location.toLowerCase().includes(searchTerm)
      );
    }

    // Sort jobs
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
        case 'payRate':
          const aRate = parseInt(a.payRate.match(/\$(\d+)/)?.[1] || '0');
          const bRate = parseInt(b.payRate.match(/\$(\d+)/)?.[1] || '0');
          return bRate - aRate;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    setFilteredJobs(filtered);
  }, [jobs, filters, sortBy]);

  const handleJobClick = (jobId: string) => {
    incrementJobViews(jobId);
    navigate(`/jobs/${jobId}`);
  };

  const handleBookmark = (jobId: string) => {
    if (!user) return;
    
    const savedJobs = user.savedJobs || [];
    const isBookmarked = savedJobs.includes(jobId);
    
    const updatedSavedJobs = isBookmarked
      ? savedJobs.filter(id => id !== jobId)
      : [...savedJobs, jobId];
    
    updateUser({ savedJobs: updatedSavedJobs });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Wildland Firefighting Jobs</h1>
        <p className="text-gray-600">
          Discover opportunities with leading agencies across Southern California
        </p>
      </div>

      <JobFilters filters={filters} onFilterChange={setFilters} />

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <div className="text-gray-600 mb-4 sm:mb-0">
          Showing {filteredJobs.length} of {jobs.filter(job => job.isActive).length} jobs
        </div>
        
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'payRate' | 'title')}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="date">Date Posted</option>
            <option value="payRate">Pay Rate</option>
            <option value="title">Job Title</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredJobs.map(job => (
          <JobCard
            key={job.id}
            job={job}
            onClick={() => handleJobClick(job.id)}
            isBookmarked={user?.savedJobs?.includes(job.id)}
            onBookmark={() => handleBookmark(job.id)}
          />
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No jobs match your current filters.</p>
          <p className="text-gray-400 mt-2">Try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default JobList;