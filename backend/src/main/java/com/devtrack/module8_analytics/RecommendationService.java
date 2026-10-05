package com.devtrack.module8_analytics;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * RecommendationService generates transparent rule-based actionable progress tips.
 */
@Service
public class RecommendationService {

    public List<Recommendation> generateRecommendations(SkillAnalytics skills, ProjectAnalytics projects,
                                                        AchievementAnalytics achievements, CodingAnalytics coding) {
        List<Recommendation> list = new ArrayList<>();

        // Skill recommendation
        if (skills != null && skills.getTopSkill() != null) {
            list.add(new Recommendation(
                "rec_01",
                "Advance " + skills.getTopSkill() + " to 80%",
                "Complete 2 more resources in " + skills.getTopSkill() + " to reach advanced proficiency tier.",
                "module2",
                "/app/skills",
                "HIGH"
            ));
        }

        // Project recommendation
        if (projects != null && projects.getInProgressProjects() > 0) {
            list.add(new Recommendation(
                "rec_02",
                "Finalize In-Progress Projects",
                "You have " + projects.getInProgressProjects() + " projects in development. Complete milestones to feature them on your resume.",
                "module4",
                "/app/projects",
                "MEDIUM"
            ));
        }

        // Resume / Certificate recommendation
        list.add(new Recommendation(
            "rec_03",
            "Update Resume with Latest Credentials",
            "Ensure your verified certificates and recent Hack Celestial win are linked in your active resume.",
            "module6",
            "/app/resume",
            "MEDIUM"
        ));

        // Coding streak recommendation
        if (coding != null) {
            list.add(new Recommendation(
                "rec_04",
                "Maintain Coding Daily Streak",
                "Solve today's Daily LeetCode problem to extend your " + coding.getCodingStreakDays() + "-day streak.",
                "module3",
                "/app/coding",
                "HIGH"
            ));
        }

        return list;
    }
}
