package com.devtrack.module3_coding;

/**
 * Supported Coding Platforms in DevTrack.
 * Encapsulates platform metadata, official API support status, and profile URL construction.
 */
public enum CodingPlatform {
    LEETCODE("LeetCode", "https://leetcode.com/u/", true, "Official Public GraphQL / Wrapper"),
    GITHUB("GitHub", "https://github.com/", true, "Official Public REST API"),
    CODEFORCES("Codeforces", "https://codeforces.com/profile/", true, "Official Public REST API"),
    CODECHEF("CodeChef", "https://www.codechef.com/users/", false, "Manual Verification"),
    GEEKSFORGEEKS("GeeksforGeeks", "https://auth.geeksforgeeks.org/user/", false, "Manual Verification"),
    HACKERRANK("HackerRank", "https://www.hackerrank.com/profile/", false, "Manual Verification"),
    ATCODER("AtCoder", "https://atcoder.jp/users/", false, "Manual Verification"),
    HACKEREARTH("HackerEarth", "https://www.hackerearth.com/@", false, "Manual Verification"),
    OTHER("Other", "", false, "Manual Verification");

    private final String displayName;
    private final String profileBaseUrl;
    private final boolean officialApiAvailable;
    private final String integrationType;

    CodingPlatform(String displayName, String profileBaseUrl, boolean officialApiAvailable, String integrationType) {
        this.displayName = displayName;
        this.profileBaseUrl = profileBaseUrl;
        this.officialApiAvailable = officialApiAvailable;
        this.integrationType = integrationType;
    }

    public String getDisplayName() {
        return displayName;
    }

    public String getProfileBaseUrl() {
        return profileBaseUrl;
    }

    public boolean isOfficialApiAvailable() {
        return officialApiAvailable;
    }

    public String getIntegrationType() {
        return integrationType;
    }

    public static CodingPlatform fromString(String text) {
        if (text == null) return OTHER;
        for (CodingPlatform p : CodingPlatform.values()) {
            if (p.name().equalsIgnoreCase(text) || p.displayName.equalsIgnoreCase(text)) {
                return p;
            }
        }
        return OTHER;
    }
}
