package com.devtrack.module5_achievements;

import org.springframework.stereotype.Service;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

/**
 * Service Layer managing Student Achievements, dynamic category activation,
 * search/filter capabilities, and data isolation.
 */
@Service
public class AchievementService {

    private final Map<String, List<Achievement>> studentAchievementsMap = new ConcurrentHashMap<>();
    private final Map<String, Set<String>> studentActiveCategoriesMap = new ConcurrentHashMap<>();
    private final String DEMO_STUDENT_ID = "stu_rahul_01";

    public AchievementService() {
        initRahulDemoAchievements();
    }

    private void initRahulDemoAchievements() {
        List<Achievement> list = new ArrayList<>();

        // 1. Hack Celestial 3.0 (Hackathon Winner)
        HackathonAchievement hack1 = new HackathonAchievement(
                "ach_hack_1", DEMO_STUDENT_ID, "Top 5 Finalist & Best IoT Solution – Hack Celestial 3.0",
                "Devfolio", "https://hackcelestial.dev", "2025-11-14", "2025-11-16",
                "Winner", "Top 5 Finalist & Best IoT Award", "Smart Polyhouse Monitoring System",
                "Byte Busters", "Rahul, Amit, Priya, Sneha", "Embedded C++ Lead",
                "Built autonomous greenhouse environmental monitor with MQTT telemetry. Won cash prize of ₹25,000.",
                "https://devtrack.demo/proof/hack_celestial_cert.png",
                Arrays.asList("C++", "ESP32", "MQTT", "IoT")
        );
        list.add(hack1);

        // 2. Smart India Hackathon Internal Qualifier
        HackathonAchievement hack2 = new HackathonAchievement(
                "ach_hack_2", DEMO_STUDENT_ID, "SIH 2025 Internal Round Qualifier",
                "SIH Portal", "https://sih.gov.in", "2025-09-20", "2025-09-22",
                "Finalist", "College Round Qualifier", "AI Disaster Alert & Dispatch",
                "Apex Innovators", "Rahul, Rohan, Meera, Karan, Anita, Vikram", "Full Stack Developer",
                "Disaster management resource routing and crowd-sourced alert distribution software.",
                "https://devtrack.demo/proof/sih_qualifier.png",
                Arrays.asList("Java", "Spring Boot", "React", "PostgreSQL")
        );
        list.add(hack2);

        // 3. TechSprint AI/ML Challenge
        HackathonAchievement hack3 = new HackathonAchievement(
                "ach_hack_3", DEMO_STUDENT_ID, "TechSprint AI/ML Challenge – Special Mention",
                "Unstop", "https://unstop.com", "2026-01-10", "2026-01-12",
                "Special Mention", "Special Mention for UI/UX & Execution", "EduAdaptive Learning Bot",
                "NeuralNodes", "Rahul, Divya, Arjun", "Frontend & ML Pipeline Engineer",
                "Personalized adaptive learning chatbot with quiz feedback generation using open LLMs.",
                "https://devtrack.demo/proof/techsprint_cert.pdf",
                Arrays.asList("Python", "React", "OpenAI API", "Tailwind CSS")
        );
        list.add(hack3);

        // 4. Dept OOP Code Sprint
        Achievement sprint = new Achievement(
                "ach_oop_1", DEMO_STUDENT_ID, "2nd Place – Department OOP Code Sprint",
                "Competition", "CSE Department", "2025-10-15",
                "Designed an elegant object-oriented inventory simulation in Java in under 3 hours demonstrating SOLID principles.",
                "Lead Java Developer", "Solo", "Rahul",
                "https://devtrack.demo/proof/oop_sprint_award.pdf",
                Arrays.asList("Java", "OOP Principles", "JavaFX", "Design Patterns")
        );
        list.add(sprint);

        // 5. Google Cloud Student Innovator Workshop
        Achievement workshop = new Achievement(
                "ach_work_1", DEMO_STUDENT_ID, "Google Cloud Student Innovator Workshop",
                "Workshop", "Google Developer Groups (GDG)", "2025-12-05",
                "Completed hands-on labs on Google Cloud Platform, Vertex AI model deployments, and Kubernetes engines.",
                "Participant & Lab Completer", "Solo", "Rahul",
                "https://devtrack.demo/proof/gdg_cloud_badge.png",
                Arrays.asList("Cloud Computing", "GCP", "Kubernetes", "Vertex AI")
        );
        list.add(workshop);

        // 6. Selected for National Technical Symposium
        Achievement academic = new Achievement(
                "ach_acad_1", DEMO_STUDENT_ID, "Selected for National Technical Symposium Presentation",
                "Academic", "Apex Technical Society", "2026-01-28",
                "Selected to present student research work on computer vision heuristics for assistive athletic recovery.",
                "Presenter / First Author", "Neural Research Group", "Rahul, Dr. S. Sharma",
                "https://devtrack.demo/proof/symposium_acceptance.pdf",
                Arrays.asList("Computer Vision", "Python", "MediaPipe", "Research Writing")
        );
        list.add(academic);

        studentAchievementsMap.put(DEMO_STUDENT_ID, list);

        // Dynamic categories activated for Rahul based on his achievements
        Set<String> activeCats = new LinkedHashSet<>();
        activeCats.add("Hackathon Achievement");
        activeCats.add("Competition");
        activeCats.add("Workshop");
        activeCats.add("Academic");
        studentActiveCategoriesMap.put(DEMO_STUDENT_ID, activeCats);
        studentActiveCategoriesMap.put("student_rahul_001", activeCats);
        studentAchievementsMap.put("student_rahul_001", list);
    }

