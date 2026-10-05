package com.devtrack.core.model;

import com.devtrack.core.oop.ProgressCalculable;

/**
 * Coding profile representing competitive programming metrics (e.g., LeetCode).
 * Demonstrates Encapsulation, business logic methods, and ProgressCalculable implementation.
 */
public class CodingProfile implements ProgressCalculable {
    private String platform;
    private String username;
    private int easySolved;
    private int mediumSolved;
    private int hardSolved;
    private int currentStreakDays;
    private int longestStreakDays;
    private int solvedThisWeek;
    private int solvedThisMonth;
    private int targetQuestions;

    public CodingProfile() {
        this.platform = "LeetCode";
        this.targetQuestions = 250;
    }

    public CodingProfile(String username, int easySolved, int mediumSolved, int hardSolved,
                         int currentStreakDays, int longestStreakDays,
                         int solvedThisWeek, int solvedThisMonth, int targetQuestions) {
        this.platform = "LeetCode";
        this.username = username;
        this.easySolved = easySolved;
        this.mediumSolved = mediumSolved;
        this.hardSolved = hardSolved;
        this.currentStreakDays = currentStreakDays;
        this.longestStreakDays = longestStreakDays;
        this.solvedThisWeek = solvedThisWeek;
        this.solvedThisMonth = solvedThisMonth;
        this.targetQuestions = targetQuestions;
    }

    public int getTotalSolved() {
        return easySolved + mediumSolved + hardSolved;
    }

    @Override
    public double calculateProgressPercentage() {
        if (targetQuestions <= 0) return 0.0;
        double pct = ((double) getTotalSolved() / targetQuestions) * 100.0;
        return Math.min(100.0, Math.round(pct * 10.0) / 10.0);
    }

    @Override
    public String getProgressStatus() {
        int total = getTotalSolved();
        if (total >= 200) return "Advanced Competitor";
        if (total >= 100) return "Active Problem Solver";
        return "Beginner Coder";
    }

    // Getters and Setters
    public String getPlatform() {
        return platform;
    }

    public void setPlatform(String platform) {
        this.platform = platform;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getEasySolved() {
        return easySolved;
    }

    public void setEasySolved(int easySolved) {
        this.easySolved = easySolved;
    }

    public int getMediumSolved() {
        return mediumSolved;
    }

    public void setMediumSolved(int mediumSolved) {
        this.mediumSolved = mediumSolved;
    }

    public int getHardSolved() {
        return hardSolved;
    }

    public void setHardSolved(int hardSolved) {
        this.hardSolved = hardSolved;
    }

    public int getCurrentStreakDays() {
        return currentStreakDays;
    }

    public void setCurrentStreakDays(int currentStreakDays) {
        this.currentStreakDays = currentStreakDays;
    }

    public int getLongestStreakDays() {
        return longestStreakDays;
    }

    public void setLongestStreakDays(int longestStreakDays) {
        this.longestStreakDays = longestStreakDays;
    }

    public int getSolvedThisWeek() {
        return solvedThisWeek;
    }

    public void setSolvedThisWeek(int solvedThisWeek) {
        this.solvedThisWeek = solvedThisWeek;
    }

    public int getSolvedThisMonth() {
        return solvedThisMonth;
    }

    public void setSolvedThisMonth(int solvedThisMonth) {
        this.solvedThisMonth = solvedThisMonth;
    }

    public int getTargetQuestions() {
        return targetQuestions;
    }

    public void setTargetQuestions(int targetQuestions) {
        this.targetQuestions = targetQuestions;
    }
}
