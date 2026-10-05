package com.devtrack.module4_projects;

import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Service Layer managing achievements and accolades connected to student projects.
 */
@Service
public class ProjectAchievementService {

    private final ProjectService projectService;

    public ProjectAchievementService(ProjectService projectService) {
        this.projectService = projectService;
    }

    public List<ProjectAchievement> getAchievements(String studentId, String projectId) {
        Project project = projectService.getProjectById(studentId, projectId)
                .orElseThrow(() -> new NoSuchElementException("Project not found with ID: " + projectId));
        return project.getAchievements();
    }

    public ProjectAchievement addAchievement(String studentId, String projectId, ProjectAchievement achievement) {
        Project project = projectService.getProjectById(studentId, projectId)
                .orElseThrow(() -> new NoSuchElementException("Project not found with ID: " + projectId));

        if (achievement.getTitle() == null || achievement.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("Achievement title is required.");
        }
        if (achievement.getId() == null || achievement.getId().trim().isEmpty()) {
            achievement.setId("ach_" + UUID.randomUUID().toString().substring(0, 8));
        }
        achievement.setProjectId(projectId);
        project.addAchievement(achievement);
        return achievement;
    }

    public boolean deleteAchievement(String studentId, String achievementId) {
        List<Project> allProjects = projectService.getProjects(studentId, null, null, null, null, null);
        for (Project p : allProjects) {
            boolean removed = p.getAchievements().removeIf(a -> a.getId().equalsIgnoreCase(achievementId));
            if (removed) {
                p.touch();
                return true;
            }
        }
        return false;
    }
}
