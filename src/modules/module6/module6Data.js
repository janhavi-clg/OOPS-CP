/**
 * Centralized Demo Data for Module 6: Resume Builder & Recommendations.
 * Integrates Rahul's pre-seeded data from Modules 1, 2, 3, 4, and 5.
 */

export const RESUME_TEMPLATES = [
  { id: 'modern', name: 'Modern Clean', description: 'Contemporary layout with refined accent headers and two-tone highlights.' },
  { id: 'classic', name: 'Classic Placement', description: 'Traditional serif headers, high-density format preferred by university recruiters.' },
  { id: 'minimal', name: 'Minimalist Monospace', description: 'Ultra-clean sans-serif structure emphasizing whitespace and typography.' },
  { id: 'technical', name: 'Technical Systems', description: 'Structured developer layout highlighting system architecture, stacks, and algorithms.' }
];

export const STANDARD_JOB_ROLES = [
  {
    roleKey: 'sde',
    title: 'Software Development Engineer (SDE)',
    category: 'Engineering',
    sampleJobDescription: 'Looking for a Software Development Engineer with strong foundations in Data Structures & Algorithms, Java OOP, PostgreSQL, RESTful APIs, Git, and automated testing.',
    requiredSkills: ['Java', 'Data Structures & Algorithms', 'SQL', 'Git', 'OOP'],
    preferredSkills: ['Spring Boot', 'Docker', 'REST APIs', 'PostgreSQL'],
    relevantProjectKeywords: ['DevTrack', 'Full Stack', 'Backend', 'Database', 'Web', 'React', 'PostgreSQL', 'System', 'IoT'],
    relevantAchievementKeywords: ['Hackathon', 'Java Course', 'LeetCode', 'Competition', 'Celestial', 'Qualifier', 'Award']
  },
  {
    roleKey: 'ml_intern',
    title: 'Machine Learning Intern',
    category: 'Artificial Intelligence',
    sampleJobDescription: 'Seeking an AI/ML intern passionate about training deep neural networks, computer vision, PyTorch/TensorFlow, Python, NumPy, Pandas, and deploying inference APIs.',
    requiredSkills: ['Python', 'Machine Learning', 'PyTorch', 'NumPy', 'Pandas'],
    preferredSkills: ['Deep Learning', 'Computer Vision', 'FastAPI', 'Scikit-Learn'],
    relevantProjectKeywords: ['AeroMatrix', 'AI', 'Smart Polyhouse', 'Vision', 'ML', 'Neural', 'Python', 'Pose', 'Telemetry'],
    relevantAchievementKeywords: ['Hack Celestial', 'Workshop', 'Coursera', 'Competition', 'Symposium', 'Research', 'Award']
  },
  {
    roleKey: 'frontend_dev',
    title: 'Frontend Developer',
    category: 'Engineering',
    sampleJobDescription: 'Seeking a frontend developer proficient in React.js, modern JavaScript (ES6+), responsive design, component architecture, CSS3, and REST API integration.',
    requiredSkills: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Git'],
    preferredSkills: ['TypeScript', 'Vite', 'Tailwind CSS', 'UI/UX'],
    relevantProjectKeywords: ['DevTrack', 'Dashboard', 'React', 'Frontend'],
    relevantAchievementKeywords: ['Special Mention', 'UI/UX', 'Hackathon']
  },
  {
    roleKey: 'data_analyst',
    title: 'Data Analyst',
    category: 'Analytics',
    sampleJobDescription: 'Seeking a Data Analyst skilled in SQL query optimization, Python data manipulation (Pandas, Matplotlib), exploratory data analysis, and dashboard reporting.',
    requiredSkills: ['Python', 'SQL', 'Pandas', 'Data Analysis'],
    preferredSkills: ['Matplotlib', 'Tableau', 'Statistics', 'PowerBI'],
    relevantProjectKeywords: ['Polyhouse', 'Telemetry', 'Analytics', 'IoT'],
    relevantAchievementKeywords: ['Python Certification', 'Academic', 'Symposium']
  }
];

