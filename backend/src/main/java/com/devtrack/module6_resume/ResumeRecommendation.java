package com.devtrack.module6_resume;

import java.util.ArrayList;
import java.util.List;

/**
 * ResumeRecommendation holds the transparent match analysis between a target job
 * and the student's existing DevTrack profile (skills, projects, achievements).
 * Demonstrates OOP Encapsulation and Data Transfer Object pattern.
 */
public class ResumeRecommendation {
    private String targetRole;
    private int matchScore; // 0 to 100 percentage
    private List<String> matchedSkills = new ArrayList<>();
    private List<String> missingSkills = new ArrayList<>();
    private List<String> recommendedSkills = new ArrayList<>();
    private List<String> recommendedProjectIds = new ArrayList<>();
    private List<String> recommendedAchievementIds = new ArrayList<>();
    private List<String> feedbackPoints = new ArrayList<>();
    private int skillsScore;
    private int projectsScore;
    private int achievementsScore;

    public ResumeRecommendation() {
    }

    public ResumeRecommendation(String targetRole, int matchScore) {
        this.targetRole = targetRole;
        this.matchScore = matchScore;
    }

    public String getTargetRole() {
        return targetRole;
    }

    public void setTargetRole(String targetRole) {
        this.targetRole = targetRole;
    }

    public int getMatchScore() {
        return matchScore;
    }

    public void setMatchScore(int matchScore) {
        this.matchScore = matchScore;
    }

    public List<String> getMatchedSkills() {
        return new ArrayList<>(matchedSkills);
    }

    public void setMatchedSkills(List<String> matchedSkills) {
        this.matchedSkills = matchedSkills != null ? new ArrayList<>(matchedSkills) : new ArrayList<>();
    }

    public List<String> getMissingSkills() {
        return new ArrayList<>(missingSkills);
    }

    public void setMissingSkills(List<String> missingSkills) {
        this.missingSkills = missingSkills != null ? new ArrayList<>(missingSkills) : new ArrayList<>();
    }

    public List<String> getRecommendedSkills() {
        return new ArrayList<>(recommendedSkills);
    }

    public void setRecommendedSkills(List<String> recommendedSkills) {
        this.recommendedSkills = recommendedSkills != null ? new ArrayList<>(recommendedSkills) : new ArrayList<>();
    }

    public List<String> getRecommendedProjectIds() {
        return new ArrayList<>(recommendedProjectIds);
    }

    public void setRecommendedProjectIds(List<String> recommendedProjectIds) {
        this.recommendedProjectIds = recommendedProjectIds != null ? new ArrayList<>(recommendedProjectIds) : new ArrayList<>();
    }

    public List<String> getRecommendedAchievementIds() {
        return new ArrayList<>(recommendedAchievementIds);
    }

    public void setRecommendedAchievementIds(List<String> recommendedAchievementIds) {
        this.recommendedAchievementIds = recommendedAchievementIds != null ? new ArrayList<>(recommendedAchievementIds) : new ArrayList<>();
    }

    public List<String> getFeedbackPoints() {
        return new ArrayList<>(feedbackPoints);
    }

    public void setFeedbackPoints(List<String> feedbackPoints) {
        this.feedbackPoints = feedbackPoints != null ? new ArrayList<>(feedbackPoints) : new ArrayList<>();
    }

    public int getSkillsScore() {
        return skillsScore;
    }

    public void setSkillsScore(int skillsScore) {
        this.skillsScore = skillsScore;
    }

    public int getProjectsScore() {
        return projectsScore;
    }

    public void setProjectsScore(int projectsScore) {
        this.projectsScore = projectsScore;
    }

    public int getAchievementsScore() {
        return achievementsScore;
    }

    public void setAchievementsScore(int achievementsScore) {
        this.achievementsScore = achievementsScore;
    }
}
