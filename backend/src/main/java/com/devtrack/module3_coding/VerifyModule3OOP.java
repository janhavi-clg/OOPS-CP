package com.devtrack.module3_coding;

import java.util.List;

/**
 * Verification test suite for Module 3 Java OOP architecture.
 * Demonstrates:
 * 1. Encapsulation (Private fields with validated getters/setters)
 * 2. Inheritance (CodingProfile, CodingGoal, CodingActivity extend TrackableEntity)
 * 3. Composition (CodingProfile has CodingStatistics, which contains ProblemStatistics, ContestStatistics, StreakStatistics, GitHubStatistics)
 * 4. Abstraction & Interfaces (CodingPlatformService, ProgressCalculable)
 * 5. Polymorphism (Multiple platform service implementations, ProgressCalculable on Profiles and Goals)
 */
public class VerifyModule3OOP {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("  RUNNING DEVTRACK MODULE 3 JAVA OOP TEST SUITE   ");
        System.out.println("==================================================");

        int passed = 0;
        int failed = 0;

        // TEST 1: Encapsulation & Composition
        try {
            ProblemStatistics ps = new ProblemStatistics(137, 82, 48, 7, 54.2);
            ContestStatistics cs = new ContestStatistics(1542, "42,100", 8, "Knight", 18.0);
            StreakStatistics ss = new StreakStatistics(23, 45, 112, 18, 45);
            CodingStatistics stats = new CodingStatistics(ps, cs, ss, null);

            CodingProfile profile = new CodingProfile(
                "cp-1", "student-rahul", CodingPlatform.LEETCODE,
                "rahul123", "https://leetcode.com/u/rahul123/",
                "DEMO", "CONNECTED", "Today, 08:30 PM", null, "Demo profile", stats
            );

            if (profile.getPlatform() != CodingPlatform.LEETCODE) throw new AssertionError();
            if (profile.getStatistics().getProblemStats().getTotalSolved() != 137) throw new AssertionError();
            if (profile.getStatistics().getContestStats().getRating() != 1542) throw new AssertionError();
            if (profile.getStatistics().getStreakStats().getCurrentStreakDays() != 23) throw new AssertionError();
            System.out.println("[PASS] Encapsulation & Composite Object Hierarchy verified");
            passed++;
        } catch (Throwable e) {
            System.out.println("[FAIL] Test 1: " + e.getMessage());
            e.printStackTrace();
            failed++;
        }

        // TEST 2: ProgressCalculable Polymorphism (CodingProfile & CodingGoal)
        try {
            ProblemStatistics ps = new ProblemStatistics(100, 50, 40, 10, 60.0);
            CodingStatistics stats = new CodingStatistics(ps, null, null, null);
            CodingProfile profile = new CodingProfile(
                "cp-test", "student-rahul", CodingPlatform.LEETCODE,
                "rahul", "https://leetcode.com/u/rahul", "LIVE", "CONNECTED",
                "Today", null, null, stats
            );

            CodingGoal goal = new CodingGoal(
                "cg-1", "student-rahul",
                "Solve 200 LeetCode Problems", "PROBLEMS_SOLVED",
                "LeetCode", 200, 150, "Monthly", "2026-11-30", "ACTIVE"
            );

            // Polymorphic interface method call:
            double profileProgress = profile.calculateProgressPercentage(); // 100 / 250 = 40.0%
            double goalProgress = goal.calculateProgressPercentage(); // 150 / 200 = 75.0%

            if (profileProgress != 40.0) throw new AssertionError("Expected 40.0 but got " + profileProgress);
            if (goalProgress != 75.0) throw new AssertionError("Expected 75.0 but got " + goalProgress);
            System.out.println("[PASS] Polymorphism: ProgressCalculable shared across Profile & Goal");
            passed++;
        } catch (Throwable e) {
            System.out.println("[FAIL] Test 2: " + e.getMessage());
            e.printStackTrace();
            failed++;
        }

        // TEST 3: CodingPlatformService Strategy Implementations
        try {
            PlatformSyncService syncService = new PlatformSyncService(
                List.of(new GitHubPlatformService(), new CodeforcesPlatformService(), new LeetCodePlatformService())
            );

            if (!syncService.isPlatformSyncSupported(CodingPlatform.GITHUB)) throw new AssertionError("GitHub should be supported");
            if (!syncService.isPlatformSyncSupported(CodingPlatform.CODEFORCES)) throw new AssertionError("Codeforces should be supported");
            if (!syncService.isPlatformSyncSupported(CodingPlatform.LEETCODE)) throw new AssertionError("LeetCode should be supported");
            if (syncService.isPlatformSyncSupported(CodingPlatform.CODECHEF)) throw new AssertionError("CodeChef must use manual verification");
            if (syncService.isPlatformSyncSupported(CodingPlatform.GEEKSFORGEEKS)) throw new AssertionError("GFG must use manual verification");
            System.out.println("[PASS] Platform Strategy Pattern & Supported API Discovery verified");
            passed++;
        } catch (Throwable e) {
            System.out.println("[FAIL] Test 3: " + e.getMessage());
            e.printStackTrace();
            failed++;
        }

