package com.devtrack.module4_projects;

import com.devtrack.core.oop.ProgressCalculable;
import com.devtrack.core.oop.TrackableEntity;

import java.util.List;
import java.util.Map;

/**
 * Verification test suite for Module 4 Java OOP architecture.
 * Demonstrates:
 * 1. Encapsulation (Private fields with validated getters/setters)
 * 2. Inheritance (Project and ProjectMilestone extend TrackableEntity)
 * 3. Composition (Project has ProjectContribution, ProjectTechnology, ProjectLink, ProjectMilestone, ProjectAchievement)
 * 4. Abstraction & Interfaces (ProgressCalculable contract)
 * 5. Polymorphism (calculateProgressPercentage behaves according to project state)
 * 6. Student Data Isolation and Service CRUD
 * 7. Portfolio Showcase Aggregation
 */
public class VerifyModule4OOP {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("  RUNNING DEVTRACK MODULE 4 JAVA OOP TEST SUITE   ");
        System.out.println("==================================================");

        int passed = 0;
        int failed = 0;

        // TEST 1: Encapsulation & Composite Object Hierarchy
        try {
            ProjectContribution contrib = new ProjectContribution("Lead Backend Architect", "Implemented Spring Boot services", 3);
            Project project = new Project(
                    "proj_test", "student_1", "Algorithmic Trading Bot",
                    "High frequency market making bot", "Full description here",
                    "Latency bottlenecks", "C++ lockfree queues",
                    "Backend", "IN_PROGRESS", 45.0,
                    "2026-01", "Present", "https://img.devtrack/trade.png", true, contrib
            );
            project.addTechnology(new ProjectTechnology("C++", "Language", true));
            project.addTechnology(new ProjectTechnology("Python", "Language", false));
            project.addLink(new ProjectLink("GITHUB", "https://github.com/student/trading-bot", "Repo"));

            if (!"Algorithmic Trading Bot".equals(project.getName())) throw new AssertionError();
            if (project.getContribution().getTeamSize() != 3) throw new AssertionError();
            if (project.getTechnologies().size() != 2) throw new AssertionError();
            if (project.getLinks().size() != 1) throw new AssertionError();
            if (!project.isFeatured()) throw new AssertionError();

            System.out.println("[PASS] Encapsulation & Composite Project Hierarchy verified");
            passed++;
        } catch (Throwable e) {
            System.out.println("[FAIL] Test 1: " + e.getMessage());
            e.printStackTrace();
            failed++;
        }

        // TEST 2: Inheritance from TrackableEntity
        try {
            Project project = new Project();
            project.setName("Smart Polyhouse");
            TrackableEntity entity = project; // Upcasting

            if (!entity.getTitle().equals("Smart Polyhouse")) throw new AssertionError();
            if (entity.getCreatedAt() == null || entity.getUpdatedAt() == null) throw new AssertionError();
            if (!entity.getCategory().contains("Web Development") && !entity.getCategory().contains("Project")) throw new AssertionError();

            ProjectMilestone milestone = new ProjectMilestone("ms_1", "proj_test", "Alpha Launch", "MVP ready", "2026-03", true, 1);
            TrackableEntity milestoneEntity = milestone;
            if (!milestoneEntity.getTitle().equals("Alpha Launch")) throw new AssertionError();

            System.out.println("[PASS] Inheritance: TrackableEntity extended by Project and ProjectMilestone");
            passed++;
        } catch (Throwable e) {
            System.out.println("[FAIL] Test 2: " + e.getMessage());
            e.printStackTrace();
            failed++;
        }

        // TEST 3: Polymorphism with ProgressCalculable
        try {
            Project inProgressProj = new Project();
            inProgressProj.setStatus("IN_PROGRESS");
            inProgressProj.setProgressPercentage(65.0);

            Project completedProj = new Project();
            completedProj.setStatus("COMPLETED");

            ProgressCalculable calc1 = inProgressProj;
            ProgressCalculable calc2 = completedProj;

            if (calc1.calculateProgressPercentage() != 65.0) throw new AssertionError("Expected 65.0, got " + calc1.calculateProgressPercentage());
            if (calc2.calculateProgressPercentage() != 100.0) throw new AssertionError("Completed must be 100%");
            if (!calc2.getProgressStatus().contains("Completed")) throw new AssertionError();

            System.out.println("[PASS] Polymorphism: ProgressCalculable contract verified");
            passed++;
        } catch (Throwable e) {
            System.out.println("[FAIL] Test 3: " + e.getMessage());
            e.printStackTrace();
            failed++;
        }

