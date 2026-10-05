package com.devtrack.module5_achievements;

import com.devtrack.core.oop.TrackableEntity;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Base Achievement entity demonstrating OOP Inheritance (extends TrackableEntity)
 * and Encapsulation. Represents accolades, awards, certifications, and milestones.
 */
public class Achievement extends TrackableEntity {
    private String studentId;
    private String achievementCategory; // "Hackathon", "Competition", "Certification", "Academic", "Workshop", "Open Source", "Other"
    private String organization;
    private String achievementDate;
    private String description;
    private String role;
    private String teamName;
    private String teamMembers;
    private String proofUrl;
    private boolean hasProof;
    private List<String> relatedSkills = new ArrayList<>();

    public Achievement() {
        super();
        this.achievementCategory = "Competition";
    }

    public Achievement(String id, String studentId, String title, String achievementCategory,
                       String organization, String achievementDate, String description,
                       String role, String teamName, String teamMembers, String proofUrl,
                       List<String> relatedSkills) {
        super(id != null && !id.trim().isEmpty() ? id : "ach_" + UUID.randomUUID().toString().substring(0, 8), title);
        this.studentId = studentId;
        this.achievementCategory = achievementCategory != null ? achievementCategory.trim() : "General";
        this.organization = organization != null ? organization.trim() : "";
        this.achievementDate = achievementDate != null ? achievementDate.trim() : "";
        this.description = description != null ? description.trim() : "";
        this.role = role != null ? role.trim() : "";
        this.teamName = teamName != null ? teamName.trim() : "";
        this.teamMembers = teamMembers != null ? teamMembers.trim() : "";
        this.proofUrl = proofUrl != null ? proofUrl.trim() : "";
        this.hasProof = this.proofUrl != null && !this.proofUrl.isEmpty();
        if (relatedSkills != null) {
            this.relatedSkills = new ArrayList<>(relatedSkills);
        }
    }

    @Override
    public String getCategory() {
        return "Achievement: " + achievementCategory;
    }

    // Encapsulation Getters and Setters
    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
        touch();
    }

    public String getAchievementCategory() {
        return achievementCategory;
    }

    public void setAchievementCategory(String achievementCategory) {
        this.achievementCategory = achievementCategory;
        touch();
    }

    public String getOrganization() {
        return organization;
    }

    public void setOrganization(String organization) {
        this.organization = organization;
        touch();
    }

    public String getAchievementDate() {
        return achievementDate;
    }

    public void setAchievementDate(String achievementDate) {
        this.achievementDate = achievementDate;
        touch();
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
        touch();
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
        touch();
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
        touch();
    }

    public String getTeamMembers() {
        return teamMembers;
    }

    public void setTeamMembers(String teamMembers) {
        this.teamMembers = teamMembers;
        touch();
    }

    public String getProofUrl() {
        return proofUrl;
    }

    public void setProofUrl(String proofUrl) {
        this.proofUrl = proofUrl != null ? proofUrl.trim() : "";
        this.hasProof = this.proofUrl != null && !this.proofUrl.isEmpty();
        touch();
    }

    public boolean isHasProof() {
        return hasProof;
    }

    public void setHasProof(boolean hasProof) {
        this.hasProof = hasProof;
    }

    public List<String> getRelatedSkills() {
        return relatedSkills;
    }

    public void setRelatedSkills(List<String> relatedSkills) {
        this.relatedSkills = relatedSkills != null ? new ArrayList<>(relatedSkills) : new ArrayList<>();
        touch();
    }
}
