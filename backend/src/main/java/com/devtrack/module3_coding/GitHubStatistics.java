package com.devtrack.module3_coding;

import java.util.ArrayList;
import java.util.List;

/**
 * GitHubStatistics entity encapsulating repository, contribution, and follower counts.
 * Demonstrates OOP Encapsulation.
 */
public class GitHubStatistics {
    private int publicRepos;
    private int followers;
    private int following;
    private int totalStars;
    private int publicGists;
    private int contributionsThisYear;
    private List<String> topLanguages = new ArrayList<>();

    public GitHubStatistics() {}

    public GitHubStatistics(int publicRepos, int followers, int following, int totalStars,
                            int publicGists, int contributionsThisYear, List<String> topLanguages) {
        this.publicRepos = publicRepos;
        this.followers = followers;
        this.following = following;
        this.totalStars = totalStars;
        this.publicGists = publicGists;
        this.contributionsThisYear = contributionsThisYear;
        if (topLanguages != null) {
            this.topLanguages = topLanguages;
        }
    }

    public int getPublicRepos() {
        return publicRepos;
    }

    public void setPublicRepos(int publicRepos) {
        this.publicRepos = publicRepos;
    }

    public int getFollowers() {
        return followers;
    }

    public void setFollowers(int followers) {
        this.followers = followers;
    }

    public int getFollowing() {
        return following;
    }

    public void setFollowing(int following) {
        this.following = following;
    }

    public int getTotalStars() {
        return totalStars;
    }

    public void setTotalStars(int totalStars) {
        this.totalStars = totalStars;
    }

    public int getPublicGists() {
        return publicGists;
    }

    public void setPublicGists(int publicGists) {
        this.publicGists = publicGists;
    }

    public int getContributionsThisYear() {
        return contributionsThisYear;
    }

    public void setContributionsThisYear(int contributionsThisYear) {
        this.contributionsThisYear = contributionsThisYear;
    }

    public List<String> getTopLanguages() {
        return topLanguages;
    }

    public void setTopLanguages(List<String> topLanguages) {
        this.topLanguages = topLanguages;
    }
}
