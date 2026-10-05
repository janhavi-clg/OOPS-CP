package com.devtrack.module4_projects;

/**
 * ProjectTechnology represents a programming language, framework, library,
 * or tool utilized within a project.
 * Demonstrates OOP Encapsulation and Data Integrity.
 */
public class ProjectTechnology {
    private String name;
    private String category; // "Language", "Frontend", "Backend", "Database", "AI/ML", "DevOps/Tools"
    private boolean primary;

    public ProjectTechnology() {
    }

    public ProjectTechnology(String name, String category, boolean primary) {
        this.name = name != null ? name.trim() : "";
        this.category = category != null ? category.trim() : "General";
        this.primary = primary;
    }

    public ProjectTechnology(String name) {
        this(name, "General", false);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name != null ? name.trim() : "";
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category != null ? category.trim() : "General";
    }

    public boolean isPrimary() {
        return primary;
    }

    public void setPrimary(boolean primary) {
        this.primary = primary;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProjectTechnology that = (ProjectTechnology) o;
        return name.equalsIgnoreCase(that.name);
    }

    @Override
    public int hashCode() {
        return name.toLowerCase().hashCode();
    }
}
