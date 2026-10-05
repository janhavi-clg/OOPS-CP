/**
 * Centralized Demo Data Foundation for Rahul (Second-Year CSE AI/ML student).
 * This data is designed to power the current prototype and future 8 modules cleanly.
 */

export const rahulDemoProfile = {
  id: 'stu_rahul_01',
  name: 'Rahul',
  year: 'Second Year',
  branch: 'CSE (AI/ML)',
  college: 'Apex Institute of Technology',
  email: 'rahul.demo@devtrack.edu',
  phone: '+91 98765 43210',
  avatarUrl: null, // Will use stylized monogram avatar
  bio: 'Second-year CSE (AI/ML) undergrad passionate about algorithmic problem solving, machine learning engineering, and building resilient full-stack systems.',
  cgpa: 8.72,
  semester: 'Semester 4',
  rollNumber: '24CSAML042',
  links: {
    github: 'https://github.com/rahul-demo',
    linkedin: 'https://linkedin.com/in/rahul-demo',
    leetcode: 'https://leetcode.com/u/rahul_codes',
    portfolio: 'https://devtrack.demo/p/rahul'
  }
};

export const rahulCodingData = {
  platform: 'LeetCode',
  username: 'rahul_codes',
  ranking: '~182,400',
  totalSolved: 137,
  targetQuestions: 250,
  easy: {
    solved: 82,
    totalAvailable: 840,
    color: '#34A853'
  },
  medium: {
    solved: 48,
    totalAvailable: 1720,
    color: '#FBBC05'
  },
  hard: {
    solved: 7,
    totalAvailable: 740,
    color: '#EA4335'
  },
  streaks: {
    currentStreak: 23,
    longestStreak: 45,
    solvedThisWeek: 14,
    solvedThisMonth: 38
  },
  recentSubmissions: [
    { title: 'Subtree of Another Tree', difficulty: 'Easy', timeAgo: '2 hours ago', status: 'Accepted', lang: 'Java' },
    { title: 'Binary Tree Level Order Traversal', difficulty: 'Medium', timeAgo: 'Yesterday', status: 'Accepted', lang: 'Java' },
    { title: 'Course Schedule II', difficulty: 'Medium', timeAgo: '3 days ago', status: 'Accepted', lang: 'Python' },
    { title: 'Trapping Rain Water', difficulty: 'Hard', timeAgo: '5 days ago', status: 'Accepted', lang: 'C++' }
  ]
};

export const rahulSkills = [
  { id: 'sk_1', name: 'Java', category: 'Programming', proficiency: 82, level: 'Intermediate', status: 'In Progress', hours: 160 },
  { id: 'sk_2', name: 'Object-Oriented Programming', category: 'CS Fundamentals', proficiency: 85, level: 'Advanced', status: 'Mastered', hours: 110 },
  { id: 'sk_3', name: 'Python', category: 'Programming', proficiency: 78, level: 'Intermediate', status: 'In Progress', hours: 140 },
  { id: 'sk_4', name: 'HTML5 & CSS3', category: 'Frontend', proficiency: 88, level: 'Advanced', status: 'Mastered', hours: 85 },
  { id: 'sk_5', name: 'Git & GitHub', category: 'DevOps & Tools', proficiency: 80, level: 'Intermediate', status: 'Mastered', hours: 60 },
  { id: 'sk_6', name: 'C Programming', category: 'Programming', proficiency: 75, level: 'Intermediate', status: 'Completed', hours: 80 },
  { id: 'sk_7', name: 'SQL & Database Design', category: 'Database', proficiency: 74, level: 'Intermediate', status: 'In Progress', hours: 80 },
  { id: 'sk_8', name: 'Data Structures & Algorithms', category: 'CS Fundamentals', proficiency: 72, level: 'Intermediate', status: 'In Progress', hours: 120 },
  { id: 'sk_9', name: 'JavaScript (ES6+)', category: 'Frontend', proficiency: 70, level: 'Intermediate', status: 'In Progress', hours: 100 },
  { id: 'sk_10', name: 'React.js', category: 'Frontend', proficiency: 68, level: 'Intermediate', status: 'In Progress', hours: 95 },
  { id: 'sk_11', name: 'C++', category: 'Programming', proficiency: 65, level: 'Intermediate', status: 'In Progress', hours: 90 },
  { id: 'sk_12', name: 'Machine Learning', category: 'AI / ML', proficiency: 60, level: 'Intermediate', status: 'Learning', hours: 75 }
];

