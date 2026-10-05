package com.devtrack.module4_projects;

import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Service Layer managing chronological project milestones.
 */
@Service
public class ProjectMilestoneService {

    private final ProjectService projectService;

    public ProjectMilestoneService(ProjectService projectService) {
        this.projectService = projectService;
    }

    public List<ProjectMilestone> getMilestones(String studentId, String projectId) {
        Project project = projectService.getProjectById(studentId, projectId)
                .orElseThrow(() -> new NoSuchElementException("Project not found with ID: " + projectId));
        return project.getMilestones();
    }

    public ProjectMilestone addMilestone(String studentId, String projectId, ProjectMilestone milestone) {
        Project project = projectService.getProjectById(studentId, projectId)
                .orElseThrow(() -> new NoSuchElementException("Project not found with ID: " + projectId));

        if (milestone.getTitle() == null || milestone.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("Milestone title is required.");
        }
        if (milestone.getId() == null || milestone.getId().trim().isEmpty()) {
            milestone.setId("ms_" + UUID.randomUUID().toString().substring(0, 8));
        }
        milestone.setProjectId(projectId);
        project.addMilestone(milestone);
        return milestone;
    }

    public ProjectMilestone updateMilestone(String studentId, String milestoneId, ProjectMilestone updated) {
        List<Project> allProjects = projectService.getProjects(studentId, null, null, null, null, null);
        for (Project p : allProjects) {
            for (ProjectMilestone m : p.getMilestones()) {
                if (m.getId().equalsIgnoreCase(milestoneId)) {
                    if (updated.getTitle() != null && !updated.getTitle().trim().isEmpty()) {
                        m.setTitle(updated.getTitle().trim());
                    }
                    if (updated.getDescription() != null) {
                        m.setDescription(updated.getDescription());
                    }
                    if (updated.getDate() != null) {
                        m.setDate(updated.getDate());
                    }
                    m.setCompleted(updated.isCompleted());
                    p.touch();
                    return m;
                }
            }
        }
        throw new NoSuchElementException("Milestone not found with ID: " + milestoneId);
    }

    public boolean deleteMilestone(String studentId, String milestoneId) {
        List<Project> allProjects = projectService.getProjects(studentId, null, null, null, null, null);
        for (Project p : allProjects) {
            boolean removed = p.getMilestones().removeIf(m -> m.getId().equalsIgnoreCase(milestoneId));
            if (removed) {
                p.touch();
                return true;
            }
        }
        return false;
    }
}
