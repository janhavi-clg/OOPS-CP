package com.devtrack.module1_profile;

/**
 * DeveloperLink entity demonstrating OOP Encapsulation and Data Validation.
 * Represents a student's public developer presence (GitHub, LeetCode, Unstop, etc.).
 */
public class DeveloperLink {
    private String id;
    private String studentId;
    private String platform;
    private String url;
    private String username;
    private boolean isCustom;

    public DeveloperLink() {}

    public DeveloperLink(String id, String studentId, String platform, String url, String username, boolean isCustom) {
        this.id = id;
        this.studentId = studentId;
        this.platform = platform;
        this.url = url;
        this.username = username;
        this.isCustom = isCustom;
    }

    public boolean isValidUrl() {
        if (url == null || url.trim().isEmpty()) {
            return false;
        }
        String trimmed = url.trim().toLowerCase();
        return trimmed.startsWith("http://") || trimmed.startsWith("https://");
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }

    public String getPlatform() { return platform; }
    public void setPlatform(String platform) { this.platform = platform; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public boolean isCustom() { return isCustom; }
    public void setCustom(boolean custom) { isCustom = custom; }
}
