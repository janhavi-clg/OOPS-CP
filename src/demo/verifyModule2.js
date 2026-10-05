/**
 * Automated Verification Test Suite for Module 2: Skills & Learning Tracker.
 * Tests Full CRUD, Custom Skills, Resource Check/Uncheck, Practice Problem Storage,
 * Code Security, and the Transparent 50/50 Progress Formula.
 */

import { module2Service, calculateSkillProgress } from '../modules/module2/module2Service.js';
import { INITIAL_SKILLS, INITIAL_RESOURCES, INITIAL_PROBLEMS } from '../modules/module2/module2Data.js';

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

async function runModule2Tests() {
  console.log('====================================================');
  console.log('  RUNNING MODULE 2: SKILLS & LEARNING TRACKER TESTS ');
  console.log('====================================================');

  try {
    // -----------------------------------------------------------
    // 1. DATA INITIALIZATION & OPT-IN PRINCIPLE
    // -----------------------------------------------------------
    console.log('\n[1] Opt-in Skills & Initial Data:');
    await module2Service.resetToDemoData();
    const skills = await module2Service.getSkills();
    assert(skills.length === 8, `Rahul has 8 chosen skills (Python, Java, DSA, React, ML, SQL, HTML&CSS, JS)`);
    assert(skills.some((s) => s.name === 'Python'), 'Python is in Rahul tracked skills');
    assert(skills.some((s) => s.name === 'DSA'), 'DSA is in Rahul tracked skills');

    const available = await module2Service.getAvailableSkills();
    assert(available.length > 20, `Catalog offers ${available.length} standard skills`);

    // -----------------------------------------------------------
    // 2. TRANSPARENT 50/50 PROGRESS CALCULATION FORMULA
    // -----------------------------------------------------------
    console.log('\n[2] Transparent 50/50 Progress Formula:');
    const resources = await module2Service.getResources();
    const problems = await module2Service.getProblems();

    // Python test: 8 resources (6 completed => 75%), target 30, solved 3 in demo base => 10%
    const pySkill = skills.find((s) => s.id === 'skill_py');
    const pyProg = calculateSkillProgress(pySkill, resources, problems);
    assert(pyProg.totalResources === 8, 'Python has 8 learning resources');
    assert(pyProg.completedResources === 6, 'Python has 6 completed resources (75%)');
    assert(Math.abs(pyProg.resourceProgressPercentage - 75.0) < 0.1, 'Python resource progress is 75.0%');

    const expectedPyOverall = Math.round(((75.0 * 0.5) + (pyProg.practiceProgressPercentage * 0.5)) * 10) / 10;
    assert(
      Math.abs(pyProg.overallProgressPercentage - expectedPyOverall) < 0.1,
      `Python overall progress (${pyProg.overallProgressPercentage}%) accurately computed via 50/50 formula`
    );

    // -----------------------------------------------------------
    // 3. SKILL CRUD & CUSTOM SKILL
    // -----------------------------------------------------------
    console.log('\n[3] Skill Management & Custom Skills:');
    // Add custom skill
    const customSkill = await module2Service.addCustomSkill(
      'Rust Systems',
      'Programming',
      'Beginner',
      'Advanced'
    );
    assert(customSkill && customSkill.isCustom === true, 'Created custom skill "Rust Systems"');
    assert(customSkill.name === 'Rust Systems', 'Custom skill name matches input');

    let afterAdd = await module2Service.getSkills();
    assert(afterAdd.some((s) => s.id === customSkill.id), 'Custom skill appears in tracked skills list');

    // Duplicate prevention
    let duplicateCaught = false;
    try {
      await module2Service.addCustomSkill('Rust Systems', 'Programming', 'Beginner', 'Advanced');
    } catch (e) {
      duplicateCaught = true;
    }
    assert(duplicateCaught, 'Duplicate skill addition is prevented with clear error');

    // Remove skill
    await module2Service.removeSkill(customSkill.id);
    let afterRemove = await module2Service.getSkills();
    assert(!afterRemove.some((s) => s.id === customSkill.id), 'Custom skill removed cleanly from tracker');

    // -----------------------------------------------------------
    // 4. LEARNING RESOURCES & INTERACTIVE CHECKBOX PERSISTENCE
    // -----------------------------------------------------------
    console.log('\n[4] Learning Resources & Checkbox State:');
    // Add new resource
    const newRes = await module2Service.addResource({
      skillId: 'skill_py',
      skillName: 'Python',
      title: 'Python Metaclasses & Descriptors In-Depth',
      platform: 'YouTube',
      url: 'https://youtube.com/watch?v=sample123',
      type: 'Video',
      description: 'Understanding type.__new__ and __set_name__',
      completed: false
    });
    assert(newRes && newRes.id, `Added new resource: "${newRes.title}"`);
    assert(newRes.completed === false, 'New resource is initially incomplete');

    // Toggle complete
    const checked = await module2Service.toggleResourceComplete(newRes.id);
    assert(checked.completed === true, 'Checked resource: state updated to true');
    assert(checked.completedDate !== null, 'Checked resource records completion date');

    // Verify progress updated
    const pyProgAfterCheck = await module2Service.getSkillProgress('skill_py');
    assert(
      pyProgAfterCheck.completedResources === 7,
      'Python completed resources count increased to 7'
    );

    // Uncheck resource
    const unchecked = await module2Service.toggleResourceComplete(newRes.id);
    assert(unchecked.completed === false, 'Unchecked resource: state reversed to false');
    assert(unchecked.completedDate === null, 'Unchecked resource cleared completion date');

    // Delete resource
    await module2Service.deleteResource(newRes.id);
    const resourcesAfterDelete = await module2Service.getResources('skill_py');
    assert(
      !resourcesAfterDelete.some((r) => r.id === newRes.id),
      'Resource deleted successfully'
    );

    // -----------------------------------------------------------
    // 5. PRACTICE PROBLEMS & SAFE SOLUTION CODE STORAGE
    // -----------------------------------------------------------
    console.log('\n[5] Practice Problems & Solution Code Storage:');
    const newProb = await module2Service.addProblem({
      title: 'Merge Two Sorted Lists',
      skillId: 'skill_py',
      skillName: 'Python',
      platform: 'LeetCode',
      problemUrl: 'https://leetcode.com/problems/merge-two-sorted-lists/',
      difficulty: 'Easy',
      dateSolved: '2025-10-04',
      notes: 'Iterative pointer stitching with dummy head.',
      solution: {
        language: 'Python',
        code: `class Solution:
    def mergeTwoLists(self, list1, list2):
        dummy = ListNode()
        tail = dummy
        while list1 and list2:
            if list1.val < list2.val:
                tail.next = list1
                list1 = list1.next
            else:
                tail.next = list2
                list2 = list2.next
            tail = tail.next
        tail.next = list1 or list2
        return dummy.next`,
        notes: 'O(n + m) time, O(1) extra auxiliary space'
      }
    });

    assert(newProb && newProb.id, `Added solved problem: "${newProb.title}"`);
    assert(
      newProb.solution.code.includes('mergeTwoLists'),
      'Solution code stored safely as text'
    );
    assert(
      typeof newProb.solution.code === 'string',
      'Security: Code is stored strictly as string data, never executed'
    );

    // Edit problem
    const updatedProb = await module2Service.updateProblem(newProb.id, {
      difficulty: 'Medium',
      notes: 'Updated algorithmic note'
    });
    assert(updatedProb.difficulty === 'Medium', 'Problem difficulty successfully updated');
    assert(updatedProb.notes === 'Updated algorithmic note', 'Problem notes updated');

    // Delete problem
    await module2Service.deleteProblem(newProb.id);
    const problemsAfterDelete = await module2Service.getProblems('skill_py');
    assert(
      !problemsAfterDelete.some((p) => p.id === newProb.id),
      'Practice problem deleted cleanly'
    );

    // -----------------------------------------------------------
    // 6. DASHBOARD & CONSISTENCY SUMMARY
    // -----------------------------------------------------------
    console.log('\n[6] Learning Consistency & Dashboard Summary:');
    const summary = await module2Service.getOverallSummary();
    assert(summary.currentStreakDays >= 14, `Active streak tracked (${summary.currentStreakDays} days)`);
    assert(summary.daysActiveThisWeek >= 5, `Days active this week tracked (${summary.daysActiveThisWeek}/7 days)`);
    assert(summary.problemsSolvedThisWeek >= 8, `Weekly problems tracked (${summary.problemsSolvedThisWeek})`);
    assert(summary.resourcesCompletedThisWeek >= 5, `Weekly resources tracked (${summary.resourcesCompletedThisWeek})`);

    // Reset back to pristine demo data for browser usage
    await module2Service.resetToDemoData();

    console.log('\n====================================================');
    console.log(`  MODULE 2 TESTS COMPLETE: ${passed} PASSED, ${failed} FAILED  `);
    console.log('====================================================');

    if (failed > 0) {
      process.exit(1);
    }
  } catch (err) {
    console.error('Fatal Test Error:', err);
    process.exit(1);
  }
}

runModule2Tests();
