package com.devtrack.module3_coding;

/**
 * ProblemStatistics entity encapsulating problem-solving metrics.
 * Demonstrates OOP Encapsulation.
 */
public class ProblemStatistics {
    private int totalSolved;
    private int easySolved;
    private int mediumSolved;
    private int hardSolved;
    private double acceptanceRate;

    public ProblemStatistics() {}

    public ProblemStatistics(int totalSolved, int easySolved, int mediumSolved, int hardSolved, double acceptanceRate) {
        this.totalSolved = totalSolved;
        this.easySolved = easySolved;
        this.mediumSolved = mediumSolved;
        this.hardSolved = hardSolved;
        this.acceptanceRate = acceptanceRate;
    }

    public ProblemStatistics(int easySolved, int mediumSolved, int hardSolved, double acceptanceRate) {
        this(easySolved + mediumSolved + hardSolved, easySolved, mediumSolved, hardSolved, acceptanceRate);
    }

    public int getTotalSolved() {
        return totalSolved > 0 ? totalSolved : (easySolved + mediumSolved + hardSolved);
    }

    public void setTotalSolved(int totalSolved) {
        this.totalSolved = totalSolved;
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

    public double getAcceptanceRate() {
        return acceptanceRate;
    }

    public void setAcceptanceRate(double acceptanceRate) {
        this.acceptanceRate = acceptanceRate;
    }
}