export const rahulProjects = [
  {
    id: 'proj_1',
    name: 'Smart Fitness Monitoring System',
    description: 'AI-driven physical exercise posture estimation and repetition counting web app utilizing computer vision models.',
    techStack: ['Python', 'OpenCV', 'MediaPipe', 'Flask', 'React'],
    status: 'Completed',
    startDate: 'Oct 2025',
    endDate: 'Jan 2026',
    githubUrl: 'https://github.com/rahul-demo/smart-fitness-monitor',
    demoUrl: 'https://fitness-demo.devtrack.app',
    highlights: ['Real-time joint angle calculation', '94% posture accuracy', 'Exportable workout logs']
  },
  {
    id: 'proj_2',
    name: 'AI-Based Study Planner',
    description: 'Adaptive schedule optimization engine using spaced repetition and syllabus topic priority algorithms.',
    techStack: ['Java', 'Spring Boot', 'React', 'PostgreSQL'],
    status: 'In Progress',
    startDate: 'Feb 2026',
    endDate: 'Present',
    githubUrl: 'https://github.com/rahul-demo/ai-study-planner',
    demoUrl: null,
    highlights: ['Java OOP service architecture', 'Heuristic time blocking', 'RESTful API integration']
  },
  {
    id: 'proj_3',
    name: 'Smart Polyhouse Monitoring System',
    description: 'Precision greenhouse telemetry system measuring temperature, humidity, and soil moisture with threshold alerts.',
    techStack: ['Python', 'ESP32', 'MQTT', 'SQLite'],
    status: 'Completed',
    startDate: 'Aug 2025',
    endDate: 'Nov 2025',
    githubUrl: 'https://github.com/rahul-demo/smart-polyhouse',
    demoUrl: null,
    highlights: ['Inter-college hackathon winning project', 'Live MQTT broker sync', 'Solar-powered node prototype']
  },
  {
    id: 'proj_4',
    name: 'Developer Portfolio & Progress Platform',
    description: 'High-performance interactive student developer portfolio with 3D graphics and unified metrics tracking.',
    techStack: ['React', 'Three.js', 'Vanilla CSS', 'Java OOP'],
    status: 'In Progress',
    startDate: 'Jan 2026',
    endDate: 'Present',
    githubUrl: 'https://github.com/rahul-demo/devtrack-portfolio',
    demoUrl: 'https://devtrack.demo',
    highlights: ['Interactive Three.js visual elements', 'Coffee-Brown design system', 'Zero-clutter layout']
  }
];

export const rahulDeveloperLinks = [
  { id: 'link_1', platform: 'GitHub', url: 'https://github.com/rahul-demo', username: 'rahul-demo', isCustom: false },
  { id: 'link_2', platform: 'LinkedIn', url: 'https://linkedin.com/in/rahul-demo', username: 'rahul-demo', isCustom: false },
  { id: 'link_3', platform: 'LeetCode', url: 'https://leetcode.com/u/rahul_codes', username: 'rahul_codes', isCustom: false },
  { id: 'link_4', platform: 'CodeChef', url: 'https://codechef.com/users/rahul_dev', username: 'rahul_dev', isCustom: false },
  { id: 'link_5', platform: 'HackerRank', url: 'https://hackerrank.com/rahul_cse', username: 'rahul_cse', isCustom: false },
  { id: 'link_6', platform: 'Portfolio Website', url: 'https://rahul.devtrack.app', username: 'rahul-portfolio', isCustom: false }
];

