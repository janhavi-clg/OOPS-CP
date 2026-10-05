package com.devtrack.module5_achievements;

import java.util.List;

/**
 * HackathonAchievement extends Achievement, demonstrating OOP Inheritance and Specialization.
 * Represents competitive hackathon outcomes (Unstop, Devfolio, MLH, etc.).
 */
public class HackathonAchievement extends Achievement {
    private String platform; // "Unstop", "Devfolio", "MLH", "College Event", "Other"
    private String hackathonUrl;
    private String startDate;
    private String endDate;
    private String participationStatus; // "Participated", "Finalist", "Top 10", "Winner", "Runner-up", "Special Mention", "Other"
    private String positionAward;
    private String projectSubmitted;

    public HackathonAchievement() {
        super();
        setAchievementCategory("Hackathon Achievement");
        this.platform = "Devfolio";
        this.participationStatus = "Participated";
    }

    public HackathonAchievement(String id, String studentId, String title, String platform,
                                String hackathonUrl, String startDate, String endDate,
                                String participationStatus, String positionAward, String projectSubmitted,
                                String teamName, String teamMembers, String role, String description,
                                String proofUrl, List<String> relatedSkills) {
        super(id, studentId, title, "Hackathon Achievement", platform, endDate, description, role, teamName, teamMembers, proofUrl, relatedSkills);
        this.platform = platform != null ? platform : "Devfolio";
        this.hackathonUrl = hackathonUrl;
        this.startDate = startDate;
        this.endDate = endDate;
        this.participationStatus = participationStatus != null ? participationStatus : "Participated";
        this.positionAward = positionAward != null ? positionAward : "";
        this.projectSubmitted = projectSubmitted != null ? projectSubmitted : "";
    }

    @Override
    public String getCategory() {
        return "Hackathon: " + platform + " (" + participationStatus + ")";
    }

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(String platform) {
        this.platform = platform;
        touch();
    }

    public String getHackathonUrl() {
        return hackathonUrl;
    }

    public void setHackathonUrl(String hackathonUrl) {
        this.hackathonUrl = hackathonUrl;
        touch();
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
        touch();
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
        touch();
    }

    public String getParticipationStatus() {
        return participationStatus;
    }

    public void setParticipationStatus(String participationStatus) {
        this.participationStatus = participationStatus;
        touch();
    }

    public String getPositionAward() {
        return positionAward;
    }

    public void setPositionAward(String positionAward) {
        this.positionAward = positionAward;
        touch();
    }

    public String getProjectSubmitted() {
        return projectSubmitted;
    }

    public void setProjectSubmitted(String projectSubmitted) {
        this.projectSubmitted = projectSubmitted;
        touch();
    }
}
