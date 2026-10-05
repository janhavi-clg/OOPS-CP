package com.devtrack.module2_skills;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

/**
 * REST Controller for Solved Practice Problems (Module 2).
 * Stores solution code and problem metadata. Never executes user code.
 */
@RestController
@CrossOrigin(origins = "*")
public class PracticeProblemController {

    private final PracticeProblemService problemService;

    public PracticeProblemController(PracticeProblemService problemService) {
        this.problemService = problemService;
    }

    @GetMapping("/api/v1/problems")
    public ResponseEntity<List<PracticeProblem>> getAllProblems(
            @RequestHeader(value = "X-Student-Id", required = false, defaultValue = "stu_rahul_01") String studentId) {
        return ResponseEntity.ok(problemService.getProblems(studentId));
    }

    @GetMapping("/api/v1/skills/{skillId}/problems")
    public ResponseEntity<List<PracticeProblem>> getProblemsBySkill(
            @RequestHeader(value = "X-Student-Id", required = false, defaultValue = "stu_rahul_01") String studentId,
            @PathVariable String skillId) {
        return ResponseEntity.ok(problemService.getProblemsBySkill(studentId, skillId));
    }

    @GetMapping("/api/v1/problems/{id}")
    public ResponseEntity<PracticeProblem> getProblemById(
            @RequestHeader(value = "X-Student-Id", required = false, defaultValue = "stu_rahul_01") String studentId,
            @PathVariable String id) {
        return problemService.getProblemById(studentId, id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/api/v1/problems")
    public ResponseEntity<?> addProblem(
            @RequestHeader(value = "X-Student-Id", required = false, defaultValue = "stu_rahul_01") String studentId,
            @RequestBody PracticeProblem problem) {
        try {
            PracticeProblem created = problemService.addProblem(studentId, problem);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/api/v1/problems/{id}")
    public ResponseEntity<?> updateProblem(
            @RequestHeader(value = "X-Student-Id", required = false, defaultValue = "stu_rahul_01") String studentId,
            @PathVariable String id,
            @RequestBody PracticeProblem problem) {
        try {
            PracticeProblem updated = problemService.updateProblem(studentId, id, problem);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/api/v1/problems/{id}")
    public ResponseEntity<?> deleteProblem(
            @RequestHeader(value = "X-Student-Id", required = false, defaultValue = "stu_rahul_01") String studentId,
            @PathVariable String id) {
        boolean removed = problemService.deleteProblem(studentId, id);
        if (removed) {
            return ResponseEntity.ok(Map.of("message", "Practice problem deleted successfully."));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
