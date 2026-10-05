package com.devtrack.module6_resume;

import java.util.ArrayList;
import java.util.List;

/**
 * ResumeSkill groups skills by category (e.g., Languages, Frameworks, Developer Tools)
 * for clean, placement-ready formatting in the resume.
 */
public class ResumeSkill {
    private String id;
    private String category;
    private List<String> skills = new ArrayList<>();

    public ResumeSkill() {
    }

    public ResumeSkill(String id, String category, List<String> skills) {
        this.id = id;
        this.category = category;
        if (skills != null) {
            this.skills = new ArrayList<>(skills);
        }
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public List<String> getSkills() {
        return new ArrayList<>(skills);
    }

    public void setSkills(List<String> skills) {
        this.skills = skills != null ? new ArrayList<>(skills) : new ArrayList<>();
    }
}
