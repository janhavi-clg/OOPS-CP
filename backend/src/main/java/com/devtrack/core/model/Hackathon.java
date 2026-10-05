package com.devtrack.core.model;

import com.devtrack.core.oop.TrackableEntity;

/**
 * Hackathon entity extending TrackableEntity.
 */
public class Hackathon extends TrackableEntity {
    private String platform;
    private String status; // Upcoming, Participated, Winner, Finalist
    private String startDate;
    private String endDate;
    private String projectSubmitted;
    private String outcome;
    private String eventUrl;

    public Hackathon() {
        super();
    }

    public Hackathon(String id, String title, String platform, String status, String startDate, String endDate, String projectSubmitted, String outcome, String eventUrl) {
        super(id, title);
        this.platform = platform;
        this.status = status;
        this.startDate = startDate;
        this.endDate = endDate;
        this.projectSubmitted = projectSubmitted;
        this.outcome = outcome;
        this.eventUrl = eventUrl;
    }

    @Override
    public String getCategory() {
        return "Hackathon & Competition";
    }

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(String platform) {
        this.platform = platform;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
        touch();
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getProjectSubmitted() {
        return projectSubmitted;
    }

    public void setProjectSubmitted(String projectSubmitted) {
        this.projectSubmitted = projectSubmitted;
    }

    public String getOutcome() {
        return outcome;
    }

    public void setOutcome(String outcome) {
        this.outcome = outcome;
    }

    public String getEventUrl() {
        return eventUrl;
    }

    public void setEventUrl(String eventUrl) {
        this.eventUrl = eventUrl;
    }
}
