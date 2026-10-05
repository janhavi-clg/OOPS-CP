package com.devtrack.core.oop;

import java.time.LocalDateTime;

/**
 * Abstract base class demonstrating OOP Abstraction, Inheritance, and Encapsulation.
 * Provides common properties and behavior for all trackable items in DevTrack.
 */
public abstract class TrackableEntity {
    private String id;
    private String title;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Default constructor
    public TrackableEntity() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    // Parameterized constructor
    public TrackableEntity(String id, String title) {
        this();
        this.id = id;
        this.title = title;
    }

    // Abstract method that subclasses must implement (Polymorphism)
    public abstract String getCategory();

    // Encapsulation: Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
        this.updatedAt = LocalDateTime.now();
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
        this.updatedAt = LocalDateTime.now();
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void touch() {
        this.updatedAt = LocalDateTime.now();
    }
}
