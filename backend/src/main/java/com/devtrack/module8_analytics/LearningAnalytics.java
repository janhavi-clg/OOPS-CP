package com.devtrack.module8_analytics;

/**
 * LearningAnalytics encapsulates metrics from Module 2 learning resources and sessions.
 * Demonstrates mathematical calculation: completionRate = (completed / total) * 100
 */
public class LearningAnalytics {
    private int totalResources;
    private int completedResources;
    private double completionRate;
    private int activeDays;
    private int learningStreakDays;

    public LearningAnalytics() {
    }

    public LearningAnalytics(int totalResources, int completedResources, int activeDays, int learningStreakDays) {
        this.totalResources = totalResources;
        this.completedResources = completedResources;
        this.activeDays = activeDays;
        this.learningStreakDays = learningStreakDays;
        this.completionRate = totalResources > 0 ? Math.round((((double) completedResources / totalResources) * 100.0) * 10.0) / 10.0 : 0.0;
    }

    public int getTotalResources() {
        return totalResources;
    }

    public void setTotalResources(int totalResources) {
        this.totalResources = totalResources;
        recalculate();
    }

    public int getCompletedResources() {
        return completedResources;
    }

    public void setCompletedResources(int completedResources) {
        this.completedResources = completedResources;
        recalculate();
    }

    public double getCompletionRate() {
        return completionRate;
    }

    public void setCompletionRate(double completionRate) {
        this.completionRate = completionRate;
    }

    public int getActiveDays() {
        return activeDays;
    }

    public void setActiveDays(int activeDays) {
        this.activeDays = activeDays;
    }

    public int getLearningStreakDays() {
        return learningStreakDays;
    }

    public void setLearningStreakDays(int learningStreakDays) {
        this.learningStreakDays = learningStreakDays;
    }

    private void recalculate() {
        if (this.totalResources > 0) {
            this.completionRate = Math.round((((double) this.completedResources / this.totalResources) * 100.0) * 10.0) / 10.0;
        } else {
            this.completionRate = 0.0;
        }
    }
}
