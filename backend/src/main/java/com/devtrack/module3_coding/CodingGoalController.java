package com.devtrack.module3_coding;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

/**
 * REST Controller for Coding Goals (Module 3).
 */
@RestController
@RequestMapping("/api/v1/coding/goals")
@CrossOrigin(origins = "*")
public class CodingGoalController {

    private final CodingGoalService goalService;

    public CodingGoalController(CodingGoalService goalService) {
        this.goalService = goalService;
    }

    @GetMapping
    public ResponseEntity<List<CodingGoal>> getGoals(
            @RequestHeader(value = "X-Student-Id", required = false, defaultValue = "stu_rahul_01") String studentId) {
        return ResponseEntity.ok(goalService.getGoals(studentId));
    }

    @PostMapping
    public ResponseEntity<?> addGoal(
            @RequestHeader(value = "X-Student-Id", required = false, defaultValue = "stu_rahul_01") String studentId,
            @RequestBody CodingGoal goal) {
        try {
            CodingGoal created = goalService.addGoal(studentId, goal);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateGoal(
            @RequestHeader(value = "X-Student-Id", required = false, defaultValue = "stu_rahul_01") String studentId,
            @PathVariable String id,
            @RequestBody CodingGoal goal) {
        try {
            CodingGoal updated = goalService.updateGoal(studentId, id, goal);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteGoal(
            @RequestHeader(value = "X-Student-Id", required = false, defaultValue = "stu_rahul_01") String studentId,
            @PathVariable String id) {
        boolean removed = goalService.deleteGoal(studentId, id);
        if (removed) {
            return ResponseEntity.ok(Map.of("message", "Coding goal deleted successfully."));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
