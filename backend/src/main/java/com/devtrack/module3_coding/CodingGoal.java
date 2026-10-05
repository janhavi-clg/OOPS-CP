package com.devtrack.module3_coding;

import com.devtrack.core.oop.ProgressCalculable;
import com.devtrack.core.oop.TrackableEntity;

/**
 * CodingGoal entity representing student-defined targets (e.g. solve 100 problems this month, 2 problems/day).
 * Demonstrates OOP Inheritance and Polymorphism.
 */
public class CodingGoal extends TrackableEntity implements ProgressCalculable {
    private String studentId;
    private String goalType; // "PROBLEMS_SOLVED", "DAILY_TARGET", "STREAK_DAYS", "CONTEST_RATING"
    private String platform; // "All Platforms", "LeetCode", "CodeChef", "Codeforces", "GitHub"
    private int targetValue;
    private int currentValue;
    private String timeframe; // "Daily", "Weekly", "Monthly", "Semester"
    private String deadline; // YYYY-MM-DD
    private String status; // "ACTIVE", "COMPLETED", "PAUSED"

    public CodingGoal() {
        super();
        this.status = "ACTIVE";
        this.goalType = "PROBLEMS_SOLVED";
        this.timeframe = "Monthly";
    }

    public CodingGoal(String id, String studentId, String title, String goalType,
                      String platform, int targetValue, int currentValue,
                      String timeframe, String deadline, String status) {
        super(id, title);
        this.studentId = studentId;
        this.goalType = goalType;
        this.platform = platform != null ? platform : "All Platforms";
        this.targetValue = targetValue > 0 ? targetValue : 10;
        this.currentValue = currentValue;
        this.timeframe = timeframe != null ? timeframe : "Monthly";
        this.deadline = deadline;
        this.status = status != null ? status : "ACTIVE";
    }

    @Override
    public String getCategory() {
        return "Coding Goal: " + goalType;
    }

    @Override
    public double calculateProgressPercentage() {
        if (targetValue <= 0) return 0.0;
        double pct = ((double) currentValue / targetValue) * 100.0;
        return Math.min(100.0, Math.max(0.0, Math.round(pct * 10.0) / 10.0));
    }

    @Override
    public String getProgressStatus() {
        double pct = calculateProgressPercentage();
        if (pct >= 100.0) return "Achieved";
        if (pct >= 50.0) return "Halfway There";
        return "In Progress";
    }

    // Encapsulation Getters and Setters
    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getGoalType() {
        return goalType;
    }

    public void setGoalType(String goalType) {
        this.goalType = goalType;
        touch();
    }

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(String platform) {
        this.platform = platform;
        touch();
    }

    public int getTargetValue() {
        return targetValue;
    }

    public void setTargetValue(int targetValue) {
        this.targetValue = targetValue > 0 ? targetValue : 1;
        touch();
    }

    public int getCurrentValue() {
        return currentValue;
    }

    public void setCurrentValue(int currentValue) {
        this.currentValue = currentValue;
        if (this.currentValue >= this.targetValue) {
            this.status = "COMPLETED";
        }
        touch();
    }

    public String getTimeframe() {
        return timeframe;
    }

    public void setTimeframe(String timeframe) {
        this.timeframe = timeframe;
        touch();
    }

    public String getDeadline() {
        return deadline;
    }

    public void setDeadline(String deadline) {
        this.deadline = deadline;
        touch();
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
        touch();
    }
}
