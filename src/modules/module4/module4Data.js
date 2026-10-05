/**
 * Centralized Demo Data Baseline & Metadata Catalog for Module 4: Project & Portfolio Management.
 * Tailored for Rahul (Second Year CSE AI/ML student at Apex Institute of Technology).
 */

export const PROJECT_CATEGORIES = [
  'Web Development',
  'AI / ML',
  'Mobile App',
  'Java',
  'Backend',
  'Frontend',
  'Full Stack',
  'IoT',
  'Data Science',
  'AR/VR',
  'Cybersecurity',
  'Other'
];

export const PROJECT_STATUSES = [
  { id: 'PLANNING', label: 'Planning', color: '#B8860B', badgeClass: 'status-planning' },
  { id: 'IN_PROGRESS', label: 'In Progress', color: '#D97706', badgeClass: 'status-inprogress' },
  { id: 'COMPLETED', label: 'Completed', color: '#2E7D32', badgeClass: 'status-completed' },
  { id: 'PAUSED', label: 'Paused', color: '#78716C', badgeClass: 'status-paused' },
  { id: 'ARCHIVED', label: 'Archived', color: '#57534E', badgeClass: 'status-archived' }
];

export const POPULAR_TECHNOLOGIES = [
  // Languages
  { name: 'Java', category: 'Language' },
  { name: 'Python', category: 'Language' },
  { name: 'JavaScript', category: 'Language' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'C++', category: 'Language' },
  { name: 'SQL', category: 'Language' },
  // Frontend
  { name: 'React', category: 'Frontend' },
  { name: 'Next.js', category: 'Frontend' },
  { name: 'HTML', category: 'Frontend' },
  { name: 'CSS', category: 'Frontend' },
  { name: 'Vanilla CSS', category: 'Frontend' },
  { name: 'Three.js', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'JavaFX', category: 'Frontend' },
  { name: 'Streamlit', category: 'Frontend' },
  { name: 'MapLibre', category: 'Frontend' },
  // Backend
  { name: 'Spring Boot', category: 'Backend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Express', category: 'Backend' },
  { name: 'FastAPI', category: 'Backend' },
  { name: 'Flask', category: 'Backend' },
  // Database
  { name: 'Supabase', category: 'Database' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'MySQL', category: 'Database' },
  { name: 'MongoDB', category: 'Database' },
  { name: 'SQLite', category: 'Database' },
  { name: 'Firebase', category: 'Database' },
  // AI / ML
  { name: 'PyTorch', category: 'AI/ML' },
  { name: 'TensorFlow', category: 'AI/ML' },
  { name: 'OpenCV', category: 'AI/ML' },
  { name: 'MediaPipe', category: 'AI/ML' },
  { name: 'Pandas', category: 'AI/ML' },
  { name: 'NumPy', category: 'AI/ML' },
  { name: 'Scikit-Learn', category: 'AI/ML' },
  { name: 'Matplotlib', category: 'AI/ML' },
  // Hardware / DevOps
  { name: 'ESP32', category: 'Hardware' },
  { name: 'Arduino', category: 'Hardware' },
  { name: 'MQTT', category: 'DevOps' },
  { name: 'Docker', category: 'DevOps' },
  { name: 'Git', category: 'DevOps' }
];

export const STANDARD_ROLES = [
  'Full Stack Developer',
  'Frontend Developer',
  'Backend Developer',
  'Lead Full Stack Architect',
  'AI/ML Engineer',
  'Computer Vision Engineer',
  'Hardware & Embedded C++ Developer',
  'Data Scientist',
  'UI/UX Designer',
  'Team Lead'
];

export const ACHIEVEMENT_TYPES = [
  'Hackathon Finalist',
  'Winner',
  'College Showcase',
  'Published',
  'Deployed',
  'Research Project',
  'Open Source Contribution'
];

