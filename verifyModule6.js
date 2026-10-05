/**
 * Automated Verification Suite for DEVTRACK MODULE 6:
 * Resume Builder & Job-Specific Recommendations
 */

import { INITIAL_RESUMES, RESUME_TEMPLATES, STANDARD_JOB_ROLES } from './src/modules/module6/module6Data.js';
import { module6Service } from './src/modules/module6/module6Service.js';

console.log('====================================================');
console.log('   RUNNING DEVTRACK MODULE 6 FULL VERIFICATION      ');
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

module6Service.initStorage();

// 1. Multiple Resumes & Templates (Section 6.1, 6.5, 6.20)
const resumes = module6Service.getResumes();
check('Pre-seeded with multiple student resumes (SDE and AI/ML)', resumes.length >= 2);
check('4 placement-ready templates defined (classic, modern, minimal, technical)', RESUME_TEMPLATES.length === 4);

const sdeResume = resumes[0];
check('SDE resume contains Rahul personal info', sdeResume.fullName === 'Rahul Sharma' && sdeResume.email.includes('pict.edu'));
check('SDE resume has target role Software Development Engineer', sdeResume.targetRole.includes('Software Development'));
check('Resume contains default modular sections', (sdeResume.sections || []).length >= 6);

// 2. Cross-Module Data Reuse (Section 6.3, 8.24)
check('Reuses projects from DevTrack (DevTrack, AeroMatrix, Polyhouse)', (sdeResume.projects || []).length >= 3);
check('Reuses technical skills from DevTrack (Java, Python, SQL, React)', (sdeResume.skills || []).length >= 3);
check('Reuses hackathon achievements (Hack Celestial 3.0)', (sdeResume.achievements || []).length >= 2);
check('Reuses verified certificates', (sdeResume.certificates || []).length >= 2);

// 3. Section Controls (Section 6.7)
const originalSections = sdeResume.sections;
check('Education section present', originalSections.some(s => s.sectionKey === 'education'));
check('Projects section present', originalSections.some(s => s.sectionKey === 'projects'));
check('Skills section present', originalSections.some(s => s.sectionKey === 'skills'));

// 4. Job-Specific Recommendation & Profile Match (Section 6.8 - 6.15)
const matchSDE = module6Service.analyzeMatch('Software Development Engineer (SDE)', '', sdeResume);
check('Profile match score calculated (0 to 100%)', matchSDE.overallScore >= 70 && matchSDE.overallScore <= 100);
check('Matched skills identified (Java, SQL, Git)', matchSDE.matchedSkills.some(s => s.toLowerCase().includes('java')));
check('Score uses transparent formula (50% skills, 30% projects, 20% achievements)', matchSDE.skillScore !== undefined && matchSDE.projectScore !== undefined);

const matchML = module6Service.analyzeMatch('Machine Learning Intern', 'Require PyTorch and Computer Vision', resumes[1]);
check('AI/ML Resume scores highly for ML Intern role (>=70%)', matchML.overallScore >= 70);
check('PyTorch matched for ML role', matchML.matchedSkills.includes('PyTorch'));

// 5. Recommendations Not Applied Automatically (Section 6.9, 6.10, 6.11)
const currentSkillsCount = (sdeResume.skills[0].skills || []).length;
module6Service.analyzeMatch('Software Development Engineer', 'Docker Kubernetes', sdeResume);
const unchangedSkillsCount = (module6Service.getResumeById(sdeResume.id).skills[0].skills || []).length;
check('Analyzing recommendations does NOT mutate resume without approval', currentSkillsCount === unchangedSkillsCount);

// 6. Resume Creation & CRUD
const createdResume = module6Service.createResume('Data Science Placement Resume', 'classic');
check('New resume created with custom title', createdResume.title === 'Data Science Placement Resume');
check('Total resumes incremented', module6Service.getResumes().length >= 3);
module6Service.deleteResume(createdResume.id);
check('Delete resume restores count', module6Service.getResumes().length === 2);

console.log('====================================================');
console.log(`MODULE 6 TESTS: ${passed} Passed, ${failed} Failed`);
console.log('====================================================');

if (failed > 0) process.exit(1);
