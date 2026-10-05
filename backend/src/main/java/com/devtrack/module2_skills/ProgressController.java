package com.devtrack.module2_skills;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

/**
 * REST Controller for Skills & Learning Progress Tracking (Module 2).
 */
@RestController
@CrossOrigin(origins = "*")
public class ProgressController {

    private final ProgressService progressService;

    public ProgressController(ProgressService progressService) {
        this.progressService = progressService;
    }

    @GetMapping("/api/v1/skills/{skillId}/progress")
    public ResponseEntity<LearningProgress> getSkillProgress(
            @RequestHeader(value = "X-Student-Id", required = false, defaultValue = "stu_rahul_01") String studentId,
            @PathVariable String skillId) {
        try {
            return ResponseEntity.ok(progressService.getSkillProgress(studentId, skillId));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/api/v1/progress/all")
    public ResponseEntity<List<LearningProgress>> getAllSkillsProgress(
            @RequestHeader(value = "X-Student-Id", required = false, defaultValue = "stu_rahul_01") String studentId) {
        return ResponseEntity.ok(progressService.getAllSkillsProgress(studentId));
    }

    @GetMapping("/api/v1/progress/summary")
    public ResponseEntity<Map<String, Object>> getOverallSummary(
            @RequestHeader(value = "X-Student-Id", required = false, defaultValue = "stu_rahul_01") String studentId) {
        return ResponseEntity.ok(progressService.getOverallSummary(studentId));
    }
}
