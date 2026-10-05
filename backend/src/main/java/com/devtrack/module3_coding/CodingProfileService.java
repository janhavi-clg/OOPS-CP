package com.devtrack.module3_coding;

import org.springframework.stereotype.Service;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Service Layer for student Coding Profiles.
 * Handles connecting platforms, automated syncing, manual verification, and data isolation.
 */
@Service
public class CodingProfileService {

    private final Map<String, List<CodingProfile>> studentProfilesMap = new ConcurrentHashMap<>();
    private final PlatformSyncService syncService;

    private final String DEMO_STUDENT_ID = "stu_rahul_01";

    public CodingProfileService(PlatformSyncService syncService) {
        this.syncService = syncService;
        initRahulProfiles();
    }

    private void initRahulProfiles() {
        List<CodingProfile> profiles = new ArrayList<>();

        // 1. LeetCode (Fictional prototype demo stats for Rahul)
        CodingStatistics leetcodeStats = new CodingStatistics(
                new ProblemStatistics(137, 82, 48, 7, 64.2),
                new ContestStatistics(1542, "~182,400", 12, "Knight", 18.2),
                new StreakStatistics(23, 45, 85, 14, 38),
                null
        );
        profiles.add(new CodingProfile(
                "cp_lc_01", DEMO_STUDENT_ID, CodingPlatform.LEETCODE, "rahul_codes",
                "https://leetcode.com/u/rahul_codes/", "DEMO", "CONNECTED",
                "Today, 08:30 PM", null, "Demo account for Rahul (2nd Year CSE AI/ML)",
                leetcodeStats
        ));

        // 2. GitHub (Fictional prototype demo stats for Rahul)
        List<String> ghLangs = Arrays.asList("Java", "Python", "JavaScript", "C++");
        CodingStatistics githubStats = new CodingStatistics(
                null, null,
                new StreakStatistics(14, 28, 45, 8, 26),
                new GitHubStatistics(14, 28, 19, 32, 4, 184, ghLangs)
        );
        profiles.add(new CodingProfile(
                "cp_gh_01", DEMO_STUDENT_ID, CodingPlatform.GITHUB, "rahul-demo",
                "https://github.com/rahul-demo", "DEMO", "CONNECTED",
                "Yesterday, 06:15 PM", null, "Portfolio projects and repositories",
                githubStats
        ));

        // 3. CodeChef (Manual Verified flow)
        CodingStatistics codechefStats = new CodingStatistics(
                new ProblemStatistics(42, 28, 12, 2, 59.0),
                new ContestStatistics(1640, "Division 2", 8, "3-Star", 12.5),
                new StreakStatistics(9, 18, 30, 3, 12),
                null
        );
        profiles.add(new CodingProfile(
                "cp_cc_01", DEMO_STUDENT_ID, CodingPlatform.CODECHEF, "rahul_dev",
                "https://www.codechef.com/users/rahul_dev", "MANUAL", "CONNECTED",
                "Oct 02, 2025", "https://devtrack.demo/proof/codechef_rahul.png",
                "Verified via screenshot proof & profile link",
                codechefStats
        ));

        // 4. Codeforces (Demo prototype)
        CodingStatistics cfStats = new CodingStatistics(
                new ProblemStatistics(34, 20, 12, 2, 54.8),
                new ContestStatistics(1280, "Pupil", 6, "Pupil", 24.0),
                new StreakStatistics(7, 15, 24, 4, 10),
                null
        );
        profiles.add(new CodingProfile(
                "cp_cf_01", DEMO_STUDENT_ID, CodingPlatform.CODEFORCES, "rahul_cf",
                "https://codeforces.com/profile/rahul_cf", "DEMO", "CONNECTED",
                "Sep 28, 2025", null, "Contest participations in Div 3 & 4",
                cfStats
        ));

        studentProfilesMap.put(DEMO_STUDENT_ID, profiles);
    }

    public List<CodingProfile> getProfiles(String studentId) {
        return studentProfilesMap.computeIfAbsent(studentId, k -> new ArrayList<>());
    }

    public Optional<CodingProfile> getProfileById(String studentId, String profileId) {
        return getProfiles(studentId).stream()
                .filter(p -> p.getId().equalsIgnoreCase(profileId))
                .findFirst();
    }

