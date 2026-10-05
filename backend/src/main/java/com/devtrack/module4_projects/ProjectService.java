package com.devtrack.module4_projects;

import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

/**
 * Service Layer managing Student Projects, search/filter logic,
 * featuring/unfeaturing, and student data isolation.
 * Demonstrates OOP Service architecture and Business Logic.
 */
@Service
public class ProjectService {

    private final Map<String, List<Project>> studentProjectsMap = new ConcurrentHashMap<>();
    private final String DEMO_STUDENT_ID = "stu_rahul_01";

    public ProjectService() {
        initRahulDemoProjects();
    }

    private void initRahulDemoProjects() {
        List<Project> list = new ArrayList<>();

        // 1. DevTrack (Featured, In Progress)
        Project devTrack = new Project(
                "proj_devtrack", DEMO_STUDENT_ID, "DevTrack",
                "Developer portfolio and progress tracking platform with unified metrics & Java OOP architecture.",
                "DevTrack is a comprehensive engineering student portfolio and multi-platform tracker designed to centralize competitive programming metrics, skill acquisition, hackathon achievements, and project portfolios.",
                "Students struggle to showcase their complete technical identity across fragmented coding platforms, course certificates, and GitHub repositories in an interview-ready format.",
                "Engineered a modular full-stack platform featuring automated platform sync, OOP Java service layers, real-time consistency tracking, and portfolio exports.",
                "Full Stack", "IN_PROGRESS", 75.0,
                "2026-01", "Present",
                "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
                true,
                new ProjectContribution("Lead Full Stack Architect", "Designed the complete Java OOP backend architecture, REST API controllers, and Coffee-Brown themed React application.", 1)
        );
        devTrack.setTechnologies(Arrays.asList(
                new ProjectTechnology("Java", "Language", true),
                new ProjectTechnology("Spring Boot", "Backend", true),
                new ProjectTechnology("React", "Frontend", true),
                new ProjectTechnology("Supabase", "Database", false),
                new ProjectTechnology("Vanilla CSS", "Frontend", false),
                new ProjectTechnology("Three.js", "Frontend", false)
        ));
        devTrack.setLinks(Arrays.asList(
                new ProjectLink("GITHUB", "https://github.com/rahul-demo/devtrack-portfolio", "Repository"),
                new ProjectLink("LIVE_DEMO", "https://devtrack.demo", "Live Demo"),
                new ProjectLink("DOCUMENTATION", "https://devtrack.demo/docs", "Architecture Docs")
        ));
        devTrack.setKeyFeatures(Arrays.asList(
                "Java OOP Domain Model with encapsulation and polymorphism",
                "Automated live synchronization with LeetCode & GitHub endpoints",
                "Manual Verification fallback with screenshot proof validation",
                "Interactive 3D coding cube visualization using Three.js",
                "Coffee Brown + Warm Cream custom accessibility-tested design"
        ));
        devTrack.setMilestones(Arrays.asList(
                new ProjectMilestone("ms_dt_1", "proj_devtrack", "Architecture & Landing Page", "Designed UI system and authentication foundation", "2026-01", true, 1),
                new ProjectMilestone("ms_dt_2", "proj_devtrack", "Module 1 Profile & Hackathons", "Built student portfolio and competitive hackathon tracker", "2026-02", true, 2),
                new ProjectMilestone("ms_dt_3", "proj_devtrack", "Module 2 Skills Tracker", "Implemented dual-component skill formula and practice problem logs", "2026-02", true, 3),
                new ProjectMilestone("ms_dt_4", "proj_devtrack", "Module 3 Coding Tracker", "Built live competitive programming tracker & Java strategy pattern", "2026-03", true, 4),
                new ProjectMilestone("ms_dt_5", "proj_devtrack", "Module 4 Project & Portfolio", "Centralized student projects, case studies, and portfolio preview", "2026-03", true, 5)
        ));
        list.add(devTrack);

        // 2. Smart Fitness Monitoring System (Featured, Completed)
        Project fitness = new Project(
                "proj_fitness", DEMO_STUDENT_ID, "Smart Fitness Monitoring System",
                "AI-driven exercise posture estimation and repetition counting web app utilizing computer vision models.",
                "A computer vision fitness application running real-time human pose estimation on browser camera feeds to detect exercise posture deviations and count workout repetitions accurately.",
                "Home workouts lack certified personal trainer feedback, leading to improper biomechanics, injuries, and inaccurate repetition tracking.",
                "Utilized Google MediaPipe BlazePose to calculate real-time joint angles against biomechanical heuristics, streaming alerts back to a React frontend.",
                "AI / ML", "COMPLETED", 100.0,
                "2025-10", "2026-01",
                "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80",
                true,
                new ProjectContribution("Computer Vision & Backend Engineer", "Trained angle estimation heuristics and built the Flask streaming API pipeline with WebSocket telemetry.", 3)
        );
        fitness.setTechnologies(Arrays.asList(
                new ProjectTechnology("Python", "Language", true),
                new ProjectTechnology("OpenCV", "AI/ML", true),
                new ProjectTechnology("MediaPipe", "AI/ML", true),
                new ProjectTechnology("Flask", "Backend", false),
                new ProjectTechnology("React", "Frontend", false)
        ));
        fitness.setLinks(Arrays.asList(
                new ProjectLink("GITHUB", "https://github.com/rahul-demo/smart-fitness-monitor", "Repository"),
                new ProjectLink("LIVE_DEMO", "https://fitness-demo.devtrack.app", "Live Demo")
        ));
        fitness.setKeyFeatures(Arrays.asList(
                "Real-time 33-landmark 3D skeletal posture tracking",
                "Dynamic state machine for squat and bicep curl repetition counting",
                "94.2% posture accuracy tested on 50+ subject recordings",
                "Instant visual and audio feedback when back curvature exceeds safety bounds"
        ));
        fitness.setAchievements(Arrays.asList(
                new ProjectAchievement("ach_fit_1", "proj_fitness", "Top 5 Finalist at Hack Celestial 3.0", "Hackathon Finalist", "Devfolio", "2025-11"),
                new ProjectAchievement("ach_fit_2", "proj_fitness", "Best Applied AI Demo", "Winner", "Apex Tech Fest", "2025-12")
        ));
        fitness.setMilestones(Arrays.asList(
                new ProjectMilestone("ms_fit_1", "proj_fitness", "Pose Estimation Benchmark", "Benchmarked MediaPipe vs YOLOv8-pose on mobile devices", "2025-10", true, 1),
                new ProjectMilestone("ms_fit_2", "proj_fitness", "Angle Calculator Pipeline", "Engineered mathematical vector dot-product angle functions", "2025-11", true, 2),
                new ProjectMilestone("ms_fit_3", "proj_fitness", "Production Deployment", "Containerized with Docker and deployed web app to cloud", "2026-01", true, 3)
        ));
        list.add(fitness);

        // 3. Smart Polyhouse Monitoring System (Featured, Completed)
        Project polyhouse = new Project(
                "proj_polyhouse", DEMO_STUDENT_ID, "Smart Polyhouse Monitoring System",
                "Precision greenhouse telemetry system measuring temperature, humidity, and soil moisture with threshold alerts.",
                "Autonomous IoT environmental control system using distributed ESP32 microcontrollers and sensors to maintain optimal greenhouse microclimates for commercial horticulture.",
                "Fluctuating humidity and manual irrigation lead to 30% yield loss and excessive water wastage in tropical greenhouse farming.",
                "Engineered wireless sensor nodes communicating via MQTT to a central telemetry dashboard, triggering automated misting fans and drip solenoids.",
                "IoT", "COMPLETED", 100.0,
                "2025-08", "2025-11",
                "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&auto=format&fit=crop&q=80",
                true,
                new ProjectContribution("Hardware & Embedded C++ Developer", "Wrote low-power firmware for ESP32 nodes, sensor calibration curves, and MQTT message serialization.", 4)
        );
        polyhouse.setTechnologies(Arrays.asList(
                new ProjectTechnology("C++", "Language", true),
                new ProjectTechnology("ESP32", "Hardware", true),
                new ProjectTechnology("Python", "Backend", false),
                new ProjectTechnology("MQTT", "DevOps/Tools", true),
                new ProjectTechnology("SQLite", "Database", false)
        ));
        polyhouse.setLinks(Arrays.asList(
                new ProjectLink("GITHUB", "https://github.com/rahul-demo/smart-polyhouse", "Repository")
        ));
        polyhouse.setKeyFeatures(Arrays.asList(
                "Battery-operated sleep mode consuming less than 15uA between readings",
                "Soil moisture capacitive sensing immune to corrosion",
                "Automated relay triggering for irrigation pumps based on PID thresholds",
                "Offline data logging with SD card fallback"
        ));
        polyhouse.setAchievements(Arrays.asList(
                new ProjectAchievement("ach_poly_1", "proj_polyhouse", "1st Prize - Inter-College Hardware Showcase", "Winner", "State Engineering Expo", "2025-11")
        ));
        list.add(polyhouse);

        // 4. AeroMatrix (Featured, In Progress)
        Project aeroMatrix = new Project(
                "proj_aeromatrix", DEMO_STUDENT_ID, "AeroMatrix Flight Tracker & Geospatial Analytics",
                "High-frequency airspace telemetry visualization and aircraft trajectory prediction platform.",
                "Modern geospatial analytics portal rendering global aircraft transponder ADS-B messages in WebGL, with machine learning trajectory forecasting.",
                "Flight tracking dashboards often freeze under dense airspace traffic due to DOM bottlenecks and unoptimized geo-queries.",
                "Implemented Next.js with MapLibre GL rendering thousands of aircraft vectors with sub-second latencies and FastAPI inference backends.",
                "AI / ML", "IN_PROGRESS", 60.0,
                "2026-01", "Present",
                "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&auto=format&fit=crop&q=80",
                true,
                new ProjectContribution("Geospatial & ML Engineer", "Built the MapLibre visualization layer and Python flight trajectory clustering model.", 2)
        );
        aeroMatrix.setTechnologies(Arrays.asList(
                new ProjectTechnology("Next.js", "Frontend", true),
                new ProjectTechnology("TypeScript", "Language", true),
                new ProjectTechnology("MapLibre", "Frontend", true),
                new ProjectTechnology("Python", "Language", false),
                new ProjectTechnology("FastAPI", "Backend", true),
                new ProjectTechnology("PyTorch", "AI/ML", false)
        ));
        aeroMatrix.setLinks(Arrays.asList(
                new ProjectLink("GITHUB", "https://github.com/rahul-demo/aeromatrix-core", "Repository"),
                new ProjectLink("LIVE_DEMO", "https://aeromatrix.devtrack.app", "Preview")
        ));
        aeroMatrix.setKeyFeatures(Arrays.asList(
                "High performance 60fps WebGL aircraft fleet rendering",
                "Kalman filter smoothing for transponder packet jitter",
                "FastAPI asynchronous event streamer"
        ));
        list.add(aeroMatrix);

        // 5. Data Analysis & Visualization Dashboard (Completed)
        Project dataDash = new Project(
                "proj_datadash", DEMO_STUDENT_ID, "Data Analysis & Visualization Dashboard",
                "Interactive exploratory data analytics portal for multivariate student performance datasets.",
                "Automated statistical analysis toolkit generating correlation matrices, distribution plots, and outlier detections from raw academic CSV datasets.",
                "Educators spend hours generating charts in spreadsheets with no easy way to identify underperforming student cohorts early.",
                "Built an automated Streamlit workflow with interactive filtering, automated hypothesis testing, and PDF executive summaries.",
                "Data Science", "COMPLETED", 100.0,
                "2025-07", "2025-09",
                "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
                false,
                new ProjectContribution("Solo Data Scientist", "Conducted EDA, wrote data pipelines with Pandas, and built the Streamlit interface.", 1)
        );
        dataDash.setTechnologies(Arrays.asList(
                new ProjectTechnology("Python", "Language", true),
                new ProjectTechnology("Pandas", "AI/ML", true),
                new ProjectTechnology("NumPy", "AI/ML", false),
                new ProjectTechnology("Streamlit", "Frontend", true),
                new ProjectTechnology("Matplotlib", "AI/ML", false)
        ));
        dataDash.setLinks(Arrays.asList(
                new ProjectLink("GITHUB", "https://github.com/rahul-demo/student-eda-dashboard", "Repository")
        ));
        dataDash.setKeyFeatures(Arrays.asList(
                "One-click statistical summary and automated skewness checks",
                "Interactive Seaborn & Plotly charts with export options"
        ));
        list.add(dataDash);

        // 6. Java OOP Management System (Completed)
        Project javaOOP = new Project(
                "proj_javaoop", DEMO_STUDENT_ID, "Java OOP Management System",
                "Desktop inventory simulation demonstrating core Object-Oriented Programming design patterns.",
                "A robust inventory management system engineered specifically to demonstrate SOLID design principles, inheritance hierarchies, and JDBC database persistence.",
                "Demonstrating realistic OOP principles often feels abstract without a practical application with real relational persistence.",
                "Engineered a cleanly decoupled domain model using Strategy, Factory, and Repository patterns connected to MySQL via JDBC.",
                "Java", "COMPLETED", 100.0,
                "2025-09", "2025-10",
                "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80",
                false,
                new ProjectContribution("Lead Java Developer", "Designed the UML class diagrams, inheritance hierarchies, and relational database schema.", 2)
        );
        javaOOP.setTechnologies(Arrays.asList(
                new ProjectTechnology("Java", "Language", true),
                new ProjectTechnology("JavaFX", "Frontend", true),
                new ProjectTechnology("MySQL", "Database", true)
        ));
        javaOOP.setLinks(Arrays.asList(
                new ProjectLink("GITHUB", "https://github.com/rahul-demo/java-oop-inventory", "Repository")
        ));
        javaOOP.setKeyFeatures(Arrays.asList(
                "Demonstrates Encapsulation, Polymorphism, and Interface segregation",
                "Robust transaction management with rollback on stock exceptions",
                "Clean MVC architecture with custom JavaFX components"
        ));
        javaOOP.setAchievements(Arrays.asList(
                new ProjectAchievement("ach_oop_1", "proj_javaoop", "2nd Place - Dept OOP Code Sprint", "Winner", "CSE Department", "2025-10")
        ));
        list.add(javaOOP);

        studentProjectsMap.put(DEMO_STUDENT_ID, list);
    }

