package com.devtrack.module3_coding;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

/**
 * REST Controller for Coding Profiles & Platform Sync (Module 3).
 */
@RestController
@RequestMapping("/api/v1/coding/profiles")
@CrossOrigin(origins = "*")
public class CodingProfileController {

    private final CodingProfileService profileService;

    public CodingProfileController(CodingProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping
    public ResponseEntity<List<CodingProfile>> getProfiles(
            @RequestHeader(value = "X-Student-Id", required = false, defaultValue = "stu_rahul_01") String studentId) {
        return ResponseEntity.ok(profileService.getProfiles(studentId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CodingProfile> getProfileById(
            @RequestHeader(value = "X-Student-Id", required = false, defaultValue = "stu_rahul_01") String studentId,
            @PathVariable String id) {
        return profileService.getProfileById(studentId, id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> addProfile(
            @RequestHeader(value = "X-Student-Id", required = false, defaultValue = "stu_rahul_01") String studentId,
            @RequestBody CodingProfile profile) {
        try {
            CodingProfile created = profileService.addProfile(studentId, profile);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/{id}/sync")
    public ResponseEntity<?> syncProfile(
            @RequestHeader(value = "X-Student-Id", required = false, defaultValue = "stu_rahul_01") String studentId,
            @PathVariable String id) {
        try {
            CodingProfile synced = profileService.syncProfile(studentId, id);
            return ResponseEntity.ok(synced);
        } catch (UnsupportedOperationException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage(), "type", "UNSUPPORTED"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}/manual")
    public ResponseEntity<?> updateManualProfile(
            @RequestHeader(value = "X-Student-Id", required = false, defaultValue = "stu_rahul_01") String studentId,
            @PathVariable String id,
            @RequestBody CodingProfile updated) {
        try {
            CodingProfile saved = profileService.updateManualProfile(studentId, id, updated);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeProfile(
            @RequestHeader(value = "X-Student-Id", required = false, defaultValue = "stu_rahul_01") String studentId,
            @PathVariable String id) {
        boolean removed = profileService.removeProfile(studentId, id);
        if (removed) {
            return ResponseEntity.ok(Map.of("message", "Coding profile disconnected successfully."));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
