import { Job } from '../types';

export const sampleJobs: Job[] = [
  {
    id: '1',
    title: 'Hotshot Crew Member',
    agency: 'U.S. Forest Service',
    location: 'Orange County, CA',
    payRate: '$18-22/hour',
    jobType: 'Hotshot Crew',
    startDate: '2024-04-15',
    endDate: '2024-10-31',
    experienceLevel: 'Entry Level',
    description: 'Join our elite hotshot crew for the 2024 fire season. Work in challenging terrain and extreme conditions while protecting communities and natural resources. This position requires exceptional physical fitness and mental toughness.',
    requirements: ['Physical fitness test', 'Valid driver\'s license', 'Basic firefighter training', 'Ability to work in extreme conditions'],
    applicationMethod: 'email',
    contactEmail: 'hiring@usfs.gov',
    postedDate: '2024-03-01',
    isActive: true,
    views: 145,
    applications: 12
  },
  {
    id: '2',
    title: 'Engine Crew Operator',
    agency: 'CAL FIRE',
    location: 'Riverside County, CA',
    payRate: '$22-28/hour',
    jobType: 'Engine Crew',
    startDate: '2024-05-01',
    endDate: '2024-11-30',
    experienceLevel: 'Intermediate',
    description: 'Operate and maintain wildland fire engines in initial attack and extended attack operations. Responsible for equipment maintenance, water delivery, and suppression tactics.',
    requirements: ['CDL license', '2+ years wildland experience', 'S-130/S-190 certification', 'Mechanical aptitude'],
    applicationMethod: 'email',
    contactEmail: 'careers@calfire.ca.gov',
    postedDate: '2024-02-28',
    isActive: true,
    views: 98,
    applications: 8
  },
  {
    id: '3',
    title: 'Hand Crew Supervisor',
    agency: 'Orange County Fire Authority',
    location: 'Orange County, CA',
    payRate: '$25-32/hour',
    jobType: 'Hand Crew',
    startDate: '2024-04-01',
    endDate: '2024-10-31',
    experienceLevel: 'Advanced',
    description: 'Lead a 20-person hand crew in wildland fire suppression operations. Responsible for crew safety, tactical operations, and training new firefighters.',
    requirements: ['FFT1 or ICT5 certification', '5+ years crew experience', 'Leadership experience', 'EMT certification preferred'],
    applicationMethod: 'email',
    contactEmail: 'jobs@ocfa.org',
    postedDate: '2024-02-15',
    isActive: true,
    views: 176,
    applications: 15
  },
  {
    id: '4',
    title: 'Helitack Crew Member',
    agency: 'U.S. Forest Service',
    location: 'San Bernardino County, CA',
    payRate: '$20-26/hour',
    jobType: 'Helitack',
    startDate: '2024-05-15',
    endDate: '2024-09-30',
    experienceLevel: 'Intermediate',
    description: 'Helicopter-based wildland firefighting operations including rappelling, bucket work, and initial attack. High-stress, high-reward position for experienced firefighters.',
    requirements: ['Rappelling certification', 'Helicopter operations training', '3+ years wildland experience', 'Excellent physical condition'],
    applicationMethod: 'email',
    contactEmail: 'helitack@usfs.gov',
    postedDate: '2024-03-10',
    isActive: true,
    views: 234,
    applications: 18
  },
  {
    id: '5',
    title: 'Smokejumper',
    agency: 'Bureau of Land Management',
    location: 'Riverside County, CA',
    payRate: '$28-35/hour',
    jobType: 'Smokejumper',
    startDate: '2024-04-01',
    endDate: '2024-10-15',
    experienceLevel: 'Advanced',
    description: 'Elite parachute-based wildland firefighting. Jump into remote areas for initial attack on wildfires. Requires extensive training and exceptional physical fitness.',
    requirements: ['Parachute training', 'Advanced wildland certifications', '7+ years experience', 'Wilderness survival training'],
    applicationMethod: 'email',
    contactEmail: 'smokejumpers@blm.gov',
    postedDate: '2024-01-30',
    isActive: true,
    views: 412,
    applications: 25
  },
  {
    id: '6',
    title: 'Prevention Specialist',
    agency: 'Orange County Fire Authority',
    location: 'Orange County, CA',
    payRate: '$24-30/hour',
    jobType: 'Prevention',
    startDate: '2024-03-01',
    endDate: '2024-12-31',
    experienceLevel: 'Intermediate',
    description: 'Conduct fire prevention inspections, community education programs, and hazard reduction activities. Office and field work combination.',
    requirements: ['Fire prevention certification', 'Public speaking skills', 'Computer proficiency', 'Valid driver\'s license'],
    applicationMethod: 'email',
    contactEmail: 'prevention@ocfa.org',
    postedDate: '2024-02-01',
    isActive: true,
    views: 89,
    applications: 6
  },
  {
    id: '7',
    title: 'Wildland Fire Mechanic',
    agency: 'CAL FIRE',
    location: 'Los Angeles County, CA',
    payRate: '$26-34/hour',
    jobType: 'Support',
    startDate: '2024-04-01',
    endDate: '2024-11-30',
    experienceLevel: 'Advanced',
    description: 'Maintain and repair wildland fire equipment including engines, hand tools, and support vehicles. Critical support role for fire operations.',
    requirements: ['ASE certification', 'Heavy equipment experience', 'Welding certification', 'Mechanical degree preferred'],
    applicationMethod: 'email',
    contactEmail: 'mechanics@calfire.ca.gov',
    postedDate: '2024-02-20',
    isActive: true,
    views: 67,
    applications: 4
  },
  {
    id: '8',
    title: 'Fire Behavior Analyst',
    agency: 'U.S. Forest Service',
    location: 'Orange County, CA',
    payRate: '$30-38/hour',
    jobType: 'Support',
    startDate: '2024-05-01',
    endDate: '2024-10-31',
    experienceLevel: 'Advanced',
    description: 'Analyze fire behavior, weather patterns, and provide tactical recommendations to incident commanders. Requires advanced fire science knowledge.',
    requirements: ['Fire behavior certification', 'Meteorology background', 'GIS experience', 'Bachelor\'s degree preferred'],
    applicationMethod: 'email',
    contactEmail: 'analysts@usfs.gov',
    postedDate: '2024-03-05',
    isActive: true,
    views: 123,
    applications: 9
  },
  {
    id: '9',
    title: 'Type 6 Engine Operator',
    agency: 'Riverside County Fire',
    location: 'Riverside County, CA',
    payRate: '$19-25/hour',
    jobType: 'Engine Crew',
    startDate: '2024-04-15',
    endDate: '2024-10-31',
    experienceLevel: 'Entry Level',
    description: 'Operate Type 6 wildland engines in initial attack and patrol operations. Entry-level position with training provided.',
    requirements: ['Valid driver\'s license', 'Basic firefighter training', 'Willingness to learn', 'Physical fitness'],
    applicationMethod: 'email',
    contactEmail: 'hiring@rvcfire.org',
    postedDate: '2024-03-12',
    isActive: true,
    views: 156,
    applications: 14
  },
  {
    id: '10',
    title: 'Dozer Operator',
    agency: 'CAL FIRE',
    location: 'San Bernardino County, CA',
    payRate: '$28-35/hour',
    jobType: 'Heavy Equipment',
    startDate: '2024-05-01',
    endDate: '2024-11-15',
    experienceLevel: 'Advanced',
    description: 'Operate bulldozers in wildland fire suppression operations. Build firebreaks and control lines in challenging terrain.',
    requirements: ['Heavy equipment operator license', 'Dozer operation experience', '5+ years construction experience', 'Safety certification'],
    applicationMethod: 'email',
    contactEmail: 'equipment@calfire.ca.gov',
    postedDate: '2024-02-25',
    isActive: true,
    views: 87,
    applications: 7
  },
  {
    id: '11',
    title: 'Water Tender Operator',
    agency: 'Orange County Fire Authority',
    location: 'Orange County, CA',
    payRate: '$21-27/hour',
    jobType: 'Support',
    startDate: '2024-04-01',
    endDate: '2024-10-31',
    experienceLevel: 'Intermediate',
    description: 'Operate water tender trucks to supply water to fire suppression operations. Support role critical to firefighting efforts.',
    requirements: ['CDL license', 'Water system knowledge', 'Mechanical aptitude', '2+ years driving experience'],
    applicationMethod: 'email',
    contactEmail: 'support@ocfa.org',
    postedDate: '2024-03-08',
    isActive: true,
    views: 102,
    applications: 8
  },
  {
    id: '12',
    title: 'Incident Commander Trainee',
    agency: 'U.S. Forest Service',
    location: 'Orange County, CA',
    payRate: '$32-40/hour',
    jobType: 'Leadership',
    startDate: '2024-06-01',
    endDate: '2024-10-31',
    experienceLevel: 'Advanced',
    description: 'Training position for future incident commanders. Learn fire incident management, resource coordination, and strategic planning.',
    requirements: ['Current firefighter', 'Leadership experience', 'ICS training', 'College degree preferred'],
    applicationMethod: 'email',
    contactEmail: 'leadership@usfs.gov',
    postedDate: '2024-03-15',
    isActive: true,
    views: 198,
    applications: 16
  },
  {
    id: '13',
    title: 'Communications Specialist',
    agency: 'CAL FIRE',
    location: 'Los Angeles County, CA',
    payRate: '$23-29/hour',
    jobType: 'Support',
    startDate: '2024-04-01',
    endDate: '2024-11-30',
    experienceLevel: 'Intermediate',
    description: 'Manage radio communications for fire operations. Coordinate between crews, aircraft, and command staff.',
    requirements: ['Radio operator license', 'Communication skills', 'Multi-tasking ability', 'Stress management'],
    applicationMethod: 'email',
    contactEmail: 'communications@calfire.ca.gov',
    postedDate: '2024-02-18',
    isActive: true,
    views: 74,
    applications: 5
  },
  {
    id: '14',
    title: 'Wildland Fire Medic',
    agency: 'Orange County Fire Authority',
    location: 'Orange County, CA',
    payRate: '$26-33/hour',
    jobType: 'Medical',
    startDate: '2024-05-01',
    endDate: '2024-10-31',
    experienceLevel: 'Advanced',
    description: 'Provide medical support for wildland fire operations. Treat injuries and provide emergency medical care in remote locations.',
    requirements: ['Paramedic certification', 'Wilderness medicine training', 'Physical fitness', 'Emergency vehicle operation'],
    applicationMethod: 'email',
    contactEmail: 'medical@ocfa.org',
    postedDate: '2024-03-01',
    isActive: true,
    views: 145,
    applications: 11
  },
  {
    id: '15',
    title: 'Fire Weather Forecaster',
    agency: 'National Weather Service',
    location: 'San Diego County, CA',
    payRate: '$35-42/hour',
    jobType: 'Support',
    startDate: '2024-04-01',
    endDate: '2024-11-30',
    experienceLevel: 'Advanced',
    description: 'Provide weather forecasting and fire weather analysis for wildland fire operations. Critical support for fire behavior prediction.',
    requirements: ['Meteorology degree', 'Fire weather training', 'Forecasting experience', 'Computer modeling skills'],
    applicationMethod: 'email',
    contactEmail: 'forecasters@weather.gov',
    postedDate: '2024-02-10',
    isActive: true,
    views: 91,
    applications: 6
  },
  {
    id: '16',
    title: 'Prescribed Fire Specialist',
    agency: 'U.S. Forest Service',
    location: 'Riverside County, CA',
    payRate: '$24-31/hour',
    jobType: 'Prevention',
    startDate: '2024-03-15',
    endDate: '2024-05-31',
    experienceLevel: 'Advanced',
    description: 'Plan and execute prescribed fire operations to reduce wildland fire risk. Specialized knowledge of fire behavior and ecosystem management.',
    requirements: ['Prescribed fire certification', 'Fire behavior knowledge', 'Ecosystem management training', 'Planning experience'],
    applicationMethod: 'email',
    contactEmail: 'prescribed@usfs.gov',
    postedDate: '2024-01-25',
    isActive: true,
    views: 132,
    applications: 10
  },
  {
    id: '17',
    title: 'Aviation Safety Officer',
    agency: 'CAL FIRE',
    location: 'Orange County, CA',
    payRate: '$30-38/hour',
    jobType: 'Aviation',
    startDate: '2024-05-01',
    endDate: '2024-10-31',
    experienceLevel: 'Advanced',
    description: 'Oversee aviation safety for helicopter and fixed-wing aircraft operations. Ensure compliance with safety protocols and regulations.',
    requirements: ['Aviation safety certification', 'Aircraft operations knowledge', 'Safety management experience', 'FAA regulations knowledge'],
    applicationMethod: 'email',
    contactEmail: 'aviation@calfire.ca.gov',
    postedDate: '2024-02-28',
    isActive: true,
    views: 67,
    applications: 4
  },
  {
    id: '18',
    title: 'Fire Investigator',
    agency: 'Orange County Fire Authority',
    location: 'Orange County, CA',
    payRate: '$32-40/hour',
    jobType: 'Investigation',
    startDate: '2024-04-01',
    endDate: '2024-12-31',
    experienceLevel: 'Advanced',
    description: 'Investigate the cause and origin of wildland fires. Collect evidence, interview witnesses, and prepare detailed reports.',
    requirements: ['Fire investigation certification', 'Law enforcement training', 'Evidence collection skills', 'Report writing experience'],
    applicationMethod: 'email',
    contactEmail: 'investigation@ocfa.org',
    postedDate: '2024-03-05',
    isActive: true,
    views: 156,
    applications: 13
  },
  {
    id: '19',
    title: 'Fire Camp Manager',
    agency: 'CAL FIRE',
    location: 'Los Angeles County, CA',
    payRate: '$26-34/hour',
    jobType: 'Support',
    startDate: '2024-05-15',
    endDate: '2024-10-31',
    experienceLevel: 'Intermediate',
    description: 'Manage fire camp operations including logistics, food service, and accommodations for firefighting crews.',
    requirements: ['Camp management experience', 'Food service knowledge', 'Logistics coordination', 'Leadership skills'],
    applicationMethod: 'email',
    contactEmail: 'camps@calfire.ca.gov',
    postedDate: '2024-03-20',
    isActive: true,
    views: 78,
    applications: 6
  },
  {
    id: '20',
    title: 'Wildland Fire Photographer',
    agency: 'U.S. Forest Service',
    location: 'Orange County, CA',
    payRate: '$22-28/hour',
    jobType: 'Support',
    startDate: '2024-06-01',
    endDate: '2024-10-31',
    experienceLevel: 'Intermediate',
    description: 'Document wildland fire operations for training, public information, and historical records. Work in active fire environments.',
    requirements: ['Professional photography experience', 'Safety training', 'Equipment knowledge', 'Physical fitness'],
    applicationMethod: 'email',
    contactEmail: 'media@usfs.gov',
    postedDate: '2024-03-25',
    isActive: true,
    views: 145,
    applications: 12
  }
];