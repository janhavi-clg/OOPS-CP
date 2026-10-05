package com.devtrack.module3_coding;

import org.springframework.stereotype.Service;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Service Layer for student Coding Goals.
 * Manages goal creation, progress evaluation, target updates, and data isolation.
 */
@Service
public class CodingGoalService {

    private final Map<String, List<CodingGoal>> studentGoalsMap = new ConcurrentHashMap<>();
    private final String DEMO_STUDENT_ID = "stu_rahul_01";

    public CodingGoalService() {
        initRahulGoals();
    }

    private void initRahulGoals() {
        List<CodingGoal> goals = new ArrayList<>();

        goals.add(new CodingGoal(
                "goal_1", DEMO_STUDENT_ID, "Solve 150 LeetCode Questions",
                "PROBLEMS_SOLVED", "LeetCode", 150, 137,
                "Monthly", "2026-10-31", "ACTIVE"
        ));

        goals.add(new CodingGoal(
                "goal_2", DEMO_STUDENT_ID, "Daily Target: 2 Problems/Day",
                "DAILY_TARGET", "All Platforms", 2, 2,
                "Daily", "Today", "COMPLETED"
        ));

        goals.add(new CodingGoal(
                "goal_3", DEMO_STUDENT_ID, "Reach 1600 Rating on CodeChef",
                "CONTEST_RATING", "CodeChef", 1600, 1542,
                "Semester", "2026-12-15", "ACTIVE"
        ));

        studentGoalsMap.put(DEMO_STUDENT_ID, goals);
    }

    public List<CodingGoal> getGoals(String studentId) {
        return studentGoalsMap.computeIfAbsent(studentId, k -> new ArrayList<>());
    }

    public Optional<CodingGoal> getGoalById(String studentId, String goalId) {
        return getGoals(studentId).stream()
                .filter(g -> g.getId().equalsIgnoreCase(goalId))
                .findFirst();
    }

    public CodingGoal addGoal(String studentId, CodingGoal goal) {
        if (goal.getTitle() == null || goal.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("Goal title is required.");
        }
        if (goal.getTargetValue() <= 0) {
            throw new IllegalArgumentException("Target value must be greater than zero.");
        }
        if (goal.getId() == null || goal.getId().trim().isEmpty()) {
            goal.setId("goal_" + UUID.randomUUID().toString().substring(0, 8));
        }
        goal.setStudentId(studentId);
        getGoals(studentId).add(0, goal);
        return goal;
    }

    public CodingGoal updateGoal(String studentId, String goalId, CodingGoal updated) {
        CodingGoal existing = getGoalById(studentId, goalId)
                .orElseThrow(() -> new NoSuchElementException("Goal not found with ID: " + goalId));

        if (updated.getTitle() != null && !updated.getTitle().trim().isEmpty()) {
            existing.setTitle(updated.getTitle().trim());
        }
        if (updated.getGoalType() != null) {
            existing.setGoalType(updated.getGoalType());
        }
        if (updated.getPlatform() != null) {
            existing.setPlatform(updated.getPlatform());
        }
        if (updated.getTargetValue() > 0) {
            existing.setTargetValue(updated.getTargetValue());
        }
        if (updated.getCurrentValue() >= 0) {
            existing.setCurrentValue(updated.getCurrentValue());
        }
        if (updated.getTimeframe() != null) {
            existing.setTimeframe(updated.getTimeframe());
        }
        if (updated.getDeadline() != null) {
            existing.setDeadline(updated.getDeadline());
        }
        if (updated.getStatus() != null) {
            existing.setStatus(updated.getStatus());
        }
        existing.touch();
        return existing;
    }

    public boolean deleteGoal(String studentId, String goalId) {
        List<CodingGoal> goals = getGoals(studentId);
        return goals.removeIf(g -> g.getId().equalsIgnoreCase(goalId));
    }
}
