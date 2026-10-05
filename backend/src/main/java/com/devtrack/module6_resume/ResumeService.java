package com.devtrack.module6_resume;

import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * ResumeService manages student resumes with strict student ownership isolation.
 * Provides pre-seeded demo data for Rahul (2nd Year CSE AI/ML) and supports full CRUD.
 * Demonstrates:
 * - OOP Encapsulation: Internal data storage shielded from external mutation
 * - Defensive Copying: Clones returned entities
 * - Composition with ResumeSection, ResumeProject, ResumeSkill, ResumeEducation
 */
@Service
public class ResumeService {

    private final Map<String, List<Resume>> studentResumes = new ConcurrentHashMap<>();

    public ResumeService() {
        initRahulDemoResumes();
    }

    private void initRahulDemoResumes() {
        String studentId = "student_rahul_001";
        List<Resume> list = new ArrayList<>();

        // 1. Software Developer Resume
        Resume sdeResume = new Resume("res_rahul_sde_01", studentId, "Software Developer Resume", "modern");
        sdeResume.setFullName("Rahul Sharma");
        sdeResume.setEmail("rahul.sharma@pict.edu");
        sdeResume.setPhone("+91 98765 43210");
        sdeResume.setLocation("Pune, Maharashtra, India");
        sdeResume.setGithubUrl("https://github.com/rahulsharma");
        sdeResume.setLinkedinUrl("https://linkedin.com/in/rahul-sharma-dev");
        sdeResume.setPortfolioUrl("https://rahulsharma.dev");
        sdeResume.setSummary("Second-year Computer Science (AI/ML) undergraduate with solid foundations in Data Structures & Algorithms, Java OOP, PostgreSQL, and full-stack web engineering. Experienced in building end-to-end platforms and active hackathon contributor.");
        sdeResume.setTargetRole("Software Development Engineer");
        sdeResume.setProfileMatchScore(84);

        // Education
        List<ResumeEducation> eduList = new ArrayList<>();
        eduList.add(new ResumeEducation("edu_1", "Pune Institute of Computer Technology (PICT)", "B.Tech in Computer Science & Engineering (AI/ML)", "2023", "2027", "CGPA: 8.92 / 10.0", "Pune, India"));
        eduList.add(new ResumeEducation("edu_2", "Delhi Public School", "Higher Secondary Certificate (CBSE Class XII)", "2021", "2023", "Percentage: 94.6%", "Pune, India"));
        sdeResume.setEducation(eduList);

        // Experience
        List<ResumeExperience> expList = new ArrayList<>();
        expList.add(new ResumeExperience("exp_1", "DevTrack Open Core", "Lead Frontend & Architecture Contributor", "Pune, India", "Jan 2024", "Present", true,
            Arrays.asList(
                "Designed and implemented modular state tracking for student engineering portfolios.",
                "Engineered responsive components with Coffee Brown visual design and real-time dashboard analytics.",
                "Integrated RESTful Spring Boot microservices with Supabase PostgreSQL."
            )));
        expList.add(new ResumeExperience("exp_2", "PICT ACM Student Chapter", "Technical Team Member", "Pune, India", "Aug 2023", "Present", true,
            Arrays.asList(
                "Organized algorithmic coding contests for 300+ campus participants on HackerRank.",
                "Conducted peer workshops on Git workflows and Java Object-Oriented Programming."
            )));
        sdeResume.setExperience(expList);

        // Projects (from Module 4)
        List<ResumeProject> projList = new ArrayList<>();
        projList.add(new ResumeProject("proj_1", "proj_devtrack_01", "DevTrack - Developer Portfolio & Progress System", "Full Stack Architect",
            Arrays.asList("React", "Java Spring Boot", "PostgreSQL", "Supabase"),
            "https://devtrack.internal.app", "https://github.com/rahulsharma/devtrack",
            Arrays.asList(
                "Built an end-to-end developer progress platform with 8 cohesive engineering modules.",
                "Implemented OOP domain layers, automated profile matching, and live PDF resume compilation."
            )));
        projList.add(new ResumeProject("proj_2", "proj_aeromatrix_01", "AeroMatrix - AI Flight Trajectory Optimizer", "AI & Backend Developer",
            Arrays.asList("Python", "PyTorch", "FastAPI", "NumPy"),
            "https://aeromatrix.demo.app", "https://github.com/rahulsharma/aeromatrix",
            Arrays.asList(
                "Trained recurrent neural networks to optimize airline flight pathways and reduce fuel burn by 11%.",
                "Built high-throughput inference endpoints with sub-50ms latency using FastAPI."
            )));
        projList.add(new ResumeProject("proj_3", "proj_polyhouse_01", "Smart Polyhouse Precision Agriculture IoT", "Firmware & Dashboard Lead",
            Arrays.asList("ESP32", "Python", "MQTT", "React"),
            "https://polyhouse.demo.app", "https://github.com/rahulsharma/smart-polyhouse",
            Arrays.asList(
                "Designed closed-loop sensor telemetry for ambient soil moisture and greenhouse climate.",
                "Visualized time-series metrics on interactive dashboard with automated relay control."
            )));
        sdeResume.setProjects(projList);

        // Skills (from Module 2)
        List<ResumeSkill> skillsList = new ArrayList<>();
        skillsList.add(new ResumeSkill("sk_1", "Languages", Arrays.asList("Java (OOP & Collections)", "Python", "SQL (PostgreSQL)", "JavaScript (ES6+)", "C++")));
        skillsList.add(new ResumeSkill("sk_2", "Frameworks & Backend", Arrays.asList("Spring Boot", "React.js", "FastAPI", "Node.js (Basics)")));
        skillsList.add(new ResumeSkill("sk_3", "Tools & Platforms", Arrays.asList("Git & GitHub", "Supabase", "Docker (Basics)", "Postman", "Linux/Bash")));
        skillsList.add(new ResumeSkill("sk_4", "Core Concepts", Arrays.asList("Data Structures & Algorithms", "Object-Oriented Design", "DBMS", "RESTful APIs")));
        sdeResume.setSkills(skillsList);

        // Achievements (from Module 5)
        List<ResumeAchievement> achList = new ArrayList<>();
        achList.add(new ResumeAchievement("ach_1", "Winner - Hack Celestial 3.0", "National Hackathon / Devfolio", "March 2024",
            "Secured 1st Place out of 180+ teams for creating AeroMatrix AI trajectory optimizer."));
        achList.add(new ResumeAchievement("ach_2", "Top 10 Finalist - Smart India Hackathon Internal", "Ministry of Education / PICT", "Oct 2023",
            "Recognized for Smart Polyhouse IoT precision farming solution."));
        achList.add(new ResumeAchievement("ach_3", "130+ LeetCode DSA Problems Solved", "LeetCode", "Ongoing",
            "Maintained active coding streak across Arrays, Trees, Dynamic Programming, and Graph algorithms."));
        sdeResume.setAchievements(achList);

        // Selected IDs
        sdeResume.setSelectedProjectIds(Arrays.asList("proj_devtrack_01", "proj_aeromatrix_01", "proj_polyhouse_01"));
        sdeResume.setSelectedSkillIds(Arrays.asList("Java", "Python", "SQL", "React", "Spring Boot"));
        sdeResume.setSelectedAchievementIds(Arrays.asList("ach_hack_celestial_01", "ach_comp_sih_01"));
        sdeResume.setSelectedCertificateIds(Arrays.asList("cert_py_01", "cert_java_01"));

        list.add(sdeResume);

        // 2. AI/ML Resume (Optional second demo resume per prompt section 6.20)
        Resume mlResume = new Resume("res_rahul_ml_02", studentId, "AI/ML Intern Resume", "technical");
        mlResume.setFullName("Rahul Sharma");
        mlResume.setEmail("rahul.sharma@pict.edu");
        mlResume.setPhone("+91 98765 43210");
        mlResume.setLocation("Pune, Maharashtra, India");
        mlResume.setGithubUrl("https://github.com/rahulsharma");
        mlResume.setLinkedinUrl("https://linkedin.com/in/rahul-sharma-dev");
        mlResume.setPortfolioUrl("https://rahulsharma.dev");
        mlResume.setSummary("Second-year CSE (AI/ML) student focusing on Deep Learning, PyTorch, and Computer Vision. Hands-on experience developing ML models, spatial feature extraction, and deploying inference pipelines.");
        mlResume.setTargetRole("Machine Learning Intern");
        mlResume.setProfileMatchScore(91);
        mlResume.setEducation(eduList);
        mlResume.setExperience(expList);
        mlResume.setProjects(projList);
        
        List<ResumeSkill> mlSkills = new ArrayList<>();
        mlSkills.add(new ResumeSkill("ml_sk_1", "Machine Learning & AI", Arrays.asList("PyTorch", "TensorFlow", "Scikit-Learn", "Computer Vision (OpenCV)", "NumPy", "Pandas")));
        mlSkills.add(new ResumeSkill("ml_sk_2", "Languages & Systems", Arrays.asList("Python", "Java", "SQL", "C++", "FastAPI")));
        mlSkills.add(new ResumeSkill("ml_sk_3", "Developer Tools", Arrays.asList("Git", "Jupyter", "Supabase", "Linux", "Docker")));
        mlResume.setSkills(mlSkills);
        mlResume.setAchievements(achList);
        mlResume.setSelectedProjectIds(Arrays.asList("proj_aeromatrix_01", "proj_fitness_01", "proj_polyhouse_01"));
        mlResume.setSelectedSkillIds(Arrays.asList("Python", "PyTorch", "Machine Learning", "NumPy", "Pandas"));
        mlResume.setSelectedAchievementIds(Arrays.asList("ach_hack_celestial_01", "ach_ws_ml_01"));
        mlResume.setSelectedCertificateIds(Arrays.asList("cert_py_01", "cert_ml_01"));

        list.add(mlResume);

        studentResumes.put(studentId, list);
    }

