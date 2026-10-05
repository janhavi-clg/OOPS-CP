package com.devtrack.module1_profile;

import com.devtrack.core.model.StudentProfile;
import com.devtrack.demo.DemoDataProvider;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

/**
 * Service Layer for Module 1 (Student Profile, Portfolio & Hackathon Management).
 * Implements business validation, CRUD operations, filtering, and data persistence.
 */
@Service
public class Module1ProfileService {

    // Thread-safe in-memory stores keyed by ID
    private final Map<String, StudentProfile> studentProfiles = new ConcurrentHashMap<>();
    private final Map<String, List<DeveloperLink>> studentLinks = new ConcurrentHashMap<>();
    private final Map<String, List<Module1Hackathon>> studentHackathons = new ConcurrentHashMap<>();

    private final String DEMO_STUDENT_ID = "stu_rahul_01";

    public Module1ProfileService() {
        initDemoData();
    }

    private void initDemoData() {
        // Initialize Rahul's Profile from central provider
        StudentProfile rahul = DemoDataProvider.getRahulProfile();
        studentProfiles.put(DEMO_STUDENT_ID, rahul);

        // Pre-populate Developer Links
        List<DeveloperLink> links = new ArrayList<>();
        links.add(new DeveloperLink("link_1", DEMO_STUDENT_ID, "GitHub", "https://github.com/rahul-demo", "rahul-demo", false));
        links.add(new DeveloperLink("link_2", DEMO_STUDENT_ID, "LinkedIn", "https://linkedin.com/in/rahul-demo", "rahul-demo", false));
        links.add(new DeveloperLink("link_3", DEMO_STUDENT_ID, "LeetCode", "https://leetcode.com/u/rahul_codes", "rahul_codes", false));
        links.add(new DeveloperLink("link_4", DEMO_STUDENT_ID, "CodeChef", "https://codechef.com/users/rahul_dev", "rahul_dev", false));
        links.add(new DeveloperLink("link_5", DEMO_STUDENT_ID, "HackerRank", "https://hackerrank.com/rahul_cse", "rahul_cse", false));
        links.add(new DeveloperLink("link_6", DEMO_STUDENT_ID, "Portfolio Website", "https://rahul.devtrack.app", "rahul-portfolio", false));
        studentLinks.put(DEMO_STUDENT_ID, links);

        // Pre-populate Hackathons with rich tracking dates
        List<Module1Hackathon> hacks = new ArrayList<>();
        hacks.add(new Module1Hackathon(
                "hack_1",
                DEMO_STUDENT_ID,
                "Hack Celestial 3.0",
                "Devfolio",
                "https://hackcelestial.dev",
                "2025-11-14",
                "2025-11-16",
                "2025-11-05",
                "2025-11-16",
                "2025-11-20",
                "Won",
                "Byte Busters",
                4,
                "Top 5 Finalist & Best IoT Solution",
                "Built autonomous smart polyhouse greenhouse environmental monitor with MQTT telemetry.",
                "Presented hardware prototype to jury. Won cash prize of ₹25,000."
        ));

        hacks.add(new Module1Hackathon(
                "hack_2",
                DEMO_STUDENT_ID,
                "Smart India Hackathon Qualifier",
                "SIH Portal",
                "https://sih.gov.in",
                "2025-09-20",
                "2025-09-22",
                "2025-09-10",
                "2025-09-22",
                "2025-10-01",
                "Participated",
                "Apex Innovators",
                6,
                "College Round Qualifier",
                "Disaster management resource routing and crowd-sourced alert distribution software.",
                "Passed internal screening, qualified for regional evaluation."
        ));

        hacks.add(new Module1Hackathon(
                "hack_3",
                DEMO_STUDENT_ID,
                "TechSprint AI/ML Challenge",
                "Unstop",
                "https://unstop.com",
                "2026-01-10",
                "2026-01-12",
                "2026-01-02",
                "2026-01-12",
                "2026-01-18",
                "Participated",
                "NeuralNodes",
                3,
                "Special Mention for UI/UX & Execution",
                "Personalized adaptive learning chatbot with quiz feedback generation using LLMs.",
                "Recognized for cleanest frontend design and intuitive user flows."
        ));

        studentHackathons.put(DEMO_STUDENT_ID, hacks);
    }

    // -------------------------------------------------------------
    // PROFILE MANAGEMENT
    // -------------------------------------------------------------

    public StudentProfile getProfile(String studentId) {
        String id = (studentId != null && !studentId.trim().isEmpty()) ? studentId : DEMO_STUDENT_ID;
        return studentProfiles.getOrDefault(id, studentProfiles.get(DEMO_STUDENT_ID));
    }

    public StudentProfile updateProfile(String studentId, StudentProfile updated) {
        String id = (studentId != null && !studentId.trim().isEmpty()) ? studentId : DEMO_STUDENT_ID;
        StudentProfile existing = getProfile(id);

        if (updated.getName() != null && !updated.getName().trim().isEmpty()) {
            existing.setName(updated.getName().trim());
        }
        if (updated.getCollege() != null) existing.setCollege(updated.getCollege().trim());
        if (updated.getYear() != null) existing.setYear(updated.getYear().trim());
        if (updated.getBranch() != null) existing.setBranch(updated.getBranch().trim());
        if (updated.getEmail() != null) existing.setEmail(updated.getEmail().trim());
        if (updated.getPhone() != null) existing.setPhone(updated.getPhone().trim());
        if (updated.getBio() != null) existing.setBio(updated.getBio().trim());
        if (updated.getAvatarUrl() != null) existing.setAvatarUrl(updated.getAvatarUrl());

        studentProfiles.put(id, existing);
        return existing;
    }

    // -------------------------------------------------------------
    // DEVELOPER LINKS MANAGEMENT
    // -------------------------------------------------------------

