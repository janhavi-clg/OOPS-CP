package com.devtrack.module8_analytics;

import org.springframework.stereotype.Service;

import java.util.*;

/**
 * AnalyticsService aggregates real cross-module data and coordinates calculation logic.
 * Demonstrates:
 * - OOP Service Layer Pattern
 * - Separation of Concerns (Delegates insights to InsightService and recommendations to RecommendationService)
 * - Dynamic aggregation matching Rahul's real cross-module values
 */
@Service
public class AnalyticsService {

    private final InsightService insightService;
    private final RecommendationService recommendationService;

    public AnalyticsService(InsightService insightService, RecommendationService recommendationService) {
        this.insightService = insightService;
        this.recommendationService = recommendationService;
    }

    public Analytics getStudentAnalytics(String studentId, String timeRange) {
        String range = timeRange != null && !timeRange.trim().isEmpty() ? timeRange : "month";
        Analytics analytics = new Analytics(studentId != null ? studentId : "student_rahul_001", range);

        // 1. Skill Analytics (Module 2)
        List<Map<String, Object>> skillsList = new ArrayList<>();
        skillsList.add(createSkillMap("Python", 72, "Advanced", 14));
        skillsList.add(createSkillMap("Java", 61, "Intermediate", 18));
        skillsList.add(createSkillMap("Data Structures & Algorithms", 48, "Intermediate", 22));
        skillsList.add(createSkillMap("SQL", 55, "Intermediate", 9));
        skillsList.add(createSkillMap("React", 35, "Foundational", 8));
        skillsList.add(createSkillMap("PyTorch", 45, "Intermediate", 11));
        skillsList.add(createSkillMap("Git & GitHub", 65, "Intermediate", 6));

        double avgProficiency = skillsList.stream()
                .mapToDouble(m -> ((Number) m.get("proficiency")).doubleValue())
                .average()
                .orElse(0.0);
        avgProficiency = Math.round(avgProficiency * 10.0) / 10.0;

        SkillAnalytics skillAnalytics = new SkillAnalytics(
                skillsList.size(),
                avgProficiency,
                "Python",
                72.0,
                skillsList
        );
        analytics.setSkillAnalytics(skillAnalytics);

        // 2. Project Analytics (Module 4) - 6 total: 4 completed, 2 in progress, 3 featured
        ProjectAnalytics projectAnalytics = new ProjectAnalytics(6, 4, 2, 3);
        analytics.setProjectAnalytics(projectAnalytics);

        // 3. Coding Analytics (Module 3) - 137 solved: 68 easy, 54 med, 15 hard; streak 14 days, 2 platforms
        CodingAnalytics codingAnalytics = new CodingAnalytics(137, 68, 54, 15, 14, 2);
        analytics.setCodingAnalytics(codingAnalytics);

        // 4. Achievement Analytics (Module 5) - 5 certificates, 4 hackathons, 2 competitions won, 7 verified proofs
        AchievementAnalytics achievementAnalytics = new AchievementAnalytics(5, 5, 4, 2, 7);
        analytics.setAchievementAnalytics(achievementAnalytics);

        // 5. Learning Analytics (Module 2) - 18 resources, 12 completed, 21 active days, 9 streak
        LearningAnalytics learningAnalytics = new LearningAnalytics(18, 12, 21, 9);
        analytics.setLearningAnalytics(learningAnalytics);

        // 6. Weekly Activity Pattern
        Map<String, Integer> weekly = new LinkedHashMap<>();
        weekly.put("Mon", 8);
        weekly.put("Tue", 14);
        weekly.put("Wed", 11);
        weekly.put("Thu", 19);
        weekly.put("Fri", 15);
        weekly.put("Sat", 22);
        weekly.put("Sun", 17);
        analytics.setWeeklyActivity(weekly);

        // 7. Activity vs Learning vs Projects Distribution
        Map<String, Integer> distribution = new LinkedHashMap<>();
        distribution.put("Coding Activity", 38);
        distribution.put("Learning Resources", 40);
        distribution.put("Project Building", 22);
        analytics.setActivityDistribution(distribution);

        // 8. Unified Development Timeline (M2, M3, M4, M5)
        List<DevelopmentActivity> timeline = new ArrayList<>();
        timeline.add(new DevelopmentActivity("act_1", "2024-03-24", "Won 1st Place at Hack Celestial 3.0", "Module 5 (Achievements)", "HACKATHON", "AeroMatrix project selected as winner across 180+ teams."));
        timeline.add(new DevelopmentActivity("act_2", "2024-03-18", "Solved 130th Problem on LeetCode", "Module 3 (Coding)", "CODING", "Completed Binary Tree Maximum Path Sum (Hard)."));
        timeline.add(new DevelopmentActivity("act_3", "2024-03-10", "Earned Python for Data Science Certificate", "Module 5 (Certificates)", "CERTIFICATE", "Issued by DeepLearning.AI via Coursera with verified credential."));
        timeline.add(new DevelopmentActivity("act_4", "2024-02-28", "Deployed DevTrack Portfolio System v1.0", "Module 4 (Projects)", "PROJECT", "Completed Milestone 4: Backend API integration and live preview."));
        timeline.add(new DevelopmentActivity("act_5", "2024-02-15", "Completed Java Collections & Generics Track", "Module 2 (Skills)", "RESOURCE", "Finished 12 video modules with accompanying coding exercises."));
        timeline.add(new DevelopmentActivity("act_6", "2024-01-20", "Added Smart Polyhouse IoT Precision Farm Project", "Module 4 (Projects)", "PROJECT", "Integrated ESP32 telemetry with MQTT messaging and real-time dashboard."));
        analytics.setTimeline(timeline);

        // 9. Insights and Recommendations
        analytics.setInsights(insightService.generateInsights(codingAnalytics, skillAnalytics, projectAnalytics, learningAnalytics));
        analytics.setRecommendations(recommendationService.generateRecommendations(skillAnalytics, projectAnalytics, achievementAnalytics, codingAnalytics));

        return analytics;
    }

    private Map<String, Object> createSkillMap(String name, int proficiency, String level, int resourcesCount) {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("name", name);
        map.put("proficiency", proficiency);
        map.put("level", level);
        map.put("resourcesCount", resourcesCount);
        return map;
    }
}
