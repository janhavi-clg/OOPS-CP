package com.devtrack.demo;

import com.devtrack.core.model.*;
import java.util.Arrays;

/**
 * Centralized Demo Data Provider for Rahul (2nd Year CSE AI/ML).
 * Initializes realistic object graphs adhering to clean OOP principles.
 */
public class DemoDataProvider {

    public static StudentProfile getRahulProfile() {
        StudentProfile rahul = new StudentProfile(
                "stu_rahul_01",
                "Rahul",
                "Second Year",
                "CSE (AI/ML)",
                "Apex Institute of Technology",
                "rahul.dev@apextech.edu.in",
                "+91 98765 43210",
                "/avatars/rahul.svg",
                "Second-year computer science undergrad passionate about AI/ML pipelines, algorithmic problem solving in Java & Python, and modern web applications.",
                8.72
        );

        // Coding Profile (137 LeetCode solved: 82 Easy, 48 Medium, 7 Hard)
        CodingProfile coding = new CodingProfile(
                "rahul_codes",
                82, 48, 7,
                23, 45,
                14, 38,
                250
        );
        rahul.setCodingProfile(coding);

        // Realistic Skills for 2nd Year CSE (AI/ML)
        rahul.setSkills(Arrays.asList(
                new Skill("sk_1", "Python", "Programming", 78.0, "Intermediate", "In Progress", 140),
                new Skill("sk_2", "Java", "Programming", 82.0, "Intermediate", "In Progress", 160),
                new Skill("sk_3", "C++", "Programming", 65.0, "Intermediate", "In Progress", 90),
                new Skill("sk_4", "Data Structures & Algorithms", "Computer Science", 72.0, "Intermediate", "In Progress", 120),
                new Skill("sk_5", "Object-Oriented Programming", "Computer Science", 85.0, "Advanced", "Mastered", 110),
                new Skill("sk_6", "Machine Learning Fundamentals", "AI / ML", 60.0, "Intermediate", "Learning", 75),
                new Skill("sk_7", "SQL & Database Design", "Database", 74.0, "Intermediate", "In Progress", 80),
                new Skill("sk_8", "React.js", "Web Development", 68.0, "Intermediate", "In Progress", 95),
                new Skill("sk_9", "JavaScript (ES6+)", "Web Development", 70.0, "Intermediate", "In Progress", 100),
                new Skill("sk_10", "HTML5 & CSS3", "Web Development", 88.0, "Advanced", "Mastered", 85),
                new Skill("sk_11", "Git & GitHub", "DevOps & Tools", 80.0, "Intermediate", "Mastered", 60),
                new Skill("sk_12", "C Programming", "Programming", 75.0, "Intermediate", "Completed", 80)
        ));

        // Projects
        rahul.setProjects(Arrays.asList(
                new Project(
                        "proj_1",
                        "Smart Fitness Monitoring System",
                        "IoT and AI-driven posture detection and activity tracking system using MediaPipe and computer vision.",
                        Arrays.asList("Python", "OpenCV", "MediaPipe", "Flask", "React"),
                        "Completed",
                        "Oct 2025",
                        "Jan 2026",
                        "https://github.com/rahul-demo/smart-fitness-monitor",
                        "https://fitness-monitor-demo.devtrack.app"
                ),
                new Project(
                        "proj_2",
                        "AI-Based Study Planner",
                        "Personalized schedule generator using heuristic optimization algorithms and spaced repetition scheduling.",
                        Arrays.asList("Java", "Spring Boot", "React", "PostgreSQL"),
                        "In Progress",
                        "Feb 2026",
                        "Present",
                        "https://github.com/rahul-demo/ai-study-planner",
                        null
                ),
                new Project(
                        "proj_3",
                        "Smart Polyhouse Monitoring System",
                        "Microclimate sensor data analytics pipeline for precision agriculture with threshold alerting.",
                        Arrays.asList("Python", "MQTT", "ESP32", "SQLite"),
                        "Completed",
                        "Aug 2025",
                        "Nov 2025",
                        "https://github.com/rahul-demo/smart-polyhouse",
                        null
                ),
                new Project(
                        "proj_4",
                        "Developer Portfolio & Progress Platform",
                        "Interactive portfolio showcasing coding milestone visualizations and project demonstrations.",
                        Arrays.asList("React", "Three.js", "Vanilla CSS", "Java OOP"),
                        "In Progress",
                        "Jan 2026",
                        "Present",
                        "https://github.com/rahul-demo/devtrack-portfolio",
                        "https://devtrack.demo"
                )
        ));

        // Hackathons
        rahul.setHackathons(Arrays.asList(
                new Hackathon("hack_1", "Hack Celestial 3.0", "Devfolio", "Winner", "Nov 14, 2025", "Nov 16, 2025", "Smart Polyhouse Monitoring", "Top 5 Finalist & Best IoT Solution", "https://hackcelestial.dev"),
                new Hackathon("hack_2", "Smart India Hackathon Internal Qualifier", "SIH Portal", "Participated", "Sep 20, 2025", "Sep 22, 2025", "AI-Based Disaster Alert", "College Round Qualifier", "https://sih.gov.in"),
                new Hackathon("hack_3", "TechSprint AI Challenge", "Unstop", "Participated", "Jan 10, 2026", "Jan 12, 2026", "EduAdaptive Learning Bot", "Special Mention for UI/UX", "https://unstop.com")
        ));

        // Certificates
        rahul.setCertificates(Arrays.asList(
                new Certificate("cert_1", "Python for Data Science & AI", "Coursera (IBM)", "Aug 2025", "IBM-PY-884920", "https://coursera.org/verify/demo-ibm-py", "Python, Pandas, NumPy, Data Analysis"),
                new Certificate("cert_2", "Machine Learning Fundamentals", "Kaggle", "Oct 2025", "KAG-ML-449102", "https://kaggle.com/learn/certification/rahul", "Scikit-Learn, Regression, Classification"),
                new Certificate("cert_3", "SQL (Intermediate) Certificate", "HackerRank", "Dec 2025", "HR-SQL-991204", "https://hackerrank.com/certificates/demo-sql", "Joins, Subqueries, Aggregations"),
                new Certificate("cert_4", "Git & GitHub Version Control", "Udemy", "Jul 2025", "UC-GITH-772183", "https://udemy.com/certificate/demo-git", "Branching, PRs, Merge Conflicts, Workflows"),
                new Certificate("cert_5", "Cloud Computing Foundations", "AWS Academy", "Jan 2026", "AWS-ACAD-33104", "https://awsacademy.com/verify/demo", "EC2, S3, Cloud Architecture Basics")
        ));

        // Achievements
        rahul.setAchievements(Arrays.asList(
                new Achievement("ach_1", "Top 5 Finalist - Hack Celestial 3.0", "Inter-College Hackathon among 120+ teams for Smart Polyhouse IoT project.", "Devfolio", "Nov 2025", "Gold"),
                new Achievement("ach_2", "50-Day Coding Streak Badge", "Solved daily DSA algorithmic problems consistently for 50 days.", "LeetCode", "Dec 2025", "Silver"),
                new Achievement("ach_3", "Second Place - Dept OOP Coding Contest", "Implemented clean object-oriented architecture in Java under 3 hours.", "CSE Dept", "Oct 2025", "Silver"),
                new Achievement("ach_4", "Technical Paper Presentation Selected", "Paper on AI applications in modern precision farming selected for college symposium.", "Apex Tech Symposium", "Jan 2026", "Bronze")
        ));

        // Tasks
        rahul.setTasks(Arrays.asList(
                new TaskItem("task_1", "Complete Java OOP inheritance & polymorphism lab exercises", "High", "In Progress", "Oct 10, 2026", 120),
                new TaskItem("task_2", "Solve 5 Medium Binary Tree problems on LeetCode", "High", "In Progress", "Oct 12, 2026", 150),
                new TaskItem("task_3", "Implement Spring Boot REST endpoints for project catalog", "Medium", "Pending", "Oct 15, 2026", 90),
                new TaskItem("task_4", "Review Machine Learning classification evaluation metrics (Precision, Recall, ROC-AUC)", "Medium", "Completed", "Oct 02, 2026", 60),
                new TaskItem("task_5", "Update resume with Hack Celestial 3.0 award and GitHub links", "Low", "Completed", "Oct 01, 2026", 45)
        ));

        return rahul;
    }
}
