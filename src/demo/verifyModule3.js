/**
 * Automated Verification Test Suite for Module 3: Coding Progress & Developer Activity Tracker.
 * Tests Full CRUD for connected platforms, live vs manual verification flows,
 * goals management, Coding Journey timeline filtering, and data persistence.
 */

import { module3Service } from '../modules/module3/module3Service.js';
import {
  INITIAL_CODING_PROFILES,
  INITIAL_CODING_GOALS,
  INITIAL_CODING_ACTIVITIES,
  SUPPORTED_PLATFORMS_METADATA
} from '../modules/module3/module3Data.js';

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

async function runModule3Tests() {
  console.log('====================================================');
  console.log('  RUNNING MODULE 3: CODING TRACKER ACCEPTANCE TESTS ');
  console.log('====================================================');

  try {
    // -----------------------------------------------------------
    // 1. DATA INITIALIZATION & DEMO DATA FOUNDATION
    // -----------------------------------------------------------
    console.log('\n[1] Platform Connections & Demo Baseline:');
    await module3Service.resetToDemoData();
    const profiles = await module3Service.getProfiles();
    assert(profiles.length === 4, `Rahul has 4 initial connected platforms (LeetCode, GitHub, CodeChef, Codeforces)`);

    const leetcode = profiles.find((p) => p.platform === 'LeetCode');
    assert(leetcode && leetcode.sourceType === 'DEMO', 'LeetCode profile clearly marked with DEMO badge');
    assert(leetcode.statistics.problemStats.totalSolved === 137, 'LeetCode total solved is 137');
    assert(leetcode.statistics.streakStats.currentStreakDays === 23, 'LeetCode current streak is 23 days');

    const codechef = profiles.find((p) => p.platform === 'CodeChef');
    assert(codechef && codechef.sourceType === 'MANUAL', 'CodeChef profile marked as MANUAL data');
    assert(codechef.proofUrl !== null, 'CodeChef profile contains manual verification proof link');

    const meta = module3Service.getPlatformMetadata();
    assert(meta.length >= 8, `Catalog defines ${meta.length} platform metadata items`);
    assert(meta.find((m) => m.id === 'GitHub').officialApi === true, 'GitHub marked with official API');
    assert(meta.find((m) => m.id === 'CodeChef').officialApi === false, 'CodeChef marked as manual verification');

    // -----------------------------------------------------------
    // 2. CONNECT PLATFORM (AUTOMATIC & MANUAL FLOWS)
    // -----------------------------------------------------------
    console.log('\n[2] Connecting Platform & Validation:');
    // Connect a manual platform (HackerRank)
    const newHR = await module3Service.connectPlatform({
      platform: 'HackerRank',
      username: 'rahul_hackerrank',
      profileUrl: 'https://hackerrank.com/profile/rahul_hackerrank',
      isManual: true,
      totalSolved: 35,
      easySolved: 25,
      mediumSolved: 10,
      hardSolved: 0,
      rating: 1420,
      proofUrl: 'https://devtrack.demo/proof/hackerrank_cert.png',
      manualNotes: '5-star Gold badge in Problem Solving'
    });

    assert(newHR && newHR.id, `Connected platform "${newHR.platform}"`);
    assert(newHR.sourceType === 'MANUAL', 'Platform saved with MANUAL data badge');
    assert(newHR.statistics.problemStats.totalSolved === 35, 'Problem count 35 stored accurately');
    assert(newHR.proofUrl.includes('hackerrank_cert.png'), 'Proof link persisted');

    // Prevent duplicate connection
    let dupCaught = false;
    try {
      await module3Service.connectPlatform({
        platform: 'HackerRank',
        username: 'duplicate_handle'
      });
    } catch (e) {
      dupCaught = true;
    }
    assert(dupCaught, 'Duplicate platform connection rejected with clear validation error');

    // -----------------------------------------------------------
    // 3. MANUAL VERIFICATION UPDATE
    // -----------------------------------------------------------
    console.log('\n[3] Manual Verification Updates:');
    const updatedHR = await module3Service.updateManualVerification(newHR.id, {
      totalSolved: 40,
      easySolved: 28,
      mediumSolved: 12,
      hardSolved: 0,
      rating: 1480,
      badgeTitle: '5-Star Gold',
      proofUrl: 'https://devtrack.demo/proof/updated_hackerrank.png',
      manualNotes: 'Updated after solving 5 additional graph questions'
    });

    assert(updatedHR.statistics.problemStats.totalSolved === 40, 'Total solved updated to 40');
    assert(updatedHR.lastSyncedAt.includes('Manually verified'), 'Last synced reflects manual verification timestamp');

    // Disconnect platform
    await module3Service.disconnectPlatform(newHR.id);
    const profilesAfterDisconnect = await module3Service.getProfiles();
    assert(!profilesAfterDisconnect.some((p) => p.id === newHR.id), 'HackerRank disconnected cleanly');

    // -----------------------------------------------------------
    // 4. CODING GOALS CRUD
    // -----------------------------------------------------------
    console.log('\n[4] Coding Goals Management:');
    const goals = await module3Service.getGoals();
    assert(goals.length >= 3, `Found ${goals.length} initial coding goals`);

    const newGoal = await module3Service.addGoal({
      title: 'Solve 20 Dynamic Programming Questions',
      goalType: 'PROBLEMS_SOLVED',
      platform: 'LeetCode',
      targetValue: 20,
      currentValue: 12,
      timeframe: 'Monthly',
      deadline: '2026-10-31'
    });

    assert(newGoal && newGoal.id, `Created goal: "${newGoal.title}"`);
    assert(newGoal.status === 'ACTIVE', 'Goal is initially ACTIVE');

    // Complete goal by updating current value to target
    const completedGoal = await module3Service.updateGoal(newGoal.id, {
      currentValue: 20
    });
    assert(completedGoal.status === 'COMPLETED', 'Goal automatically transitions to COMPLETED when target is reached');

    // Delete goal
    await module3Service.deleteGoal(newGoal.id);
    const goalsAfterDelete = await module3Service.getGoals();
    assert(!goalsAfterDelete.some((g) => g.id === newGoal.id), 'Goal deleted successfully');

    // -----------------------------------------------------------
    // 5. CODING JOURNEY (TIMELINE) & FILTERING
    // -----------------------------------------------------------
    console.log('\n[5] Coding Journey Timeline:');
    const allActivities = await module3Service.getActivities('ALL');
    assert(allActivities.length >= 6, `Timeline contains ${allActivities.length} chronological activities`);

    const lcActivities = await module3Service.getActivities('LeetCode');
    assert(lcActivities.length >= 2, 'Filtered LeetCode activities count >= 2');
    assert(lcActivities.every((a) => a.platform === 'LeetCode'), 'All filtered activities belong to LeetCode');

    const ghActivities = await module3Service.getActivities('GitHub');
    assert(ghActivities.length >= 1, 'Filtered GitHub activities present');

    // -----------------------------------------------------------
    // 6. AGGREGATED CODING OVERVIEW METRICS
    // -----------------------------------------------------------
    console.log('\n[6] Aggregated Overview Metrics:');
    const overview = await module3Service.getCodingOverview();
    assert(overview.totalSolved >= 200, `Aggregated total solved is ${overview.totalSolved} (LC + CC + CF)`);
    assert(overview.easySolved > 0, `Aggregated easy solved: ${overview.easySolved}`);
    assert(overview.mediumSolved > 0, `Aggregated medium solved: ${overview.mediumSolved}`);
    assert(overview.hardSolved > 0, `Aggregated hard solved: ${overview.hardSolved}`);
    assert(overview.currentStreakDays >= 23, `Current active streak: ${overview.currentStreakDays} days`);
    assert(overview.longestStreakDays >= 45, `Longest streak: ${overview.longestStreakDays} days`);
    assert(overview.dailyTarget === 2 && overview.dailySolvedToday === 2, 'Daily target: 2 / 2 completed');

    // Reset back to pristine demo data for browser usage
    await module3Service.resetToDemoData();

    console.log('\n====================================================');
    console.log(`  MODULE 3 TESTS COMPLETE: ${passed} PASSED, ${failed} FAILED  `);
    console.log('====================================================');

    if (failed > 0) {
      process.exit(1);
    }
  } catch (err) {
    console.error('Fatal Test Error:', err);
    process.exit(1);
  }
}

runModule3Tests();
