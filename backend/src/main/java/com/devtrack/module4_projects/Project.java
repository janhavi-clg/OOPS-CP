package com.devtrack.module4_projects;

import com.devtrack.core.oop.ProgressCalculable;
import com.devtrack.core.oop.TrackableEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Project entity representing a software project developed by the student.
 * Demonstrates:
 * - OOP Inheritance: Extends TrackableEntity
 * - OOP Polymorphism: Implements ProgressCalculable
 * - OOP Composition: Aggregates ProjectTechnology, ProjectLink, ProjectContribution,
 *   ProjectMilestone, and ProjectAchievement
 * - OOP Encapsulation: Private state with validated mutators and business methods
 */
public class Project extends TrackableEntity implements ProgressCalculable {
    private String studentId;
    private String shortDescription;
    private String detailedDescription;
    private String problemStatement;
    private String solutionOverview;
    private String category; // "Web Development", "AI / ML", "Mobile App", "Java", "Backend", "IoT", "Full Stack", etc.
    private String status; // "PLANNING", "IN_PROGRESS", "COMPLETED", "PAUSED", "ARCHIVED"
    private double progressPercentage; // 0.0 to 100.0
    private String startDate; // "YYYY-MM" or "Month YYYY"
    private String endDate; // "YYYY-MM" or "Present"
    private String imageUrl;
    private boolean featured;

    // Composition
    private ProjectContribution contribution;
    private List<ProjectTechnology> technologies = new ArrayList<>();
    private List<ProjectLink> links = new ArrayList<>();
    private List<String> keyFeatures = new ArrayList<>();
    private List<ProjectAchievement> achievements = new ArrayList<>();
    private List<ProjectMilestone> milestones = new ArrayList<>();

    public Project() {
        super();
        this.status = "IN_PROGRESS";
        this.category = "Web Development";
        this.progressPercentage = 0.0;
        this.contribution = new ProjectContribution();
        this.featured = false;
    }

    public Project(String id, String studentId, String name, String shortDescription,
                   String detailedDescription, String problemStatement, String solutionOverview,
                   String category, String status, double progressPercentage,
                   String startDate, String endDate, String imageUrl, boolean featured,
                   ProjectContribution contribution) {
        super(id != null && !id.trim().isEmpty() ? id : "proj_" + UUID.randomUUID().toString().substring(0, 8), name);
        this.studentId = studentId;
        this.shortDescription = shortDescription != null ? shortDescription.trim() : "";
        this.detailedDescription = detailedDescription != null ? detailedDescription.trim() : "";
        this.problemStatement = problemStatement != null ? problemStatement.trim() : "";
        this.solutionOverview = solutionOverview != null ? solutionOverview.trim() : "";
        this.category = category != null && !category.trim().isEmpty() ? category.trim() : "Other";
        this.status = status != null ? status.toUpperCase() : "IN_PROGRESS";
        this.progressPercentage = sanitizeProgress(progressPercentage, this.status);
        this.startDate = startDate != null ? startDate.trim() : "";
        this.endDate = endDate != null ? endDate.trim() : "Present";
        this.imageUrl = imageUrl != null ? imageUrl.trim() : "";
        this.featured = featured;
        this.contribution = contribution != null ? contribution : new ProjectContribution();
    }

    private double sanitizeProgress(double progress, String currentStatus) {
        if ("COMPLETED".equalsIgnoreCase(currentStatus)) {
            return 100.0;
        }
        return Math.min(100.0, Math.max(0.0, Math.round(progress * 10.0) / 10.0));
    }

    @Override
    public String getCategory() {
        return "Project: " + (category != null ? category : "General");
    }

    @Override
    public double calculateProgressPercentage() {
        if ("COMPLETED".equalsIgnoreCase(status)) {
            return 100.0;
        }
        if ("PLANNING".equalsIgnoreCase(status) && progressPercentage == 0.0) {
            return 15.0; // Standard initial planning phase progress
        }
        return progressPercentage;
    }

    @Override
    public String getProgressStatus() {
        if ("COMPLETED".equalsIgnoreCase(status)) return "Completed (100%)";
        if ("PLANNING".equalsIgnoreCase(status)) return "In Planning Phase";
        if ("PAUSED".equalsIgnoreCase(status)) return "Paused (" + (int) progressPercentage + "%)";
        if ("ARCHIVED".equalsIgnoreCase(status)) return "Archived";
        return "In Progress (" + (int) progressPercentage + "%)";
    }

