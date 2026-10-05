package com.devtrack.module6_resume;

import com.devtrack.core.oop.TrackableEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Resume entity demonstrating:
 * - OOP Inheritance: Extends TrackableEntity
 * - OOP Composition: Aggregates ResumeSection, ResumeEducation, ResumeExperience, ResumeProject, ResumeSkill, ResumeAchievement
 * - OOP Encapsulation: Strict private state with defensive copying
 */
public class Resume extends TrackableEntity {
    private String studentId;
    private String template; // "classic", "modern", "minimal", "technical"
    
    // Personal Information
    private String fullName;
    private String email;
    private String phone;
    private String location;
    private String githubUrl;
    private String linkedinUrl;
    private String portfolioUrl;
    private String summary;

    // Target role & job matching
    private String targetRole;
    private String jobDescription;
    private int profileMatchScore;

    // Composition of Sections and Data
    private List<ResumeSection> sections = new ArrayList<>();
    private List<ResumeEducation> education = new ArrayList<>();
    private List<ResumeExperience> experience = new ArrayList<>();
    private List<ResumeProject> projects = new ArrayList<>();
    private List<ResumeSkill> skills = new ArrayList<>();
    private List<ResumeAchievement> achievements = new ArrayList<>();

    // Selected IDs linking back to original DevTrack modules
    private List<String> selectedSkillIds = new ArrayList<>();
    private List<String> selectedProjectIds = new ArrayList<>();
    private List<String> selectedAchievementIds = new ArrayList<>();
    private List<String> selectedCertificateIds = new ArrayList<>();

    public Resume() {
        super();
        this.template = "modern";
        this.profileMatchScore = 0;
        initializeDefaultSections();
    }

    public Resume(String id, String studentId, String title, String template) {
        super(id != null && !id.trim().isEmpty() ? id : "res_" + UUID.randomUUID().toString().substring(0, 8), title);
        this.studentId = studentId;
        this.template = template != null && !template.trim().isEmpty() ? template : "modern";
        this.profileMatchScore = 0;
        initializeDefaultSections();
    }

    @Override
    public String getCategory() {
        return "Resume: " + (template != null ? template : "Default");
    }

    private void initializeDefaultSections() {
        if (this.sections == null || this.sections.isEmpty()) {
            this.sections = new ArrayList<>();
            this.sections.add(new ResumeSection("sec_summary", "summary", "Professional Summary", true, 0, null));
            this.sections.add(new ResumeSection("sec_education", "education", "Education", true, 1, null));
            this.sections.add(new ResumeSection("sec_skills", "skills", "Technical Skills", true, 2, null));
            this.sections.add(new ResumeSection("sec_projects", "projects", "Projects", true, 3, null));
            this.sections.add(new ResumeSection("sec_experience", "experience", "Experience", true, 4, null));
            this.sections.add(new ResumeSection("sec_achievements", "achievements", "Achievements & Hackathons", true, 5, null));
            this.sections.add(new ResumeSection("sec_certificates", "certificates", "Certifications", true, 6, null));
        }
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getTemplate() {
        return template;
    }

    public void setTemplate(String template) {
        this.template = template != null ? template : "modern";
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getGithubUrl() {
        return githubUrl;
    }

    public void setGithubUrl(String githubUrl) {
        this.githubUrl = githubUrl;
    }

    public String getLinkedinUrl() {
        return linkedinUrl;
    }

    public void setLinkedinUrl(String linkedinUrl) {
        this.linkedinUrl = linkedinUrl;
    }

    public String getPortfolioUrl() {
        return portfolioUrl;
    }

    public void setPortfolioUrl(String portfolioUrl) {
        this.portfolioUrl = portfolioUrl;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getTargetRole() {
        return targetRole;
    }

    public void setTargetRole(String targetRole) {
        this.targetRole = targetRole;
    }

    public String getJobDescription() {
        return jobDescription;
    }

    public void setJobDescription(String jobDescription) {
        this.jobDescription = jobDescription;
    }

    public int getProfileMatchScore() {
        return profileMatchScore;
    }

    public void setProfileMatchScore(int profileMatchScore) {
        this.profileMatchScore = profileMatchScore;
    }

    public List<ResumeSection> getSections() {
        return new ArrayList<>(sections);
    }

    public void setSections(List<ResumeSection> sections) {
        this.sections = sections != null ? new ArrayList<>(sections) : new ArrayList<>();
    }

    public List<ResumeEducation> getEducation() {
        return new ArrayList<>(education);
    }

    public void setEducation(List<ResumeEducation> education) {
        this.education = education != null ? new ArrayList<>(education) : new ArrayList<>();
    }

    public List<ResumeExperience> getExperience() {
        return new ArrayList<>(experience);
    }

    public void setExperience(List<ResumeExperience> experience) {
        this.experience = experience != null ? new ArrayList<>(experience) : new ArrayList<>();
    }

    public List<ResumeProject> getProjects() {
        return new ArrayList<>(projects);
    }

    public void setProjects(List<ResumeProject> projects) {
        this.projects = projects != null ? new ArrayList<>(projects) : new ArrayList<>();
    }

    public List<ResumeSkill> getSkills() {
        return new ArrayList<>(skills);
    }

    public void setSkills(List<ResumeSkill> skills) {
        this.skills = skills != null ? new ArrayList<>(skills) : new ArrayList<>();
    }

    public List<ResumeAchievement> getAchievements() {
        return new ArrayList<>(achievements);
    }

    public void setAchievements(List<ResumeAchievement> achievements) {
        this.achievements = achievements != null ? new ArrayList<>(achievements) : new ArrayList<>();
    }

    public List<String> getSelectedSkillIds() {
        return new ArrayList<>(selectedSkillIds);
    }

    public void setSelectedSkillIds(List<String> selectedSkillIds) {
        this.selectedSkillIds = selectedSkillIds != null ? new ArrayList<>(selectedSkillIds) : new ArrayList<>();
    }

    public List<String> getSelectedProjectIds() {
        return new ArrayList<>(selectedProjectIds);
    }

    public void setSelectedProjectIds(List<String> selectedProjectIds) {
        this.selectedProjectIds = selectedProjectIds != null ? new ArrayList<>(selectedProjectIds) : new ArrayList<>();
    }

    public List<String> getSelectedAchievementIds() {
        return new ArrayList<>(selectedAchievementIds);
    }

    public void setSelectedAchievementIds(List<String> selectedAchievementIds) {
        this.selectedAchievementIds = selectedAchievementIds != null ? new ArrayList<>(selectedAchievementIds) : new ArrayList<>();
    }

    public List<String> getSelectedCertificateIds() {
        return new ArrayList<>(selectedCertificateIds);
    }

    public void setSelectedCertificateIds(List<String> selectedCertificateIds) {
        this.selectedCertificateIds = selectedCertificateIds != null ? new ArrayList<>(selectedCertificateIds) : new ArrayList<>();
    }
}
