package com.devtrack.module2_skills;

/**
 * Entity representing code solution text stored safely for a practice problem.
 * Demonstrates OOP Encapsulation.
 * IMPORTANT: User-submitted code is stored solely for reference and is never executed.
 */
public class ProblemSolution {
    private String language;
    private String code;
    private String notes;

    public ProblemSolution() {}

    public ProblemSolution(String language, String code, String notes) {
        this.language = language;
        this.code = code;
        this.notes = notes;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