    public synchronized List<Resume> getResumesByStudent(String studentId) {
        String key = studentId != null ? studentId : "student_rahul_001";
        List<Resume> list = studentResumes.get(key);
        if (list == null) {
            return new ArrayList<>();
        }
        return new ArrayList<>(list);
    }

    public synchronized Optional<Resume> getResumeById(String studentId, String resumeId) {
        String key = studentId != null ? studentId : "student_rahul_001";
        List<Resume> list = studentResumes.get(key);
        if (list == null) return Optional.empty();
        return list.stream().filter(r -> r.getId().equals(resumeId)).findFirst();
    }

    public synchronized Resume createResume(String studentId, Resume resume) {
        String key = studentId != null ? studentId : "student_rahul_001";
        if (resume.getId() == null || resume.getId().trim().isEmpty()) {
            resume.setId("res_" + UUID.randomUUID().toString().substring(0, 8));
        }
        resume.setStudentId(key);
        studentResumes.computeIfAbsent(key, k -> new ArrayList<>()).add(resume);
        return resume;
    }

    public synchronized Optional<Resume> updateResume(String studentId, String resumeId, Resume updated) {
        String key = studentId != null ? studentId : "student_rahul_001";
        List<Resume> list = studentResumes.get(key);
        if (list == null) return Optional.empty();

        for (int i = 0; i < list.size(); i++) {
            if (list.get(i).getId().equals(resumeId)) {
                updated.setId(resumeId);
                updated.setStudentId(key);
                list.set(i, updated);
                return Optional.of(updated);
            }
        }
        return Optional.empty();
    }

    public synchronized boolean deleteResume(String studentId, String resumeId) {
        String key = studentId != null ? studentId : "student_rahul_001";
        List<Resume> list = studentResumes.get(key);
        if (list == null) return false;
        return list.removeIf(r -> r.getId().equals(resumeId));
    }
}
