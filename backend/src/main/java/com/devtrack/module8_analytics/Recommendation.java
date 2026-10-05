package com.devtrack.module8_analytics;

/**
 * Recommendation represents an actionable, rule-based nudge to guide developer progress.
 * Demonstrates OOP Encapsulation.
 */
public class Recommendation {
    private String id;
    private String title;
    private String actionPrompt;
    private String targetModule; // "module2", "module3", "module4", "module5", "module6"
    private String targetUrl;
    private String priority; // "HIGH", "MEDIUM", "LOW"

    public Recommendation() {
    }

    public Recommendation(String id, String title, String actionPrompt, String targetModule, String targetUrl, String priority) {
        this.id = id;
        this.title = title;
        this.actionPrompt = actionPrompt;
        this.targetModule = targetModule;
        this.targetUrl = targetUrl;
        this.priority = priority;
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

    public String getActionPrompt() {
        return actionPrompt;
    }

    public void setActionPrompt(String actionPrompt) {
        this.actionPrompt = actionPrompt;
    }

    public String getTargetModule() {
        return targetModule;
    }

    public void setTargetModule(String targetModule) {
        this.targetModule = targetModule;
    }

    public String getTargetUrl() {
        return targetUrl;
    }

    public void setTargetUrl(String targetUrl) {
        this.targetUrl = targetUrl;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }
}
