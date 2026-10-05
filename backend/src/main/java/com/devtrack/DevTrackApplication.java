package com.devtrack;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * DevTrack Spring Boot Application Entry Point.
 * Student Developer Portfolio & Progress Tracking Platform.
 */
@SpringBootApplication
public class DevTrackApplication {

    public static void main(String[] args) {
        SpringApplication.run(DevTrackApplication.class, args);
        System.out.println("==================================================");
        System.out.println("DevTrack Backend (Java OOP) initialized successfully.");
        System.out.println("Ready for student portfolio & progress tracking.");
        System.out.println("==================================================");
    }
}
