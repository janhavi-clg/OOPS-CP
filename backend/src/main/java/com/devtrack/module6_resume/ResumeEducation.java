package com.devtrack.module6_resume;

/**
 * ResumeEducation represents academic background entry in a student's resume.
 * Demonstrates OOP Encapsulation.
 */
public class ResumeEducation {
    private String id;
    private String institution;
    private String degree;
    private String startYear;
    private String endYear;
    private String score;
    private String location;

    public ResumeEducation() {
    }

    public ResumeEducation(String id, String institution, String degree, String startYear, String endYear, String score, String location) {
        this.id = id;
        this.institution = institution;
        this.degree = degree;
        this.startYear = startYear;
        this.endYear = endYear;
        this.score = score;
        this.location = location;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getInstitution() {
        return institution;
    }

    public void setInstitution(String institution) {
        this.institution = institution;
    }

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public String getStartYear() {
        return startYear;
    }

    public void setStartYear(String startYear) {
        this.startYear = startYear;
    }

    public String getEndYear() {
        return endYear;
    }

    public void setEndYear(String endYear) {
        this.endYear = endYear;
    }

    public String getScore() {
        return score;
    }

    public void setScore(String score) {
        this.score = score;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
