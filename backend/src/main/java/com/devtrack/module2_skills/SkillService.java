package com.devtrack.module2_skills;

import org.springframework.stereotype.Service;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Service Layer for managing student Tracked Skills.
 * Handles opt-in skill tracking, custom skills, level updates, and user-isolated skill repositories.
 */
@Service
public class SkillService {

    // In-memory thread-safe store keyed by studentId -> List of TrackedSkill
    private final Map<String, List<TrackedSkill>> studentSkillsMap = new ConcurrentHashMap<>();

    private final String DEMO_STUDENT_ID = "stu_rahul_01";

    public SkillService() {
        initRahulSkills();
    }

    private void initRahulSkills() {
        List<TrackedSkill> rahulSkills = new ArrayList<>();

        rahulSkills.add(new TrackedSkill("skill_py", DEMO_STUDENT_ID, "Python", "Programming", "Intermediate", "Advanced", "Active", false, 30));
        rahulSkills.add(new TrackedSkill("skill_java", DEMO_STUDENT_ID, "Java", "Programming", "Intermediate", "Advanced", "Active", false, 30));
        rahulSkills.add(new TrackedSkill("skill_dsa", DEMO_STUDENT_ID, "DSA", "Core CS", "Intermediate", "Advanced", "Active", false, 35));
        rahulSkills.add(new TrackedSkill("skill_react", DEMO_STUDENT_ID, "React", "Web Development", "Beginner", "Intermediate", "Active", false, 20));
        rahulSkills.add(new TrackedSkill("skill_ml", DEMO_STUDENT_ID, "Machine Learning", "AI / ML", "Beginner", "Intermediate", "Active", false, 25));
        rahulSkills.add(new TrackedSkill("skill_sql", DEMO_STUDENT_ID, "SQL", "Database", "Intermediate", "Advanced", "Active", false, 25));
        rahulSkills.add(new TrackedSkill("skill_html_css", DEMO_STUDENT_ID, "HTML & CSS", "Web Development", "Advanced", "Expert", "Active", false, 15));
        rahulSkills.add(new TrackedSkill("skill_js", DEMO_STUDENT_ID, "JavaScript", "Web Development", "Intermediate", "Advanced", "Active", false, 25));

        studentSkillsMap.put(DEMO_STUDENT_ID, rahulSkills);
    }

    public List<TrackedSkill> getSkills(String studentId) {
        return studentSkillsMap.computeIfAbsent(studentId, k -> new ArrayList<>());
    }

    public Optional<TrackedSkill> getSkillById(String studentId, String skillId) {
        return getSkills(studentId).stream()
                .filter(s -> s.getId().equalsIgnoreCase(skillId))
                .findFirst();
    }

    public TrackedSkill addSkill(String studentId, TrackedSkill skill) {
        List<TrackedSkill> skills = getSkills(studentId);

        // Check if student already tracks this skill
        boolean exists = skills.stream()
                .anyMatch(s -> s.getTitle().equalsIgnoreCase(skill.getTitle()));
        if (exists) {
            throw new IllegalArgumentException("Skill '" + skill.getTitle() + "' is already in your learning tracker.");
        }

        if (skill.getId() == null || skill.getId().trim().isEmpty()) {
            skill.setId("skill_" + UUID.randomUUID().toString().substring(0, 8));
        }
        skill.setStudentId(studentId);
        skills.add(skill);
        return skill;
    }

    public TrackedSkill addCustomSkill(String studentId, String name, String category, String currentLevel, String targetLevel) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Skill name is required.");
        }
        TrackedSkill custom = new TrackedSkill(
                "skill_custom_" + UUID.randomUUID().toString().substring(0, 8),
                studentId,
                name.trim(),
                category != null ? category.trim() : "Custom",
                currentLevel != null ? currentLevel : "Beginner",
                targetLevel != null ? targetLevel : "Advanced",
                "Active",
                true,
                25
        );
        return addSkill(studentId, custom);
    }

    public TrackedSkill updateSkill(String studentId, String skillId, TrackedSkill updated) {
        TrackedSkill existing = getSkillById(studentId, skillId)
                .orElseThrow(() -> new NoSuchElementException("Skill not found with ID: " + skillId));

        if (updated.getTitle() != null && !updated.getTitle().trim().isEmpty()) {
            existing.setTitle(updated.getTitle().trim());
        }
        if (updated.getCategory() != null) {
            existing.setCategory(updated.getCategory());
        }
        if (updated.getCurrentLevel() != null) {
            existing.setCurrentLevel(updated.getCurrentLevel());
        }
        if (updated.getTargetLevel() != null) {
            existing.setTargetLevel(updated.getTargetLevel());
        }
        if (updated.getStatus() != null) {
            existing.setStatus(updated.getStatus());
        }
        if (updated.getTargetProblemsCount() > 0) {
            existing.setTargetProblemsCount(updated.getTargetProblemsCount());
        }
        existing.touch();
        return existing;
    }

    public boolean removeSkill(String studentId, String skillId) {
        List<TrackedSkill> skills = getSkills(studentId);
        return skills.removeIf(s -> s.getId().equalsIgnoreCase(skillId));
    }

    public List<String> getAvailableStandardSkills() {
        return Arrays.asList(
                "Python", "Java", "C", "C++", "HTML & CSS", "JavaScript", "TypeScript",
                "React", "Node.js", "Express.js", "Spring Boot", "SQL", "PostgreSQL",
                "MongoDB", "Git & GitHub", "DSA", "Machine Learning", "Data Science",
                "Deep Learning", "TensorFlow", "PyTorch", "Java OOP", "Computer Networks",
                "Operating Systems", "Docker", "Kubernetes", "AWS", "Linux"
        );
    }
}
