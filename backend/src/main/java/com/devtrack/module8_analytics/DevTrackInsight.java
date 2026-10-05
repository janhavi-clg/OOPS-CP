package com.devtrack.module8_analytics;

/**
 * DevTrackInsight represents a transparent rule-based insight derived from student activity data.
 * Demonstrates OOP Encapsulation.
 */
public class DevTrackInsight {
    private String id;
    private String title;
    private String message;
    private String category; // "CODING", "LEARNING", "SKILL", "PROJECT"
    private String tone; // "POSITIVE", "NEUTRAL", "ATTENTION"

    public DevTrackInsight() {
    }

    public DevTrackInsight(String id, String title, String message, String category, String tone) {
        this.id = id;
        this.title = title;
        this.message = message;
        this.category = category;
        this.tone = tone;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getTone() {
        return tone;
    }

    public void setTone(String tone) {
        this.tone = tone;
    }
}
