package com.devtrack.module2_skills;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

/**
 * REST Controller for Learning Resources (Module 2).
 */
@RestController
@CrossOrigin(origins = "*")
public class LearningResourceController {

    private final LearningResourceService resourceService;

    public LearningResourceController(LearningResourceService resourceService) {
        this.resourceService = resourceService;
    }

    @GetMapping("/api/v1/resources")
    public ResponseEntity<List<LearningResource>> getAllResources(
            @RequestHeader(value = "X-Student-Id", required = false, defaultValue = "stu_rahul_01") String studentId) {
        return ResponseEntity.ok(resourceService.getResources(studentId));
    }

    @GetMapping("/api/v1/skills/{skillId}/resources")
    public ResponseEntity<List<LearningResource>> getResourcesBySkill(
            @RequestHeader(value = "X-Student-Id", required = false, defaultValue = "stu_rahul_01") String studentId,
            @PathVariable String skillId) {
        return ResponseEntity.ok(resourceService.getResourcesBySkill(studentId, skillId));
    }

    @PostMapping("/api/v1/resources")
    public ResponseEntity<?> addResource(
            @RequestHeader(value = "X-Student-Id", required = false, defaultValue = "stu_rahul_01") String studentId,
            @RequestBody LearningResource resource) {
        try {
            LearningResource created = resourceService.addResource(studentId, resource);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/api/v1/resources/{id}/complete")
    public ResponseEntity<?> toggleComplete(
            @RequestHeader(value = "X-Student-Id", required = false, defaultValue = "stu_rahul_01") String studentId,
            @PathVariable String id,
            @RequestBody Map<String, Boolean> body) {
        try {
            boolean completed = body.getOrDefault("completed", true);
            LearningResource updated = resourceService.toggleComplete(studentId, id, completed);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/api/v1/resources/{id}")
    public ResponseEntity<?> updateResource(
            @RequestHeader(value = "X-Student-Id", required = false, defaultValue = "stu_rahul_01") String studentId,
            @PathVariable String id,
            @RequestBody LearningResource resource) {
        try {
            LearningResource updated = resourceService.updateResource(studentId, id, resource);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/api/v1/resources/{id}")
    public ResponseEntity<?> deleteResource(
            @RequestHeader(value = "X-Student-Id", required = false, defaultValue = "stu_rahul_01") String studentId,
            @PathVariable String id) {
        boolean removed = resourceService.deleteResource(studentId, id);
        if (removed) {
            return ResponseEntity.ok(Map.of("message", "Learning resource deleted successfully."));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
