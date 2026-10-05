package com.devtrack.module4_projects;

/**
 * ProjectLink represents an external reference associated with a project
 * (GitHub repository, live deployment, documentation, research paper).
 * Demonstrates Encapsulation and URL Validation.
 */
public class ProjectLink {
    private String type; // "GITHUB", "LIVE_DEMO", "DOCUMENTATION", "OTHER"
    private String url;
    private String label;

    public ProjectLink() {
    }

    public ProjectLink(String type, String url, String label) {
        this.type = type != null ? type.toUpperCase() : "OTHER";
        this.url = validateUrl(url);
        this.label = label != null ? label.trim() : this.type;
    }

    public static String validateUrl(String input) {
        if (input == null || input.trim().isEmpty()) {
            return "";
        }
        String trimmed = input.trim();
        if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
            return "https://" + trimmed;
        }
        return trimmed;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type != null ? type.toUpperCase() : "OTHER";
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = validateUrl(url);
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label != null ? label.trim() : "";
    }
}
