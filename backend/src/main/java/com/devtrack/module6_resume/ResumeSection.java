package com.devtrack.module6_resume;

/**
 * ResumeSection represents a modular section of a student's resume
 * (Summary, Skills, Projects, Education, Experience, Achievements, Certificates, Custom).
 * Demonstrates OOP Encapsulation.
 */
public class ResumeSection {
    private String id;
    private String sectionKey; // "summary", "skills", "projects", "experience", "education", "achievements", "certificates", "coding", "custom"
    private String title;
    private boolean visible;
    private int orderIndex;
    private String customContent;

    public ResumeSection() {
        this.visible = true;
    }

    public ResumeSection(String id, String sectionKey, String title, boolean visible, int orderIndex, String customContent) {
        this.id = id;
        this.sectionKey = sectionKey;
        this.title = title;
        this.visible = visible;
        this.orderIndex = orderIndex;
        this.customContent = customContent;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSectionKey() {
        return sectionKey;
    }

    public void setSectionKey(String sectionKey) {
        this.sectionKey = sectionKey;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public boolean isVisible() {
        return visible;
    }

    public void setVisible(boolean visible) {
        this.visible = visible;
    }

    public int getOrderIndex() {
        return orderIndex;
    }

    public void setOrderIndex(int orderIndex) {
        this.orderIndex = orderIndex;
    }

    public String getCustomContent() {
        return customContent;
    }

    public void setCustomContent(String customContent) {
        this.customContent = customContent;
    }
}
