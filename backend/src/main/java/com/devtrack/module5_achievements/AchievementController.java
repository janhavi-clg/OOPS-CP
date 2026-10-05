package com.devtrack.module5_achievements;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/achievements")
@CrossOrigin(origins = "*")
public class AchievementController {

    private final AchievementService achievementService;
    private final String CURRENT_STUDENT_ID = "stu_rahul_01";

    public AchievementController(AchievementService achievementService) {
        this.achievementService = achievementService;
    }

    @GetMapping
    public ResponseEntity<List<Achievement>> getAchievements(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search) {
        return ResponseEntity.ok(achievementService.getAchievements(CURRENT_STUDENT_ID, category, search));
    }

    @GetMapping("/categories")
    public ResponseEntity<Set<String>> getActiveCategories() {
        return ResponseEntity.ok(achievementService.getActiveCategories(CURRENT_STUDENT_ID));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getAchievementById(@PathVariable String id) {
        return achievementService.getAchievementById(CURRENT_STUDENT_ID, id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<?> createAchievement(@RequestBody Achievement achievement) {
        try {
            Achievement created = achievementService.addAchievement(CURRENT_STUDENT_ID, achievement);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateAchievement(@PathVariable String id, @RequestBody Achievement updated) {
        try {
            Achievement result = achievementService.updateAchievement(CURRENT_STUDENT_ID, id, updated);
            return ResponseEntity.ok(result);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAchievement(@PathVariable String id) {
        boolean removed = achievementService.deleteAchievement(CURRENT_STUDENT_ID, id);
        if (removed) {
            return ResponseEntity.ok(Map.of("message", "Achievement successfully removed.", "id", id));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Achievement not found."));
    }
}
