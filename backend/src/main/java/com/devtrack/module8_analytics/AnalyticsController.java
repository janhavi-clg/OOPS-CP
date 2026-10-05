package com.devtrack.module8_analytics;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "*")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    @GetMapping
    public ResponseEntity<Analytics> getAnalytics(@RequestParam(value = "studentId", defaultValue = "student_rahul_001") String studentId,
                                                 @RequestParam(value = "timeRange", defaultValue = "month") String timeRange) {
        Analytics analytics = analyticsService.getStudentAnalytics(studentId, timeRange);
        return ResponseEntity.ok(analytics);
    }

    @GetMapping("/insights")
    public ResponseEntity<List<DevTrackInsight>> getInsights(@RequestParam(value = "studentId", defaultValue = "student_rahul_001") String studentId) {
        Analytics analytics = analyticsService.getStudentAnalytics(studentId, "month");
        return ResponseEntity.ok(analytics.getInsights());
    }

    @GetMapping("/recommendations")
    public ResponseEntity<List<Recommendation>> getRecommendations(@RequestParam(value = "studentId", defaultValue = "student_rahul_001") String studentId) {
        Analytics analytics = analyticsService.getStudentAnalytics(studentId, "month");
        return ResponseEntity.ok(analytics.getRecommendations());
    }

    @GetMapping("/timeline")
    public ResponseEntity<List<DevelopmentActivity>> getTimeline(@RequestParam(value = "studentId", defaultValue = "student_rahul_001") String studentId) {
        Analytics analytics = analyticsService.getStudentAnalytics(studentId, "month");
        return ResponseEntity.ok(analytics.getTimeline());
    }
}
