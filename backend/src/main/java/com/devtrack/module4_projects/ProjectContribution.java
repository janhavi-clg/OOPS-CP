package com.devtrack.module4_projects;

/**
 * ProjectContribution encapsulates the student's personal role,
 * specific technical contributions, and team context within a project.
 * Important for Resume building and Placement interviews.
 */
public class ProjectContribution {
    private String role; // "Full Stack Developer", "Backend Developer", "AI/ML Engineer", "Team Lead", etc.
    private String contributionDetails;
    private int teamSize;

    public ProjectContribution() {
        this.role = "Solo Developer";
        this.contributionDetails = "";
        this.teamSize = 1;
    }

    public ProjectContribution(String role, String contributionDetails, int teamSize) {
        this.role = role != null && !role.trim().isEmpty() ? role.trim() : "Developer";
        this.contributionDetails = contributionDetails != null ? contributionDetails.trim() : "";
        this.teamSize = Math.max(1, teamSize);
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role != null && !role.trim().isEmpty() ? role.trim() : "Developer";
    }

    public String getContributionDetails() {
        return contributionDetails;
    }

    public void setContributionDetails(String contributionDetails) {
        this.contributionDetails = contributionDetails != null ? contributionDetails.trim() : "";
    }

    public int getTeamSize() {
        return teamSize;
    }

    public void setTeamSize(int teamSize) {
        this.teamSize = Math.max(1, teamSize);
    }

    public boolean isSolo() {
        return this.teamSize <= 1;
    }
}
