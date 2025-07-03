import React from 'react';
import { MapPin, Calendar, DollarSign, Clock, Bookmark, Eye } from 'lucide-react';
import { Job } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

interface JobCardProps {
  job: Job;
  onClick: () => void;
  isBookmarked?: boolean;
  onBookmark?: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onClick, isBookmarked = false, onBookmark }) => {
  const { isSubscribed } = useAuth();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
          <p className="text-orange-600 font-medium">{job.agency}</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center text-gray-500 text-sm">
            <Eye className="h-4 w-4 mr-1" />
            {job.views}
          </div>
          {onBookmark && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onBookmark();
              }}
              className={`p-2 rounded-full transition-colors ${
                isBookmarked
                  ? 'bg-orange-100 text-orange-600'
                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
              }`}
            >
              <Bookmark className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="flex items-center text-gray-600">
          <MapPin className="h-5 w-5 mr-2" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <DollarSign className="h-5 w-5 mr-2" />
          <span>{job.payRate}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Calendar className="h-5 w-5 mr-2" />
          <span>{formatDate(job.startDate)}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Clock className="h-5 w-5 mr-2" />
          <span>{job.experienceLevel}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
          {job.jobType}
        </span>
        <span className="text-sm text-gray-500">
          Posted {formatDate(job.postedDate)}
        </span>
      </div>

      {!isSubscribed && (
        <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-md">
          <p className="text-sm text-orange-700">
            <strong>Subscribe to view:</strong> Full job description, requirements, and contact information
          </p>
        </div>
      )}
    </div>
  );
};

export default JobCard;