import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  Clock, 
  Mail, 
  Phone,
  ArrowLeft,
  Bookmark,
  Eye,
  Users,
  AlertCircle
} from 'lucide-react';
import { useJobs } from '../../contexts/JobContext';
import { useAuth } from '../../contexts/AuthContext';

const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getJobById } = useJobs();
  const { user, updateUser, isSubscribed } = useAuth();
  const [job, setJob] = useState(getJobById(id || ''));

  useEffect(() => {
    if (id) {
      const jobData = getJobById(id);
      setJob(jobData);
    }
  }, [id, getJobById]);

  if (!job) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h2>
          <p className="text-gray-600 mb-4">The job you're looking for doesn't exist.</p>
          <Link
            to="/jobs"
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
          >
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  const handleBookmark = () => {
    if (!user) return;
    
    const savedJobs = user.savedJobs || [];
    const isBookmarked = savedJobs.includes(job.id);
    
    const updatedSavedJobs = isBookmarked
      ? savedJobs.filter(id => id !== job.id)
      : [...savedJobs, job.id];
    
    updateUser({ savedJobs: updatedSavedJobs });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isBookmarked = user?.savedJobs?.includes(job.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <button
          onClick={() => navigate('/jobs')}
          className="flex items-center text-gray-600 hover:text-orange-600 transition-colors mb-4"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Jobs
        </button>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
            <p className="text-xl text-orange-600 font-medium">{job.agency}</p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="flex items-center text-gray-500 text-sm">
              <Eye className="h-4 w-4 mr-1" />
              {job.views} views
            </div>
            <div className="flex items-center text-gray-500 text-sm">
              <Users className="h-4 w-4 mr-1" />
              {job.applications} applications
            </div>
            <button
              onClick={handleBookmark}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                isBookmarked
                  ? 'bg-orange-100 text-orange-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Bookmark className="h-5 w-5" />
              <span>{isBookmarked ? 'Saved' : 'Save Job'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-2 text-orange-500" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <DollarSign className="h-5 w-5 mr-2 text-orange-500" />
                <span>{job.payRate}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="h-5 w-5 mr-2 text-orange-500" />
                <span>{formatDate(job.startDate)} - {formatDate(job.endDate)}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="h-5 w-5 mr-2 text-orange-500" />
                <span>{job.experienceLevel}</span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                {job.jobType}
              </span>
              <span className="text-sm text-gray-500">
                Posted {formatDate(job.postedDate)}
              </span>
            </div>

            {!isSubscribed && (
              <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-orange-600 mr-2" />
                  <div>
                    <p className="text-orange-800 font-medium">Subscription Required</p>
                    <p className="text-orange-700 text-sm">
                      Subscribe to view the full job description, requirements, and contact information.
                    </p>
                    <Link
                      to="/subscribe"
                      className="inline-block mt-2 bg-orange-500 text-white px-4 py-2 rounded-md text-sm hover:bg-orange-600 transition-colors"
                    >
                      Subscribe for $5/month
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {isSubscribed && (
              <>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{job.description}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Requirements</h3>
                  <ul className="space-y-2">
                    {job.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-orange-500 mr-2">•</span>
                        <span className="text-gray-700">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Apply for this Job</h3>
            
            {!isSubscribed ? (
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  Subscribe to view contact information and apply for this position.
                </p>
                <Link
                  to="/subscribe"
                  className="block w-full bg-orange-500 text-white py-3 px-4 rounded-md font-medium hover:bg-orange-600 transition-colors"
                >
                  Subscribe Now
                </Link>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Application Method:</p>
                  <p className="font-medium text-gray-900 capitalize">{job.applicationMethod}</p>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2">Contact Information:</p>
                  <div className="flex items-center text-gray-900">
                    <Mail className="h-4 w-4 mr-2 text-orange-500" />
                    <a 
                      href={`mailto:${job.contactEmail}`}
                      className="hover:text-orange-600 transition-colors"
                    >
                      {job.contactEmail}
                    </a>
                  </div>
                </div>

                <a
                  href={`mailto:${job.contactEmail}?subject=Application for ${job.title}&body=Dear Hiring Manager,%0D%0A%0D%0AI am interested in applying for the ${job.title} position with ${job.agency}.%0D%0A%0D%0APlease find my application materials attached.%0D%0A%0D%0AThank you for your consideration.`}
                  className="block w-full bg-orange-500 text-white py-3 px-4 rounded-md font-medium hover:bg-orange-600 transition-colors text-center"
                >
                  Apply Now
                </a>

                <p className="text-xs text-gray-500 mt-2 text-center">
                  This will open your email client with a pre-filled message
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;