export const INITIAL_DEMO_PROJECTS = [
  {
    id: 'proj_devtrack',
    name: 'DevTrack',
    shortDescription: 'Developer portfolio & progress tracking platform with unified metrics, automated platform sync, and Java OOP backend.',
    detailedDescription: 'DevTrack is a comprehensive engineering student portfolio and multi-platform tracker designed to centralize competitive programming metrics, skill acquisition, hackathon achievements, and project portfolios with interview-ready presentation.',
    problemStatement: 'Students struggle to showcase their complete technical identity across fragmented coding platforms, course certificates, and GitHub repositories in an interview-ready format.',
    solutionOverview: 'Engineered a modular full-stack platform featuring automated platform sync, OOP Java service layers, real-time consistency tracking, and portfolio exports.',
    category: 'Full Stack',
    status: 'IN_PROGRESS',
    progressPercentage: 75,
    startDate: '2026-01',
    endDate: 'Present',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    featured: true,
    contribution: {
      role: 'Lead Full Stack Architect',
      contributionDetails: 'Designed the complete Java OOP backend domain model with inheritance & polymorphism, REST API controllers, and Coffee-Brown themed React frontend.',
      teamSize: 1
    },
    technologies: [
      { name: 'Java', category: 'Language', primary: true },
      { name: 'Spring Boot', category: 'Backend', primary: true },
      { name: 'React', category: 'Frontend', primary: true },
      { name: 'Supabase', category: 'Database', primary: false },
      { name: 'Vanilla CSS', category: 'Frontend', primary: false },
      { name: 'Three.js', category: 'Frontend', primary: false }
    ],
    links: [
      { type: 'GITHUB', url: 'https://github.com/rahul-demo/devtrack-portfolio', label: 'Repository' },
      { type: 'LIVE_DEMO', url: 'https://devtrack.demo', label: 'Live Demo' },
      { type: 'DOCUMENTATION', url: 'https://devtrack.demo/docs', label: 'Architecture Docs' }
    ],
    keyFeatures: [
      'Java OOP Domain Model with encapsulation, inheritance, and polymorphism',
      'Automated live synchronization with LeetCode & GitHub public endpoints',
      'Manual Verification fallback with screenshot proof validation for CodeChef',
      'Interactive 3D coding cube visualization using Three.js',
      'Coffee Brown + Warm Cream custom accessibility-tested design'
    ],
    achievements: [
      {
        id: 'ach_dt_1',
        title: 'Selected for Dept Engineering Innovation Showcase',
        awardType: 'College Showcase',
        organization: 'Apex Institute of Technology',
        date: '2026-02'
      }
    ],
    milestones: [
      { id: 'ms_dt_1', title: 'Architecture & Landing Page', description: 'Designed UI system and authentication foundation', date: '2026-01', completed: true, orderIndex: 1 },
      { id: 'ms_dt_2', title: 'Module 1 Profile & Hackathons', description: 'Built student portfolio and competitive hackathon tracker', date: '2026-02', completed: true, orderIndex: 2 },
      { id: 'ms_dt_3', title: 'Module 2 Skills Tracker', description: 'Implemented dual-component skill formula and practice problem logs', date: '2026-02', completed: true, orderIndex: 3 },
      { id: 'ms_dt_4', title: 'Module 3 Coding Tracker', description: 'Built live competitive programming tracker & Java strategy pattern', date: '2026-03', completed: true, orderIndex: 4 },
      { id: 'ms_dt_5', title: 'Module 4 Project & Portfolio', description: 'Centralized student projects, case studies, and portfolio preview', date: '2026-03', completed: true, orderIndex: 5 }
    ]
  },
  {
    id: 'proj_fitness',
    name: 'Smart Fitness Monitoring System',
    shortDescription: 'AI-driven physical exercise posture estimation and repetition counting web app utilizing computer vision models.',
    detailedDescription: 'A computer vision fitness application running real-time human pose estimation on browser camera feeds to detect exercise posture deviations and count workout repetitions accurately.',
    problemStatement: 'Home workouts lack certified personal trainer feedback, leading to improper biomechanics, injuries, and inaccurate repetition tracking.',
    solutionOverview: 'Utilized Google MediaPipe BlazePose to calculate real-time joint angles against biomechanical heuristics, streaming alerts back to a React frontend.',
    category: 'AI / ML',
    status: 'COMPLETED',
    progressPercentage: 100,
    startDate: '2025-10',
    endDate: '2026-01',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
    featured: true,
    contribution: {
      role: 'Computer Vision & Backend Engineer',
      contributionDetails: 'Trained angle estimation heuristics and built the Flask streaming API pipeline with WebSocket telemetry.',
      teamSize: 3
    },
    technologies: [
      { name: 'Python', category: 'Language', primary: true },
      { name: 'OpenCV', category: 'AI/ML', primary: true },
      { name: 'MediaPipe', category: 'AI/ML', primary: true },
      { name: 'Flask', category: 'Backend', primary: false },
      { name: 'React', category: 'Frontend', primary: false }
    ],
    links: [
      { type: 'GITHUB', url: 'https://github.com/rahul-demo/smart-fitness-monitor', label: 'Repository' },
      { type: 'LIVE_DEMO', url: 'https://fitness-demo.devtrack.app', label: 'Live Demo' }
    ],
    keyFeatures: [
      'Real-time 33-landmark 3D skeletal posture tracking via camera stream',
      'Dynamic state machine for squat and bicep curl repetition counting',
      '94.2% posture accuracy tested on 50+ subject workout recordings',
      'Instant visual and audio feedback when back curvature exceeds safety bounds'
    ],
    achievements: [
      {
        id: 'ach_fit_1',
        title: 'Top 5 Finalist at Hack Celestial 3.0',
        awardType: 'Hackathon Finalist',
        organization: 'Devfolio',
        date: '2025-11'
      },
      {
        id: 'ach_fit_2',
        title: 'Best Applied AI Demo',
        awardType: 'Winner',
        organization: 'Apex Tech Fest',
        date: '2025-12'
      }
    ],
    milestones: [
      { id: 'ms_fit_1', title: 'Pose Estimation Benchmark', description: 'Benchmarked MediaPipe vs YOLOv8-pose on mobile devices', date: '2025-10', completed: true, orderIndex: 1 },
      { id: 'ms_fit_2', title: 'Angle Calculator Pipeline', description: 'Engineered mathematical vector dot-product angle functions', date: '2025-11', completed: true, orderIndex: 2 },
      { id: 'ms_fit_3', title: 'Production Deployment', description: 'Containerized with Docker and deployed web app to cloud', date: '2026-01', completed: true, orderIndex: 3 }
    ]
  },
  {
    id: 'proj_polyhouse',
    name: 'Smart Polyhouse Monitoring System',
    shortDescription: 'Precision greenhouse telemetry system measuring temperature, humidity, and soil moisture with automated threshold alerts.',
    detailedDescription: 'Autonomous IoT environmental control system using distributed ESP32 microcontrollers and sensors to maintain optimal greenhouse microclimates for commercial horticulture.',
    problemStatement: 'Fluctuating humidity and manual irrigation lead to 30% yield loss and excessive water wastage in tropical greenhouse farming.',
    solutionOverview: 'Engineered wireless sensor nodes communicating via MQTT to a central telemetry dashboard, triggering automated misting fans and drip solenoids.',
    category: 'IoT',
    status: 'COMPLETED',
    progressPercentage: 100,
    startDate: '2025-08',
    endDate: '2025-11',
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&auto=format&fit=crop&q=80',
    featured: true,
    contribution: {
      role: 'Hardware & Embedded C++ Developer',
      contributionDetails: 'Wrote low-power firmware for ESP32 nodes, sensor calibration curves, and MQTT message serialization.',
      teamSize: 4
    },
    technologies: [
      { name: 'C++', category: 'Language', primary: true },
      { name: 'ESP32', category: 'Hardware', primary: true },
      { name: 'Python', category: 'Backend', primary: false },
      { name: 'MQTT', category: 'DevOps', primary: true },
      { name: 'SQLite', category: 'Database', primary: false }
    ],
    links: [
      { type: 'GITHUB', url: 'https://github.com/rahul-demo/smart-polyhouse', label: 'Repository' }
    ],
    keyFeatures: [
      'Battery-operated sleep mode consuming less than 15uA between readings',
      'Soil moisture capacitive sensing immune to soil corrosion',
      'Automated relay triggering for irrigation pumps based on PID thresholds',
      'Offline data logging with SD card fallback during network outages'
    ],
    achievements: [
      {
        id: 'ach_poly_1',
        title: '1st Prize - Inter-College Hardware Showcase',
        awardType: 'Winner',
        organization: 'State Engineering Expo',
        date: '2025-11'
      }
    ],
    milestones: [
      { id: 'ms_poly_1', title: 'Hardware Schematic & Breadboard MVP', description: 'Selected sensors and built initial prototype', date: '2025-08', completed: true, orderIndex: 1 },
      { id: 'ms_poly_2', title: 'MQTT Telemetry Broker', description: 'Established broker bridge with SSL encryption', date: '2025-09', completed: true, orderIndex: 2 },
      { id: 'ms_poly_3', title: 'Polyhouse Field Deployment', description: 'Tested 7-day continuous run in university botanical garden', date: '2025-11', completed: true, orderIndex: 3 }
    ]
  },
  {
    id: 'proj_aeromatrix',
    name: 'AeroMatrix Flight Tracker & Geospatial Analytics',
    shortDescription: 'High-frequency airspace telemetry visualization and aircraft trajectory prediction platform.',
    detailedDescription: 'Modern geospatial analytics portal rendering global aircraft transponder ADS-B messages in WebGL, with machine learning trajectory forecasting.',
    problemStatement: 'Flight tracking dashboards often freeze under dense airspace traffic due to DOM bottlenecks and unoptimized geo-queries.',
    solutionOverview: 'Implemented Next.js with MapLibre GL rendering thousands of aircraft vectors with sub-second latencies and FastAPI inference backends.',
    category: 'AI / ML',
    status: 'IN_PROGRESS',
    progressPercentage: 60,
    startDate: '2026-01',
    endDate: 'Present',
    imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&auto=format&fit=crop&q=80',
    featured: true,
    contribution: {
      role: 'Geospatial & ML Engineer',
      contributionDetails: 'Built the MapLibre visualization layer and Python flight trajectory clustering model.',
      teamSize: 2
    },
    technologies: [
      { name: 'Next.js', category: 'Frontend', primary: true },
      { name: 'TypeScript', category: 'Language', primary: true },
      { name: 'MapLibre', category: 'Frontend', primary: true },
      { name: 'Python', category: 'Language', primary: false },
      { name: 'FastAPI', category: 'Backend', primary: true },
      { name: 'PyTorch', category: 'AI/ML', primary: false }
    ],
    links: [
      { type: 'GITHUB', url: 'https://github.com/rahul-demo/aeromatrix-core', label: 'Repository' },
      { type: 'LIVE_DEMO', url: 'https://aeromatrix.devtrack.app', label: 'Live Preview' }
    ],
    keyFeatures: [
      'High performance 60fps WebGL aircraft fleet rendering',
      'Kalman filter smoothing for transponder packet jitter',
      'FastAPI asynchronous event streamer with binary WebSocket encoding'
    ],
    achievements: [],
    milestones: [
      { id: 'ms_aero_1', title: 'MapLibre Integration', description: 'Custom dark map style and WebGL vector layers', date: '2026-01', completed: true, orderIndex: 1 },
      { id: 'ms_aero_2', title: 'ADS-B Stream Ingestion', description: 'Processed 500+ aircraft updates per second', date: '2026-02', completed: true, orderIndex: 2 }
    ]
  },
  {
    id: 'proj_datadash',
    name: 'Data Analysis & Visualization Dashboard',
    shortDescription: 'Interactive exploratory data analytics portal for multivariate student performance datasets.',
    detailedDescription: 'Automated statistical analysis toolkit generating correlation matrices, distribution plots, and outlier detections from raw academic CSV datasets.',
    problemStatement: 'Educators spend hours generating charts in spreadsheets with no easy way to identify underperforming student cohorts early.',
    solutionOverview: 'Built an automated Streamlit workflow with interactive filtering, automated hypothesis testing, and PDF executive summaries.',
    category: 'Data Science',
    status: 'COMPLETED',
    progressPercentage: 100,
    startDate: '2025-07',
    endDate: '2025-09',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    featured: false,
    contribution: {
      role: 'Solo Data Scientist',
      contributionDetails: 'Conducted exploratory data analysis, wrote data cleanup pipelines with Pandas, and built the Streamlit interface.',
      teamSize: 1
    },
    technologies: [
      { name: 'Python', category: 'Language', primary: true },
      { name: 'Pandas', category: 'AI/ML', primary: true },
      { name: 'NumPy', category: 'AI/ML', primary: false },
      { name: 'Streamlit', category: 'Frontend', primary: true },
      { name: 'Matplotlib', category: 'AI/ML', primary: false }
    ],
    links: [
      { type: 'GITHUB', url: 'https://github.com/rahul-demo/student-eda-dashboard', label: 'Repository' }
    ],
    keyFeatures: [
      'One-click statistical summary and automated skewness checks',
      'Interactive Seaborn & Plotly charts with CSV export options'
    ],
    achievements: [],
    milestones: [
      { id: 'ms_dd_1', title: 'Data Pipeline', description: 'Cleaned and structured academic CSV data', date: '2025-07', completed: true, orderIndex: 1 },
      { id: 'ms_dd_2', title: 'Dashboard Release', description: 'Published on Streamlit Cloud for department evaluation', date: '2025-09', completed: true, orderIndex: 2 }
    ]
  },
  {
    id: 'proj_javaoop',
    name: 'Java OOP Management System',
    shortDescription: 'Desktop inventory simulation demonstrating core Object-Oriented Programming design patterns & relational persistence.',
    detailedDescription: 'A robust inventory management system engineered specifically to demonstrate SOLID design principles, inheritance hierarchies, and JDBC database persistence.',
    problemStatement: 'Demonstrating realistic OOP principles often feels abstract without a practical application with real relational persistence.',
    solutionOverview: 'Engineered a cleanly decoupled domain model using Strategy, Factory, and Repository patterns connected to MySQL via JDBC.',
    category: 'Java',
    status: 'COMPLETED',
    progressPercentage: 100,
    startDate: '2025-09',
    endDate: '2025-10',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
    featured: false,
    contribution: {
      role: 'Lead Java Developer',
      contributionDetails: 'Designed the UML class diagrams, inheritance hierarchies, and relational database schema.',
      teamSize: 2
    },
    technologies: [
      { name: 'Java', category: 'Language', primary: true },
      { name: 'JavaFX', category: 'Frontend', primary: true },
      { name: 'MySQL', category: 'Database', primary: true }
    ],
    links: [
      { type: 'GITHUB', url: 'https://github.com/rahul-demo/java-oop-inventory', label: 'Repository' }
    ],
    keyFeatures: [
      'Demonstrates Encapsulation, Polymorphism, and Interface segregation',
      'Robust transaction management with rollback on stock exceptions',
      'Clean MVC architecture with custom JavaFX components'
    ],
    achievements: [
      {
        id: 'ach_oop_1',
        title: '2nd Place - Dept OOP Code Sprint',
        awardType: 'Winner',
        organization: 'CSE Department',
        date: '2025-10'
      }
    ],
    milestones: [
      { id: 'ms_oop_1', title: 'UML Design', description: 'Completed UML class diagram and domain contracts', date: '2025-09', completed: true, orderIndex: 1 },
      { id: 'ms_oop_2', title: 'Final Demo & Presentation', description: 'Presented working JavaFX GUI to faculty', date: '2025-10', completed: true, orderIndex: 2 }
    ]
  }
];