export const rahulHackathons = [
  {
    id: 'hack_1',
    name: 'Hack Celestial 3.0',
    platform: 'Devfolio',
    status: 'Won',
    startDate: '2025-11-14',
    endDate: '2025-11-16',
    registrationDeadline: '2025-11-05',
    submissionDeadline: '2025-11-16',
    resultDate: '2025-11-20',
    projectSubmitted: 'Smart Polyhouse Monitoring System',
    teamName: 'Byte Busters',
    teamSize: 4,
    achievement: 'Top 5 Finalist & Best IoT Solution',
    result: 'Top 5 Finalist & Best IoT Solution',
    description: 'Built autonomous smart polyhouse greenhouse environmental monitor with MQTT telemetry.',
    notes: 'Presented hardware prototype to jury. Won cash prize of ₹25,000.',
    eventUrl: 'https://hackcelestial.dev'
  },
  {
    id: 'hack_2',
    name: 'Smart India Hackathon Internal Qualifier',
    platform: 'SIH Portal',
    status: 'Participated',
    startDate: '2025-09-20',
    endDate: '2025-09-22',
    registrationDeadline: '2025-09-10',
    submissionDeadline: '2025-09-22',
    resultDate: '2025-10-01',
    projectSubmitted: 'AI-Based Disaster Alert & Resource Dispatch',
    teamName: 'Apex Innovators',
    teamSize: 6,
    achievement: 'College Round Qualifier',
    result: 'College Round Qualifier',
    description: 'Disaster management resource routing and crowd-sourced alert distribution software.',
    notes: 'Passed internal screening, qualified for regional evaluation.',
    eventUrl: 'https://sih.gov.in'
  },
  {
    id: 'hack_3',
    name: 'TechSprint AI/ML Challenge',
    platform: 'Unstop',
    status: 'Finalist',
    startDate: '2026-01-10',
    endDate: '2026-01-12',
    registrationDeadline: '2026-01-02',
    submissionDeadline: '2026-01-12',
    resultDate: '2026-01-18',
    projectSubmitted: 'EduAdaptive Learning Bot',
    teamName: 'NeuralNodes',
    teamSize: 3,
    achievement: 'Special Mention for UI/UX & Execution',
    result: 'Special Mention for UI/UX & Execution',
    description: 'Personalized adaptive learning chatbot with quiz feedback generation using LLMs.',
    notes: 'Recognized for cleanest frontend design and intuitive user flows.',
    eventUrl: 'https://unstop.com'
  },
  {
    id: 'hack_4',
    name: 'National GenAI Ideathon 2026',
    platform: 'Unstop',
    status: 'Upcoming',
    startDate: '2026-11-15',
    endDate: '2026-11-17',
    registrationDeadline: '2026-11-10',
    submissionDeadline: '2026-11-16',
    resultDate: '2026-11-25',
    projectSubmitted: 'AI-Driven Research Paper Assistant',
    teamName: 'Apex Visionaries',
    teamSize: 4,
    achievement: 'Registered',
    result: 'Registered',
    description: 'Multimodal AI assistant for technical document summarization and citation graph analysis.',
    notes: 'Abstract submitted. Initial team ideation sprint scheduled for next week.',
    eventUrl: 'https://unstop.com'
  }
];

export const rahulCertificates = [
  {
    id: 'cert_1',
    name: 'Python for Data Science & AI',
    platform: 'Coursera (IBM)',
    issueDate: 'Aug 2025',
    credentialId: 'IBM-PY-884920',
    link: 'https://coursera.org/verify/demo-ibm-py',
    skills: 'Python, Pandas, NumPy, Data Analysis'
  },
  {
    id: 'cert_2',
    name: 'Machine Learning Fundamentals',
    platform: 'Kaggle',
    issueDate: 'Oct 2025',
    credentialId: 'KAG-ML-449102',
    link: 'https://kaggle.com/learn/certification/rahul',
    skills: 'Scikit-Learn, Regression, Classification'
  },
  {
    id: 'cert_3',
    name: 'SQL (Intermediate) Certificate',
    platform: 'HackerRank',
    issueDate: 'Dec 2025',
    credentialId: 'HR-SQL-991204',
    link: 'https://hackerrank.com/certificates/demo-sql',
    skills: 'Joins, Subqueries, Aggregations, Grouping'
  },
  {
    id: 'cert_4',
    name: 'Git & GitHub Version Control',
    platform: 'Udemy',
    issueDate: 'Jul 2025',
    credentialId: 'UC-GITH-772183',
    link: 'https://udemy.com/certificate/demo-git',
    skills: 'Git Workflows, Branching, Pull Requests'
  },
  {
    id: 'cert_5',
    name: 'Cloud Computing Foundations',
    platform: 'AWS Academy',
    issueDate: 'Jan 2026',
    credentialId: 'AWS-ACAD-33104',
    link: 'https://awsacademy.com/verify/demo',
    skills: 'Cloud Architecture, EC2, S3, IAM'
  }
];

