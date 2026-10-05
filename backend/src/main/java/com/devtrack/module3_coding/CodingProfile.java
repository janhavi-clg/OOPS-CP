package com.devtrack.module3_coding;

import com.devtrack.core.oop.ProgressCalculable;
import com.devtrack.core.oop.TrackableEntity;

/**
 * CodingProfile entity representing a student's connected competitive programming
 * or development platform profile (LeetCode, GitHub, CodeChef, Codeforces, etc.).
 *
 * Demonstrates:
 * - OOP Inheritance: Extends TrackableEntity
 * - OOP Polymorphism: Implements ProgressCalculable
 * - OOP Composition: Contains CodingStatistics
 * - OOP Encapsulation: Private state with validated mutators
 */
public class CodingProfile extends TrackableEntity implements ProgressCalculable {
    private String studentId;
    private CodingPlatform platform;
    private String username;
    private String profileUrl;
    private String sourceType; // "LIVE", "MANUAL", "DEMO"
    private String status; // "CONNECTED", "SYNCING", "SYNC_FAILED", "DISCONNECTED"
    private String lastSyncedAt;
    private String proofUrl;
    private String manualNotes;
    private CodingStatistics statistics;

    public CodingProfile() {
        super();
        this.platform = CodingPlatform.LEETCODE;
        this.sourceType = "DEMO";
        this.status = "CONNECTED";
        this.statistics = new CodingStatistics();
    }

    public CodingProfile(String id, String studentId, CodingPlatform platform, String username,
                         String profileUrl, String sourceType, String status, String lastSyncedAt,
                         String proofUrl, String manualNotes, CodingStatistics statistics) {
        super(id, platform.getDisplayName() + " (" + username + ")");
        this.studentId = studentId;
        this.platform = platform;
        this.username = username;
        this.profileUrl = profileUrl;
        this.sourceType = sourceType != null ? sourceType : "DEMO";
        this.status = status != null ? status : "CONNECTED";
        this.lastSyncedAt = lastSyncedAt;
        this.proofUrl = proofUrl;
        this.manualNotes = manualNotes;
        this.statistics = statistics != null ? statistics : new CodingStatistics();
    }

    @Override
    public String getCategory() {
        return "Coding Profile: " + (platform != null ? platform.getDisplayName() : "Unknown");
    }

    @Override
    public double calculateProgressPercentage() {
        if (statistics == null || statistics.getProblemStats() == null) return 0.0;
        int total = statistics.getTotalSolved();
        // Benchmark: 250 problems solved is considered high proficiency for undergrad placement
        double pct = ((double) total / 250.0) * 100.0;
        return Math.min(100.0, Math.max(0.0, Math.round(pct * 10.0) / 10.0));
    }

    @Override
    public String getProgressStatus() {
        int total = statistics != null ? statistics.getTotalSolved() : 0;
        if (total >= 200) return "Master Competitor";
        if (total >= 100) return "Active Problem Solver";
        if (total >= 50) return "Intermediate Coder";
        return "Beginner Coder";
    }

    // Encapsulation Getters and Setters
    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public CodingPlatform getPlatform() {
        return platform;
    }

    public void setPlatform(CodingPlatform platform) {
        this.platform = platform;
        touch();
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
        setTitle((platform != null ? platform.getDisplayName() : "Platform") + " (" + username + ")");
        touch();
    }

    public String getProfileUrl() {
        return profileUrl;
    }

    public void setProfileUrl(String profileUrl) {
        this.profileUrl = profileUrl;
        touch();
    }

    public String getSourceType() {
        return sourceType;
    }

    public void setSourceType(String sourceType) {
        this.sourceType = sourceType;
        touch();
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
        touch();
    }

    public String getLastSyncedAt() {
        return lastSyncedAt;
    }

    public void setLastSyncedAt(String lastSyncedAt) {
        this.lastSyncedAt = lastSyncedAt;
        touch();
    }

    public String getProofUrl() {
        return proofUrl;
    }

    public void setProofUrl(String proofUrl) {
        this.proofUrl = proofUrl;
        touch();
    }

    public String getManualNotes() {
        return manualNotes;
    }

    public void setManualNotes(String manualNotes) {
        this.manualNotes = manualNotes;
        touch();
    }

    public CodingStatistics getStatistics() {
        return statistics;
    }

    public void setStatistics(CodingStatistics statistics) {
        this.statistics = statistics;
        touch();
    }
}
