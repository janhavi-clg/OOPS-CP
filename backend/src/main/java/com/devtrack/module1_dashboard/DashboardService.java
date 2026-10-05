package com.devtrack.module1_dashboard;

import com.devtrack.core.model.StudentProfile;
import com.devtrack.demo.DemoDataProvider;
import org.springframework.stereotype.Service;

/**
 * Service class for Module 1 (Dashboard).
 * Handles retrieval and aggregation of dashboard data for student profiles.
 */
@Service
public class DashboardService {

    public StudentProfile getDemoProfile() {
        return DemoDataProvider.getRahulProfile();
    }

    public DashboardSummaryDTO getDashboardSummary() {
        StudentProfile profile = getDemoProfile();
        return DashboardSummaryDTO.fromStudentProfile(profile);
    }
}
