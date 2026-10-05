package com.devtrack.module2_skills;

import com.devtrack.core.oop.ProgressCalculable;
import com.devtrack.core.oop.TrackableEntity;

/**
 * TrackedSkill entity representing a skill chosen by a student to track and master.
 * Demonstrates OOP Inheritance (extends TrackableEntity), Polymorphism (implements ProgressCalculable),
 * and Encapsulation.
 */
public class TrackedSkill extends TrackableEntity implements ProgressCalculable {
    private String studentId;
    private String category; // Programming, Web Development, Core CS, AI / Machine Learning, Database, Tools
    private String currentLevel; // Beginner, Intermediate, Advanced, Expert
    private String targetLevel; // Beginner, Intermediate, Advanced, Expert
    private String status; // Active, In Progress, Mastered, Paused
    private boolean isCustom;
    private int targetProblemsCount; // Target problems for practice (default 30)
    private double calculatedProgress; // Cached overall progress % (0.0 to 100.0)
    private String lastActivity;

    public TrackedSkill() {
        super();
        this.currentLevel = "Beginner";
        this.targetLevel = "Advanced";
        this.status = "Active";
        this.targetProblemsCount = 30;
        this.calculatedProgress = 0.0;
        this.isCustom = false;
        this.category = "Programming";
    }

    public TrackedSkill(String id, String studentId, String name, String category,
                        String currentLevel, String targetLevel, String status,
                        boolean isCustom, int targetProblemsCount) {
        super(id, name);
        this.studentId = studentId;
        this.category = category != null ? category : "Programming";
        this.currentLevel = currentLevel != null ? currentLevel : "Beginner";
        this.targetLevel = targetLevel != null ? targetLevel : "Advanced";
        this.status = status != null ? status : "Active";
        this.isCustom = isCustom;
        this.targetProblemsCount = targetProblemsCount > 0 ? targetProblemsCount : 30;
        this.calculatedProgress = 0.0;
    }

    @Override
    public String getCategory() {
        return this.category;
    }

    public void setCategory(String category) {
        this.category = category;
        touch();
    }

    @Override
    public double calculateProgressPercentage() {
        return Math.min(100.0, Math.max(0.0, this.calculatedProgress));
    }

    @Override
    public String getProgressStatus() {
        if (calculatedProgress >= 85.0) return "Mastered";
        if (calculatedProgress >= 50.0) return "Intermediate";
        if (calculatedProgress > 0.0) return "In Progress";
        return "Not Started";
    }

    // Encapsulation: Getters and Setters
    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }

    public String getCurrentLevel() { return currentLevel; }
    public void setCurrentLevel(String currentLevel) { this.currentLevel = currentLevel; touch(); }

    public String getTargetLevel() { return targetLevel; }
    public void setTargetLevel(String targetLevel) { this.targetLevel = targetLevel; touch(); }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; touch(); }

    public boolean isCustom() { return isCustom; }
    public void setCustom(boolean custom) { isCustom = custom; }

    public int getTargetProblemsCount() { return targetProblemsCount; }
    public void setTargetProblemsCount(int targetProblemsCount) {
        this.targetProblemsCount = targetProblemsCount > 0 ? targetProblemsCount : 30;
        touch();
    }

    public double getCalculatedProgress() { return calculatedProgress; }
    public void setCalculatedProgress(double calculatedProgress) {
        this.calculatedProgress = Math.min(100.0, Math.max(0.0, calculatedProgress));
        touch();
    }

    public String getLastActivity() { return lastActivity; }
    public void setLastActivity(String lastActivity) { this.lastActivity = lastActivity; }
}
