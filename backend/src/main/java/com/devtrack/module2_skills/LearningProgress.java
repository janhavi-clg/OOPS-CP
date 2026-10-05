package com.devtrack.module2_skills;

/**
 * Value Object / DTO encapsulating the calculated progress of a student's tracked skill.
 *
 * TRANSPARENT PROGRESS FORMULA (Faculty Explanatory Model):
 * -------------------------------------------------------------
 * 1. Resource Completion Percentage = (completedResources / totalResources) * 100
 *    (If totalResources == 0, resource progress is 0.0%)
 *
 * 2. Practice Problem Completion Percentage = Math.min(100.0, (solvedProblems / targetProblems) * 100)
 *    (Default target is 30 problems or user-specified target)
 *
 * 3. Overall Skill Progress = (Resource Progress * 50%) + (Practice Progress * 50%)
 * -------------------------------------------------------------
 */
public class LearningProgress {
    private String skillId;
    private String skillName;
    private int totalResources;
    private int completedResources;
    private double resourceProgressPercentage;
    private int solvedProblems;
    private int targetProblems;
    private double practiceProgressPercentage;
    private double overallProgressPercentage;
    private String status;
    private String lastActivity;

    public LearningProgress() {}

    public LearningProgress(String skillId, String skillName, int totalResources, int completedResources,
                            int solvedProblems, int targetProblems, String status, String lastActivity) {
        this.skillId = skillId;
        this.skillName = skillName;
        this.totalResources = totalResources;
        this.completedResources = completedResources;
        this.solvedProblems = solvedProblems;
        this.targetProblems = targetProblems > 0 ? targetProblems : 30;
        this.status = status;
        this.lastActivity = lastActivity != null ? lastActivity : "Recent";

        // Calculate transparently
        recalculate();
    }

    public void recalculate() {
        // Step 1: Resource component (50% weight)
        if (totalResources > 0) {
            this.resourceProgressPercentage = Math.round(((double) completedResources / totalResources) * 100.0 * 10.0) / 10.0;
        } else {
            this.resourceProgressPercentage = 0.0;
        }

        // Step 2: Practice problem component (50% weight)
        if (targetProblems > 0) {
            double rawPractice = ((double) solvedProblems / targetProblems) * 100.0;
            this.practiceProgressPercentage = Math.min(100.0, Math.round(rawPractice * 10.0) / 10.0);
        } else {
            this.practiceProgressPercentage = 0.0;
        }

        // Step 3: Combined weighted score
        double rawOverall = (this.resourceProgressPercentage * 0.5) + (this.practiceProgressPercentage * 0.5);
        this.overallProgressPercentage = Math.min(100.0, Math.max(0.0, Math.round(rawOverall * 10.0) / 10.0));
    }

    // Getters and Setters
    public String getSkillId() { return skillId; }
    public void setSkillId(String skillId) { this.skillId = skillId; }

    public String getSkillName() { return skillName; }
    public void setSkillName(String skillName) { this.skillName = skillName; }

    public int getTotalResources() { return totalResources; }
    public void setTotalResources(int totalResources) {
        this.totalResources = totalResources;
        recalculate();
    }

    public int getCompletedResources() { return completedResources; }
    public void setCompletedResources(int completedResources) {
        this.completedResources = completedResources;
        recalculate();
    }

    public double getResourceProgressPercentage() { return resourceProgressPercentage; }

    public int getSolvedProblems() { return solvedProblems; }
    public void setSolvedProblems(int solvedProblems) {
        this.solvedProblems = solvedProblems;
        recalculate();
    }

    public int getTargetProblems() { return targetProblems; }
    public void setTargetProblems(int targetProblems) {
        this.targetProblems = targetProblems;
        recalculate();
    }

    public double getPracticeProgressPercentage() { return practiceProgressPercentage; }

    public double getOverallProgressPercentage() { return overallProgressPercentage; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getLastActivity() { return lastActivity; }
    public void setLastActivity(String lastActivity) { this.lastActivity = lastActivity; }
}
