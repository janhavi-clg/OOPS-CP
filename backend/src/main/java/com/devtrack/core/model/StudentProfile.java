package com.devtrack.core.model;

import java.util.ArrayList;
import java.util.List;

/**
 * StudentProfile demonstrating OOP Composition.
 * Combines Student demographics, Skills, Coding metrics, Projects, Certificates,
 * Achievements, Hackathons, and Tasks into a cohesive object.
 */
public class StudentProfile {
    private String id;
    private String name;
    private String year;
    private String branch;
    private String college;
    private String email;
    private String phone;
    private String avatarUrl;
    private String bio;
    private double cgpa;

    // Composition: Aggregated child entities
    private CodingProfile codingProfile;
    private List<Skill> skills;
    private List<Project> projects;
    private List<Certificate> certificates;
    private List<Achievement> achievements;
    private List<Hackathon> hackathons;
    private List<TaskItem> tasks;

    public StudentProfile() {
        this.skills = new ArrayList<>();
        this.projects = new ArrayList<>();
        this.certificates = new ArrayList<>();
        this.achievements = new ArrayList<>();
        this.hackathons = new ArrayList<>();
        this.tasks = new ArrayList<>();
    }

    public StudentProfile(String id, String name, String year, String branch, String college, String email, String phone, String avatarUrl, String bio, double cgpa) {
        this();
        this.id = id;
        this.name = name;
        this.year = year;
        this.branch = branch;
        this.college = college;
        this.email = email;
        this.phone = phone;
        this.avatarUrl = avatarUrl;
        this.bio = bio;
        this.cgpa = cgpa;
    }

    // Helper methods demonstrating Business Logic in OOP
    public double calculateAverageSkillProficiency() {
        if (skills.isEmpty()) return 0.0;
        double sum = 0.0;
        for (Skill s : skills) {
            sum += s.calculateProgressPercentage();
        }
        return Math.round((sum / skills.size()) * 10.0) / 10.0;
    }

    public int getCompletedProjectsCount() {
        int count = 0;
        for (Project p : projects) {
            if ("Completed".equalsIgnoreCase(p.getStatus())) {
                count++;
            }
        }
        return count;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getYear() { return year; }
    public void setYear(String year) { this.year = year; }

    public String getBranch() { return branch; }
    public void setBranch(String branch) { this.branch = branch; }

    public String getCollege() { return college; }
    public void setCollege(String college) { this.college = college; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public double getCgpa() { return cgpa; }
    public void setCgpa(double cgpa) { this.cgpa = cgpa; }

    public CodingProfile getCodingProfile() { return codingProfile; }
    public void setCodingProfile(CodingProfile codingProfile) { this.codingProfile = codingProfile; }

    public List<Skill> getSkills() { return skills; }
    public void setSkills(List<Skill> skills) { this.skills = skills; }

    public List<Project> getProjects() { return projects; }
    public void setProjects(List<Project> projects) { this.projects = projects; }

    public List<Certificate> getCertificates() { return certificates; }
    public void setCertificates(List<Certificate> certificates) { this.certificates = certificates; }

    public List<Achievement> getAchievements() { return achievements; }
    public void setAchievements(List<Achievement> achievements) { this.achievements = achievements; }

    public List<Hackathon> getHackathons() { return hackathons; }
    public void setHackathons(List<Hackathon> hackathons) { this.hackathons = hackathons; }

    public List<TaskItem> getTasks() { return tasks; }
    public void setTasks(List<TaskItem> tasks) { this.tasks = tasks; }
}
