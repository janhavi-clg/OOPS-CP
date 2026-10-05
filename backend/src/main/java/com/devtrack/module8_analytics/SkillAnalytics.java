package com.devtrack.module8_analytics;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * SkillAnalytics encapsulates aggregate metrics for skills tracked from Module 2.
 * Demonstrates OOP Encapsulation.
 */
public class SkillAnalytics {
    private int totalSkillsTracked;
    private double averageProficiency; // 0 to 100
    private String topSkill;
    private double topSkillProgress;
    private List<Map<String, Object>> skillProgressList = new ArrayList<>();

    public SkillAnalytics() {
    }

    public SkillAnalytics(int totalSkillsTracked, double averageProficiency, String topSkill, double topSkillProgress,
                          List<Map<String, Object>> skillProgressList) {
        this.totalSkillsTracked = totalSkillsTracked;
        this.averageProficiency = averageProficiency;
        this.topSkill = topSkill;
        this.topSkillProgress = topSkillProgress;
        if (skillProgressList != null) {
            this.skillProgressList = new ArrayList<>(skillProgressList);
        }
    }

    public int getTotalSkillsTracked() {
        return totalSkillsTracked;
    }

    public void setTotalSkillsTracked(int totalSkillsTracked) {
        this.totalSkillsTracked = totalSkillsTracked;
    }

    public double getAverageProficiency() {
        return averageProficiency;
    }

    public void setAverageProficiency(double averageProficiency) {
        this.averageProficiency = averageProficiency;
    }

    public String getTopSkill() {
        return topSkill;
    }

    public void setTopSkill(String topSkill) {
        this.topSkill = topSkill;
    }

    public double getTopSkillProgress() {
        return topSkillProgress;
    }

    public void setTopSkillProgress(double topSkillProgress) {
        this.topSkillProgress = topSkillProgress;
    }

    public List<Map<String, Object>> getSkillProgressList() {
        return new ArrayList<>(skillProgressList);
    }

    public void setSkillProgressList(List<Map<String, Object>> skillProgressList) {
        this.skillProgressList = skillProgressList != null ? new ArrayList<>(skillProgressList) : new ArrayList<>();
    }
}
