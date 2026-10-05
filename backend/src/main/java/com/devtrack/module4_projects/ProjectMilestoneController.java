package com.devtrack.module4_projects;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

/**
 * REST Controller for Project Milestones.
 * Endpoints:
 * - GET    /api/projects/{projectId}/milestones
 * - POST   /api/projects/{projectId}/milestones
 * - PUT    /api/milestones/{milestoneId}
 * - DELETE /api/milestones/{milestoneId}
 */
@RestController
@CrossOrigin(origins = "*")
public class ProjectMilestoneController {

    private final ProjectMilestoneService milestoneService;
    private final String CURRENT_STUDENT_ID = "stu_rahul_01";

    public ProjectMilestoneController(ProjectMilestoneService milestoneService) {
        this.milestoneService = milestoneService;
    }

    @GetMapping("/api/projects/{projectId}/milestones")
    public ResponseEntity<?> getMilestones(@PathVariable String projectId) {
        try {
            List<ProjectMilestone> milestones = milestoneService.getMilestones(CURRENT_STUDENT_ID, projectId);
            return ResponseEntity.ok(milestones);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/api/projects/{projectId}/milestones")
    public ResponseEntity<?> addMilestone(@PathVariable String projectId, @RequestBody ProjectMilestone milestone) {
        try {
            ProjectMilestone created = milestoneService.addMilestone(CURRENT_STUDENT_ID, projectId, milestone);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/api/milestones/{milestoneId}")
    public ResponseEntity<?> updateMilestone(@PathVariable String milestoneId, @RequestBody ProjectMilestone updated) {
        try {
            ProjectMilestone result = milestoneService.updateMilestone(CURRENT_STUDENT_ID, milestoneId, updated);
            return ResponseEntity.ok(result);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/api/milestones/{milestoneId}")
    public ResponseEntity<?> deleteMilestone(@PathVariable String milestoneId) {
        boolean deleted = milestoneService.deleteMilestone(CURRENT_STUDENT_ID, milestoneId);
        if (deleted) {
            return ResponseEntity.ok(Map.of("message", "Milestone removed successfully.", "id", milestoneId));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Milestone not found."));
    }
}
