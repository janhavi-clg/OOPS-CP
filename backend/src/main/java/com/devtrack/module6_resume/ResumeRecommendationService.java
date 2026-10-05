package com.devtrack.module6_resume;

import org.springframework.stereotype.Service;

import java.util.*;

/**
 * ResumeRecommendationService handles role recommendations, profile matching calculations,
 * and skill gap analyses.
 * Demonstrates:
 * - OOP Service Layer Architecture
 * - Delegation to JobRoleAnalyzer
 */
@Service
public class ResumeRecommendationService {

    private final JobRoleAnalyzer analyzer;

    public ResumeRecommendationService() {
        this.analyzer = new JobRoleAnalyzer();
    }

    public List<JobRole> getStandardRoles() {
        return analyzer.getStandardRoles();
    }

    public ResumeRecommendation generateRecommendations(String studentId, String targetRole, String jobDescription,
                                                        List<String> studentSkills,
                                                        List<Map<String, Object>> studentProjects,
                                                        List<Map<String, Object>> studentAchievements) {
        // If caller passed null lists, supply Rahul's baseline cross-module data
        List<String> skills = studentSkills;
        if (skills == null || skills.isEmpty()) {
            skills = Arrays.asList("Python", "Java", "Data Structures & Algorithms", "SQL", "React", "PyTorch", "Git", "PostgreSQL", "Machine Learning", "FastAPI");
        }

        List<Map<String, Object>> projects = studentProjects;
        if (projects == null || projects.isEmpty()) {
            projects = new ArrayList<>();
            Map<String, Object> p1 = new HashMap<>();
            p1.put("id", "proj_devtrack_01");
            p1.put("title", "DevTrack - Developer Progress Portfolio");
            p1.put("category", "Web Application");
            p1.put("technologies", Arrays.asList("React", "Java", "Spring Boot", "PostgreSQL"));
            projects.add(p1);

            Map<String, Object> p2 = new HashMap<>();
            p2.put("id", "proj_aeromatrix_01");
            p2.put("title", "AeroMatrix - AI Flight Trajectory Optimizer");
            p2.put("category", "AI / ML");
            p2.put("technologies", Arrays.asList("Python", "PyTorch", "FastAPI", "NumPy"));
            projects.add(p2);

            Map<String, Object> p3 = new HashMap<>();
            p3.put("id", "proj_polyhouse_01");
            p3.put("title", "Smart Polyhouse Precision Agriculture IoT");
            p3.put("category", "IoT / Web");
            p3.put("technologies", Arrays.asList("ESP32", "Python", "MQTT", "React"));
            projects.add(p3);

            Map<String, Object> p4 = new HashMap<>();
            p4.put("id", "proj_fitness_01");
            p4.put("title", "AI Fitness Pose Corrector");
            p4.put("category", "AI / ML");
            p4.put("technologies", Arrays.asList("Python", "OpenCV", "MediaPipe"));
            projects.add(p4);
        }

        List<Map<String, Object>> achievements = studentAchievements;
        if (achievements == null || achievements.isEmpty()) {
            achievements = new ArrayList<>();
            Map<String, Object> a1 = new HashMap<>();
            a1.put("id", "ach_hack_celestial_01");
            a1.put("title", "Winner - Hack Celestial 3.0");
            a1.put("category", "Hackathon");
            a1.put("organization", "National Level / Devfolio");
            achievements.add(a1);

            Map<String, Object> a2 = new HashMap<>();
            a2.put("id", "ach_comp_sih_01");
            a2.put("title", "Smart India Hackathon Finalist");
            a2.put("category", "Competition");
            a2.put("organization", "Ministry of Education");
            achievements.add(a2);

            Map<String, Object> a3 = new HashMap<>();
            a3.put("id", "cert_py_01");
            a3.put("title", "Python for Data Science Certification");
            a3.put("category", "Certification");
            a3.put("organization", "Coursera / DeepLearning.AI");
            achievements.add(a3);
        }

        return analyzer.analyzeMatch(targetRole, jobDescription, skills, projects, achievements);
    }
}
