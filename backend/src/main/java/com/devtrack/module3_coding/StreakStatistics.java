package com.devtrack.module3_coding;

/**
 * StreakStatistics entity encapsulating consistency metrics, active days, and streak counts.
 * Demonstrates OOP Encapsulation.
 */
public class StreakStatistics {
    private int currentStreakDays;
    private int longestStreakDays;
    private int activeDaysThisYear;
    private int solvedThisWeek;
    private int solvedThisMonth;

    public StreakStatistics() {}

    public StreakStatistics(int currentStreakDays, int longestStreakDays, int activeDaysThisYear, int solvedThisWeek, int solvedThisMonth) {
        this.currentStreakDays = currentStreakDays;
        this.longestStreakDays = longestStreakDays;
        this.activeDaysThisYear = activeDaysThisYear;
        this.solvedThisWeek = solvedThisWeek;
        this.solvedThisMonth = solvedThisMonth;
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

    public int getActiveDaysThisYear() {
        return activeDaysThisYear;
    }

    public void setActiveDaysThisYear(int activeDaysThisYear) {
        this.activeDaysThisYear = activeDaysThisYear;
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
}
