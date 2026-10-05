package com.devtrack.module6_resume;

/**
 * JobRequirement represents a specific competency or project expectation for a targeted role.
 */
public class JobRequirement {
    private String name;
    private String type; // "SKILL", "PROJECT_KEYWORD", "ACHIEVEMENT_KEYWORD"
    private boolean required;
    private int weight; // 1 to 5 for transparent scoring

    public JobRequirement() {
        this.weight = 3;
        this.required = true;
    }

    public JobRequirement(String name, String type, boolean required, int weight) {
        this.name = name;
        this.type = type;
        this.required = required;
        this.weight = weight;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public boolean isRequired() {
        return required;
    }

    public void setRequired(boolean required) {
        this.required = required;
    }

    public int getWeight() {
        return weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }
}