    public CodingProfile addProfile(String studentId, CodingProfile profile) {
        if (profile.getUsername() == null || profile.getUsername().trim().isEmpty()) {
            throw new IllegalArgumentException("Username/handle is required.");
        }
        if (profile.getPlatform() == null) {
            throw new IllegalArgumentException("Coding platform is required.");
        }

        // Prevent duplicate platform connections
        List<CodingProfile> profiles = getProfiles(studentId);
        boolean exists = profiles.stream()
                .anyMatch(p -> p.getPlatform() == profile.getPlatform());
        if (exists) {
            throw new IllegalArgumentException(
                    "You have already connected " + profile.getPlatform().getDisplayName() + "."
            );
        }

        if (profile.getId() == null || profile.getId().trim().isEmpty()) {
            profile.setId("cp_" + UUID.randomUUID().toString().substring(0, 8));
        }
        profile.setStudentId(studentId);

        // If automated sync is available and not in manual mode, attempt initial sync
        if (profile.getPlatform().isOfficialApiAvailable() && !"MANUAL".equalsIgnoreCase(profile.getSourceType())) {
            try {
                CodingStatistics liveStats = syncService.syncPlatform(profile.getPlatform(), profile.getUsername());
                profile.setStatistics(liveStats);
                profile.setSourceType("LIVE");
                profile.setStatus("CONNECTED");
                profile.setLastSyncedAt(syncService.getCurrentFormattedTimestamp());
            } catch (Exception e) {
                // Keep connected with default stats, mark status
                profile.setStatus("CONNECTED");
                profile.setSourceType("MANUAL");
                profile.setLastSyncedAt("Added manually");
            }
        } else {
            profile.setSourceType("MANUAL");
            profile.setStatus("CONNECTED");
            profile.setLastSyncedAt(syncService.getCurrentFormattedTimestamp());
        }

        profiles.add(profile);
        return profile;
    }

    public CodingProfile syncProfile(String studentId, String profileId) throws Exception {
        CodingProfile profile = getProfileById(studentId, profileId)
                .orElseThrow(() -> new NoSuchElementException("Coding profile not found with ID: " + profileId));

        if (!profile.getPlatform().isOfficialApiAvailable()) {
            throw new UnsupportedOperationException(
                    "Automatic sync is not supported for " + profile.getPlatform().getDisplayName() +
                    ". Please update statistics via manual verification."
            );
        }

        profile.setStatus("SYNCING");
        try {
            CodingStatistics freshStats = syncService.syncPlatform(profile.getPlatform(), profile.getUsername());
            profile.setStatistics(freshStats);
            profile.setSourceType("LIVE");
            profile.setStatus("CONNECTED");
            profile.setLastSyncedAt(syncService.getCurrentFormattedTimestamp());
            profile.touch();
            return profile;
        } catch (Exception e) {
            profile.setStatus("SYNC_FAILED");
            profile.touch();
            throw e;
        }
    }

    public CodingProfile updateManualProfile(String studentId, String profileId, CodingProfile updated) {
        CodingProfile existing = getProfileById(studentId, profileId)
                .orElseThrow(() -> new NoSuchElementException("Coding profile not found with ID: " + profileId));

        if (updated.getUsername() != null && !updated.getUsername().trim().isEmpty()) {
            existing.setUsername(updated.getUsername().trim());
        }
        if (updated.getProfileUrl() != null) {
            existing.setProfileUrl(updated.getProfileUrl().trim());
        }
        if (updated.getProofUrl() != null) {
            existing.setProofUrl(updated.getProofUrl().trim());
        }
        if (updated.getManualNotes() != null) {
            existing.setManualNotes(updated.getManualNotes().trim());
        }
        if (updated.getStatistics() != null) {
            existing.setStatistics(updated.getStatistics());
        }
        existing.setSourceType("MANUAL");
        existing.setLastSyncedAt("Manually verified • " + syncService.getCurrentFormattedTimestamp());
        existing.touch();
        return existing;
    }

    public boolean removeProfile(String studentId, String profileId) {
        List<CodingProfile> profiles = getProfiles(studentId);
        return profiles.removeIf(p -> p.getId().equalsIgnoreCase(profileId));
    }
}
