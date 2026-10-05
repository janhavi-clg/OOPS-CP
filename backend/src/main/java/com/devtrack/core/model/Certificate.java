package com.devtrack.core.model;

import com.devtrack.core.oop.TrackableEntity;

/**
 * Certificate entity extending TrackableEntity.
 */
public class Certificate extends TrackableEntity {
    private String issuer;
    private String issueDate;
    private String credentialId;
    private String verificationUrl;
    private String skillsCovered;

    public Certificate() {
        super();
    }

    public Certificate(String id, String title, String issuer, String issueDate, String credentialId, String verificationUrl, String skillsCovered) {
        super(id, title);
        this.issuer = issuer;
        this.issueDate = issueDate;
        this.credentialId = credentialId;
        this.verificationUrl = verificationUrl;
        this.skillsCovered = skillsCovered;
    }

    @Override
    public String getCategory() {
        return "Professional Certification";
    }

    public String getIssuer() {
        return issuer;
    }

    public void setIssuer(String issuer) {
        this.issuer = issuer;
        touch();
    }

    public String getIssueDate() {
        return issueDate;
    }

    public void setIssueDate(String issueDate) {
        this.issueDate = issueDate;
    }

    public String getCredentialId() {
        return credentialId;
    }

    public void setCredentialId(String credentialId) {
        this.credentialId = credentialId;
    }

    public String getVerificationUrl() {
        return verificationUrl;
    }

    public void setVerificationUrl(String verificationUrl) {
        this.verificationUrl = verificationUrl;
    }

    public String getSkillsCovered() {
        return skillsCovered;
    }

    public void setSkillsCovered(String skillsCovered) {
        this.skillsCovered = skillsCovered;
    }
}
