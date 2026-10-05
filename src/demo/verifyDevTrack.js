import { rahulDemoProfile, rahulCodingData, rahulSkills, rahulProjects, rahulHackathons, rahulCertificates, rahulAchievements, rahulTasks } from './rahulDemoData.js';
import { authService } from '../services/authService.js';

async function runTests() {
  console.log('--------------------------------------------------');
  console.log('DEVTRACK ACCEPTANCE VERIFICATION TEST SUITE');
  console.log('--------------------------------------------------');

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`[PASS] ${message}`);
      passed++;
    } else {
      console.error(`[FAIL] ${message}`);
      failed++;
    }
  }

  // 1. Verify Demo Profile
  assert(rahulDemoProfile.name === 'Rahul', 'Demo user name is Rahul');
  assert(rahulDemoProfile.year === 'Second Year', 'Student year is Second Year');
  assert(rahulDemoProfile.branch === 'CSE (AI/ML)', 'Branch is CSE (AI/ML)');
  assert(rahulDemoProfile.college.includes('Apex'), 'College is a realistic engineering college');

  // 2. Verify LeetCode & Coding Progress (Internally consistent)
  assert(rahulCodingData.totalSolved === 137, 'LeetCode total solved is 137');
  assert(rahulCodingData.easy.solved === 82, 'Easy solved is 82');
  assert(rahulCodingData.medium.solved === 48, 'Medium solved is 48');
  assert(rahulCodingData.hard.solved === 7, 'Hard solved is 7');
  assert(
    rahulCodingData.easy.solved + rahulCodingData.medium.solved + rahulCodingData.hard.solved === rahulCodingData.totalSolved,
    'LeetCode breakdown adds up exactly to 137 (82 + 48 + 7)'
  );
  assert(rahulCodingData.streaks.currentStreak === 23, 'Current streak is 23 days');
  assert(rahulCodingData.streaks.longestStreak === 45, 'Longest streak is 45 days');

  // 3. Verify Skills
  assert(rahulSkills.length >= 10, `Realistic skills count is ${rahulSkills.length} (>= 10)`);
  const hasJava = rahulSkills.some(s => s.name === 'Java');
  const hasOOP = rahulSkills.some(s => s.name.includes('Object-Oriented'));
  const hasPython = rahulSkills.some(s => s.name === 'Python');
  const hasReact = rahulSkills.some(s => s.name.includes('React'));
  assert(hasJava && hasOOP && hasPython && hasReact, 'Core skills (Java, OOP, Python, React) are present');

  // 4. Verify Projects
  assert(rahulProjects.length === 4, `Projects count is ${rahulProjects.length}`);
  assert(rahulProjects.some(p => p.name === 'Smart Fitness Monitoring System'), 'Smart Fitness project present');
  assert(rahulProjects.some(p => p.name === 'AI-Based Study Planner'), 'AI Study Planner present');
  assert(rahulProjects.some(p => p.name === 'Smart Polyhouse Monitoring System'), 'Smart Polyhouse project present');

  // 5. Verify Hackathons, Certificates, Achievements, Tasks
  assert(rahulHackathons.length >= 3, `${rahulHackathons.length} realistic hackathons present (>= 3)`);
  assert(rahulCertificates.length === 5, '5 realistic certificates present');
  assert(rahulAchievements.length === 4, '4 realistic achievements present');
  assert(rahulTasks.length === 5, '5 realistic tasks present');

  // 6. Verify Auth Service: Invalid Login
  const invalidResult = await authService.login('WrongUser', 'wrongpass');
  assert(!invalidResult.success, 'Invalid credentials rejected');
  assert(invalidResult.error.includes('Invalid demo credentials'), 'Proper error message returned on invalid login');

  // 7. Verify Auth Service: Valid Demo Login (Rahul / Rahul 123)
  const validResult = await authService.login('Rahul', 'Rahul 123');
  assert(validResult.success, 'Demo credentials (Rahul / Rahul 123) authenticate successfully');
  assert(validResult.user.name === 'Rahul', 'Returned authenticated user is Rahul');

  // 8. Verify whitespace/case handling
  const trimmedResult = await authService.login(' rahul ', 'Rahul 123');
  assert(trimmedResult.success, 'Case/whitespace trimmed credentials authenticate successfully');

  console.log('--------------------------------------------------');
  console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('--------------------------------------------------');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
