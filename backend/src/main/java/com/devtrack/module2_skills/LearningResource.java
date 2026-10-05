package com.devtrack.module2_skills;

import com.devtrack.core.oop.TrackableEntity;
import java.time.LocalDate;

/**
 * LearningResource entity representing a course, video, article, or documentation item
 * selected by a student to learn a specific skill.
 * Demonstrates OOP Inheritance (extends TrackableEntity) and Encapsulation.
 */
public class LearningResource extends TrackableEntity {
    private String studentId;
    private String skillId;
    private String skillName;
    private String platform; // YouTube, Coursera, Udemy, Official Docs, Medium, Tutorialspoint, etc.
    private String url;
    private String type; // Video, Playlist, Course, Documentation, Article, Tutorial, Other
    private String description;
    private boolean completed;
    private String completedDate; // YYYY-MM-DD

    public LearningResource() {
        super();
        this.completed = false;
        this.type = "Video";
    }

    public LearningResource(String id, String studentId, String skillId, String skillName,
                            String title, String platform, String url, String type,
                            String description, boolean completed, String completedDate) {
        super(id, title);
        this.studentId = studentId;
        this.skillId = skillId;
        this.skillName = skillName;
        this.platform = platform;
        this.url = url;
        this.type = type != null ? type : "Video";
        this.description = description;
        this.completed = completed;
        this.completedDate = completedDate;
    }

    @Override
    public String getCategory() {
        return "Learning Resource (" + this.type + ")";
    }

    /**
     * Mark resource completion state and automatically record the date if completed.
     */
    public void markCompleted(boolean isCompleted) {
        this.completed = isCompleted;
        if (isCompleted) {
            this.completedDate = LocalDate.now().toString();
        } else {
            this.completedDate = null;
        }
        touch();
    }

    public boolean isValidUrl() {
        if (url == null || url.trim().isEmpty()) return false;
        String trimmed = url.trim().toLowerCase();
        return trimmed.startsWith("http://") || trimmed.startsWith("https://");
    }

    // Encapsulation: Getters and Setters
    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }

    public String getSkillId() { return skillId; }
    public void setSkillId(String skillId) { this.skillId = skillId; touch(); }

    public String getSkillName() { return skillName; }
    public void setSkillName(String skillName) { this.skillName = skillName; touch(); }

    public String getPlatform() { return platform; }
    public void setPlatform(String platform) { this.platform = platform; touch(); }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; touch(); }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; touch(); }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; touch(); }

    public boolean isCompleted() { return completed; }
    public void setCompleted(boolean completed) { markCompleted(completed); }

    public String getCompletedDate() { return completedDate; }
    public void setCompletedDate(String completedDate) { this.completedDate = completedDate; touch(); }
}
