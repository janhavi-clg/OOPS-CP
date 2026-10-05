package com.devtrack.core.model;

import com.devtrack.core.oop.TrackableEntity;

/**
 * Achievement entity extending TrackableEntity.
 */
public class Achievement extends TrackableEntity {
    private String description;
    private String organization;
    private String dateAwarded;
    private String badgeType; // Gold, Silver, Special Recognition

    public Achievement() {
        super();
    }

    public Achievement(String id, String title, String description, String organization, String dateAwarded, String badgeType) {
        super(id, title);
        this.description = description;
        this.organization = organization;
        this.dateAwarded = dateAwarded;
        this.badgeType = badgeType;
    }

    @Override
    public String getCategory() {
        return "Student Achievement";
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
        touch();
    }

    public String getOrganization() {
        return organization;
    }

    public void setOrganization(String organization) {
        this.organization = organization;
    }

    public String getDateAwarded() {
        return dateAwarded;
    }

    public void setDateAwarded(String dateAwarded) {
        this.dateAwarded = dateAwarded;
    }

    public String getBadgeType() {
        return badgeType;
    }

    public void setBadgeType(String badgeType) {
        this.badgeType = badgeType;
    }
}
