package com.devtrack.module3_coding;

/**
 * ContestStatistics entity encapsulating competitive programming contest ratings and ranks.
 * Demonstrates OOP Encapsulation.
 */
public class ContestStatistics {
    private int rating;
    private String globalRanking;
    private int contestsAttended;
    private String badgeTitle;
    private double topPercentage;

    public ContestStatistics() {}

    public ContestStatistics(int rating, String globalRanking, int contestsAttended, String badgeTitle, double topPercentage) {
        this.rating = rating;
        this.globalRanking = globalRanking;
        this.contestsAttended = contestsAttended;
        this.badgeTitle = badgeTitle;
        this.topPercentage = topPercentage;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getGlobalRanking() {
        return globalRanking;
    }

    public void setGlobalRanking(String globalRanking) {
        this.globalRanking = globalRanking;
    }

    public int getContestsAttended() {
        return contestsAttended;
    }

    public void setContestsAttended(int contestsAttended) {
        this.contestsAttended = contestsAttended;
    }

    public String getBadgeTitle() {
        return badgeTitle;
    }

    public void setBadgeTitle(String badgeTitle) {
        this.badgeTitle = badgeTitle;
    }

    public double getTopPercentage() {
        return topPercentage;
    }

    public void setTopPercentage(double topPercentage) {
        this.topPercentage = topPercentage;
    }
}