export const INITIAL_RESUMES = [
  {
    id: 'res_rahul_sde_01',
    studentId: 'student_rahul_001',
    title: 'Software Developer Resume',
    template: 'modern',
    targetRole: 'Software Development Engineer (SDE)',
    jobDescription: '',
    profileMatchScore: 84,
    fullName: 'Rahul Sharma',
    email: 'rahul.sharma@pict.edu',
    phone: '+91 98765 43210',
    location: 'Pune, Maharashtra, India',
    githubUrl: 'https://github.com/rahulsharma',
    linkedinUrl: 'https://linkedin.com/in/rahul-sharma-dev',
    portfolioUrl: 'https://rahulsharma.dev',
    summary: 'Second-year Computer Science & Engineering (AI/ML) undergraduate with solid foundations in Data Structures & Algorithms, Java OOP, PostgreSQL, and full-stack web engineering. Experienced in building end-to-end platforms and active hackathon contributor.',
    sections: [
      { id: 'sec_summary', sectionKey: 'summary', title: 'Professional Summary', visible: true, orderIndex: 0 },
      { id: 'sec_education', sectionKey: 'education', title: 'Education', visible: true, orderIndex: 1 },
      { id: 'sec_skills', sectionKey: 'skills', title: 'Technical Skills', visible: true, orderIndex: 2 },
      { id: 'sec_projects', sectionKey: 'projects', title: 'Featured Projects', visible: true, orderIndex: 3 },
      { id: 'sec_experience', sectionKey: 'experience', title: 'Experience & Leadership', visible: true, orderIndex: 4 },
      { id: 'sec_achievements', sectionKey: 'achievements', title: 'Achievements & Hackathons', visible: true, orderIndex: 5 },
      { id: 'sec_certificates', sectionKey: 'certificates', title: 'Certifications', visible: true, orderIndex: 6 }
    ],
    education: [
      {
        id: 'edu_1',
        institution: 'Pune Institute of Computer Technology (PICT)',
        degree: 'B.Tech in Computer Science & Engineering (AI & ML)',
        startYear: '2023',
        endYear: '2027',
        score: 'CGPA: 8.92 / 10.0',
        location: 'Pune, India'
      },
      {
        id: 'edu_2',
        institution: 'Delhi Public School',
        degree: 'Higher Secondary Certificate (CBSE Class XII - Science)',
        startYear: '2021',
        endYear: '2023',
        score: 'Percentage: 94.6%',
        location: 'Pune, India'
      }
    ],
    experience: [
      {
        id: 'exp_1',
        company: 'DevTrack Open Core',
        role: 'Lead Frontend & Architecture Contributor',
        location: 'Pune, India',
        startDate: 'Jan 2024',
        endDate: 'Present',
        current: true,
        highlights: [
          'Engineered modular state tracking for student engineering portfolios with reactive components.',
          'Integrated RESTful Spring Boot microservices with Supabase PostgreSQL and sub-100ms response times.',
          'Built responsive Warm Cream UI with real-time portfolio match calculators.'
        ]
      },
      {
        id: 'exp_2',
        company: 'PICT ACM Student Chapter',
        role: 'Technical Team Member',
        location: 'Pune, India',
        startDate: 'Aug 2023',
        endDate: 'Present',
        current: true,
        highlights: [
          'Organized algorithmic contests for 300+ campus participants on HackerRank.',
          'Conducted peer learning sessions on Git workflows, branching models, and Java OOP fundamentals.'
        ]
      }
    ],
    projects: [
      {
        id: 'p_1',
        sourceProjectId: 'proj_devtrack_01',
        title: 'DevTrack – Developer Portfolio & Progress System',
        role: 'Full Stack Architect',
        technologies: ['React', 'Java Spring Boot', 'PostgreSQL', 'Supabase'],
        liveUrl: 'https://devtrack.internal.app',
        githubUrl: 'https://github.com/rahulsharma/devtrack',
        highlights: [
          'Architected an end-to-end progress platform with 8 cohesive modules for skills, coding, and resumes.',
          'Implemented Java OOP domain model with transparent profile matching and real-time document compilation.'
        ]
      },
      {
        id: 'p_2',
        sourceProjectId: 'proj_aeromatrix_01',
        title: 'AeroMatrix – AI Flight Trajectory Optimizer',
        role: 'AI & Backend Developer',
        technologies: ['Python', 'PyTorch', 'FastAPI', 'NumPy'],
        liveUrl: 'https://aeromatrix.demo.app',
        githubUrl: 'https://github.com/rahulsharma/aeromatrix',
        highlights: [
          'Trained neural networks to optimize airline flight pathways and reduce fuel burn by 11%.',
          'Built high-throughput inference endpoints with sub-50ms latency using FastAPI and asynchronous I/O.'
        ]
      },
      {
        id: 'p_3',
        sourceProjectId: 'proj_polyhouse_01',
        title: 'Smart Polyhouse Precision Agriculture IoT',
        role: 'Firmware & Telemetry Lead',
        technologies: ['ESP32', 'Python', 'MQTT', 'React'],
        liveUrl: 'https://polyhouse.demo.app',
        githubUrl: 'https://github.com/rahulsharma/smart-polyhouse',
        highlights: [
          'Designed closed-loop sensor telemetry for ambient soil moisture and greenhouse climate control.',
          'Visualized time-series metrics on interactive dashboard with automated relay triggers.'
        ]
      }
    ],
    skills: [
      { id: 'sk_1', category: 'Languages', skills: ['Java (OOP & Collections)', 'Python', 'SQL (PostgreSQL)', 'JavaScript (ES6+)', 'C++'] },
      { id: 'sk_2', category: 'Frameworks & Backend', skills: ['Spring Boot', 'React.js', 'FastAPI', 'RESTful APIs', 'Node.js'] },
      { id: 'sk_3', category: 'Developer Tools', skills: ['Git & GitHub', 'Supabase', 'Postman', 'Docker (Basics)', 'Linux / Bash'] },
      { id: 'sk_4', category: 'Core Competencies', skills: ['Data Structures & Algorithms', 'Object-Oriented Design', 'DBMS', 'System Design Basics'] }
    ],
    achievements: [
      {
        id: 'ach_1',
        title: 'Winner - Hack Celestial 3.0 (Best IoT Solution)',
        organization: 'Devfolio / National Level',
        date: 'Nov 2025',
        description: 'Secured 1st Place out of 180+ teams for creating AeroMatrix AI trajectory optimizer with telemetry.'
      },
      {
        id: 'ach_2',
        title: 'Smart India Hackathon 2025 Internal Round Qualifier',
        organization: 'Ministry of Education / PICT',
        date: 'Sep 2025',
        description: 'Top 5 Finalist college round qualifier for AI Disaster Alert & Dispatch software.'
      },
      {
        id: 'ach_3',
        title: '137 LeetCode DSA Problems Solved',
        organization: 'LeetCode',
        date: 'Ongoing',
        description: 'Maintained active 14-day streak across Arrays, Trees, Dynamic Programming, and Graph algorithms.'
      }
    ],
    certificates: [
      {
        id: 'cert_1',
        certificateName: 'Python for Data Science & AI',
        issuingOrganization: 'Coursera (IBM)',
        issueDate: 'Aug 2025',
        credentialId: 'IBM-PY-884920'
      },
      {
        id: 'cert_3',
        certificateName: 'Java SE 17 Object-Oriented Foundations',
        issuingOrganization: 'Oracle Academy',
        issueDate: 'Nov 2025',
        credentialId: 'ORA-J17-59281'
      }
    ]
  },
  {
    id: 'res_rahul_ml_02',
    studentId: 'student_rahul_001',
    title: 'AI/ML Intern Resume',
    template: 'technical',
    targetRole: 'Machine Learning Intern',
    jobDescription: '',
    profileMatchScore: 91,
    fullName: 'Rahul Sharma',
    email: 'rahul.sharma@pict.edu',
    phone: '+91 98765 43210',
    location: 'Pune, Maharashtra, India',
    githubUrl: 'https://github.com/rahulsharma',
    linkedinUrl: 'https://linkedin.com/in/rahul-sharma-dev',
    portfolioUrl: 'https://rahulsharma.dev',
    summary: 'Second-year CSE (AI/ML) student focusing on Deep Learning, PyTorch, and Computer Vision. Hands-on experience developing ML models, spatial feature extraction, and deploying inference pipelines.',
    sections: [
      { id: 'sec_summary', sectionKey: 'summary', title: 'Professional Summary', visible: true, orderIndex: 0 },
      { id: 'sec_skills', sectionKey: 'skills', title: 'Technical Skills', visible: true, orderIndex: 1 },
      { id: 'sec_projects', sectionKey: 'projects', title: 'Featured AI/ML Projects', visible: true, orderIndex: 2 },
      { id: 'sec_education', sectionKey: 'education', title: 'Education', visible: true, orderIndex: 3 },
      { id: 'sec_experience', sectionKey: 'experience', title: 'Experience', visible: true, orderIndex: 4 },
      { id: 'sec_achievements', sectionKey: 'achievements', title: 'Achievements & Publications', visible: true, orderIndex: 5 },
      { id: 'sec_certificates', sectionKey: 'certificates', title: 'Certifications', visible: true, orderIndex: 6 }
    ],
    education: [
      {
        id: 'edu_1',
        institution: 'Pune Institute of Computer Technology (PICT)',
        degree: 'B.Tech in Computer Science & Engineering (AI & ML)',
        startYear: '2023',
        endYear: '2027',
        score: 'CGPA: 8.92 / 10.0',
        location: 'Pune, India'
      }
    ],
    experience: [
      {
        id: 'exp_1',
        company: 'DevTrack Open Core',
        role: 'AI Architecture Contributor',
        location: 'Pune, India',
        startDate: 'Jan 2024',
        endDate: 'Present',
        current: true,
        highlights: [
          'Engineered transparent job role keyword matching and profile match scoring engine.',
          'Built benchmark criteria across SDE, ML, Frontend, and Data Analyst disciplines.'
        ]
      }
    ],
    projects: [
      {
        id: 'p_2',
        sourceProjectId: 'proj_aeromatrix_01',
        title: 'AeroMatrix – AI Flight Trajectory Optimizer',
        role: 'AI & Backend Developer',
        technologies: ['Python', 'PyTorch', 'FastAPI', 'NumPy'],
        liveUrl: 'https://aeromatrix.demo.app',
        githubUrl: 'https://github.com/rahulsharma/aeromatrix',
        highlights: [
          'Trained neural networks to optimize airline flight pathways and reduce fuel burn by 11%.',
          'Built high-throughput inference endpoints with sub-50ms latency using FastAPI.'
        ]
      },
      {
        id: 'p_4',
        sourceProjectId: 'proj_fitness_01',
        title: 'AI Fitness Pose Corrector',
        role: 'Computer Vision Lead',
        technologies: ['Python', 'OpenCV', 'MediaPipe'],
        liveUrl: 'https://fitness.demo.app',
        githubUrl: 'https://github.com/rahulsharma/fitness-pose',
        highlights: [
          'Real-time joint angle calculation for squat and deadlift biomechanics with 30fps edge inference.',
          'Selected for paper presentation at National Technical Symposium 2026.'
        ]
      }
    ],
    skills: [
      { id: 'ml_sk_1', category: 'Machine Learning & AI', skills: ['PyTorch', 'TensorFlow', 'Computer Vision (OpenCV)', 'Scikit-Learn', 'NumPy', 'Pandas'] },
      { id: 'ml_sk_2', category: 'Languages & Systems', skills: ['Python', 'Java', 'SQL', 'C++', 'FastAPI'] },
      { id: 'ml_sk_3', category: 'Developer Tools', skills: ['Git', 'Jupyter Lab', 'Linux', 'Supabase', 'Docker'] }
    ],
    achievements: [
      {
        id: 'ach_1',
        title: 'Winner - Hack Celestial 3.0 (Best IoT Solution)',
        organization: 'Devfolio / National Level',
        date: 'Nov 2025',
        description: 'Secured 1st Place out of 180+ teams for creating AeroMatrix AI trajectory optimizer with telemetry.'
      },
      {
        id: 'ach_acad_1',
        title: 'Selected for National Technical Symposium Presentation',
        organization: 'Apex Technical Society',
        date: 'Jan 2026',
        description: 'Presented undergraduate research on computer vision heuristics for assistive athletic recovery.'
      }
    ],
    certificates: [
      {
        id: 'cert_1',
        certificateName: 'Python for Data Science & AI',
        issuingOrganization: 'Coursera (IBM)',
        issueDate: 'Aug 2025',
        credentialId: 'IBM-PY-884920'
      },
      {
        id: 'cert_2',
        certificateName: 'Machine Learning Fundamentals',
        issuingOrganization: 'Kaggle',
        issueDate: 'Oct 2025',
        credentialId: 'KAG-ML-449102'
      }
    ]
  }
];
