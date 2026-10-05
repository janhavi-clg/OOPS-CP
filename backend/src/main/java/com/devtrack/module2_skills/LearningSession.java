package com.devtrack.module2_skills;

import com.devtrack.core.oop.TrackableEntity;

/**
 * LearningSession entity representing a recorded learning or practice session.
 * Used for consistency tracking (streaks, active days, study duration).
 * Demonstrates OOP Inheritance and Encapsulation.
 */
public class LearningSession extends TrackableEntity {
    private String studentId;
    private String skillId;
    private String skillName;
    private String date; // YYYY-MM-DD
    private int durationMinutes;
    private String sessionType; // "Resource Study", "Coding Practice", "Revision"
    private String notes;

    public LearningSession() {
        super();
        this.durationMinutes = 45;
        this.sessionType = "Coding Practice";
    }

    public LearningSession(String id, String studentId, String skillId, String skillName,
                           String title, String date, int durationMinutes,
                           String sessionType, String notes) {
        super(id, title);
        this.studentId = studentId;
        this.skillId = skillId;
        this.skillName = skillName;
        this.date = date;
        this.durationMinutes = durationMinutes;
        this.sessionType = sessionType;
        this.notes = notes;
    }

    @Override
    public String getCategory() {
        return "Learning Session";
    }

    // Encapsulation: Getters and Setters
    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }

    public String getSkillId() { return skillId; }
    public void setSkillId(String skillId) { this.skillId = skillId; touch(); }

    public String getSkillName() { return skillName; }
    public void setSkillName(String skillName) { this.skillName = skillName; touch(); }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; touch(); }

    public int getDurationMinutes() { return durationMinutes; }
    public void setDurationMinutes(int durationMinutes) { this.durationMinutes = durationMinutes; touch(); }

    public String getSessionType() { return sessionType; }
    public void setSessionType(String sessionType) { this.sessionType = sessionType; touch(); }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; touch(); }
}
