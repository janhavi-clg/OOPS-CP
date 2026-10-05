package com.devtrack.module2_skills;

import com.devtrack.core.oop.TrackableEntity;

/**
 * PracticeProblem entity representing a programming problem solved by a student.
 * Demonstrates Inheritance (extends TrackableEntity) and Composition (has a ProblemSolution).
 */
public class PracticeProblem extends TrackableEntity {
    private String skillId;
    private String skillName;
    private String studentId;
    private String platform; // LeetCode, HackerRank, CodeChef, GeeksforGeeks, Codeforces, Custom
    private String problemUrl;
    private String difficulty; // Easy, Medium, Hard
    private String dateSolved; // YYYY-MM-DD
    private String notes;
    private ProblemSolution solution;

    public PracticeProblem() {
        super();
        this.difficulty = "Medium";
    }

    public PracticeProblem(String id, String title, String skillId, String skillName, String studentId,
                           String platform, String problemUrl, String difficulty, String dateSolved,
                           String notes, ProblemSolution solution) {
        super(id, title);
        this.skillId = skillId;
        this.skillName = skillName;
        this.studentId = studentId;
        this.platform = platform;
        this.problemUrl = problemUrl;
        this.difficulty = difficulty;
        this.dateSolved = dateSolved;
        this.notes = notes;
        this.solution = solution;
    }

    @Override
    public String getCategory() {
        return "Practice Problem";
    }

    public boolean isValidUrl() {
        if (problemUrl == null || problemUrl.trim().isEmpty()) return true; // Optional
        String trimmed = problemUrl.trim().toLowerCase();
        return trimmed.startsWith("http://") || trimmed.startsWith("https://");
    }

    // Getters and Setters
    public String getSkillId() { return skillId; }
    public void setSkillId(String skillId) { this.skillId = skillId; touch(); }

    public String getSkillName() { return skillName; }
    public void setSkillName(String skillName) { this.skillName = skillName; touch(); }

    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }

    public String getPlatform() { return platform; }
    public void setPlatform(String platform) { this.platform = platform; touch(); }

    public String getProblemUrl() { return problemUrl; }
    public void setProblemUrl(String problemUrl) { this.problemUrl = problemUrl; touch(); }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; touch(); }

    public String getDateSolved() { return dateSolved; }
    public void setDateSolved(String dateSolved) { this.dateSolved = dateSolved; touch(); }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; touch(); }

    public ProblemSolution getSolution() { return solution; }
    public void setSolution(ProblemSolution solution) { this.solution = solution; touch(); }
}
