package com.devtrack.module3_coding;

/**
 * Composite entity holding all statistics for a coding profile.
 * Demonstrates OOP Composition by aggregating ProblemStatistics, ContestStatistics,
 * StreakStatistics, and GitHubStatistics.
 */
public class CodingStatistics {
    private ProblemStatistics problemStats;
    private ContestStatistics contestStats;
    private StreakStatistics streakStats;
    private GitHubStatistics githubStats;

    public CodingStatistics() {
        this.problemStats = new ProblemStatistics();
        this.contestStats = new ContestStatistics();
        this.streakStats = new StreakStatistics();
        this.githubStats = new GitHubStatistics();
    }

    public CodingStatistics(ProblemStatistics problemStats, ContestStatistics contestStats,
                            StreakStatistics streakStats, GitHubStatistics githubStats) {
        this.problemStats = problemStats != null ? problemStats : new ProblemStatistics();
        this.contestStats = contestStats != null ? contestStats : new ContestStatistics();
        this.streakStats = streakStats != null ? streakStats : new StreakStatistics();
        this.githubStats = githubStats != null ? githubStats : new GitHubStatistics();
    }

    // Encapsulation Getters and Setters
    public ProblemStatistics getProblemStats() {
        return problemStats;
    }

    public void setProblemStats(ProblemStatistics problemStats) {
        this.problemStats = problemStats;
    }

    public ContestStatistics getContestStats() {
        return contestStats;
    }

    public void setContestStats(ContestStatistics contestStats) {
        this.contestStats = contestStats;
    }

    public StreakStatistics getStreakStats() {
        return streakStats;
    }

    public void setStreakStats(StreakStatistics streakStats) {
        this.streakStats = streakStats;
    }

    public GitHubStatistics getGithubStats() {
        return githubStats;
    }

    public void setGithubStats(GitHubStatistics githubStats) {
        this.githubStats = githubStats;
    }

    // Convenience delegate methods
    public int getTotalSolved() {
        return problemStats != null ? problemStats.getTotalSolved() : 0;
    }

    public int getContestRating() {
        return contestStats != null ? contestStats.getRating() : 0;
    }

    public int getCurrentStreakDays() {
        return streakStats != null ? streakStats.getCurrentStreakDays() : 0;
    }
}
