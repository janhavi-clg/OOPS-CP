package com.devtrack.core.model;

import com.devtrack.core.oop.ProgressCalculable;
import com.devtrack.core.oop.TrackableEntity;

/**
 * Task entity demonstrating OOP Abstraction, Inheritance, and Encapsulation.
 */
public class TaskItem extends TrackableEntity implements ProgressCalculable {
    private String priority; // High, Medium, Low
    private String status; // Pending, In Progress, Completed
    private String dueDate;
    private int estimatedMinutes;
    private boolean completed;

    public TaskItem() {
        super();
        this.status = "Pending";
        this.completed = false;
    }

    public TaskItem(String id, String title, String priority, String status, String dueDate, int estimatedMinutes) {
        super(id, title);
        this.priority = priority;
        this.status = status;
        this.dueDate = dueDate;
        this.estimatedMinutes = estimatedMinutes;
        this.completed = "Completed".equalsIgnoreCase(status);
    }

    @Override
    public String getCategory() {
        return "Academic & Dev Task";
    }

    @Override
    public double calculateProgressPercentage() {
        if ("Completed".equalsIgnoreCase(status) || completed) return 100.0;
        if ("In Progress".equalsIgnoreCase(status)) return 50.0;
        return 0.0;
    }

    @Override
    public String getProgressStatus() {
        return status;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
        touch();
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
        this.completed = "Completed".equalsIgnoreCase(status);
        touch();
    }

    public String getDueDate() {
        return dueDate;
    }

    public void setDueDate(String dueDate) {
        this.dueDate = dueDate;
    }

    public int getEstimatedMinutes() {
        return estimatedMinutes;
    }

    public void setEstimatedMinutes(int estimatedMinutes) {
        this.estimatedMinutes = estimatedMinutes;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
        this.status = completed ? "Completed" : "Pending";
        touch();
    }
}
