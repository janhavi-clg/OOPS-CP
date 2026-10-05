package com.devtrack.module6_resume;

import java.util.*;

/**
 * JobRoleAnalyzer implements transparent keyword matching and role benchmarking in Java.
 * Demonstrates:
 * - OOP Abstraction: Encapsulates keyword extraction and scoring algorithm
 * - Transparent scoring formula: 50% Skill alignment, 30% Relevant Projects, 20% Relevant Achievements
 * - Profile match calculation without external AI dependencies
 */
public class JobRoleAnalyzer {

    private final Map<String, JobRole> standardRoles = new LinkedHashMap<>();

    public JobRoleAnalyzer() {
        initStandardRoles();
    }

    private void initStandardRoles() {
        // 1. SDE / Software Development Engineer
        JobRole sde = new JobRole(
            "sde",
            "Software Development Engineer",
            "Engineering",
            "Seeking a Software Development Engineer with strong foundations in Data Structures & Algorithms, Java or C++, Object-Oriented Design, Relational Databases (SQL/PostgreSQL), RESTful APIs, Git, and system design fundamentals.",
            Arrays.asList("Java", "Data Structures & Algorithms", "SQL", "Git", "OOP"),
            Arrays.asList("Spring Boot", "Docker", "REST APIs", "Unit Testing"),
            Arrays.asList("Full Stack", "Backend", "Web Application", "System", "DevTrack"),
            Arrays.asList("Hackathon", "Coding Competition", "Java Course", "LeetCode")
        );
        standardRoles.put("sde", sde);
        standardRoles.put("software developer", sde);
        standardRoles.put("software development engineer", sde);

        // 2. Machine Learning Intern
        JobRole ml = new JobRole(
            "ml_intern",
            "Machine Learning Intern",
            "Artificial Intelligence",
            "Looking for an AI/ML intern passionate about training deep learning models, computer vision, natural language processing, PyTorch/TensorFlow, Python, Pandas, and deploying ML models.",
            Arrays.asList("Python", "Machine Learning", "PyTorch", "NumPy", "Pandas"),
            Arrays.asList("Deep Learning", "TensorFlow", "Computer Vision", "Scikit-Learn", "FastAPI"),
            Arrays.asList("AI", "Machine Learning", "Computer Vision", "Detection", "AeroMatrix", "Smart Polyhouse", "Fitness"),
            Arrays.asList("Hack Celestial", "AI/ML Competition", "Python Certification", "Workshop", "Research")
        );
        standardRoles.put("ml_intern", ml);
        standardRoles.put("machine learning intern", ml);
        standardRoles.put("ai/ml engineer", ml);
        standardRoles.put("ai/ml intern", ml);

        // 3. Frontend Developer
        JobRole frontend = new JobRole(
            "frontend_dev",
            "Frontend Developer",
            "Engineering",
            "Frontend developer skilled in modern JavaScript/TypeScript, React.js, HTML5, CSS3, responsive UI design, component-driven development, and state management.",
            Arrays.asList("React", "JavaScript", "HTML5", "CSS3", "Git"),
            Arrays.asList("TypeScript", "Tailwind CSS", "Vite", "Responsive Design", "UI/UX"),
            Arrays.asList("Dashboard", "Portfolio", "Frontend", "Web", "UI", "React"),
            Arrays.asList("Design Hackathon", "Web Development", "Certificate")
        );
        standardRoles.put("frontend_dev", frontend);
        standardRoles.put("frontend developer", frontend);

        // 4. Data Analyst
        JobRole dataAnalyst = new JobRole(
            "data_analyst",
            "Data Analyst",
            "Analytics",
            "Data Analyst with expertise in SQL queries, Python data analysis (Pandas, Matplotlib), statistical reasoning, data visualization, and reporting dashboards.",
            Arrays.asList("Python", "SQL", "Pandas", "Data Analysis"),
            Arrays.asList("Tableau", "PowerBI", "Matplotlib", "Seaborn", "Statistics"),
            Arrays.asList("Analytics", "Data", "Dashboard", "Visualization", "Polyhouse"),
            Arrays.asList("Certification", "Course", "Academic")
        );
        standardRoles.put("data_analyst", dataAnalyst);
        standardRoles.put("data analyst", dataAnalyst);
    }

    public List<JobRole> getStandardRoles() {
        Set<String> uniqueKeys = new HashSet<>();
        List<JobRole> result = new ArrayList<>();
        for (JobRole r : standardRoles.values()) {
            if (uniqueKeys.add(r.getRoleKey())) {
                result.add(r);
            }
        }
        return result;
    }

