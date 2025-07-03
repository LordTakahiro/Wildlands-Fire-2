import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Job } from '../types';
import { sampleJobs } from '../data/sampleJobs';

interface JobContextType {
  jobs: Job[];
  addJob: (job: Omit<Job, 'id' | 'postedDate' | 'views' | 'applications'>) => void;
  updateJob: (id: string, updates: Partial<Job>) => void;
  deleteJob: (id: string) => void;
  toggleJobActive: (id: string) => void;
  incrementJobViews: (id: string) => void;
  getJobById: (id: string) => Job | undefined;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const useJobs = () => {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};

interface JobProviderProps {
  children: ReactNode;
}

export const JobProvider: React.FC<JobProviderProps> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const storedJobs = localStorage.getItem('jobs');
    if (storedJobs) {
      setJobs(JSON.parse(storedJobs));
    } else {
      // Initialize with sample data
      localStorage.setItem('jobs', JSON.stringify(sampleJobs));
      setJobs(sampleJobs);
    }
  }, []);

  const updateLocalStorage = (updatedJobs: Job[]) => {
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));
    setJobs(updatedJobs);
  };

  const addJob = (jobData: Omit<Job, 'id' | 'postedDate' | 'views' | 'applications'>) => {
    const newJob: Job = {
      ...jobData,
      id: Date.now().toString(),
      postedDate: new Date().toISOString(),
      views: 0,
      applications: 0
    };
    
    const updatedJobs = [...jobs, newJob];
    updateLocalStorage(updatedJobs);
  };

  const updateJob = (id: string, updates: Partial<Job>) => {
    const updatedJobs = jobs.map(job => 
      job.id === id ? { ...job, ...updates } : job
    );
    updateLocalStorage(updatedJobs);
  };

  const deleteJob = (id: string) => {
    const updatedJobs = jobs.filter(job => job.id !== id);
    updateLocalStorage(updatedJobs);
  };

  const toggleJobActive = (id: string) => {
    const updatedJobs = jobs.map(job => 
      job.id === id ? { ...job, isActive: !job.isActive } : job
    );
    updateLocalStorage(updatedJobs);
  };

  const incrementJobViews = (id: string) => {
    const updatedJobs = jobs.map(job => 
      job.id === id ? { ...job, views: job.views + 1 } : job
    );
    updateLocalStorage(updatedJobs);
  };

  const getJobById = (id: string) => {
    return jobs.find(job => job.id === id);
  };

  const value: JobContextType = {
    jobs,
    addJob,
    updateJob,
    deleteJob,
    toggleJobActive,
    incrementJobViews,
    getJobById
  };

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
};