    public List<Project> getProjects(String studentId, String search, String status, String category, String tech, String sort) {
        List<Project> projects = studentProjectsMap.computeIfAbsent(studentId, k -> new ArrayList<>());

        return projects.stream()
                .filter(p -> {
                    if (search != null && !search.trim().isEmpty()) {
                        String query = search.toLowerCase().trim();
                        boolean matchName = p.getName().toLowerCase().contains(query);
                        boolean matchDesc = p.getShortDescription().toLowerCase().contains(query);
                        boolean matchCat = p.getCategory().toLowerCase().contains(query);
                        boolean matchRole = p.getContribution() != null && p.getContribution().getRole().toLowerCase().contains(query);
                        boolean matchTech = p.getTechnologies().stream().anyMatch(t -> t.getName().toLowerCase().contains(query));
                        if (!matchName && !matchDesc && !matchCat && !matchRole && !matchTech) return false;
                    }
                    if (status != null && !status.trim().isEmpty() && !status.equalsIgnoreCase("ALL")) {
                        if (!p.getStatus().equalsIgnoreCase(status.trim())) return false;
                    }
                    if (category != null && !category.trim().isEmpty() && !category.equalsIgnoreCase("ALL")) {
                        if (!p.getCategory().toLowerCase().contains(category.toLowerCase().trim())) return false;
                    }
                    if (tech != null && !tech.trim().isEmpty() && !tech.equalsIgnoreCase("ALL")) {
                        boolean hasTech = p.getTechnologies().stream().anyMatch(t -> t.getName().equalsIgnoreCase(tech.trim()));
                        if (!hasTech) return false;
                    }
                    return true;
                })
                .sorted((a, b) -> {
                    if ("ALPHABETICAL".equalsIgnoreCase(sort)) {
                        return a.getName().compareToIgnoreCase(b.getName());
                    }
                    if ("PROGRESS".equalsIgnoreCase(sort)) {
                        return Double.compare(b.getProgressPercentage(), a.getProgressPercentage());
                    }
                    if ("OLDEST".equalsIgnoreCase(sort)) {
                        return a.getCreatedAt().compareTo(b.getCreatedAt());
                    }
                    // Default: Recently Updated / Newest
                    return b.getUpdatedAt().compareTo(a.getUpdatedAt());
                })
                .collect(Collectors.toList());
    }

