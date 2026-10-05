package com.devtrack.module4_projects;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

/**
 * REST Controller for Student Projects.
 * Endpoints:
 * - GET    /api/projects
 * - POST   /api/projects
 * - GET    /api/projects/{id}
 * - PUT    /api/projects/{id}
 * - DELETE /api/projects/{id}
 * - PUT    /api/projects/{id}/feature
 * - GET    /api/projects/overview
 */
@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "*")
public class ProjectController {

    private final ProjectService projectService;
    private final String CURRENT_STUDENT_ID = "stu_rahul_01";

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public ResponseEntity<List<Project>> getProjects(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String tech,
            @RequestParam(required = false, defaultValue = "RECENT") String sort) {
        List<Project> projects = projectService.getProjects(CURRENT_STUDENT_ID, search, status, category, tech, sort);
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/overview")
    public ResponseEntity<Map<String, Object>> getOverviewStats() {
        Map<String, Object> stats = projectService.getOverviewStats(CURRENT_STUDENT_ID);
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProjectById(@PathVariable String id) {
        return projectService.getProjectById(CURRENT_STUDENT_ID, id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<?> createProject(@RequestBody Project project) {
        try {
            Project created = projectService.createProject(CURRENT_STUDENT_ID, project);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProject(@PathVariable String id, @RequestBody Project updated) {
        try {
            Project result = projectService.updateProject(CURRENT_STUDENT_ID, id, updated);
            return ResponseEntity.ok(result);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable String id) {
        boolean removed = projectService.deleteProject(CURRENT_STUDENT_ID, id);
        if (removed) {
            return ResponseEntity.ok(Map.of("message", "Project successfully removed.", "id", id));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Project not found."));
    }

    @PutMapping("/{id}/feature")
    public ResponseEntity<?> toggleFeatured(@PathVariable String id) {
        try {
            Project result = projectService.toggleFeatured(CURRENT_STUDENT_ID, id);
            return ResponseEntity.ok(result);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }
}
