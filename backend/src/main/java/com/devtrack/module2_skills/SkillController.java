package com.devtrack.module2_skills;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

/**
 * REST Controller for Managing Student Tracked Skills (Module 2).
 */
@RestController
@RequestMapping("/api/v1/skills")
@CrossOrigin(origins = "*")
public class SkillController {

    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @GetMapping
    public ResponseEntity<List<TrackedSkill>> getSkills(
            @RequestHeader(value = "X-Student-Id", required = false, defaultValue = "stu_rahul_01") String studentId) {
        return ResponseEntity.ok(skillService.getSkills(studentId));
    }

    @GetMapping("/available")
    public ResponseEntity<List<String>> getAvailableSkills() {
        return ResponseEntity.ok(skillService.getAvailableStandardSkills());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TrackedSkill> getSkillById(
            @RequestHeader(value = "X-Student-Id", required = false, defaultValue = "stu_rahul_01") String studentId,
            @PathVariable String id) {
        return skillService.getSkillById(studentId, id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> addSkill(
            @RequestHeader(value = "X-Student-Id", required = false, defaultValue = "stu_rahul_01") String studentId,
            @RequestBody TrackedSkill skill) {
        try {
            TrackedSkill created = skillService.addSkill(studentId, skill);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/custom")
    public ResponseEntity<?> addCustomSkill(
            @RequestHeader(value = "X-Student-Id", required = false, defaultValue = "stu_rahul_01") String studentId,
            @RequestBody Map<String, String> body) {
        try {
            String name = body.get("name");
            String category = body.getOrDefault("category", "Custom");
            String currentLevel = body.getOrDefault("currentLevel", "Beginner");
            String targetLevel = body.getOrDefault("targetLevel", "Advanced");

            TrackedSkill custom = skillService.addCustomSkill(studentId, name, category, currentLevel, targetLevel);
            return ResponseEntity.status(HttpStatus.CREATED).body(custom);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateSkill(
            @RequestHeader(value = "X-Student-Id", required = false, defaultValue = "stu_rahul_01") String studentId,
            @PathVariable String id,
            @RequestBody TrackedSkill skill) {
        try {
            TrackedSkill updated = skillService.updateSkill(studentId, id, skill);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeSkill(
            @RequestHeader(value = "X-Student-Id", required = false, defaultValue = "stu_rahul_01") String studentId,
            @PathVariable String id) {
        boolean removed = skillService.removeSkill(studentId, id);
        if (removed) {
            return ResponseEntity.ok(Map.of("message", "Skill removed successfully from tracker."));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