    public Optional<Project> getProjectById(String studentId, String projectId) {
        return studentProjectsMap.computeIfAbsent(studentId, k -> new ArrayList<>())
                .stream()
                .filter(p -> p.getId().equalsIgnoreCase(projectId))
                .findFirst();
    }

    public Project createProject(String studentId, Project project) {
        if (project.getName() == null || project.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Project name is required.");
        }
        if (project.getId() == null || project.getId().trim().isEmpty()) {
            project.setId("proj_" + UUID.randomUUID().toString().substring(0, 8));
        }
        project.setStudentId(studentId);
        List<Project> list = studentProjectsMap.computeIfAbsent(studentId, k -> new ArrayList<>());
        list.add(0, project);
        return project;
    }

    public Project updateProject(String studentId, String projectId, Project updated) {
        Project existing = getProjectById(studentId, projectId)
                .orElseThrow(() -> new NoSuchElementException("Project not found with ID: " + projectId));

        if (updated.getName() != null && !updated.getName().trim().isEmpty()) {
            existing.setName(updated.getName().trim());
        }
        if (updated.getShortDescription() != null) {
            existing.setShortDescription(updated.getShortDescription());
        }
        if (updated.getDetailedDescription() != null) {
            existing.setDetailedDescription(updated.getDetailedDescription());
        }
        if (updated.getProblemStatement() != null) {
            existing.setProblemStatement(updated.getProblemStatement());
        }
        if (updated.getSolutionOverview() != null) {
            existing.setSolutionOverview(updated.getSolutionOverview());
        }
        if (updated.getCategory() != null) {
            existing.setCategory(updated.getCategory());
        }
        if (updated.getStatus() != null) {
            existing.setStatus(updated.getStatus());
        }
        if (updated.getProgressPercentage() >= 0) {
            existing.setProgressPercentage(updated.getProgressPercentage());
        }
        if (updated.getStartDate() != null) {
            existing.setStartDate(updated.getStartDate());
        }
        if (updated.getEndDate() != null) {
            existing.setEndDate(updated.getEndDate());
        }
        if (updated.getImageUrl() != null) {
            existing.setImageUrl(updated.getImageUrl());
        }
        existing.setFeatured(updated.isFeatured());

        if (updated.getContribution() != null) {
            existing.setContribution(updated.getContribution());
        }
        if (updated.getTechnologies() != null) {
            existing.setTechnologies(updated.getTechnologies());
        }
        if (updated.getLinks() != null) {
            existing.setLinks(updated.getLinks());
        }
        if (updated.getKeyFeatures() != null) {
            existing.setKeyFeatures(updated.getKeyFeatures());
        }
        if (updated.getAchievements() != null) {
            existing.setAchievements(updated.getAchievements());
        }
        if (updated.getMilestones() != null) {
            existing.setMilestones(updated.getMilestones());
        }

        existing.touch();
        return existing;
    }

