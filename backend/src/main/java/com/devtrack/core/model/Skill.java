package com.devtrack.core.model;

import com.devtrack.core.oop.ProgressCalculable;
import com.devtrack.core.oop.TrackableEntity;

/**
 * Skill entity demonstrating Inheritance (extends TrackableEntity)
 * and Polymorphism (implements ProgressCalculable).
 */
public class Skill extends TrackableEntity implements ProgressCalculable {
    private String category;
    private double proficiencyScore; // 0 to 100
    private String level; // Beginner, Intermediate, Advanced
    private String status; // Learning, In Progress, Mastered
    private int practiceHours;

    public Skill() {
        super();
    }

    public Skill(String id, String name, String category, double proficiencyScore, String level, String status, int practiceHours) {
        super(id, name);
        this.category = category;
        this.proficiencyScore = proficiencyScore;
        this.level = level;
        this.status = status;
        this.practiceHours = practiceHours;
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
        return Math.min(100.0, Math.max(0.0, this.proficiencyScore));
    }

    @Override
    public String getProgressStatus() {
        if (proficiencyScore >= 80.0) return "Mastered";
        if (proficiencyScore >= 50.0) return "Intermediate";
        return "Learning";
    }

    public double getProficiencyScore() {
        return proficiencyScore;
    }

    public void setProficiencyScore(double proficiencyScore) {
        this.proficiencyScore = proficiencyScore;
        touch();
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
        touch();
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
        touch();
    }

    public int getPracticeHours() {
        return practiceHours;
    }

    public void setPracticeHours(int practiceHours) {
        this.practiceHours = practiceHours;
        touch();
    }
}
