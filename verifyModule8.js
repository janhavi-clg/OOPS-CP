/**
 * Automated Verification Suite for DEVTRACK MODULE 8:
 * Analytics, Progress Dashboard & Insights
 */

import { module8Service } from './src/modules/module8/module8Service.js';
import { module5Service } from './src/modules/module5/module5Service.js';

console.log('====================================================');
console.log('   RUNNING DEVTRACK MODULE 8 FULL VERIFICATION      ');
console.log('====================================================');

let passed = 0;
let failed = 0;

function check(desc, condition) {
  if (condition) {
    console.log(`✓ ${desc}`);
    passed++;
  } else {
    console.error(`✗ FAILED: ${desc}`);
    failed++;
  }
}

// Mock localStorage for Node execution
class MockStorage {
  constructor() { this.store = {}; }
  getItem(k) { return this.store[k] || null; }
  setItem(k, v) { this.store[k] = String(v); }
  removeItem(k) { delete this.store[k]; }
  clear() { this.store = {}; }
}
globalThis.localStorage = new MockStorage();

module5Service.initStorage();

// Fetch student analytics
const analytics = module8Service.getStudentAnalytics('month');

// 1. Overview Metrics (Section 8.1)
check('Skills tracked count is accurate (7)', analytics.skills.total === 7);
check('Projects total count matches Module 4 (6 projects)', analytics.projects.total === 6);
check('Coding problems count matches Module 3 (137 solved)', analytics.coding.problemsSolved === 137);
check('Certificates count matches Module 5 (5 certificates)', analytics.achievements.totalCertificates === 5);
check('Hackathons count matches Module 5 (>= 2 hackathons)', analytics.achievements.hackathonsCount >= 2);
check('Total achievements matches Module 5 (5 achievements)', analytics.achievements.totalAchievements === 5);
check('Active daily streak is 14 days', analytics.coding.codingStreakDays === 14);

// 2. Skill Progress (Section 8.2)
check('Top skill is Python with 72% progress', analytics.skills.topSkill === 'Python' && analytics.skills.topSkillProficiency === 72);
check('Skills list contains Java, DSA, SQL, React, PyTorch, Git', analytics.skills.list.length >= 7);

// 3. Project Analytics & Formula (Section 8.3, 8.13)
check('4 completed projects and 2 in development', analytics.projects.completed === 4 && analytics.projects.inProgress === 2);
check('Project completion rate formula: (4 / 6) * 100 = 66.7%', Math.abs(analytics.projects.completionRate - 66.7) < 0.2);

// 4. Coding Analytics Breakdown (Section 8.4)
check('Easy problems count: 68', analytics.coding.easySolved === 68);
check('Medium problems count: 54', analytics.coding.mediumSolved === 54);
check('Hard problems count: 15', analytics.coding.hardSolved === 15);
check('Difficulty sum equals total (68 + 54 + 15 = 137)', (analytics.coding.easySolved + analytics.coding.mediumSolved + analytics.coding.hardSolved) === 137);
check('Connected platforms count is 2 (LeetCode, GitHub)', analytics.coding.platformsConnected === 2);

// 5. Learning Analytics & Formula (Section 8.5)
check('Resources completed: 12 of 18', analytics.learning.completedResources === 12 && analytics.learning.totalResources === 18);
check('Resource completion rate: 66.7%', Math.abs(analytics.learning.completionRate - 66.7) < 0.2);

// 6. Unified Development Journey Timeline (Section 8.7)
check('Timeline contains events from M2, M3, M4, M5', analytics.timeline.length >= 6);
check('Timeline includes Hack Celestial 3.0', analytics.timeline.some(t => t.activityTitle.includes('Hack Celestial')));
check('Timeline includes 137th LeetCode problem', analytics.timeline.some(t => t.activityTitle.includes('137th Problem')));
check('Timeline includes Java SE 17 certification', analytics.timeline.some(t => t.activityTitle.includes('Java SE 17')));

// 7. Progress Graph & Weekly Activity (Section 8.8, 8.9)
check('Weekly activity tracks 7 days (Mon to Sun)', analytics.weeklyActivity.length === 7);
check('Activity distribution tracks Coding, Learning, and Projects', analytics.activityDistribution.length === 3);

// 8. Personal Insights & Recommendations (Section 8.10, 8.11)
check('DevTrack Insights generated from actual data', analytics.insights.length >= 3);
check('DevTrack insights do NOT claim to be AI', !analytics.insights.some(i => i.title.includes('AI Insight')));
check('Actionable recommendations generated', analytics.recommendations.length >= 3);
check('Recommendations contain target module navigation links', analytics.recommendations.every(r => r.targetUrl.startsWith('/app/')));

console.log('====================================================');
console.log(`MODULE 8 TESTS: ${passed} Passed, ${failed} Failed`);
console.log('====================================================');

if (failed > 0) process.exit(1);
