package com.devtrack.module6_resume;

import java.util.ArrayList;
import java.util.List;

/**
 * ResumeExperience represents work experience, internships, or leadership positions.
 * Demonstrates OOP Encapsulation and Defensive Copying.
 */
public class ResumeExperience {
    private String id;
    private String company;
    private String role;
    private String location;
    private String startDate;
    private String endDate;
    private boolean current;
    private List<String> highlights = new ArrayList<>();

    public ResumeExperience() {
    }

    public ResumeExperience(String id, String company, String role, String location,
                            String startDate, String endDate, boolean current, List<String> highlights) {
        this.id = id;
        this.company = company;
        this.role = role;
        this.location = location;
        this.startDate = startDate;
        this.endDate = endDate;
        this.current = current;
        if (highlights != null) {
            this.highlights = new ArrayList<>(highlights);
        }
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public boolean isCurrent() {
        return current;
    }

    public void setCurrent(boolean current) {
        this.current = current;
    }

    public List<String> getHighlights() {
        return new ArrayList<>(highlights);
    }

    public void setHighlights(List<String> highlights) {
        this.highlights = highlights != null ? new ArrayList<>(highlights) : new ArrayList<>();
    }
}
