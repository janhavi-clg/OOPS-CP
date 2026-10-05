package com.devtrack.core.model;

import com.devtrack.core.oop.TrackableEntity;
import java.util.ArrayList;
import java.util.List;

/**
 * Project entity demonstrating OOP Inheritance and Encapsulation.
 */
public class Project extends TrackableEntity {
    private String description;
    private List<String> techStack;
    private String status; // Completed, In Progress, Planned
    private String startDate;
    private String endDate;
    private String githubUrl;
    private String liveDemoUrl;
    private int stars;

    public Project() {
        super();
        this.techStack = new ArrayList<>();
    }

    public Project(String id, String title, String description, List<String> techStack,
                   String status, String startDate, String endDate,
                   String githubUrl, String liveDemoUrl) {
        super(id, title);
        this.description = description;
        this.techStack = techStack != null ? techStack : new ArrayList<>();
        this.status = status;
        this.startDate = startDate;
        this.endDate = endDate;
        this.githubUrl = githubUrl;
        this.liveDemoUrl = liveDemoUrl;
        this.stars = 0;
    }

    @Override
    public String getCategory() {
        return "Software Project";
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
        touch();
    }

    public List<String> getTechStack() {
        return techStack;
    }

    public void setTechStack(List<String> techStack) {
        this.techStack = techStack;
        touch();
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
        touch();
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

    public String getGithubUrl() {
        return githubUrl;
    }

    public void setGithubUrl(String githubUrl) {
        this.githubUrl = githubUrl;
    }

    public String getLiveDemoUrl() {
        return liveDemoUrl;
    }

    public void setLiveDemoUrl(String liveDemoUrl) {
        this.liveDemoUrl = liveDemoUrl;
    }

    public int getStars() {
        return stars;
    }

    public void setStars(int stars) {
        this.stars = stars;
    }
}
