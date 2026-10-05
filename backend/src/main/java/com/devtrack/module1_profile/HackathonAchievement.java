package com.devtrack.module1_profile;

/**
 * Entity representing an achievement or award won at a specific Hackathon.
 * Demonstrates Composition & Encapsulation.
 */
public class HackathonAchievement {
    private String id;
    private String hackathonId;
    private String title;
    private String position; // Winner, Runner-up, Finalist, Honorable Mention, Participant
    private String certificateUrl;
    private String prizeDetails;

    public HackathonAchievement() {}

    public HackathonAchievement(String id, String hackathonId, String title, String position, String certificateUrl, String prizeDetails) {
        this.id = id;
        this.hackathonId = hackathonId;
        this.title = title;
        this.position = position;
        this.certificateUrl = certificateUrl;
        this.prizeDetails = prizeDetails;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getHackathonId() { return hackathonId; }
    public void setHackathonId(String hackathonId) { this.hackathonId = hackathonId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getPosition() { return position; }
    public void setPosition(String position) { this.position = position; }

    public String getCertificateUrl() { return certificateUrl; }
    public void setCertificateUrl(String certificateUrl) { this.certificateUrl = certificateUrl; }

    public String getPrizeDetails() { return prizeDetails; }
    public void setPrizeDetails(String prizeDetails) { this.prizeDetails = prizeDetails; }
}
