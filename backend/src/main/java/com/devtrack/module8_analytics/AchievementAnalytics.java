package com.devtrack.module8_analytics;

/**
 * AchievementAnalytics encapsulates metrics from Module 5 (Achievements, Certificates, Hackathons).
 */
public class AchievementAnalytics {
    private int totalAchievements;
    private int totalCertificates;
    private int hackathonsCount;
    private int competitionsCount;
    private int verifiedProofsCount;

    public AchievementAnalytics() {
    }

    public AchievementAnalytics(int totalAchievements, int totalCertificates, int hackathonsCount,
                                int competitionsCount, int verifiedProofsCount) {
        this.totalAchievements = totalAchievements;
        this.totalCertificates = totalCertificates;
        this.hackathonsCount = hackathonsCount;
        this.competitionsCount = competitionsCount;
        this.verifiedProofsCount = verifiedProofsCount;
    }

    public int getTotalAchievements() {
        return totalAchievements;
    }

    public void setTotalAchievements(int totalAchievements) {
        this.totalAchievements = totalAchievements;
    }

    public int getTotalCertificates() {
        return totalCertificates;
    }

    public void setTotalCertificates(int totalCertificates) {
        this.totalCertificates = totalCertificates;
    }

    public int getHackathonsCount() {
        return hackathonsCount;
    }

    public void setHackathonsCount(int hackathonsCount) {
        this.hackathonsCount = hackathonsCount;
    }

    public int getCompetitionsCount() {
        return competitionsCount;
    }

    public void setCompetitionsCount(int competitionsCount) {
        this.competitionsCount = competitionsCount;
    }

    public int getVerifiedProofsCount() {
        return verifiedProofsCount;
    }

    public void setVerifiedProofsCount(int verifiedProofsCount) {
        this.verifiedProofsCount = verifiedProofsCount;
    }
}