export const rahulAchievements = [
  {
    id: 'ach_1',
    title: 'Top 5 Finalist – Hack Celestial 3.0',
    description: 'Ranked top 5 out of 120+ teams for autonomous agricultural IoT project.',
    organization: 'Devfolio',
    date: 'Nov 2025',
    badge: 'Gold'
  },
  {
    id: 'ach_2',
    title: '50-Day Coding Streak Badge',
    description: 'Consistently solved daily algorithmic problems on LeetCode for 50 days.',
    organization: 'LeetCode',
    date: 'Dec 2025',
    badge: 'Silver'
  },
  {
    id: 'ach_3',
    title: '2nd Place – Dept OOP Code Sprint',
    description: 'Designed an elegant object-oriented inventory simulation in Java in under 3 hours.',
    organization: 'CSE Department',
    date: 'Oct 2025',
    badge: 'Silver'
  },
  {
    id: 'ach_4',
    title: 'Selected for National Technical Symposium',
    description: 'Selected to present a research paper on computer vision in assistive technology.',
    organization: 'Apex Technical Society',
    date: 'Jan 2026',
    badge: 'Bronze'
  }
];

export const rahulLearningResources = [
  { id: 'res_1', title: 'Java OOP & Solid Principles Masterclass', platform: 'Coursera', link: 'https://coursera.org', status: 'Completed', progress: 100 },
  { id: 'res_2', title: 'Spring Boot 3 REST APIs from Scratch', platform: 'YouTube / Baeldung', link: 'https://baeldung.com', status: 'In Progress', progress: 65 },
  { id: 'res_3', title: 'LeetCode Top Interview 150 Roadmap', platform: 'LeetCode Study Plan', link: 'https://leetcode.com', status: 'In Progress', progress: 54 },
  { id: 'res_4', title: 'Hands-On Machine Learning with Scikit-Learn', platform: 'OReilly Books', link: 'https://oreilly.com', status: 'In Progress', progress: 40 },
  { id: 'res_5', title: 'Docker & Containerization for Developers', platform: 'freeCodeCamp', link: 'https://freecodecamp.org', status: 'Not Started', progress: 0 }
];

export const rahulTasks = [
  { id: 'task_1', title: 'Complete Java OOP inheritance & polymorphism lab exercises', priority: 'High', status: 'In Progress', dueDate: 'Oct 10, 2026', minutes: 120 },
  { id: 'task_2', title: 'Solve 5 Medium Binary Tree problems on LeetCode', priority: 'High', status: 'In Progress', dueDate: 'Oct 12, 2026', minutes: 150 },
  { id: 'task_3', title: 'Implement Spring Boot REST endpoints for project catalog', priority: 'Medium', status: 'Pending', dueDate: 'Oct 15, 2026', minutes: 90 },
  { id: 'task_4', title: 'Review Machine Learning classification evaluation metrics', priority: 'Medium', status: 'Completed', dueDate: 'Oct 02, 2026', minutes: 60 },
  { id: 'task_5', title: 'Update resume with Hack Celestial 3.0 award and links', priority: 'Low', status: 'Completed', dueDate: 'Oct 01, 2026', minutes: 45 }
];

export const rahulRecentActivities = [
  { id: 'act_1', action: 'Solved LeetCode Problem #572: Subtree of Another Tree', timestamp: '2 hours ago', icon: 'Code2' },
  { id: 'act_2', action: 'Pushed commit to AI-Based Study Planner repository', timestamp: 'Yesterday at 6:40 PM', icon: 'GitCommit' },
  { id: 'act_3', action: 'Maintained 23-day coding streak', timestamp: '2 days ago', icon: 'Flame' },
  { id: 'act_4', action: 'Finished module on Java Abstract Classes and Interfaces', timestamp: '4 days ago', icon: 'BookOpen' }
];

export default {
  profile: rahulDemoProfile,
  coding: rahulCodingData,
  skills: rahulSkills,
  projects: rahulProjects,
  developerLinks: rahulDeveloperLinks,
  hackathons: rahulHackathons,
  certificates: rahulCertificates,
  achievements: rahulAchievements,
  learning: rahulLearningResources,
  tasks: rahulTasks,
  activities: rahulRecentActivities
};
