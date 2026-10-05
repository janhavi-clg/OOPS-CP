/**
 * Automated Verification Suite for DEVTRACK MODULE 5:
 * Achievements, Certificates & Accomplishments
 */

import {
  INITIAL_CATEGORIES,
  INITIAL_CERTIFICATES,
  INITIAL_ACHIEVEMENTS,
  INITIAL_ACTIVE_CATEGORIES
} from './src/modules/module5/module5Data.js';
import { module5Service } from './src/modules/module5/module5Service.js';

console.log('====================================================');
console.log('   RUNNING DEVTRACK MODULE 5 FULL VERIFICATION      ');
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

// Re-init service storage
module5Service.initStorage();

// 1. Initial State & Category Activation Principle (Section 5.1 & 5.2)
const activeCats = module5Service.getActiveCategories();
check('Active categories initialized with student active categories', activeCats.length >= 4);
check('Hackathon Achievement is active for Rahul', activeCats.includes('Hackathon Achievement'));
check('Publication is NOT initially active (keeps interface clean per 5.2)', !activeCats.includes('Publication'));
check('Volunteering is NOT initially active', !activeCats.includes('Volunteering'));

// 2. Dynamic Category Activation
module5Service.activateCategory('Publication');
const updatedCats = module5Service.getActiveCategories();
check('Category activates when user adds that type', updatedCats.includes('Publication'));

// 3. Certificates Data (Section 5.5, 5.6, 5.7)
const certs = module5Service.getCertificates('ALL', '');
check('Pre-seeded with 5 verified student certificates for Rahul', certs.length === 5);
const pyCert = certs.find(c => c.certificateName.includes('Python'));
check('Python certificate has valid credential ID', pyCert && pyCert.credentialId === 'IBM-PY-884920');
check('Python certificate has verification URL', pyCert && pyCert.credentialUrl.includes('coursera.org/verify'));
check('Python certificate is marked verified', pyCert && pyCert.verified === true);
check('Certificates relate to student skills', pyCert && pyCert.relatedSkill === 'Python');

// 4. Certificate Validation (Section 5.5)
const validPdf = module5Service.validateFile({ type: 'application/pdf', size: 1024 * 1024 });
check('PDF under 5MB passes validation', validPdf.valid === true);
const validPng = module5Service.validateFile({ type: 'image/png', size: 2 * 1024 * 1024 });
check('PNG image under 5MB passes validation', validPng.valid === true);
const invalidExe = module5Service.validateFile({ type: 'application/x-msdownload', size: 1024 });
check('Unsupported file type (.exe) rejected', invalidExe.valid === false);
const oversizedPdf = module5Service.validateFile({ type: 'application/pdf', size: 10 * 1024 * 1024 });
check('Oversized file (>5MB) rejected', oversizedPdf.valid === false);

// 5. Certificate CRUD
const newCert = module5Service.saveCertificate({
  certificateName: 'Full Stack React & Spring Boot Specialist',
  issuingOrganization: 'DevTrack Academy',
  issueDate: '2026-03-01',
  credentialId: 'DT-FS-101',
  credentialUrl: 'https://devtrack.internal.app/verify/DT-FS-101',
  relatedSkill: 'React',
  description: 'Full stack architecture validation.'
});
check('New certificate created with unique ID', newCert.id.startsWith('cert_'));
check('Total certificates increments to 6', module5Service.getCertificates('ALL', '').length === 6);
module5Service.deleteCertificate(newCert.id);
check('Deleted certificate returns count to 5', module5Service.getCertificates('ALL', '').length === 5);

// 6. Hackathon Achievements (Section 5.3, 5.4, 5.8)
const achs = module5Service.getAchievements('ALL', '');
check('Pre-seeded with 5 realistic student achievements for Rahul', achs.length === 5);
const hackCelestial = achs.find(a => a.title.includes('Hack Celestial'));
check('Hack Celestial 3.0 has platform Devfolio', hackCelestial && hackCelestial.platform === 'Devfolio');
check('Hack Celestial has status Winner', hackCelestial && hackCelestial.participationStatus === 'Winner');
check('Hack Celestial has team name and members', hackCelestial && hackCelestial.teamName === 'Byte Busters');
check('Hack Celestial has valid hackathon URL', hackCelestial && hackCelestial.hackathonUrl.includes('hackcelestial'));
check('Hack Celestial has proof document attached', hackCelestial && hackCelestial.hasProof === true);

// 7. Filtering & Search (Section 5.11)
const hackathonFilter = module5Service.getAchievements('Hackathon Achievement', '');
check('Category filter correctly isolates hackathons', hackathonFilter.length >= 2);
const searchFiltered = module5Service.getAchievements('ALL', 'IoT');
check('Search by keyword "IoT" finds relevant records', searchFiltered.length >= 1);
const skillFilteredCerts = module5Service.getCertificates('Python', '');
check('Certificates filtered by skill "Python"', skillFilteredCerts.length >= 1);

console.log('====================================================');
console.log(`MODULE 5 TESTS: ${passed} Passed, ${failed} Failed`);
console.log('====================================================');

if (failed > 0) process.exit(1);
