package com.devtrack;

import com.devtrack.core.oop.ProgressCalculable;
import com.devtrack.core.oop.TrackableEntity;
import com.devtrack.module3_coding.*;

import java.util.Arrays;
import java.util.List;

/**
 * Automated test suite to verify Java OOP concepts, services, and sync orchestration for Module 3.
 */
public class VerifyModule3OOP {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("  RUNNING DEVTRACK MODULE 3 JAVA OOP VERIFICATION ");
        System.out.println("==================================================");

        int passed = 0;

        try {
            // Test 1: Inheritance & Polymorphism in CodingProfile
            CodingStatistics stats = new CodingStatistics(
                    new ProblemStatistics(137, 82, 48, 7, 65.0),
                    new ContestStatistics(1542, "~182,400", 12, "Knight", 18.2),
                    new StreakStatistics(23, 45, 85, 14, 38),
                    null
            );
            CodingProfile profile = new CodingProfile(
                    "cp_test", "stu_rahul_01", CodingPlatform.LEETCODE, "rahul_codes",
                    "https://leetcode.com/u/rahul_codes/", "DEMO", "CONNECTED",
                    "Today, 8:30 PM", null, "Demo Notes", stats
            );

            assert Condition(profile instanceof TrackableEntity, "CodingProfile inherits from TrackableEntity");
            assert Condition(profile instanceof ProgressCalculable, "CodingProfile implements ProgressCalculable");
            assert Condition(profile.calculateProgressPercentage() > 50.0, "ProgressCalculable computes realistic benchmark percentage");
            assert Condition(profile.getProgressStatus().equals("Active Problem Solver"), "Progress status derived appropriately");
            System.out.println("✓ Test 1 Passed: CodingProfile OOP Inheritance & Polymorphism");
            passed++;

            // Test 2: Composition in CodingStatistics
            assert Condition(profile.getStatistics() != null, "Composition: CodingProfile has CodingStatistics");
            assert Condition(profile.getStatistics().getProblemStats().getTotalSolved() == 137, "Composition: ProblemStatistics accessible");
            assert Condition(profile.getStatistics().getContestStats().getRating() == 1542, "Composition: ContestStatistics accessible");
            assert Condition(profile.getStatistics().getStreakStats().getCurrentStreakDays() == 23, "Composition: StreakStatistics accessible");
            System.out.println("✓ Test 2 Passed: CodingStatistics Aggregation & Composition");
            passed++;

            // Test 3: CodingPlatform Enum & API Availability
            assert Condition(CodingPlatform.LEETCODE.isOfficialApiAvailable(), "LeetCode official/wrapper integration marked available");
            assert Condition(CodingPlatform.GITHUB.isOfficialApiAvailable(), "GitHub official API marked available");
            assert Condition(CodingPlatform.CODEFORCES.isOfficialApiAvailable(), "Codeforces official API marked available");
            assert Condition(!CodingPlatform.CODECHEF.isOfficialApiAvailable(), "CodeChef requires manual verification (no open API)");
            assert Condition(!CodingPlatform.GEEKSFORGEEKS.isOfficialApiAvailable(), "GeeksforGeeks requires manual verification");
            System.out.println("✓ Test 3 Passed: CodingPlatform Enum Metadata & Transparent API Capabilities");
            passed++;

            // Test 4: CodingGoal Progress Calculation & Completion
            CodingGoal goal = new CodingGoal("goal_t", "stu_rahul_01", "Solve 100 Problems", "PROBLEMS_SOLVED", "All Platforms", 100, 64, "Monthly", "2026-10-31", "ACTIVE");
            assert Condition(goal.calculateProgressPercentage() == 64.0, "CodingGoal calculates accurate percentage (64%)");
            assert Condition(goal.getProgressStatus().equals("Halfway There"), "Goal status shows 'Halfway There'");
            goal.setCurrentValue(100);
            assert Condition(goal.calculateProgressPercentage() == 100.0, "Goal reaches 100%");
            assert Condition("COMPLETED".equalsIgnoreCase(goal.getStatus()), "Goal automatically marks as COMPLETED");
            System.out.println("✓ Test 4 Passed: CodingGoal Polymorphic Progress & Automatic State Updates");
            passed++;

            // Test 5: Strategy Pattern in PlatformSyncService
            GitHubPlatformService ghService = new GitHubPlatformService();
            CodeforcesPlatformService cfService = new CodeforcesPlatformService();
            LeetCodePlatformService lcService = new LeetCodePlatformService();

            PlatformSyncService syncService = new PlatformSyncService(Arrays.asList(ghService, cfService, lcService));
            assert Condition(syncService.isPlatformSyncSupported(CodingPlatform.GITHUB), "GitHub sync supported by PlatformSyncService");
            assert Condition(syncService.isPlatformSyncSupported(CodingPlatform.CODEFORCES), "Codeforces sync supported");
            assert Condition(!syncService.isPlatformSyncSupported(CodingPlatform.CODECHEF), "CodeChef unsupported for auto-sync");
            System.out.println("✓ Test 5 Passed: Strategy Pattern in PlatformSyncService");
            passed++;

            // Test 6: CodingProfileService CRUD & User Isolation
            CodingProfileService profileService = new CodingProfileService(syncService);
            List<CodingProfile> rahulProfiles = profileService.getProfiles("stu_rahul_01");
            assert Condition(rahulProfiles.size() == 4, "Rahul has 4 pre-populated coding profiles (LeetCode, GitHub, CodeChef, Codeforces)");

            // Duplicate connection prevention
            boolean dupCaught = false;
            try {
                CodingProfile dup = new CodingProfile("dup_1", "stu_rahul_01", CodingPlatform.LEETCODE, "duplicate_user", "", "DEMO", "CONNECTED", "", "", "", null);
                profileService.addProfile("stu_rahul_01", dup);
            } catch (IllegalArgumentException e) {
                dupCaught = true;
            }
            assert Condition(dupCaught, "Duplicate platform connection rejected with clear validation error");

            // Manual verification update
            CodingProfile ccProfile = rahulProfiles.stream().filter(p -> p.getPlatform() == CodingPlatform.CODECHEF).findFirst().get();
            assert Condition("MANUAL".equals(ccProfile.getSourceType()), "CodeChef profile marked as MANUAL");
            assert Condition(ccProfile.getProofUrl() != null, "Proof URL stored for manual verification");
            System.out.println("✓ Test 6 Passed: CodingProfileService CRUD, Validation & Manual Fallback");
            passed++;

            // Test 7: CodingGoalService & CodingActivityService
            CodingGoalService goalService = new CodingGoalService();
            List<CodingGoal> goals = goalService.getGoals("stu_rahul_01");
            assert Condition(goals.size() >= 3, "Rahul has pre-populated coding goals");

            CodingActivityService activityService = new CodingActivityService();
            List<CodingActivity> activities = activityService.getActivities("stu_rahul_01");
            assert Condition(activities.size() >= 5, "Rahul has chronological Coding Journey activities");
            List<CodingActivity> leetcodeActivities = activityService.getActivitiesByPlatform("stu_rahul_01", "LeetCode");
            assert Condition(leetcodeActivities.size() >= 2, "Platform filtering works for activity timeline");
            System.out.println("✓ Test 7 Passed: CodingGoalService & CodingActivityService Timeline Filtering");
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
