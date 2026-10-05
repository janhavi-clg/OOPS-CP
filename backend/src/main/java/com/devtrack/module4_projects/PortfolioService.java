package com.devtrack.module4_projects;

import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Service aggregating student project and achievement data to generate
 * the "Portfolio Preview" showcase and serve future Resume Builder (Module 6) consumers.
 * Demonstrates OOP Composition and Data Aggregation.
 */
@Service
public class PortfolioService {

    private final ProjectService projectService;

    public PortfolioService(ProjectService projectService) {
        this.projectService = projectService;
    }

    public Map<String, Object> getPortfolioPreview(String studentId) {
        List<Project> allProjects = projectService.getProjects(studentId, null, null, null, null, null);

        // Featured projects selected for the public-style portfolio showcase
        List<Project> featuredProjects = allProjects.stream()
                .filter(Project::isFeatured)
                .collect(Collectors.toList());

        // If student has not yet featured any project, show top completed/in-progress projects as fallback
        if (featuredProjects.isEmpty() && !allProjects.isEmpty()) {
            featuredProjects = allProjects.stream().limit(3).collect(Collectors.toList());
        }

        // Aggregate unique technology stack across featured projects
        Set<String> techStack = new TreeSet<>();
        for (Project p : featuredProjects) {
            for (ProjectTechnology t : p.getTechnologies()) {
                techStack.add(t.getName());
            }
        }

        // Aggregate all achievements won across projects
        List<ProjectAchievement> allAchievements = new ArrayList<>();
        for (Project p : allProjects) {
            allAchievements.addAll(p.getAchievements());
        }

        Map<String, Object> preview = new LinkedHashMap<>();
        preview.put("studentId", studentId);
        preview.put("headline", "Second Year CSE (AI/ML) Developer & Full Stack Builder");
        preview.put("featuredProjects", featuredProjects);
        preview.put("totalFeatured", featuredProjects.size());
        preview.put("totalProjects", allProjects.size());
        preview.put("techStack", techStack);
        preview.put("projectAchievements", allAchievements);
        preview.put("portfolioUrl", "https://devtrack.preview/u/" + studentId);

        return preview;
    }
}