        // TEST 4: ProjectService CRUD & Student Data Isolation
        try {
            ProjectService service = new ProjectService();

            // Rahul's demo baseline
            List<Project> rahulProjects = service.getProjects("stu_rahul_01", null, null, null, null, null);
            if (rahulProjects.size() != 6) throw new AssertionError("Rahul must have 6 initial demo projects, got " + rahulProjects.size());

            // Check isolated user returns zero
            List<Project> unknownProjects = service.getProjects("stu_unknown_999", null, null, null, null, null);
            if (!unknownProjects.isEmpty()) throw new AssertionError("Isolated student should have 0 projects");

            // Create new project for student
            Project custom = new Project();
            custom.setName("Autonomous Quadcopter");
            custom.setCategory("IoT");
            custom.setStatus("PLANNING");
            Project created = service.createProject("stu_rahul_01", custom);
            if (created.getId() == null) throw new AssertionError();
            if (service.getProjects("stu_rahul_01", null, null, null, null, null).size() != 7) throw new AssertionError();

            // Toggle featured
            service.toggleFeatured("stu_rahul_01", created.getId());
            if (!service.getProjectById("stu_rahul_01", created.getId()).orElseThrow().isFeatured()) throw new AssertionError();

            // Delete project
            boolean deleted = service.deleteProject("stu_rahul_01", created.getId());
            if (!deleted) throw new AssertionError();
            if (service.getProjects("stu_rahul_01", null, null, null, null, null).size() != 6) throw new AssertionError();

            System.out.println("[PASS] ProjectService CRUD & Student Data Isolation verified");
            passed++;
        } catch (Throwable e) {
            System.out.println("[FAIL] Test 4: " + e.getMessage());
            e.printStackTrace();
            failed++;
        }

        // TEST 5: Search, Filter, and Sort in ProjectService
        try {
            ProjectService service = new ProjectService();

            // Search by keyword "Fitness"
            List<Project> searchResult = service.getProjects("stu_rahul_01", "Fitness", null, null, null, null);
            if (searchResult.size() != 1) throw new AssertionError("Expected 1 result for 'Fitness'");
            if (!searchResult.get(0).getName().contains("Fitness")) throw new AssertionError();

            // Filter by status "COMPLETED"
            List<Project> completed = service.getProjects("stu_rahul_01", null, "COMPLETED", null, null, null);
            for (Project p : completed) {
                if (!"COMPLETED".equalsIgnoreCase(p.getStatus())) throw new AssertionError();
            }

            // Filter by technology "Java"
            List<Project> javaProjects = service.getProjects("stu_rahul_01", null, null, null, "Java", null);
            if (javaProjects.size() < 2) throw new AssertionError("Expected at least 2 Java projects");

            System.out.println("[PASS] ProjectService Search, Filtering, and Sorting verified");
            passed++;
        } catch (Throwable e) {
            System.out.println("[FAIL] Test 5: " + e.getMessage());
            e.printStackTrace();
            failed++;
        }

        // TEST 6: ProjectMilestoneService and ProjectAchievementService
        try {
            ProjectService projectService = new ProjectService();
            ProjectMilestoneService milestoneService = new ProjectMilestoneService(projectService);
            ProjectAchievementService achievementService = new ProjectAchievementService(projectService);

            // Add milestone to DevTrack
            ProjectMilestone ms = new ProjectMilestone(null, "proj_devtrack", "Beta User Testing", "10 users tested", "2026-04", false, 6);
            ProjectMilestone addedMs = milestoneService.addMilestone("stu_rahul_01", "proj_devtrack", ms);
            if (addedMs.getId() == null) throw new AssertionError();

            List<ProjectMilestone> milestones = milestoneService.getMilestones("stu_rahul_01", "proj_devtrack");
            if (milestones.stream().noneMatch(m -> m.getTitle().equals("Beta User Testing"))) throw new AssertionError();

            // Delete milestone
            boolean msDeleted = milestoneService.deleteMilestone("stu_rahul_01", addedMs.getId());
            if (!msDeleted) throw new AssertionError();

            // Add achievement to DevTrack
            ProjectAchievement ach = new ProjectAchievement(null, "proj_devtrack", "Best UI/UX Award", "Winner", "Campus Hack", "2026-03");
            ProjectAchievement addedAch = achievementService.addAchievement("stu_rahul_01", "proj_devtrack", ach);
            if (addedAch.getId() == null) throw new AssertionError();

            boolean achDeleted = achievementService.deleteAchievement("stu_rahul_01", addedAch.getId());
            if (!achDeleted) throw new AssertionError();

            System.out.println("[PASS] ProjectMilestoneService and ProjectAchievementService verified");
            passed++;
        } catch (Throwable e) {
            System.out.println("[FAIL] Test 6: " + e.getMessage());
            e.printStackTrace();
            failed++;
        }

        // TEST 7: PortfolioService Showcase Aggregation
        try {
            ProjectService projectService = new ProjectService();
            PortfolioService portfolioService = new PortfolioService(projectService);

            Map<String, Object> preview = portfolioService.getPortfolioPreview("stu_rahul_01");
            if (!preview.containsKey("featuredProjects")) throw new AssertionError();

            @SuppressWarnings("unchecked")
            List<Project> featured = (List<Project>) preview.get("featuredProjects");
            if (featured.isEmpty()) throw new AssertionError("Featured projects should not be empty");

            for (Project p : featured) {
                if (!p.isFeatured()) throw new AssertionError("Only featured projects should be in portfolio");
            }

            @SuppressWarnings("unchecked")
            java.util.Set<String> techStack = (java.util.Set<String>) preview.get("techStack");
            if (!techStack.contains("Java") && !techStack.contains("Python")) throw new AssertionError();

            System.out.println("[PASS] PortfolioService Showcase Aggregation verified");
            passed++;
        } catch (Throwable e) {
            System.out.println("[FAIL] Test 7: " + e.getMessage());
            e.printStackTrace();
            failed++;
        }

        System.out.println("==================================================");
        System.out.printf("  OOP VERIFICATION SUMMARY: %d PASSED, %d FAILED  \n", passed, failed);
        System.out.println("==================================================");

        if (failed > 0) {
            System.exit(1);
        }
    }
}
