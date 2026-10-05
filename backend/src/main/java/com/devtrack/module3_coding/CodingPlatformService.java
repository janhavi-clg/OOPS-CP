package com.devtrack.module3_coding;

/**
 * Strategy interface demonstrating OOP Abstraction and Polymorphism for coding platform integrations.
 * Each supported platform with a legitimate API implements this contract.
 */
public interface CodingPlatformService {

    /**
     * The platform associated with this integration service.
     */
    CodingPlatform getPlatform();

    /**
     * Whether this platform has an official public API available without private auth hurdles.
     */
    boolean hasOfficialApi();

    /**
     * Fetches current statistics from the platform's public API.
     * @param username The public handle/username on the platform.
     * @return Populated CodingStatistics object.
     * @throws Exception if handle is not found, rate limit exceeded, or network fails.
     */
    CodingStatistics fetchStatistics(String username) throws Exception;
}
