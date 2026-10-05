/**
 * DevTrack Module 4: Project & Portfolio Management Test Suite.
 * Validates project CRUD, search/filtering, timeline milestones, achievements,
 * portfolio preview aggregation, and data integrity.
 */

import { module4Service } from '../modules/module4/module4Service.js';
import { INITIAL_DEMO_PROJECTS } from '../modules/module4/module4Data.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

async function runModule4Tests() {
  console.log('====================================================');
  console.log('  RUNNING MODULE 4: PROJECT & PORTFOLIO TESTS       ');
  console.log('====================================================\n');

  // TEST SUITE 1: Baseline Demo Projects & Rahul Profile
  console.log('[1] Baseline Demo Projects & Rahul Profile:');
  const initialProjects = await module4Service.getProjects();
  assert(initialProjects.length === 6, 'Rahul has 6 initial demo projects');

  const devTrack = initialProjects.find((p) => p.name === 'DevTrack');
  assert(Boolean(devTrack), 'DevTrack project is present');
  assert(devTrack?.status === 'IN_PROGRESS', 'DevTrack status is IN_PROGRESS');
  assert(devTrack?.featured === true, 'DevTrack is marked as Featured');
  assert(devTrack?.technologies?.some((t) => t.name === 'Spring Boot'), 'DevTrack uses Spring Boot');
  assert(devTrack?.technologies?.some((t) => t.name === 'Java'), 'DevTrack uses Java');
  assert(devTrack?.milestones?.length >= 4, 'DevTrack has development milestones logged');

  const fitness = initialProjects.find((p) => p.name.includes('Fitness'));
  assert(Boolean(fitness), 'Smart Fitness project is present');
  assert(fitness?.status === 'COMPLETED', 'Smart Fitness status is COMPLETED');
  assert(fitness?.progressPercentage === 100, 'Completed project has 100% progress');
  assert(fitness?.achievements?.length >= 1, 'Smart Fitness has achievements logged');

  const polyhouse = initialProjects.find((p) => p.name.includes('Polyhouse'));
  assert(Boolean(polyhouse), 'Smart Polyhouse project is present');
  assert(polyhouse?.category === 'IoT', 'Polyhouse category is IoT');

  // TEST SUITE 2: Project Creation & Input Validation
  console.log('\n[2] Project Creation & Input Validation:');
  const newProjData = {
    name: 'Autonomous Delivery Drone Controller',
    shortDescription: 'Embedded flight controller and obstacle avoidance with ultrasonic array.',
    detailedDescription: 'Real-time telemetry and PID control loops on STM32 microcontroller.',
    problemStatement: 'Manual quadcopter piloting in tight corridors is prone to drift and collisions.',
    solutionOverview: 'Engineered sensor fusion algorithm with Kalman filter on C++ embedded system.',
    category: 'IoT',
    status: 'IN_PROGRESS',
    progressPercentage: 40,
    startDate: '2026-02',
    endDate: 'Present',
    imageUrl: 'https://images.unsplash.com/photo-drone',
    featured: true,
    contribution: {
      role: 'Embedded Systems Engineer',
      contributionDetails: 'Wrote the PID stabilization loop and PWM motor ESC timers in C++.',
      teamSize: 2
    },
    technologies: [
      { name: 'C++', category: 'Language' },
      { name: 'FreeRTOS', category: 'Backend' }
    ],
    links: [
      { type: 'GITHUB', url: 'https://github.com/rahul-demo/drone-controller', label: 'Repository' }
    ],
    keyFeatures: [
      'Low latency 400Hz IMU update loop',
      'Autonomous altitude hold via barometer'
    ]
  };

  const created = await module4Service.createProject(newProjData);
  assert(Boolean(created.id), 'Created project assigned unique ID');
  assert(created.name === newProjData.name, 'Created project name matches');
  assert(created.featured === true, 'Created project featured state is true');

  const currentList = await module4Service.getProjects();
  assert(currentList.length === 7, 'Total projects count incremented to 7');

  // Validation: Missing name
  try {
    await module4Service.createProject({ name: '' });
    assert(false, 'Should reject project with empty name');
  } catch (e) {
    assert(e.message.includes('name is required'), 'Correctly rejected empty project name');
  }

  // Validation: Invalid URL scheme
  try {
    await module4Service.createProject({
      name: 'Test Project',
      shortDescription: 'Desc',
      links: [{ type: 'GITHUB', url: 'ftp://unsafe-link' }]
    });
    assert(false, 'Should reject invalid URL scheme');
  } catch (e) {
    assert(e.message.includes('Invalid URL scheme'), 'Correctly rejected non-http(s) link');
  }

  // Validation: Invalid Progress range
  try {
    await module4Service.createProject({
      name: 'Test Project',
      shortDescription: 'Desc',
      progressPercentage: 150
    });
    assert(false, 'Should reject progress > 100');
  } catch (e) {
    assert(e.message.includes('Progress must be a valid percentage'), 'Correctly rejected progress > 100');
  }

  // TEST SUITE 3: Project Editing & Progress Logic
  console.log('\n[3] Project Editing & Progress Logic:');
  const updated = await module4Service.updateProject(created.id, {
    ...created,
    name: 'Autonomous Delivery Drone Controller v2',
    status: 'COMPLETED'
  });
  assert(updated.name === 'Autonomous Delivery Drone Controller v2', 'Updated name persisted');
  assert(updated.status === 'COMPLETED', 'Status changed to COMPLETED');
  assert(updated.progressPercentage === 100, 'COMPLETED status automatically sets progress to 100%');

  // TEST SUITE 4: Featured Projects Toggle
  console.log('\n[4] Featured Projects Toggle:');
  const toggled = await module4Service.toggleFeatured(created.id);
  assert(toggled.featured === false, 'Project unfeatured successfully');
  const toggledBack = await module4Service.toggleFeatured(created.id);
  assert(toggledBack.featured === true, 'Project featured back successfully');

  // TEST SUITE 5: Project Milestones CRUD
  console.log('\n[5] Project Milestones CRUD:');
  const milestone = await module4Service.addMilestone(created.id, {
    title: 'Hardware Bench Testing Complete',
    description: 'Calibrated gyroscope drift and tested ESC telemetry',
    date: '2026-03-01',
    completed: true
  });
  assert(Boolean(milestone.id), 'Milestone created with unique ID');
  assert(milestone.title === 'Hardware Bench Testing Complete', 'Milestone title stored');

  const updatedMilestone = await module4Service.updateMilestone(created.id, milestone.id, {
    title: 'Hardware & Propeller Bench Testing Complete',
    completed: true
  });
  assert(updatedMilestone.title.includes('Propeller'), 'Milestone update persisted');

  const msDeleteRes = await module4Service.deleteMilestone(created.id, milestone.id);
  assert(msDeleteRes.success === true, 'Milestone deleted successfully');

  // TEST SUITE 6: Project Achievements CRUD
  console.log('\n[6] Project Achievements CRUD:');
  const ach = await module4Service.addAchievement(created.id, {
    title: 'Top Autonomous Systems Award',
    awardType: 'Winner',
    organization: 'National Drone Conclave',
    date: '2026-03'
  });
  assert(Boolean(ach.id), 'Achievement created with unique ID');
  assert(ach.awardType === 'Winner', 'Achievement award type stored');

  const achDeleteRes = await module4Service.deleteAchievement(created.id, ach.id);
  assert(achDeleteRes.success === true, 'Achievement deleted successfully');

  // TEST SUITE 7: Project Deletion
  console.log('\n[7] Project Deletion:');
  const deleteRes = await module4Service.deleteProject(created.id);
  assert(deleteRes.success === true, 'Project deleted successfully');
  const afterDeleteList = await module4Service.getProjects();
  assert(afterDeleteList.length === 6, 'Project count restored to baseline 6');

  // TEST SUITE 8: Search, Filter, and Sort
  console.log('\n[8] Search, Filter, and Sort:');
  const searchFitness = await module4Service.getProjects({ search: 'Fitness' });
  assert(searchFitness.length === 1, 'Search query "Fitness" returned 1 result');
  assert(searchFitness[0].name.includes('Fitness'), 'Result matches searched project');

  const searchJava = await module4Service.getProjects({ search: 'Java' });
  assert(searchJava.length >= 2, 'Search query "Java" returned at least 2 results (DevTrack & Java OOP)');

  const completedOnly = await module4Service.getProjects({ status: 'COMPLETED' });
  assert(completedOnly.length >= 3, 'Status filter COMPLETED returns >= 3 completed projects');
  for (const p of completedOnly) {
    assert(p.status === 'COMPLETED', `Project ${p.name} has COMPLETED status`);
  }

  const iotOnly = await module4Service.getProjects({ category: 'IoT' });
  assert(iotOnly.length >= 1, 'Category filter IoT returns matching project');

  const sortedAlpha = await module4Service.getProjects({ sort: 'ALPHABETICAL' });
  assert(sortedAlpha[0].name.localeCompare(sortedAlpha[1].name) <= 0, 'Alphabetical sort correctly orders projects');

  // TEST SUITE 9: Overview Statistics
  console.log('\n[9] Overview Statistics:');
  const stats = await module4Service.getOverviewStats();
  assert(stats.totalProjects === 6, 'Overview totalProjects is 6');
  assert(stats.completedCount === 4, 'Overview completedCount is 4');
  assert(stats.inProgressCount === 2, 'Overview inProgressCount is 2');
  assert(stats.featuredCount === 4, 'Overview featuredCount is 4');
  assert(stats.technologiesCount >= 10, 'Overview unique technologies count >= 10');

  // TEST SUITE 10: Portfolio Preview Aggregation
  console.log('\n[10] Portfolio Preview Aggregation:');
  const portfolio = await module4Service.getPortfolioPreview();
  assert(portfolio.studentName === 'Rahul', 'Portfolio student name is Rahul');
  assert(portfolio.featuredProjects.length === 4, 'Portfolio preview includes 4 featured projects');
  for (const p of portfolio.featuredProjects) {
    assert(p.featured === true, `Portfolio project "${p.name}" is marked featured`);
  }
  assert(portfolio.techStack.length >= 8, 'Portfolio aggregates >= 8 unique technologies');
  assert(portfolio.techStack.includes('Java'), 'Portfolio tech stack contains Java');
  assert(portfolio.techStack.includes('Python'), 'Portfolio tech stack contains Python');
  assert(portfolio.achievements.length >= 2, 'Portfolio aggregates project achievements');

  console.log('\n====================================================');
  console.log(`  MODULE 4 TESTS COMPLETE: ${passed} PASSED, ${failed} FAILED  `);
  console.log('====================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runModule4Tests();
