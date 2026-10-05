package com.devtrack.module5_achievements;

import com.devtrack.core.oop.TrackableEntity;
import java.util.UUID;

/**
 * Certificate entity representing accredited courses, cloud certificates,
 * and skill validations earned by the student.
 * Demonstrates OOP Inheritance and Encapsulation.
 */
public class Certificate extends TrackableEntity {
    private String studentId;
    private String certificateName;
    private String issuingOrganization;
    private String issueDate;
    private String expiryDate;
    private String credentialId;
    private String credentialUrl;
    private String fileDataOrUrl;
    private String fileType; // "PDF", "PNG", "JPG", "WEBP"
    private String relatedSkill;
    private String description;
    private boolean verified;

    public Certificate() {
        super();
        this.verified = true;
    }

    public Certificate(String id, String studentId, String certificateName, String issuingOrganization,
                       String issueDate, String expiryDate, String credentialId, String credentialUrl,
                       String fileDataOrUrl, String fileType, String relatedSkill, String description,
                       boolean verified) {
        super(id != null && !id.trim().isEmpty() ? id : "cert_" + UUID.randomUUID().toString().substring(0, 8), certificateName);
        this.studentId = studentId;
        this.certificateName = certificateName;
        this.issuingOrganization = issuingOrganization != null ? issuingOrganization.trim() : "";
        this.issueDate = issueDate != null ? issueDate.trim() : "";
        this.expiryDate = expiryDate != null ? expiryDate.trim() : "";
        this.credentialId = credentialId != null ? credentialId.trim() : "";
        this.credentialUrl = credentialUrl != null ? credentialUrl.trim() : "";
        this.fileDataOrUrl = fileDataOrUrl != null ? fileDataOrUrl.trim() : "";
        this.fileType = fileType != null ? fileType.toUpperCase() : "PNG";
        this.relatedSkill = relatedSkill != null ? relatedSkill.trim() : "";
        this.description = description != null ? description.trim() : "";
        this.verified = verified;
    }

    @Override
    public String getCategory() {
        return "Certificate: " + (issuingOrganization != null ? issuingOrganization : "Accreditation");
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
        touch();
    }

    public String getCertificateName() {
        return getTitle();
    }

    public void setCertificateName(String certificateName) {
        setTitle(certificateName);
        this.certificateName = certificateName;
        touch();
    }

    public String getIssuingOrganization() {
        return issuingOrganization;
    }

    public void setIssuingOrganization(String issuingOrganization) {
        this.issuingOrganization = issuingOrganization;
        touch();
    }

    public String getIssueDate() {
        return issueDate;
    }

    public void setIssueDate(String issueDate) {
        this.issueDate = issueDate;
        touch();
    }

    public String getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(String expiryDate) {
        this.expiryDate = expiryDate;
        touch();
    }

    public String getCredentialId() {
        return credentialId;
    }

    public void setCredentialId(String credentialId) {
        this.credentialId = credentialId;
        touch();
    }

    public String getCredentialUrl() {
        return credentialUrl;
    }

    public void setCredentialUrl(String credentialUrl) {
        this.credentialUrl = credentialUrl;
        touch();
    }

    public String getFileDataOrUrl() {
        return fileDataOrUrl;
    }

    public void setFileDataOrUrl(String fileDataOrUrl) {
        this.fileDataOrUrl = fileDataOrUrl;
        touch();
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType != null ? fileType.toUpperCase() : "PNG";
        touch();
    }

    public String getRelatedSkill() {
        return relatedSkill;
    }

    public void setRelatedSkill(String relatedSkill) {
        this.relatedSkill = relatedSkill;
        touch();
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
        touch();
    }

    public boolean isVerified() {
        return verified;
    }

    public void setVerified(boolean verified) {
        this.verified = verified;
        touch();
    }
}