    public boolean deleteProject(String studentId, String projectId) {
        List<Project> list = studentProjectsMap.computeIfAbsent(studentId, k -> new ArrayList<>());
        return list.removeIf(p -> p.getId().equalsIgnoreCase(projectId));
    }

    public Project toggleFeatured(String studentId, String projectId) {
        Project p = getProjectById(studentId, projectId)
                .orElseThrow(() -> new NoSuchElementException("Project not found with ID: " + projectId));
        p.setFeatured(!p.isFeatured());
        p.touch();
        return p;
    }

    public Map<String, Object> getOverviewStats(String studentId) {
        List<Project> all = studentProjectsMap.computeIfAbsent(studentId, k -> new ArrayList<>());

        long total = all.size();
        long completed = all.stream().filter(p -> "COMPLETED".equalsIgnoreCase(p.getStatus())).count();
        long inProgress = all.stream().filter(p -> "IN_PROGRESS".equalsIgnoreCase(p.getStatus())).count();
        long planning = all.stream().filter(p -> "PLANNING".equalsIgnoreCase(p.getStatus())).count();
        long featured = all.stream().filter(Project::isFeatured).count();

        Set<String> uniqueTechs = new HashSet<>();
        for (Project p : all) {
            for (ProjectTechnology t : p.getTechnologies()) {
                uniqueTechs.add(t.getName());
            }
        }

        Map<String, Object> stats = new LinkedHashMap<>();
        stats.put("totalProjects", total);
        stats.put("completedCount", completed);
        stats.put("inProgressCount", inProgress);
        stats.put("planningCount", planning);
        stats.put("featuredCount", featured);
        stats.put("technologiesCount", uniqueTechs.size());
        stats.put("uniqueTechnologies", uniqueTechs);

        return stats;
    }
}