        // TEST 4: CodingProfileService CRUD & Student Isolation
        try {
            PlatformSyncService syncService = new PlatformSyncService(
                List.of(new GitHubPlatformService(), new CodeforcesPlatformService(), new LeetCodePlatformService())
            );
            CodingProfileService profileService = new CodingProfileService(syncService);
            List<CodingProfile> rahulProfiles = profileService.getProfiles("stu_rahul_01");
            if (rahulProfiles.size() != 4) throw new AssertionError("Rahul must have 4 initial demo profiles");

            CodingProfile ccProfile = rahulProfiles.stream()
                .filter(p -> p.getPlatform() == CodingPlatform.CODECHEF)
                .findFirst().orElseThrow();
            if (!"MANUAL".equals(ccProfile.getSourceType())) throw new AssertionError("CodeChef must be marked MANUAL");
            if (ccProfile.getProofUrl() == null) throw new AssertionError("Manual profile must contain proof reference");

            // Add manual profile for HackerRank
            CodingStatistics hrStats = new CodingStatistics(
                new ProblemStatistics(35, 20, 12, 3, 62.0),
                null, null, null
            );
            CodingProfile hrProfile = new CodingProfile(
                "cp_hr_custom", "stu_rahul_01", CodingPlatform.HACKERRANK,
                "rahul_hr", "https://hackerrank.com/profile/rahul_hr",
                "MANUAL", "CONNECTED", "Added manually",
                "https://proof.devtrack.internal/hr.png", "Manual proof verified", hrStats
            );
            profileService.addProfile("stu_rahul_01", hrProfile);

            if (hrProfile.getStatistics().getProblemStats().getTotalSolved() != 35) throw new AssertionError();
            if (!"MANUAL".equals(hrProfile.getSourceType())) throw new AssertionError();

            // Disconnect profile
            boolean removed = profileService.removeProfile("stu_rahul_01", hrProfile.getId());
            if (!removed) throw new AssertionError("Disconnect must succeed");
            if (profileService.getProfiles("stu_rahul_01").size() != 4) throw new AssertionError();

            System.out.println("[PASS] CodingProfileService CRUD & Data Source Integrity verified");
            passed++;
        } catch (Throwable e) {
            System.out.println("[FAIL] Test 4: " + e.getMessage());
            e.printStackTrace();
            failed++;
        }

        // TEST 5: CodingGoalService Progress & State Lifecycle
        try {
            CodingGoalService goalService = new CodingGoalService();
            List<CodingGoal> goals = goalService.getGoals("stu_rahul_01");
            if (goals.size() != 3) throw new AssertionError("Rahul has 3 initial goals");

            CodingGoal newGoal = new CodingGoal(
                "goal_test", "stu_rahul_01", "Solve 50 Graphs Problems",
                "PROBLEMS_SOLVED", "LeetCode", 50, 45, "Monthly", "2026-10-31", "ACTIVE"
            );
            goalService.addGoal("stu_rahul_01", newGoal);
            if (!"ACTIVE".equals(newGoal.getStatus())) throw new AssertionError();

            // Increment progress past target
            newGoal.setCurrentValue(50);
            if (!"COMPLETED".equals(newGoal.getStatus())) throw new AssertionError("Goal should auto-complete");

            goalService.deleteGoal("stu_rahul_01", newGoal.getId());
            if (goalService.getGoals("stu_rahul_01").size() != 3) throw new AssertionError();

            System.out.println("[PASS] CodingGoalService Lifecycle & Auto-completion verified");
            passed++;
        } catch (Throwable e) {
            System.out.println("[FAIL] Test 5: " + e.getMessage());
            e.printStackTrace();
            failed++;
        }

        // TEST 6: CodingActivityService & Coding Journey Timeline
        try {
            CodingActivityService activityService = new CodingActivityService();
            List<CodingActivity> activities = activityService.getActivities("stu_rahul_01");
            if (activities.size() != 6) throw new AssertionError("Expected 6 initial journey entries");

            List<CodingActivity> lcOnly = activityService.getActivitiesByPlatform("stu_rahul_01", "LeetCode");
            if (lcOnly.isEmpty()) throw new AssertionError();
            for (CodingActivity act : lcOnly) {
                if (!act.getPlatform().equalsIgnoreCase("LeetCode")) throw new AssertionError();
            }

            System.out.println("[PASS] CodingActivityService & Journey Timeline filtering verified");
            passed++;
        } catch (Throwable e) {
            System.out.println("[FAIL] Test 6: " + e.getMessage());
            e.printStackTrace();
            failed++;
        }

        // TEST 7: Student Data Isolation
        try {
            PlatformSyncService syncService = new PlatformSyncService(
                List.of(new GitHubPlatformService(), new CodeforcesPlatformService(), new LeetCodePlatformService())
            );
            CodingProfileService profileService = new CodingProfileService(syncService);
            List<CodingProfile> otherStudentProfiles = profileService.getProfiles("student-unknown-999");
            if (!otherStudentProfiles.isEmpty()) throw new AssertionError("Unknown student should have zero profiles");

            CodingGoalService goalService = new CodingGoalService();
            if (!goalService.getGoals("student-unknown-999").isEmpty()) throw new AssertionError();

            System.out.println("[PASS] Student Data Isolation verified");
            passed++;
        } catch (Throwable e) {
            System.out.println("[FAIL] Test 7: " + e.getMessage());
            e.printStackTrace();
            failed++;
        }

        System.out.println("==================================================");
        System.out.printf("  OOP VERIFICATION SUMMARY: %d PASSED, %d FAILED  \n", passed, failed);
        System.out.println("==================================================");

        if (failed > 0) {
            System.exit(1);
        }
    }
}
