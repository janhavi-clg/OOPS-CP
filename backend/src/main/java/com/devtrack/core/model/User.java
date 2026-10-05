package com.devtrack.core.model;

/**
 * User entity demonstrating Encapsulation and Data Validation.
 */
public class User {
    private String id;
    private String username;
    private String email;
    private String fullName;
    private String role;
    private boolean isDemoUser;

    public User() {}

    public User(String id, String username, String email, String fullName, String role, boolean isDemoUser) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.fullName = fullName;
        this.role = role;
        this.isDemoUser = isDemoUser;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public boolean isDemoUser() {
        return isDemoUser;
    }

    public void setDemoUser(boolean demoUser) {
        isDemoUser = demoUser;
    }
}
