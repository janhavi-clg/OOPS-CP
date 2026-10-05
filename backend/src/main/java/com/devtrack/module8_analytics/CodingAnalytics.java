package com.devtrack.module8_analytics;

/**
 * CodingAnalytics encapsulates metrics derived from Module 3 coding profiles.
 * Reflects accurate Rahul baseline (137 solved: 68 Easy, 54 Medium, 15 Hard).
 */
public class CodingAnalytics {
    private int problemsSolved;
    private int easySolved;
    private int mediumSolved;
    private int hardSolved;
    private int codingStreakDays;
    private int platformsConnected;

    public CodingAnalytics() {
    }

    public CodingAnalytics(int problemsSolved, int easySolved, int mediumSolved, int hardSolved,
                           int codingStreakDays, int platformsConnected) {
        this.problemsSolved = problemsSolved;
        this.easySolved = easySolved;
        this.mediumSolved = mediumSolved;
        this.hardSolved = hardSolved;
        this.codingStreakDays = codingStreakDays;
        this.platformsConnected = platformsConnected;
    }

    public int getProblemsSolved() {
        return problemsSolved;
    }

    public void setProblemsSolved(int problemsSolved) {
        this.problemsSolved = problemsSolved;
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

    public int getCodingStreakDays() {
        return codingStreakDays;
    }

    public void setCodingStreakDays(int codingStreakDays) {
        this.codingStreakDays = codingStreakDays;
    }

    public int getPlatformsConnected() {
        return platformsConnected;
    }

    public void setPlatformsConnected(int platformsConnected) {
        this.platformsConnected = platformsConnected;
    }
}