    private String normalizeId(String studentId) {
        if (studentId == null || studentId.trim().isEmpty() || studentId.contains("rahul")) {
            return DEMO_STUDENT_ID;
        }
        return studentId.trim();
    }

    public List<Achievement> getAchievements(String studentId, String category, String search) {
        String key = normalizeId(studentId);
        List<Achievement> all = studentAchievementsMap.computeIfAbsent(key, k -> new ArrayList<>());

        return all.stream()
                .filter(a -> {
                    if (category != null && !category.trim().isEmpty() && !category.equalsIgnoreCase("ALL")) {
                        if (!a.getAchievementCategory().equalsIgnoreCase(category.trim())) {
                            return false;
                        }
                    }
                    if (search != null && !search.trim().isEmpty()) {
                        String q = search.toLowerCase().trim();
                        boolean mTitle = a.getTitle().toLowerCase().contains(q);
                        boolean mOrg = a.getOrganization().toLowerCase().contains(q);
                        boolean mDesc = a.getDescription().toLowerCase().contains(q);
                        boolean mSkill = a.getRelatedSkills().stream().anyMatch(s -> s.toLowerCase().contains(q));
                        if (!mTitle && !mOrg && !mDesc && !mSkill) return false;
                    }
                    return true;
                })
                .sorted((a, b) -> (b.getAchievementDate() != null ? b.getAchievementDate() : "")
                        .compareTo(a.getAchievementDate() != null ? a.getAchievementDate() : ""))
                .collect(Collectors.toList());
    }

    public Optional<Achievement> getAchievementById(String studentId, String id) {
        return studentAchievementsMap.computeIfAbsent(studentId, k -> new ArrayList<>())
                .stream()
                .filter(a -> a.getId().equalsIgnoreCase(id))
                .findFirst();
    }

    public Achievement addAchievement(String studentId, Achievement achievement) {
        if (achievement.getTitle() == null || achievement.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("Achievement title is required.");
        }
        achievement.setStudentId(studentId);

        // Activate the category automatically
        if (achievement.getAchievementCategory() != null && !achievement.getAchievementCategory().trim().isEmpty()) {
            activateCategory(studentId, achievement.getAchievementCategory().trim());
        }

        List<Achievement> list = studentAchievementsMap.computeIfAbsent(studentId, k -> new ArrayList<>());
        list.add(0, achievement);
        return achievement;
    }

    public Achievement updateAchievement(String studentId, String id, Achievement updated) {
        Achievement existing = getAchievementById(studentId, id)
                .orElseThrow(() -> new NoSuchElementException("Achievement not found with ID: " + id));

        if (updated.getTitle() != null && !updated.getTitle().trim().isEmpty()) {
            existing.setTitle(updated.getTitle().trim());
        }
        if (updated.getAchievementCategory() != null) {
            existing.setAchievementCategory(updated.getAchievementCategory());
            activateCategory(studentId, updated.getAchievementCategory());
        }
        if (updated.getOrganization() != null) existing.setOrganization(updated.getOrganization());
        if (updated.getAchievementDate() != null) existing.setAchievementDate(updated.getAchievementDate());
        if (updated.getDescription() != null) existing.setDescription(updated.getDescription());
        if (updated.getRole() != null) existing.setRole(updated.getRole());
        if (updated.getTeamName() != null) existing.setTeamName(updated.getTeamName());
        if (updated.getTeamMembers() != null) existing.setTeamMembers(updated.getTeamMembers());
        if (updated.getProofUrl() != null) existing.setProofUrl(updated.getProofUrl());
        if (updated.getRelatedSkills() != null) existing.setRelatedSkills(updated.getRelatedSkills());

        existing.touch();
        return existing;
    }

    public boolean deleteAchievement(String studentId, String id) {
        List<Achievement> list = studentAchievementsMap.computeIfAbsent(studentId, k -> new ArrayList<>());
        return list.removeIf(a -> a.getId().equalsIgnoreCase(id));
    }

    public Set<String> getActiveCategories(String studentId) {
        String key = normalizeId(studentId);
        return studentActiveCategoriesMap.computeIfAbsent(key, k -> new LinkedHashSet<>());
    }

    public void activateCategory(String studentId, String category) {
        String key = normalizeId(studentId);
        if (category != null && !category.trim().isEmpty()) {
            studentActiveCategoriesMap.computeIfAbsent(key, k -> new LinkedHashSet<>()).add(category.trim());
        }
    }
}
