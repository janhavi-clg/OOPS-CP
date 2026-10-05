package com.devtrack.module1_dashboard;

import com.devtrack.core.model.StudentProfile;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * REST Controller for Module 1 (Dashboard).
 * Provides endpoints for retrieving student dashboard data.
 */
@RestController
@RequestMapping("/api/v1/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/summary")
    public ResponseEntity<DashboardSummaryDTO> getDashboardSummary() {
        return ResponseEntity.ok(dashboardService.getDashboardSummary());
    }

    @GetMapping("/demo-profile")
    public ResponseEntity<StudentProfile> getDemoProfile() {
        return ResponseEntity.ok(dashboardService.getDemoProfile());
    }
}