    // Technology Helpers
    public void addTechnology(ProjectTechnology tech) {
        if (tech != null && !technologies.contains(tech)) {
            technologies.add(tech);
            touch();
        }
    }

    public void removeTechnology(String techName) {
        if (techName != null) {
            technologies.removeIf(t -> t.getName().equalsIgnoreCase(techName));
            touch();
        }
    }

    // Milestone Helpers
    public void addMilestone(ProjectMilestone milestone) {
        if (milestone != null) {
            milestone.setProjectId(getId());
            milestones.add(milestone);
            touch();
        }
    }

    public void removeMilestone(String milestoneId) {
        if (milestoneId != null) {
            milestones.removeIf(m -> m.getId().equalsIgnoreCase(milestoneId));
            touch();
        }
    }

    // Achievement Helpers
    public void addAchievement(ProjectAchievement achievement) {
        if (achievement != null) {
            achievement.setProjectId(getId());
            achievements.add(achievement);
            touch();
        }
    }

    public void removeAchievement(String achievementId) {
        if (achievementId != null) {
            achievements.removeIf(a -> a.getId().equalsIgnoreCase(achievementId));
            touch();
        }
    }

    // Link Helpers
    public void addLink(ProjectLink link) {
        if (link != null) {
            links.add(link);
            touch();
        }
    }

    // Getters and Setters (Encapsulation)
    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
        touch();
    }

    public String getName() {
        return getTitle();
    }

    public void setName(String name) {
        setTitle(name);
    }

    public String getShortDescription() {
        return shortDescription;
    }

    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
        touch();
    }

    public String getDetailedDescription() {
        return detailedDescription;
    }

    public void setDetailedDescription(String detailedDescription) {
        this.detailedDescription = detailedDescription;
        touch();
    }

    public String getProblemStatement() {
        return problemStatement;
    }

    public void setProblemStatement(String problemStatement) {
        this.problemStatement = problemStatement;
        touch();
    }

    public String getSolutionOverview() {
        return solutionOverview;
    }

    public void setSolutionOverview(String solutionOverview) {
        this.solutionOverview = solutionOverview;
        touch();
    }

    public void setCategory(String category) {
        this.category = category;
        touch();
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status != null ? status.toUpperCase() : "IN_PROGRESS";
        if ("COMPLETED".equalsIgnoreCase(this.status)) {
            this.progressPercentage = 100.0;
        }
        touch();
    }

    public double getProgressPercentage() {
        return progressPercentage;
    }

    public void setProgressPercentage(double progressPercentage) {
        this.progressPercentage = sanitizeProgress(progressPercentage, this.status);
        if (this.progressPercentage >= 100.0) {
            this.status = "COMPLETED";
        }
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

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
        touch();
    }

    public boolean isFeatured() {
        return featured;
    }

    public void setFeatured(boolean featured) {
        this.featured = featured;
        touch();
    }

    public ProjectContribution getContribution() {
        return contribution;
    }

    public void setContribution(ProjectContribution contribution) {
        this.contribution = contribution != null ? contribution : new ProjectContribution();
        touch();
    }

    public List<ProjectTechnology> getTechnologies() {
        return technologies;
    }

    public void setTechnologies(List<ProjectTechnology> technologies) {
        this.technologies = technologies != null ? new ArrayList<>(technologies) : new ArrayList<>();
        touch();
    }

    public List<ProjectLink> getLinks() {
        return links;
    }

    public void setLinks(List<ProjectLink> links) {
        this.links = links != null ? new ArrayList<>(links) : new ArrayList<>();
        touch();
    }

    public List<String> getKeyFeatures() {
        return keyFeatures;
    }

    public void setKeyFeatures(List<String> keyFeatures) {
        this.keyFeatures = keyFeatures != null ? new ArrayList<>(keyFeatures) : new ArrayList<>();
        touch();
    }

    public List<ProjectAchievement> getAchievements() {
        return achievements;
    }

    public void setAchievements(List<ProjectAchievement> achievements) {
        this.achievements = achievements != null ? new ArrayList<>(achievements) : new ArrayList<>();
        touch();
    }

    public List<ProjectMilestone> getMilestones() {
        return milestones;
    }

    public void setMilestones(List<ProjectMilestone> milestones) {
        this.milestones = milestones != null ? new ArrayList<>(milestones) : new ArrayList<>();
        touch();
    }
}
