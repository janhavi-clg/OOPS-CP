package com.devtrack.module3_coding;

import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Service orchestrating platform synchronization and API dispatching.
 * Demonstrates Strategy Pattern and Dependency Injection.
 */
@Service
public class PlatformSyncService {

    private final Map<CodingPlatform, CodingPlatformService> platformServices = new HashMap<>();

    public PlatformSyncService(List<CodingPlatformService> services) {
        for (CodingPlatformService s : services) {
            platformServices.put(s.getPlatform(), s);
        }
    }

    public boolean isPlatformSyncSupported(CodingPlatform platform) {
        return platformServices.containsKey(platform) && platform.isOfficialApiAvailable();
    }

    public CodingStatistics syncPlatform(CodingPlatform platform, String username) throws Exception {
        CodingPlatformService service = platformServices.get(platform);
        if (service == null || !service.hasOfficialApi()) {
            throw new UnsupportedOperationException(
                    "Automatic synchronization is not available for " + platform.getDisplayName() +
                    ". Please use the manual verification flow."
            );
        }

        return service.fetchStatistics(username);
    }

    public String getCurrentFormattedTimestamp() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM dd, yyyy • hh:mm a");
        return LocalDateTime.now().format(formatter);
    }
}
