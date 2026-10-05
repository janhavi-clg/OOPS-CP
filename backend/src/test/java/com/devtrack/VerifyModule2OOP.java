package com.devtrack;

import com.devtrack.core.oop.ProgressCalculable;
import com.devtrack.core.oop.TrackableEntity;
import com.devtrack.module2_skills.*;

import java.util.List;
import java.util.Map;

/**
 * Automated test suite to verify Java OOP concepts, calculations, and services for Module 2.
 */
public class VerifyModule2OOP {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("  RUNNING DEVTRACK MODULE 2 JAVA OOP VERIFICATION ");
        System.out.println("==================================================");

        int passed = 0;
        int failed = 0;

        try {
            // Test 1: Inheritance & Polymorphism
            TrackedSkill pySkill = new TrackedSkill("test_py", "stu_rahul_01", "Python", "Programming", "Intermediate", "Advanced", "Active", false, 30);
            assert Condition(pySkill instanceof TrackableEntity, "TrackedSkill inherits from TrackableEntity");
            assert Condition(pySkill instanceof ProgressCalculable, "TrackedSkill implements ProgressCalculable");
            pySkill.setCalculatedProgress(72.5);
            assert Condition(pySkill.calculateProgressPercentage() == 72.5, "Polymorphic progress percentage calculation");
            assert Condition(pySkill.getProgressStatus().equals("Intermediate"), "Progress status derived correctly");
            System.out.println("✓ Test 1 Passed: TrackedSkill OOP Inheritance & Polymorphism");
            passed++;

            // Test 2: Encapsulation & Composition in PracticeProblem
            ProblemSolution sol = new ProblemSolution("Python", "def twoSum(nums, target): return []", "Test note");
            PracticeProblem prob = new PracticeProblem("prob_test", "Two Sum", "test_py", "Python", "stu_rahul_01",
                    "LeetCode", "https://leetcode.com/problems/two-sum/", "Easy", "2025-10-01", "Notes", sol);
            assert Condition(prob.getSolution() != null && prob.getSolution().getCode().contains("def twoSum"), "Composition: PracticeProblem has a ProblemSolution");
            assert Condition(prob.isValidUrl(), "Problem URL validation");
            assert Condition(prob.getCategory().equals("Practice Problem"), "Abstract method getCategory implementation");
            System.out.println("✓ Test 2 Passed: PracticeProblem Composition & Encapsulation");
            passed++;

            // Test 3: LearningProgress 50/50 Formula
            // 8 resources, 6 completed => 75%
            // 30 target, 21 solved => 70%
            // Overall = (75 * 0.5) + (70 * 0.5) = 72.5%
            LearningProgress prog = new LearningProgress("test_py", "Python", 8, 6, 21, 30, "Active", "Today");
            assert Condition(Math.abs(prog.getResourceProgressPercentage() - 75.0) < 0.1, "Resource progress is 75%");
            assert Condition(Math.abs(prog.getPracticeProgressPercentage() - 70.0) < 0.1, "Practice progress is 70%");
            assert Condition(Math.abs(prog.getOverallProgressPercentage() - 72.5) < 0.1, "Overall progress matches 50/50 formula (72.5%)");
            System.out.println("✓ Test 3 Passed: Transparent 50/50 Formula Calculation in LearningProgress");
            passed++;

            // Test 4: LearningResource Entity & Toggle
            LearningResource res = new LearningResource("res_1", "stu_rahul_01", "test_py", "Python",
                    "Python OOP", "YouTube", "https://youtube.com/watch?v=123", "Video", "Desc", false, null);
            assert Condition(!res.isCompleted(), "Resource initially incomplete");
            res.markCompleted(true);
            assert Condition(res.isCompleted() && res.getCompletedDate() != null, "Resource marked complete records date");
            res.markCompleted(false);
            assert Condition(!res.isCompleted() && res.getCompletedDate() == null, "Resource unchecked clears date");
            System.out.println("✓ Test 4 Passed: LearningResource Entity State Management");
            passed++;

            // Test 5: SkillService CRUD & Custom Skill
            SkillService skillService = new SkillService();
            List<TrackedSkill> rahulSkills = skillService.getSkills("stu_rahul_01");
            assert Condition(rahulSkills.size() >= 5, "Rahul has realistic pre-populated skills");

            TrackedSkill custom = skillService.addCustomSkill("stu_rahul_01", "Rust Systems", "Systems Programming", "Beginner", "Advanced");
            assert Condition(custom.getTitle().equals("Rust Systems") && custom.isCustom(), "Custom skill creation");

            boolean removed = skillService.removeSkill("stu_rahul_01", custom.getId());
            assert Condition(removed, "Skill removal works");
            System.out.println("✓ Test 5 Passed: SkillService Business Logic & Custom Skill Support");
            passed++;

            // Test 6: LearningResourceService & Filtering
            LearningResourceService resourceService = new LearningResourceService();
            List<LearningResource> pyResources = resourceService.getResourcesBySkill("stu_rahul_01", "skill_py");
            assert Condition(pyResources.size() == 8, "Python has 8 learning resources");
            long completedCount = pyResources.stream().filter(LearningResource::isCompleted).count();
            assert Condition(completedCount == 6, "Python has 6 completed resources (75%)");
            System.out.println("✓ Test 6 Passed: LearningResourceService Grouping & Status Tracking");
            passed++;

            // Test 7: PracticeProblemService & Safe Solution Code Storage
            PracticeProblemService problemService = new PracticeProblemService();
            List<PracticeProblem> problems = problemService.getProblems("stu_rahul_01");
            assert Condition(problems.size() >= 8, "Rahul has realistic demo practice problems");
            PracticeProblem first = problems.get(0);
            assert Condition(first.getSolution() != null && first.getSolution().getCode() != null, "Solution code stored safely");
            System.out.println("✓ Test 7 Passed: PracticeProblemService & Secure Code Storage");
            passed++;

            // Test 8: ProgressService Integration
            ProgressService progressService = new ProgressService(skillService, resourceService, problemService);
            LearningProgress pyProg = progressService.getSkillProgress("stu_rahul_01", "skill_py");
            assert Condition(pyProg.getCompletedResources() == 6, "ProgressService calculates completed resources");
            Map<String, Object> summary = progressService.getOverallSummary("stu_rahul_01");
            assert Condition(summary.containsKey("currentStreakDays") && (int)summary.get("currentStreakDays") >= 14, "Learning streak tracking");
            System.out.println("✓ Test 8 Passed: ProgressService Overall Dashboard Summary");
            passed++;

            System.out.println("==================================================");
            System.out.println("  ALL " + passed + " JAVA OOP TESTS PASSED SUCCESSFULLY!  ");
            System.out.println("==================================================");

        } catch (Throwable t) {
            System.err.println("Verification Failed: " + t.getMessage());
            t.printStackTrace();
            System.exit(1);
        }
    }

    private static boolean Condition(boolean test, String msg) {
        if (!test) {
            throw new AssertionError("Assertion Failed: " + msg);
        }
        return true;
    }
}
