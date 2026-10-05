package com.devtrack.module1_profile;

import com.devtrack.core.oop.TrackableEntity;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

/**
 * Hackathon entity in Module 1 demonstrating Inheritance, Encapsulation,
 * and Business Logic methods for date tracking and countdowns.
 */
public class Module1Hackathon extends TrackableEntity {
    private String studentId;
    private String platform;
    private String url;
    private String startDate;            // Format: YYYY-MM-DD
    private String endDate;              // Format: YYYY-MM-DD
    private String registrationDeadline; // Format: YYYY-MM-DD
    private String submissionDeadline;   // Format: YYYY-MM-DD
    private String resultDate;           // Format: YYYY-MM-DD
    private String status;               // Upcoming, Registered, Ongoing, Completed, Participated, Won, Runner-up, Finalist
    private String teamName;
    private int teamSize;
    private String achievement;
    private String description;
    private String notes;
    private HackathonAchievement awardDetails;

    public Module1Hackathon() {
        super();
        this.status = "Upcoming";
        this.teamSize = 1;
    }

    public Module1Hackathon(String id, String studentId, String name, String platform, String url,
                            String startDate, String endDate, String registrationDeadline,
                            String submissionDeadline, String resultDate, String status,
                            String teamName, int teamSize, String achievement,
                            String description, String notes) {
        super(id, name);
        this.studentId = studentId;
        this.platform = platform;
        this.url = url;
        this.startDate = startDate;
        this.endDate = endDate;
        this.registrationDeadline = registrationDeadline;
        this.submissionDeadline = submissionDeadline;
        this.resultDate = resultDate;
        this.status = status;
        this.teamName = teamName;
        this.teamSize = teamSize;
        this.achievement = achievement;
        this.description = description;
        this.notes = notes;
    }

    @Override
    public String getCategory() {
        return "Hackathon";
    }

    /**
     * Calculates the dynamic countdown badge text based on reference date.
     */
    public String calculateCountdown(LocalDate today) {
        if ("Won".equalsIgnoreCase(status) || "Completed".equalsIgnoreCase(status) ||
            "Runner-up".equalsIgnoreCase(status) || "Finalist".equalsIgnoreCase(status) ||
            "Participated".equalsIgnoreCase(status)) {
            return "Ended";
        }

        try {
            if (startDate != null && !startDate.trim().isEmpty()) {
                LocalDate start = LocalDate.parse(startDate.trim());
                if (today.isBefore(start)) {
                    long days = ChronoUnit.DAYS.between(today, start);
                    return days == 1 ? "Starts tomorrow" : "Starts in " + days + " days";
                }
            }

            if (submissionDeadline != null && !submissionDeadline.trim().isEmpty()) {
                LocalDate sub = LocalDate.parse(submissionDeadline.trim());
                if (!today.isAfter(sub)) {
                    long days = ChronoUnit.DAYS.between(today, sub);
                    return days == 0 ? "Submission due today" : "Submission in " + days + " days";
                }
            }

            if (endDate != null && !endDate.trim().isEmpty()) {
                LocalDate end = LocalDate.parse(endDate.trim());
                if (!today.isAfter(end)) {
                    return "Ongoing Now";
                }
            }
        } catch (Exception e) {
            // Graceful fallback for non-standard date formats
            return "Scheduled";
        }

        return "Ended";
    }

    public boolean isValidUrl() {
        if (url == null || url.trim().isEmpty()) return false;
        String trimmed = url.trim().toLowerCase();
        return trimmed.startsWith("http://") || trimmed.startsWith("https://");
    }

    // Getters and Setters
    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }

    public String getPlatform() { return platform; }
    public void setPlatform(String platform) { this.platform = platform; touch(); }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; touch(); }

    public String getStartDate() { return startDate; }
    public void setStartDate(String startDate) { this.startDate = startDate; touch(); }

    public String getEndDate() { return endDate; }
    public void setEndDate(String endDate) { this.endDate = endDate; touch(); }

    public String getRegistrationDeadline() { return registrationDeadline; }
    public void setRegistrationDeadline(String registrationDeadline) { this.registrationDeadline = registrationDeadline; touch(); }

    public String getSubmissionDeadline() { return submissionDeadline; }
    public void setSubmissionDeadline(String submissionDeadline) { this.submissionDeadline = submissionDeadline; touch(); }

    public String getResultDate() { return resultDate; }
    public void setResultDate(String resultDate) { this.resultDate = resultDate; touch(); }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; touch(); }

    public String getTeamName() { return teamName; }
    public void setTeamName(String teamName) { this.teamName = teamName; touch(); }

    public int getTeamSize() { return teamSize; }
    public void setTeamSize(int teamSize) { this.teamSize = teamSize; touch(); }

    public String getAchievement() { return achievement; }
    public void setAchievement(String achievement) { this.achievement = achievement; touch(); }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; touch(); }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; touch(); }

    public HackathonAchievement getAwardDetails() { return awardDetails; }
    public void setAwardDetails(HackathonAchievement awardDetails) { this.awardDetails = awardDetails; touch(); }
}
