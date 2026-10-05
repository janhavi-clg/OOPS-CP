package com.devtrack;

import com.devtrack.core.oop.TrackableEntity;
import com.devtrack.module5_achievements.*;
import com.devtrack.module6_resume.*;
import com.devtrack.module8_analytics.*;

import java.util.*;

/**
 * Automated test suite to verify Java OOP concepts, calculations, and services
 * across Modules 5, 6, and 8.
 */
public class VerifyAllModulesOOP {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("  VERIFYING MODULES 5, 6, 8 JAVA OOP ARCHITECTURE ");
        System.out.println("==================================================");

        int passed = 0;

        try {
            // ==========================================
            // MODULE 5: ACHIEVEMENTS & CERTIFICATES OOP
            // ==========================================

            // Test 1: Inheritance (HackathonAchievement extends Achievement extends TrackableEntity)
            HackathonAchievement hack = new HackathonAchievement(
                "ach_hack_01", "student_rahul_001", "Hack Celestial 3.0", "Devfolio",
                "https://hackcelestial.devfolio.co", "2024-03-22", "2024-03-24",
                "Winner", "1st Place Winner", "AeroMatrix",
                "Team Aero", "Rahul Sharma, Amit Patil", "Team Lead & AI Architect",
                "Built AeroMatrix AI trajectory optimizer",
                "https://certificates.devtrack.com/hackcelestial.pdf",
                Arrays.asList("Python", "PyTorch", "FastAPI")
            );
            check(hack instanceof Achievement, "HackathonAchievement inherits from Achievement");
            check(hack instanceof TrackableEntity, "HackathonAchievement inherits from TrackableEntity");
            check(hack.getAchievementCategory().equals("Hackathon Achievement"), "Hackathon category initialized");
            check(hack.getPlatform().equals("Devfolio"), "Hackathon platform encapsulation");
            System.out.println("✓ Test 1 Passed: Module 5 Inheritance & Polymorphic behavior");
            passed++;

            // Test 2: Certificate Encapsulation & Validation
            Certificate cert = new Certificate(
                "cert_01", "student_rahul_001", "Python for Data Science", "DeepLearning.AI / Coursera",
                "2024-03-10", "", "DL-PY-994821", "https://coursera.org/verify/DL-PY-994821",
                "https://storage.supabase.co/certs/cert_py.pdf", "PDF", "Python",
                "Data science specialization certificate.", true
            );
            check(cert.getCredentialUrl() != null && cert.getCredentialUrl().startsWith("http"), "Certificate credential URL encapsulation");
            check(cert.getRelatedSkill().equals("Python"), "Certificate related skill encapsulation");
            check(cert.isVerified(), "Certificate verification flag");
            System.out.println("✓ Test 2 Passed: Module 5 Certificate Encapsulation & Validation");
            passed++;

            // Test 3: AchievementService dynamic category activation
            AchievementService achService = new AchievementService();
            Set<String> activeCats = achService.getActiveCategories("student_rahul_001");
            check(activeCats.contains("Hackathon Achievement"), "Dynamic category activation contains active hackathons");
            check(!activeCats.contains("Publication"), "Unselected category (Publication) is NOT active");
            System.out.println("✓ Test 3 Passed: Module 5 Dynamic Category Activation Pattern");
            passed++;

            // ==========================================
            // MODULE 6: RESUME BUILDER & RECOMMENDATION OOP
            // ==========================================

            // Test 4: Resume Composition & Inheritance
            Resume resume = new Resume("res_test_01", "student_rahul_001", "Test SDE Resume", "modern");
            check(resume instanceof TrackableEntity, "Resume inherits from TrackableEntity");
            check(resume.getSections().size() >= 5, "Resume aggregates default modular sections");
            System.out.println("✓ Test 4 Passed: Module 6 Resume Composition & Inheritance");
            passed++;

            // Test 5: JobRoleAnalyzer Transparent Keyword Matching & Scoring
            JobRoleAnalyzer analyzer = new JobRoleAnalyzer();
            ResumeRecommendation rec = analyzer.analyzeMatch(
                "Machine Learning Intern",
                "Require PyTorch, Computer Vision, and Python experience",
                Arrays.asList("Python", "PyTorch", "Java", "SQL"),
                Collections.singletonList(Collections.singletonMap("title", "AeroMatrix AI Flight Optimizer")),
                Collections.singletonList(Collections.singletonMap("title", "Hack Celestial 3.0 Winner"))
            );
            check(rec.getMatchScore() > 0 && rec.getMatchScore() <= 100, "Profile match score bounded between 0 and 100");
            check(rec.getMatchedSkills().contains("Python"), "Matched skill identified (Python)");
            check(rec.getMatchedSkills().contains("PyTorch"), "Matched skill identified (PyTorch)");
            check(!rec.getMissingSkills().isEmpty(), "Missing skill gap identified");
            System.out.println("✓ Test 5 Passed: Module 6 Transparent Recommendation Scoring (Match Score: " + rec.getMatchScore() + "%)");
            passed++;

            // Test 6: ResumeService Seed & CRUD
            ResumeService resumeService = new ResumeService();
            List<Resume> rahulResumes = resumeService.getResumesByStudent("student_rahul_001");
            check(rahulResumes.size() >= 2, "Rahul pre-seeded with Software Developer Resume and AI/ML Resume");
            Resume sdeRes = rahulResumes.get(0);
            check(sdeRes.getProjects().size() >= 3, "SDE Resume aggregates 3 real DevTrack projects");
            check(sdeRes.getEducation().get(0).getInstitution().contains("PICT"), "Education aggregates PICT");
            System.out.println("✓ Test 6 Passed: Module 6 ResumeService Seed & Student Isolation");
            passed++;

            // ==========================================
            // MODULE 8: ANALYTICS & INSIGHTS OOP
            // ==========================================

            // Test 7: Project & Learning Analytics Mathematical Calculations
            ProjectAnalytics projAnalytics = new ProjectAnalytics(6, 4, 2, 3);
            check(Math.abs(projAnalytics.getCompletionRate() - 66.7) < 0.2, "Project completion rate: 4/6 * 100 = 66.7%");
            LearningAnalytics lrnAnalytics = new LearningAnalytics(18, 12, 21, 9);
            check(Math.abs(lrnAnalytics.getCompletionRate() - 66.7) < 0.2, "Learning resource rate: 12/18 * 100 = 66.7%");
            System.out.println("✓ Test 7 Passed: Module 8 Mathematical Formulas & Encapsulation");
            passed++;

            // Test 8: CodingAnalytics & Rahul Data Consistency
            CodingAnalytics coding = new CodingAnalytics(137, 68, 54, 15, 14, 2);
            check(coding.getProblemsSolved() == 137, "Accurate problems solved: 137");
            check(coding.getEasySolved() + coding.getMediumSolved() + coding.getHardSolved() == 137, "Difficulty breakdown sum equals 137");
            System.out.println("✓ Test 8 Passed: Module 8 Cross-Module Data Consistency (137 LeetCode problems)");
            passed++;

            // Test 9: AnalyticsService Aggregation & DevTrack Insights
            InsightService insService = new InsightService();
            RecommendationService recService = new RecommendationService();
            AnalyticsService analyticsService = new AnalyticsService(insService, recService);
            Analytics studentAnalytics = analyticsService.getStudentAnalytics("student_rahul_001", "month");
            check(studentAnalytics.getSkillAnalytics().getTopSkill().equals("Python"), "Top skill is Python");
            check(studentAnalytics.getTimeline().size() >= 6, "Development timeline aggregates multi-module events");
            check(!studentAnalytics.getInsights().isEmpty(), "Rule-based DevTrack insights generated");
            check(!studentAnalytics.getRecommendations().isEmpty(), "Actionable rule-based recommendations generated");
            System.out.println("✓ Test 9 Passed: Module 8 Cross-Module Analytics & Insights Engine");
            passed++;

            System.out.println("\n==================================================");
            System.out.println("  ALL " + passed + " JAVA OOP ARCHITECTURE TESTS PASSED SUCCESSFULLY!  ");
            System.out.println("==================================================");

        } catch (Throwable t) {
            System.err.println("\n❌ Test failure: " + t.getMessage());
            t.printStackTrace();
            System.exit(1);
        }
    }

    private static void check(boolean condition, String message) {
        if (!condition) {
            throw new AssertionError("FAILED: " + message);
        }
    }
}
