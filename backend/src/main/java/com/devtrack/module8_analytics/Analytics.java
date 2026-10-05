package com.devtrack.module8_analytics;

import java.util.*;

/**
 * Main Analytics entity aggregating all module progress dimensions.
 * Demonstrates OOP Composition: aggregates SkillAnalytics, ProjectAnalytics, CodingAnalytics,
 * AchievementAnalytics, and LearningAnalytics.
 */
public class Analytics {
    private String studentId;
    private String timeRange; // "week", "month", "quarter", "year", "all"

    // Sub-analytics components (Composition)
    private SkillAnalytics skillAnalytics;
    private ProjectAnalytics projectAnalytics;
    private CodingAnalytics codingAnalytics;
    private AchievementAnalytics achievementAnalytics;
    private LearningAnalytics learningAnalytics;

    // Timeline, Insights, and Recommendations
    private List<DevelopmentActivity> timeline = new ArrayList<>();
    private List<DevTrackInsight> insights = new ArrayList<>();
    private List<Recommendation> recommendations = new ArrayList<>();

    // Time-based activity distributions
    private Map<String, Integer> weeklyActivity = new LinkedHashMap<>();
    private Map<String, Integer> activityDistribution = new LinkedHashMap<>();

    public Analytics() {
    }

    public Analytics(String studentId, String timeRange) {
        this.studentId = studentId;
        this.timeRange = timeRange;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getTimeRange() {
        return timeRange;
    }

    public void setTimeRange(String timeRange) {
        this.timeRange = timeRange;
    }

    public SkillAnalytics getSkillAnalytics() {
        return skillAnalytics;
    }

    public void setSkillAnalytics(SkillAnalytics skillAnalytics) {
        this.skillAnalytics = skillAnalytics;
    }

    public ProjectAnalytics getProjectAnalytics() {
        return projectAnalytics;
    }

    public void setProjectAnalytics(ProjectAnalytics projectAnalytics) {
        this.projectAnalytics = projectAnalytics;
    }

    public CodingAnalytics getCodingAnalytics() {
        return codingAnalytics;
    }

    public void setCodingAnalytics(CodingAnalytics codingAnalytics) {
        this.codingAnalytics = codingAnalytics;
    }

    public AchievementAnalytics getAchievementAnalytics() {
        return achievementAnalytics;
    }

    public void setAchievementAnalytics(AchievementAnalytics achievementAnalytics) {
        this.achievementAnalytics = achievementAnalytics;
    }

    public LearningAnalytics getLearningAnalytics() {
        return learningAnalytics;
    }

    public void setLearningAnalytics(LearningAnalytics learningAnalytics) {
        this.learningAnalytics = learningAnalytics;
    }

    public List<DevelopmentActivity> getTimeline() {
        return new ArrayList<>(timeline);
    }

    public void setTimeline(List<DevelopmentActivity> timeline) {
        this.timeline = timeline != null ? new ArrayList<>(timeline) : new ArrayList<>();
    }

    public List<DevTrackInsight> getInsights() {
        return new ArrayList<>(insights);
    }

    public void setInsights(List<DevTrackInsight> insights) {
        this.insights = insights != null ? new ArrayList<>(insights) : new ArrayList<>();
    }

    public List<Recommendation> getRecommendations() {
        return new ArrayList<>(recommendations);
    }

    public void setRecommendations(List<Recommendation> recommendations) {
        this.recommendations = recommendations != null ? new ArrayList<>(recommendations) : new ArrayList<>();
    }

    public Map<String, Integer> getWeeklyActivity() {
        return new LinkedHashMap<>(weeklyActivity);
    }

    public void setWeeklyActivity(Map<String, Integer> weeklyActivity) {
        this.weeklyActivity = weeklyActivity != null ? new LinkedHashMap<>(weeklyActivity) : new LinkedHashMap<>();
    }

    public Map<String, Integer> getActivityDistribution() {
        return new LinkedHashMap<>(activityDistribution);
    }

    public void setActivityDistribution(Map<String, Integer> activityDistribution) {
        this.activityDistribution = activityDistribution != null ? new LinkedHashMap<>(activityDistribution) : new LinkedHashMap<>();
    }
}
