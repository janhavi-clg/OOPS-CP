package com.devtrack.module8_analytics;

/**
 * ProjectAnalytics encapsulates metrics derived from Module 4 project records.
 * Demonstrates:
 * - OOP Encapsulation
 * - Mathematical calculation: completionRate = (completed / total) * 100
 */
public class ProjectAnalytics {
    private int totalProjects;
    private int completedProjects;
    private int inProgressProjects;
    private int featuredProjects;
    private double completionRate; // percentage

    public ProjectAnalytics() {
    }

    public ProjectAnalytics(int totalProjects, int completedProjects, int inProgressProjects, int featuredProjects) {
        this.totalProjects = totalProjects;
        this.completedProjects = completedProjects;
        this.inProgressProjects = inProgressProjects;
        this.featuredProjects = featuredProjects;
        this.completionRate = totalProjects > 0 ? ((double) completedProjects / totalProjects) * 100.0 : 0.0;
    }

    public int getTotalProjects() {
        return totalProjects;
    }

    public void setTotalProjects(int totalProjects) {
        this.totalProjects = totalProjects;
        recalculateRate();
    }

    public int getCompletedProjects() {
        return completedProjects;
    }

    public void setCompletedProjects(int completedProjects) {
        this.completedProjects = completedProjects;
        recalculateRate();
    }

    public int getInProgressProjects() {
        return inProgressProjects;
    }

    public void setInProgressProjects(int inProgressProjects) {
        this.inProgressProjects = inProgressProjects;
    }

    public int getFeaturedProjects() {
        return featuredProjects;
    }

    public void setFeaturedProjects(int featuredProjects) {
        this.featuredProjects = featuredProjects;
    }

    public double getCompletionRate() {
        return completionRate;
    }

    public void setCompletionRate(double completionRate) {
        this.completionRate = completionRate;
    }

    private void recalculateRate() {
        if (this.totalProjects > 0) {
            this.completionRate = Math.round((((double) this.completedProjects / this.totalProjects) * 100.0) * 10.0) / 10.0;
        } else {
            this.completionRate = 0.0;
        }
    }
}
