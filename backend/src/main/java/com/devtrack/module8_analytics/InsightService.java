package com.devtrack.module8_analytics;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * InsightService generates transparent rule-based observations from real DevTrack data.
 * Does NOT pretend to be an AI algorithm.
 */
@Service
public class InsightService {

    public List<DevTrackInsight> generateInsights(CodingAnalytics coding, SkillAnalytics skills,
                                                  ProjectAnalytics projects, LearningAnalytics learning) {
        List<DevTrackInsight> insights = new ArrayList<>();

        // Coding insight
        if (coding != null && coding.getProblemsSolved() > 0) {
            insights.add(new DevTrackInsight(
                "ins_cod_01",
                "Strong Algorithmic Momentum",
                "You solved " + coding.getProblemsSolved() + " coding problems with an active " + coding.getCodingStreakDays() + "-day streak on LeetCode.",
                "CODING",
                "POSITIVE"
            ));
        }

        // Skill insight
        if (skills != null && skills.getTopSkill() != null) {
            insights.add(new DevTrackInsight(
                "ins_skl_01",
                "Primary Core Competency",
                skills.getTopSkill() + " is currently your highest tracked skill at " + (int) skills.getTopSkillProgress() + "% proficiency.",
                "SKILL",
                "POSITIVE"
            ));
        }

        // Project insight
        if (projects != null && projects.getTotalProjects() > 0) {
            insights.add(new DevTrackInsight(
                "ins_prj_01",
                "Project Delivery Pace",
                projects.getCompletedProjects() + " of " + projects.getTotalProjects() + " portfolio projects are completed (" + projects.getCompletionRate() + "% delivery rate).",
                "PROJECT",
                "POSITIVE"
            ));
        }

        // Learning insight
        if (learning != null && learning.getCompletedResources() > 0) {
            insights.add(new DevTrackInsight(
                "ins_lrn_01",
                "Structured Curriculum Focus",
                "You have completed " + learning.getCompletedResources() + " learning modules across " + learning.getActiveDays() + " active study days.",
                "LEARNING",
                "NEUTRAL"
            ));
        }

        return insights;
    }
}
