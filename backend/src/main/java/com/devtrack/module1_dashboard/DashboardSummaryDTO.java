package com.devtrack.module1_dashboard;

import com.devtrack.core.model.CodingProfile;
import com.devtrack.core.model.StudentProfile;
import java.util.List;

/**
 * Data Transfer Object encapsulating high-level dashboard metrics for the student.
 */
public class DashboardSummaryDTO {
    private String studentName;
    private String yearAndBranch;
    private String college;
    private double cgpa;
    private int totalSkillsCount;
    private double averageSkillProficiency;
    private int leetCodeTotalSolved;
    private int currentStreakDays;
    private int totalProjects;
    private int activeProjects;
    private int certificatesEarned;
    private int hackathonsAttended;
    private int pendingTasksCount;

    public DashboardSummaryDTO() {}

    public static DashboardSummaryDTO fromStudentProfile(StudentProfile profile) {
        DashboardSummaryDTO dto = new DashboardSummaryDTO();
        dto.studentName = profile.getName();
        dto.yearAndBranch = profile.getYear() + " - " + profile.getBranch();
        dto.college = profile.getCollege();
        dto.cgpa = profile.getCgpa();
        dto.totalSkillsCount = profile.getSkills() != null ? profile.getSkills().size() : 0;
        dto.averageSkillProficiency = profile.calculateAverageSkillProficiency();

        CodingProfile coding = profile.getCodingProfile();
        if (coding != null) {
            dto.leetCodeTotalSolved = coding.getTotalSolved();
            dto.currentStreakDays = coding.getCurrentStreakDays();
        }

        dto.totalProjects = profile.getProjects() != null ? profile.getProjects().size() : 0;
        dto.activeProjects = profile.getProjects() != null ? (int) profile.getProjects().stream().filter(p -> "In Progress".equalsIgnoreCase(p.getStatus())).count() : 0;
        dto.certificatesEarned = profile.getCertificates() != null ? profile.getCertificates().size() : 0;
        dto.hackathonsAttended = profile.getHackathons() != null ? profile.getHackathons().size() : 0;
        dto.pendingTasksCount = profile.getTasks() != null ? (int) profile.getTasks().stream().filter(t -> !t.isCompleted()).count() : 0;

        return dto;
    }

    public String getStudentName() { return studentName; }
    public String getYearAndBranch() { return yearAndBranch; }
    public String getCollege() { return college; }
    public double getCgpa() { return cgpa; }
    public int getTotalSkillsCount() { return totalSkillsCount; }
    public double getAverageSkillProficiency() { return averageSkillProficiency; }
    public int getLeetCodeTotalSolved() { return leetCodeTotalSolved; }
    public int getCurrentStreakDays() { return currentStreakDays; }
    public int getTotalProjects() { return totalProjects; }
    public int getActiveProjects() { return activeProjects; }
    public int getCertificatesEarned() { return certificatesEarned; }
    public int getHackathonsAttended() { return hackathonsAttended; }
    public int getPendingTasksCount() { return pendingTasksCount; }
}
