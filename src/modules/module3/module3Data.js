/**
 * Module 3 Demo Data Foundation for Rahul (Second Year CSE AI/ML).
 * Fictional prototype values clearly labeled as DEMO DATA for faculty demonstration.
 */

export const INITIAL_CODING_PROFILES = [
  {
    id: 'cp_lc_01',
    platform: 'LeetCode',
    username: 'rahul_codes',
    profileUrl: 'https://leetcode.com/u/rahul_codes/',
    sourceType: 'DEMO', // 'LIVE', 'MANUAL', 'DEMO'
    status: 'CONNECTED', // 'CONNECTED', 'SYNCING', 'SYNC_FAILED', 'DISCONNECTED'
    lastSyncedAt: 'Today, 08:30 PM',
    proofUrl: null,
    manualNotes: 'Demo account for Rahul (2nd Year CSE AI/ML)',
    statistics: {
      problemStats: {
        totalSolved: 137,
        easySolved: 82,
        mediumSolved: 48,
        hardSolved: 7,
        acceptanceRate: 64.2
      },
      contestStats: {
        rating: 1542,
        globalRanking: '~182,400',
        contestsAttended: 12,
        badgeTitle: 'Knight',
        topPercentage: 18.2
      },
      streakStats: {
        currentStreakDays: 23,
        longestStreakDays: 45,
        activeDaysThisYear: 85,
        solvedThisWeek: 14,
        solvedThisMonth: 38
      }
    }
  },
  {
    id: 'cp_gh_01',
    platform: 'GitHub',
    username: 'rahul-demo',
    profileUrl: 'https://github.com/rahul-demo',
    sourceType: 'DEMO',
    status: 'CONNECTED',
    lastSyncedAt: 'Yesterday, 06:15 PM',
    proofUrl: null,
    manualNotes: 'Portfolio projects and repositories',
    statistics: {
      githubStats: {
        publicRepos: 14,
        followers: 28,
        following: 19,
        totalStars: 32,
        publicGists: 4,
        contributionsThisYear: 184,
        topLanguages: ['Java', 'Python', 'JavaScript', 'C++']
      },
      streakStats: {
        currentStreakDays: 14,
        longestStreakDays: 28,
        activeDaysThisYear: 45,
        solvedThisWeek: 8,
        solvedThisMonth: 26
      }
    }
  },
  {
    id: 'cp_cc_01',
    platform: 'CodeChef',
    username: 'rahul_dev',
    profileUrl: 'https://www.codechef.com/users/rahul_dev',
    sourceType: 'MANUAL',
    status: 'CONNECTED',
    lastSyncedAt: 'Oct 02, 2026',
    proofUrl: 'https://devtrack.demo/proof/codechef_rahul.png',
    manualNotes: 'Verified via screenshot proof & profile link',
    statistics: {
      problemStats: {
        totalSolved: 42,
        easySolved: 28,
        mediumSolved: 12,
        hardSolved: 2,
        acceptanceRate: 59.0
      },
      contestStats: {
        rating: 1640,
        globalRanking: 'Division 2',
        contestsAttended: 8,
        badgeTitle: '3-Star',
        topPercentage: 12.5
      },
      streakStats: {
        currentStreakDays: 9,
        longestStreakDays: 18,
        activeDaysThisYear: 30,
        solvedThisWeek: 3,
        solvedThisMonth: 12
      }
    }
  },
  {
    id: 'cp_cf_01',
    platform: 'Codeforces',
    username: 'rahul_cf',
    profileUrl: 'https://codeforces.com/profile/rahul_cf',
    sourceType: 'DEMO',
    status: 'CONNECTED',
    lastSyncedAt: 'Sep 28, 2026',
    proofUrl: null,
    manualNotes: 'Contest participations in Div 3 & 4',
    statistics: {
      problemStats: {
        totalSolved: 34,
        easySolved: 20,
        mediumSolved: 12,
        hardSolved: 2,
        acceptanceRate: 54.8
      },
      contestStats: {
        rating: 1280,
        globalRanking: 'Pupil',
        contestsAttended: 6,
        badgeTitle: 'Pupil',
        topPercentage: 24.0
      },
      streakStats: {
        currentStreakDays: 7,
        longestStreakDays: 15,
        activeDaysThisYear: 24,
        solvedThisWeek: 4,
        solvedThisMonth: 10
      }
    }
  }
];

export const INITIAL_CODING_GOALS = [
  {
    id: 'goal_1',
    title: 'Solve 150 LeetCode Questions',
    goalType: 'PROBLEMS_SOLVED',
    platform: 'LeetCode',
    targetValue: 150,
    currentValue: 137,
    timeframe: 'Monthly',
    deadline: '2026-10-31',
    status: 'ACTIVE'
  },
  {
    id: 'goal_2',
    title: 'Daily Practice: 2 Problems/Day',
    goalType: 'DAILY_TARGET',
    platform: 'All Platforms',
    targetValue: 2,
    currentValue: 2,
    timeframe: 'Daily',
    deadline: 'Today',
    status: 'COMPLETED'
  },
  {
    id: 'goal_3',
    title: 'Reach 1600 Rating on CodeChef',
    goalType: 'CONTEST_RATING',
    platform: 'CodeChef',
    targetValue: 1600,
    currentValue: 1542,
    timeframe: 'Semester',
    deadline: '2026-12-15',
    status: 'ACTIVE'
  },
  {
    id: 'goal_4',
    title: 'Maintain 30-Day Coding Streak',
    goalType: 'STREAK_DAYS',
    platform: 'All Platforms',
    targetValue: 30,
    currentValue: 23,
    timeframe: 'Monthly',
    deadline: '2026-10-20',
    status: 'ACTIVE'
  }
];