    public List<DeveloperLink> getDeveloperLinks(String studentId) {
        String id = (studentId != null && !studentId.trim().isEmpty()) ? studentId : DEMO_STUDENT_ID;
        return studentLinks.computeIfAbsent(id, k -> new ArrayList<>());
    }

    public DeveloperLink addDeveloperLink(String studentId, DeveloperLink newLink) {
        String id = (studentId != null && !studentId.trim().isEmpty()) ? studentId : DEMO_STUDENT_ID;
        if (!newLink.isValidUrl()) {
            throw new IllegalArgumentException("Invalid URL: must begin with http:// or https://");
        }
        if (newLink.getId() == null || newLink.getId().trim().isEmpty()) {
            newLink.setId("link_" + UUID.randomUUID().toString().substring(0, 8));
        }
        newLink.setStudentId(id);

        List<DeveloperLink> list = getDeveloperLinks(id);
        list.add(newLink);
        return newLink;
    }

    public DeveloperLink updateDeveloperLink(String studentId, String linkId, DeveloperLink updated) {
        String id = (studentId != null && !studentId.trim().isEmpty()) ? studentId : DEMO_STUDENT_ID;
        if (!updated.isValidUrl()) {
            throw new IllegalArgumentException("Invalid URL: must begin with http:// or https://");
        }
        List<DeveloperLink> list = getDeveloperLinks(id);
        for (int i = 0; i < list.size(); i++) {
            if (list.get(i).getId().equals(linkId)) {
                updated.setId(linkId);
                updated.setStudentId(id);
                list.set(i, updated);
                return updated;
            }
        }
        throw new NoSuchElementException("Developer link not found: " + linkId);
    }

    public boolean deleteDeveloperLink(String studentId, String linkId) {
        String id = (studentId != null && !studentId.trim().isEmpty()) ? studentId : DEMO_STUDENT_ID;
        List<DeveloperLink> list = getDeveloperLinks(id);
        return list.removeIf(l -> l.getId().equals(linkId));
    }

    // -------------------------------------------------------------
    // HACKATHON MANAGEMENT
    // -------------------------------------------------------------

    public List<Module1Hackathon> getHackathons(String studentId, String statusFilter, String searchQuery) {
        String id = (studentId != null && !studentId.trim().isEmpty()) ? studentId : DEMO_STUDENT_ID;
        List<Module1Hackathon> list = studentHackathons.computeIfAbsent(id, k -> new ArrayList<>());

        return list.stream()
                .filter(h -> {
                    if (statusFilter == null || statusFilter.equalsIgnoreCase("All") || statusFilter.trim().isEmpty()) {
                        return true;
                    }
                    return statusFilter.equalsIgnoreCase(h.getStatus());
                })
                .filter(h -> {
                    if (searchQuery == null || searchQuery.trim().isEmpty()) {
                        return true;
                    }
                    String q = searchQuery.toLowerCase().trim();
                    boolean nameMatch = h.getTitle() != null && h.getTitle().toLowerCase().contains(q);
                    boolean platformMatch = h.getPlatform() != null && h.getPlatform().toLowerCase().contains(q);
                    boolean teamMatch = h.getTeamName() != null && h.getTeamName().toLowerCase().contains(q);
                    boolean achMatch = h.getAchievement() != null && h.getAchievement().toLowerCase().contains(q);
                    return nameMatch || platformMatch || teamMatch || achMatch;
                })
                .sorted(Comparator.comparing(Module1Hackathon::getCreatedAt).reversed())
                .collect(Collectors.toList());
    }

    public Module1Hackathon getHackathonById(String studentId, String hackathonId) {
        String id = (studentId != null && !studentId.trim().isEmpty()) ? studentId : DEMO_STUDENT_ID;
        List<Module1Hackathon> list = getHackathons(id, null, null);
        return list.stream()
                .filter(h -> h.getId().equals(hackathonId))
                .findFirst()
                .orElseThrow(() -> new NoSuchElementException("Hackathon not found: " + hackathonId));
    }

    public Module1Hackathon addHackathon(String studentId, Module1Hackathon hackathon) {
        String id = (studentId != null && !studentId.trim().isEmpty()) ? studentId : DEMO_STUDENT_ID;
        if (hackathon.getTitle() == null || hackathon.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("Hackathon Name is required.");
        }
        if (hackathon.getId() == null || hackathon.getId().trim().isEmpty()) {
            hackathon.setId("hack_" + UUID.randomUUID().toString().substring(0, 8));
        }
        hackathon.setStudentId(id);

        List<Module1Hackathon> list = studentHackathons.computeIfAbsent(id, k -> new ArrayList<>());
        list.add(0, hackathon);
        return hackathon;
    }

    public Module1Hackathon updateHackathon(String studentId, String hackathonId, Module1Hackathon updated) {
        String id = (studentId != null && !studentId.trim().isEmpty()) ? studentId : DEMO_STUDENT_ID;
        List<Module1Hackathon> list = studentHackathons.computeIfAbsent(id, k -> new ArrayList<>());
        for (int i = 0; i < list.size(); i++) {
            if (list.get(i).getId().equals(hackathonId)) {
                updated.setId(hackathonId);
                updated.setStudentId(id);
                updated.touch();
                list.set(i, updated);
                return updated;
            }
        }
        throw new NoSuchElementException("Hackathon not found: " + hackathonId);
    }

    public boolean deleteHackathon(String studentId, String hackathonId) {
        String id = (studentId != null && !studentId.trim().isEmpty()) ? studentId : DEMO_STUDENT_ID;
        List<Module1Hackathon> list = studentHackathons.computeIfAbsent(id, k -> new ArrayList<>());
        return list.removeIf(h -> h.getId().equals(hackathonId));
    }
}
