package com.devtrack.module6_resume;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/resumes")
@CrossOrigin(origins = "*")
public class ResumeRecommendationController {

    private final ResumeRecommendationService recommendationService;

    public ResumeRecommendationController(ResumeRecommendationService recommendationService) {
        this.recommendationService = recommendationService;
    }

    @GetMapping("/roles")
    public ResponseEntity<List<JobRole>> getStandardJobRoles() {
        return ResponseEntity.ok(recommendationService.getStandardRoles());
    }

    @PostMapping("/recommendations")
    public ResponseEntity<ResumeRecommendation> getRecommendations(@RequestBody Map<String, Object> requestBody,
                                                                   @RequestParam(value = "studentId", defaultValue = "student_rahul_001") String studentId) {
        String targetRole = (String) requestBody.get("targetRole");
        String jobDescription = (String) requestBody.get("jobDescription");

        @SuppressWarnings("unchecked")
        List<String> skills = (List<String>) requestBody.get("skills");
        @SuppressWarnings("unchecked")
        List<Map<String, Object>> projects = (List<Map<String, Object>>) requestBody.get("projects");
        @SuppressWarnings("unchecked")
        List<Map<String, Object>> achievements = (List<Map<String, Object>>) requestBody.get("achievements");

        ResumeRecommendation rec = recommendationService.generateRecommendations(
                studentId, targetRole, jobDescription, skills, projects, achievements
        );
        return ResponseEntity.ok(rec);
    }
}
