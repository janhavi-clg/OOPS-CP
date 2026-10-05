package com.devtrack.module6_resume;

import java.util.ArrayList;
import java.util.List;

/**
 * JobRole represents a target employment role (e.g. SDE, ML Intern, Data Analyst)
 * with associated skill benchmarks and keywords. Demonstrates OOP Encapsulation.
 */
public class JobRole {
    private String roleKey;
    private String title;
    private String category;
    private String sampleJobDescription;
    private List<String> requiredSkills = new ArrayList<>();
    private List<String> preferredSkills = new ArrayList<>();
    private List<String> relevantProjectKeywords = new ArrayList<>();
    private List<String> relevantAchievementKeywords = new ArrayList<>();

    public JobRole() {
    }

    public JobRole(String roleKey, String title, String category, String sampleJobDescription,
                   List<String> requiredSkills, List<String> preferredSkills,
                   List<String> relevantProjectKeywords, List<String> relevantAchievementKeywords) {
        this.roleKey = roleKey;
        this.title = title;
        this.category = category;
        this.sampleJobDescription = sampleJobDescription;
        if (requiredSkills != null) {
            this.requiredSkills = new ArrayList<>(requiredSkills);
        }
        if (preferredSkills != null) {
            this.preferredSkills = new ArrayList<>(preferredSkills);
        }
        if (relevantProjectKeywords != null) {
            this.relevantProjectKeywords = new ArrayList<>(relevantProjectKeywords);
        }
        if (relevantAchievementKeywords != null) {
            this.relevantAchievementKeywords = new ArrayList<>(relevantAchievementKeywords);
        }
    }

    public String getRoleKey() {
        return roleKey;
    }

    public void setRoleKey(String roleKey) {
        this.roleKey = roleKey;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getSampleJobDescription() {
        return sampleJobDescription;
    }

    public void setSampleJobDescription(String sampleJobDescription) {
        this.sampleJobDescription = sampleJobDescription;
    }

    public List<String> getRequiredSkills() {
        return new ArrayList<>(requiredSkills);
    }

    public void setRequiredSkills(List<String> requiredSkills) {
        this.requiredSkills = requiredSkills != null ? new ArrayList<>(requiredSkills) : new ArrayList<>();
    }

    public List<String> getPreferredSkills() {
        return new ArrayList<>(preferredSkills);
    }

    public void setPreferredSkills(List<String> preferredSkills) {
        this.preferredSkills = preferredSkills != null ? new ArrayList<>(preferredSkills) : new ArrayList<>();
    }

    public List<String> getRelevantProjectKeywords() {
        return new ArrayList<>(relevantProjectKeywords);
    }

    public void setRelevantProjectKeywords(List<String> relevantProjectKeywords) {
        this.relevantProjectKeywords = relevantProjectKeywords != null ? new ArrayList<>(relevantProjectKeywords) : new ArrayList<>();
    }

    public List<String> getRelevantAchievementKeywords() {
        return new ArrayList<>(relevantAchievementKeywords);
    }

    public void setRelevantAchievementKeywords(List<String> relevantAchievementKeywords) {
        this.relevantAchievementKeywords = relevantAchievementKeywords != null ? new ArrayList<>(relevantAchievementKeywords) : new ArrayList<>();
    }
}