export const INITIAL_CODING_ACTIVITIES = [
  {
    id: 'act_1',
    title: 'Solved 5 LeetCode Questions',
    platform: 'LeetCode',
    activityType: 'SOLVED_PROBLEM',
    date: '2026-10-04',
    result: 'Solved Two Sum, Valid Parentheses, Binary Search, Reverse String',
    sourceType: 'DEMO',
    linkUrl: 'https://leetcode.com/u/rahul_codes/'
  },
  {
    id: 'act_2',
    title: 'Starters 150 Contest Participation',
    platform: 'CodeChef',
    activityType: 'CONTEST_PARTICIPATION',
    date: '2026-10-03',
    result: 'Ranked 480 / 12,000 in Division 2 (+45 Rating)',
    sourceType: 'DEMO',
    linkUrl: 'https://www.codechef.com/users/rahul_dev'
  },
  {
    id: 'act_3',
    title: 'Created Repository: ai-study-planner',
    platform: 'GitHub',
    activityType: 'REPO_CREATED',
    date: '2026-10-02',
    result: 'Pushed initial Java Spring Boot + React architecture',
    sourceType: 'DEMO',
    linkUrl: 'https://github.com/rahul-demo/ai-study-planner'
  },
  {
    id: 'act_4',
    title: 'Solved 3 Medium DSA Questions',
    platform: 'LeetCode',
    activityType: 'SOLVED_PROBLEM',
    date: '2026-10-01',
    result: 'Top K Frequent Elements, Longest Substring Without Repeating Characters',
    sourceType: 'DEMO',
    linkUrl: 'https://leetcode.com/u/rahul_codes/'
  },
  {
    id: 'act_5',
    title: 'Codeforces Round 970 (Div. 3)',
    platform: 'Codeforces',
    activityType: 'CONTEST_PARTICIPATION',
    date: '2026-09-28',
    result: 'Solved Problems A, B, and C within contest window',
    sourceType: 'DEMO',
    linkUrl: 'https://codeforces.com/profile/rahul_cf'
  },
  {
    id: 'act_6',
    title: 'Pushed 6 Commits to smart-fitness-monitor',
    platform: 'GitHub',
    activityType: 'COMMIT_PUSHED',
    date: '2026-09-24',
    result: 'Refactored MediaPipe posture detection pipeline',
    sourceType: 'DEMO',
    linkUrl: 'https://github.com/rahul-demo/smart-fitness-monitor'
  }
];

export const SUPPORTED_PLATFORMS_METADATA = [
  {
    id: 'LeetCode',
    name: 'LeetCode',
    officialApi: true,
    description: 'Automated problem stats & contest rating sync via public endpoint.',
    profilePlaceholder: 'e.g., rahul_codes',
    baseUrl: 'https://leetcode.com/u/'
  },
  {
    id: 'GitHub',
    name: 'GitHub',
    officialApi: true,
    description: 'Automated repositories, stars, and contribution sync via Official REST API.',
    profilePlaceholder: 'e.g., rahul-demo',
    baseUrl: 'https://github.com/users/'
  },
  {
    id: 'Codeforces',
    name: 'Codeforces',
    officialApi: true,
    description: 'Automated contest rating, rank, and problem stats via Official Public API.',
    profilePlaceholder: 'e.g., rahul_cf',
    baseUrl: 'https://codeforces.com/profile/'
  },
  {
    id: 'CodeChef',
    name: 'CodeChef',
    officialApi: false,
    description: 'No public REST API available. Verified via manual verification & screenshot proof.',
    profilePlaceholder: 'e.g., rahul_dev',
    baseUrl: 'https://www.codechef.com/users/'
  },
  {
    id: 'GeeksforGeeks',
    name: 'GeeksforGeeks',
    officialApi: false,
    description: 'No public REST API available. Verified via manual verification & profile link.',
    profilePlaceholder: 'e.g., rahul_gfg',
    baseUrl: 'https://auth.geeksforgeeks.org/user/'
  },
  {
    id: 'HackerRank',
    name: 'HackerRank',
    officialApi: false,
    description: 'No public REST API available. Verified via manual verification & certificate link.',
    profilePlaceholder: 'e.g., rahul_hr',
    baseUrl: 'https://www.hackerrank.com/profile/'
  },
  {
    id: 'AtCoder',
    name: 'AtCoder',
    officialApi: false,
    description: 'Japanese competitive programming platform. Supported via manual verification.',
    profilePlaceholder: 'e.g., rahul_at',
    baseUrl: 'https://atcoder.jp/users/'
  },
  {
    id: 'HackerEarth',
    name: 'HackerEarth',
    officialApi: false,
    description: 'Supported via manual verification & public profile URL.',
    profilePlaceholder: 'e.g., rahul_he',
    baseUrl: 'https://www.hackerearth.com/@'
  },
  {
    id: 'Other',
    name: 'Other',
    officialApi: false,
    description: 'Custom coding platform or contest site.',
    profilePlaceholder: 'e.g., username',
    baseUrl: ''
  }
];
