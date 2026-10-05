package com.devtrack.module3_coding;

import org.springframework.stereotype.Service;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

/**
 * Service Layer for the student's chronological "Coding Journey" activity timeline.
 * Handles activity logging, filtering by platform and timeframe, and ownership isolation.
 */
@Service
public class CodingActivityService {

    private final Map<String, List<CodingActivity>> studentActivitiesMap = new ConcurrentHashMap<>();
    private final String DEMO_STUDENT_ID = "stu_rahul_01";

    public CodingActivityService() {
        initRahulActivities();
    }

    private void initRahulActivities() {
        List<CodingActivity> activities = new ArrayList<>();

        activities.add(new CodingActivity(
                "act_1", DEMO_STUDENT_ID, "Solved 5 LeetCode Problems", "LeetCode",
                "SOLVED_PROBLEM", "2026-10-04", "Solved Two Sum, Valid Parentheses, Binary Search",
                "DEMO", "https://leetcode.com/u/rahul_codes/"
        ));

        activities.add(new CodingActivity(
                "act_2", DEMO_STUDENT_ID, "Starters 150 Contest Participation", "CodeChef",
                "CONTEST_PARTICIPATION", "2026-10-03", "Ranked 480 / 12,000 in Division 2 (+45 Rating)",
                "DEMO", "https://www.codechef.com/users/rahul_dev"
        ));

        activities.add(new CodingActivity(
                "act_3", DEMO_STUDENT_ID, "Created Repository: ai-study-planner", "GitHub",
                "REPO_CREATED", "2026-10-02", "Pushed initial Java Spring Boot + React architecture",
                "DEMO", "https://github.com/rahul-demo/ai-study-planner"
        ));

        activities.add(new CodingActivity(
                "act_4", DEMO_STUDENT_ID, "Solved 3 Medium DSA Questions", "LeetCode",
                "SOLVED_PROBLEM", "2026-10-01", "Top K Frequent Elements, Sliding Window Maximum",
                "DEMO", "https://leetcode.com/u/rahul_codes/"
        ));

        activities.add(new CodingActivity(
                "act_5", DEMO_STUDENT_ID, "Codeforces Round 970 (Div. 3)", "Codeforces",
                "CONTEST_PARTICIPATION", "2026-09-28", "Solved Problems A, B, and C within contest window",
                "DEMO", "https://codeforces.com/profile/rahul_cf"
        ));

        activities.add(new CodingActivity(
                "act_6", DEMO_STUDENT_ID, "Pushed 6 Commits to smart-fitness-monitor", "GitHub",
                "COMMIT_PUSHED", "2026-09-24", "Refactored MediaPipe posture detection pipeline",
                "DEMO", "https://github.com/rahul-demo/smart-fitness-monitor"
        ));

        studentActivitiesMap.put(DEMO_STUDENT_ID, activities);
    }

    public List<CodingActivity> getActivities(String studentId) {
        return studentActivitiesMap.computeIfAbsent(studentId, k -> new ArrayList<>());
    }

    public List<CodingActivity> getActivitiesByPlatform(String studentId, String platform) {
        if (platform == null || platform.equalsIgnoreCase("ALL")) {
            return getActivities(studentId);
        }
        return getActivities(studentId).stream()
                .filter(a -> a.getPlatform().equalsIgnoreCase(platform))
                .collect(Collectors.toList());
    }

    public CodingActivity logActivity(String studentId, CodingActivity activity) {
        if (activity.getId() == null || activity.getId().trim().isEmpty()) {
            activity.setId("act_" + UUID.randomUUID().toString().substring(0, 8));
        }
        activity.setStudentId(studentId);
        getActivities(studentId).add(0, activity); // Prepend newest
        return activity;
    }
}