    /**
     * Analyze a target role and optional job description against student's existing profile items.
     */
    public ResumeRecommendation analyzeMatch(String targetRoleInput, String customJobDescription,
                                            List<String> studentSkillNames,
                                            List<Map<String, Object>> studentProjects,
                                            List<Map<String, Object>> studentAchievements) {
        String roleKey = targetRoleInput != null ? targetRoleInput.toLowerCase().trim() : "sde";
        JobRole benchmark = standardRoles.get(roleKey);
        if (benchmark == null) {
            // Find closest match or default to SDE
            for (Map.Entry<String, JobRole> entry : standardRoles.entrySet()) {
                if (roleKey.contains(entry.getKey())) {
                    benchmark = entry.getValue();
                    break;
                }
            }
            if (benchmark == null) {
                benchmark = standardRoles.get("sde");
            }
        }

        // Keywords to match
        Set<String> targetSkills = new LinkedHashSet<>(benchmark.getRequiredSkills());
        targetSkills.addAll(benchmark.getPreferredSkills());

        // If custom job description provided, extract additional keywords
        if (customJobDescription != null && !customJobDescription.trim().isEmpty()) {
            String lowerDesc = customJobDescription.toLowerCase();
            List<String> candidateTerms = Arrays.asList("python", "java", "sql", "react", "c++", "docker", "kubernetes",
                "machine learning", "deep learning", "pytorch", "tensorflow", "git", "rest", "aws", "spring boot", "pandas",
                "nlp", "computer vision", "fastapi", "linux");
            for (String term : candidateTerms) {
                if (lowerDesc.contains(term)) {
                    targetSkills.add(capitalizeTerm(term));
                }
            }
        }

        // 1. Skill Match Calculation
        Set<String> studentSkillsNormalized = new HashSet<>();
        if (studentSkillNames != null) {
            for (String s : studentSkillNames) {
                if (s != null) studentSkillsNormalized.add(s.trim().toLowerCase());
            }
        }

        List<String> matchedSkills = new ArrayList<>();
        List<String> missingSkills = new ArrayList<>();
        List<String> recommendedSkills = new ArrayList<>();

        for (String req : targetSkills) {
            if (studentSkillsNormalized.contains(req.toLowerCase())) {
                matchedSkills.add(req);
                recommendedSkills.add(req);
            } else {
                missingSkills.add(req);
            }
        }

        int totalTargetSkills = Math.max(1, targetSkills.size());
        int skillsScore = (int) Math.round(((double) matchedSkills.size() / totalTargetSkills) * 100);

        // 2. Project Relevance Calculation
        List<String> recommendedProjectIds = new ArrayList<>();
        int relevantProjectCount = 0;
        if (studentProjects != null) {
            for (Map<String, Object> p : studentProjects) {
                String id = (String) p.get("id");
                String title = (String) p.get("title");
                String category = (String) p.get("category");
                String tech = String.valueOf(p.get("technologies"));
                String combined = ((title != null ? title : "") + " " + (category != null ? category : "") + " " + tech).toLowerCase();

                boolean isRelevant = false;
                for (String kw : benchmark.getRelevantProjectKeywords()) {
                    if (combined.contains(kw.toLowerCase())) {
                        isRelevant = true;
                        break;
                    }
                }
                if (isRelevant) {
                    relevantProjectCount++;
                    if (id != null) recommendedProjectIds.add(id);
                }
            }
        }
        int projectsScore = Math.min(100, relevantProjectCount * 35); // 3 relevant projects gives ~100%

        // 3. Achievement Relevance Calculation
        List<String> recommendedAchievementIds = new ArrayList<>();
        int relevantAchCount = 0;
        if (studentAchievements != null) {
            for (Map<String, Object> a : studentAchievements) {
                String id = (String) a.get("id");
                String title = (String) a.get("title");
                String category = (String) a.get("category");
                String org = (String) a.get("organization");
                String combined = ((title != null ? title : "") + " " + (category != null ? category : "") + " " + (org != null ? org : "")).toLowerCase();

                boolean isRelevant = false;
                for (String kw : benchmark.getRelevantAchievementKeywords()) {
                    if (combined.contains(kw.toLowerCase())) {
                        isRelevant = true;
                        break;
                    }
                }
                if (isRelevant) {
                    relevantAchCount++;
                    if (id != null) recommendedAchievementIds.add(id);
                }
            }
        }
        int achievementsScore = Math.min(100, relevantAchCount * 35);

        // 4. Transparent Weighted Score
        // 50% Skills, 30% Projects, 20% Achievements
        int overallScore = (int) Math.round((skillsScore * 0.50) + (projectsScore * 0.30) + (achievementsScore * 0.20));
        overallScore = Math.max(10, Math.min(98, overallScore)); // realistic bound

        ResumeRecommendation rec = new ResumeRecommendation(benchmark.getTitle(), overallScore);
        rec.setSkillsScore(skillsScore);
        rec.setProjectsScore(projectsScore);
        rec.setAchievementsScore(achievementsScore);
        rec.setMatchedSkills(matchedSkills);
        rec.setMissingSkills(missingSkills);
        rec.setRecommendedSkills(recommendedSkills);
        rec.setRecommendedProjectIds(recommendedProjectIds);
        rec.setRecommendedAchievementIds(recommendedAchievementIds);

        List<String> feedback = new ArrayList<>();
        if (!matchedSkills.isEmpty()) {
            feedback.add("Found " + matchedSkills.size() + " strong skill matches (" + String.join(", ", matchedSkills.subList(0, Math.min(3, matchedSkills.size()))) + ").");
        }
        if (!missingSkills.isEmpty()) {
            feedback.add("Potential skill gap for this role: " + String.join(", ", missingSkills.subList(0, Math.min(3, missingSkills.size()))) + ".");
        }
        if (!recommendedProjectIds.isEmpty()) {
            feedback.add("Recommended " + recommendedProjectIds.size() + " relevant projects to highlight on your resume.");
        }
        rec.setFeedbackPoints(feedback);

        return rec;
    }

    private String capitalizeTerm(String term) {
        if (term == null || term.isEmpty()) return "";
        if (term.equalsIgnoreCase("sql") || term.equalsIgnoreCase("nlp") || term.equalsIgnoreCase("aws") || term.equalsIgnoreCase("git")) {
            return term.toUpperCase();
        }
        return term.substring(0, 1).toUpperCase() + term.substring(1);
    }
}
