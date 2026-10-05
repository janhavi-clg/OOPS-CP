/**
 * Automated Verification Suite for DEVTRACK REGRESSION & MODULE 7 LOCKED STATE
 */

import * as fs from 'fs';

console.log('====================================================');
console.log('  RUNNING REGRESSION & MODULE 7 LOCK VERIFICATION   ');
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

// 1. Read Sidebar.jsx
const sidebarJsx = fs.readFileSync('./src/components/layout/Sidebar.jsx', 'utf-8');

// Module 7 Locked State Verification
check('Module 7 (Placement Readiness) exists in MODULE_ITEMS', sidebarJsx.includes("id: 'placement'"));
check('Module 7 is explicitly marked isLocked: true', sidebarJsx.includes('isLocked: true'));
check('Module 7 icon is Lock', sidebarJsx.includes('icon: Lock'));
check('Module 7 path is #locked (does not navigate to an unfinished page)', sidebarJsx.includes("path: '#locked'"));
check('Module 7 badge displays "Locked"', sidebarJsx.includes("badge: 'Locked'"));
check('Module 7 has locked click handler with coming soon toast', sidebarJsx.includes('Placement Readiness is coming soon') || sidebarJsx.includes('handleLockedClick'));
check('Module 7 displays Lock icon in badge', sidebarJsx.includes('<Lock size={10} />'));

// 2. Navigation items completeness (8 modules + Dashboard)
check('Sidebar contains Dashboard navigation', sidebarJsx.includes("id: 'dashboard'"));
check('Sidebar contains Module 1 Profile', sidebarJsx.includes("id: 'profile'"));
check('Sidebar contains Module 2 Skills & Learning', sidebarJsx.includes("id: 'skills'"));
check('Sidebar contains Module 3 Coding Progress', sidebarJsx.includes("id: 'coding'"));
check('Sidebar contains Module 4 Projects', sidebarJsx.includes("id: 'projects'"));
check('Sidebar contains Module 5 Certificates & Achievements', sidebarJsx.includes("id: 'certificates'"));
check('Sidebar contains Module 6 Resume & Portfolio', sidebarJsx.includes("id: 'resume'"));
check('Sidebar contains Module 7 Placement Readiness (Locked)', sidebarJsx.includes("id: 'placement'"));
check('Sidebar contains Module 8 Progress & Analytics', sidebarJsx.includes("id: 'analytics'"));

// 3. Verify Active Module Routes in App.jsx
const appJsx = fs.readFileSync('./src/App.jsx', 'utf-8');

check('App.jsx mounts Module1Page on /app/profile', appJsx.includes('path="profile" element={<Module1Page />}'));
check('App.jsx mounts Module2Page on /app/skills', appJsx.includes('path="skills" element={<Module2Page />}'));
check('App.jsx mounts Module3Page on /app/coding', appJsx.includes('path="coding" element={<Module3Page />}'));
check('App.jsx mounts Module4Page on /app/projects', appJsx.includes('path="projects" element={<Module4Page />}'));
check('App.jsx mounts Module5Page on /app/certificates', appJsx.includes('path="certificates" element={<Module5Page />}'));
check('App.jsx mounts Module5Page redirect on /app/achievements', appJsx.includes('path="achievements"'));
check('App.jsx mounts Module6Page on /app/resume', appJsx.includes('path="resume" element={<Module6Page />}'));
check('App.jsx mounts Module8Page on /app/analytics', appJsx.includes('path="analytics" element={<Module8Page />}'));
check('Module 7 does NOT have an active route or page mounted (Strictly locked per prompt)', !appJsx.includes('Module7Page') && !appJsx.includes('path="placement"'));

// 4. Verify CSS Imports in index.css
const indexCss = fs.readFileSync('./src/index.css', 'utf-8');
check('index.css imports module1.css', indexCss.includes("modules/module1/module1.css"));
check('index.css imports module2.css', indexCss.includes("modules/module2/module2.css"));
check('index.css imports module3.css', indexCss.includes("modules/module3/module3.css"));
check('index.css imports module4.css', indexCss.includes("modules/module4/module4.css"));
check('index.css imports module5.css', indexCss.includes("modules/module5/module5.css"));
check('index.css imports module6.css', indexCss.includes("modules/module6/module6.css"));
check('index.css imports module8.css', indexCss.includes("modules/module8/module8.css"));

console.log('====================================================');
console.log(`REGRESSION & MODULE 7 TESTS: ${passed} Passed, ${failed} Failed`);
console.log('====================================================');

if (failed > 0) process.exit(1);
