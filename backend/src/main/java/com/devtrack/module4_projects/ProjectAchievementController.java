package com.devtrack.module4_projects;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

/**
 * REST Controller for Project Achievements.
 * Endpoints:
 * - GET    /api/projects/{projectId}/achievements
 * - POST   /api/projects/{projectId}/achievements
 * - DELETE /api/achievements/{achievementId}
 */
@RestController
@CrossOrigin(origins = "*")
public class ProjectAchievementController {

    private final ProjectAchievementService achievementService;
    private final String CURRENT_STUDENT_ID = "stu_rahul_01";

    public ProjectAchievementController(ProjectAchievementService achievementService) {
        this.achievementService = achievementService;
    }

    @GetMapping("/api/projects/{projectId}/achievements")
    public ResponseEntity<?> getAchievements(@PathVariable String projectId) {
        try {
            List<ProjectAchievement> list = achievementService.getAchievements(CURRENT_STUDENT_ID, projectId);
            return ResponseEntity.ok(list);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/api/projects/{projectId}/achievements")
    public ResponseEntity<?> addAchievement(@PathVariable String projectId, @RequestBody ProjectAchievement achievement) {
        try {
            ProjectAchievement created = achievementService.addAchievement(CURRENT_STUDENT_ID, projectId, achievement);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/api/achievements/{achievementId}")
    public ResponseEntity<?> deleteAchievement(@PathVariable String achievementId) {
        boolean deleted = achievementService.deleteAchievement(CURRENT_STUDENT_ID, achievementId);
        if (deleted) {
            return ResponseEntity.ok(Map.of("message", "Achievement removed successfully.", "id", achievementId));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Achievement not found."));
    }
}
