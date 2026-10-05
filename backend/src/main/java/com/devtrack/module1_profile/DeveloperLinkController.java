package com.devtrack.module1_profile;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * REST Controller for Student Developer Links in Module 1.
 */
@RestController
@RequestMapping("/api/v1/developer-links")
@CrossOrigin(origins = "*")
public class DeveloperLinkController {

    private final Module1ProfileService profileService;

    public DeveloperLinkController(Module1ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping
    public ResponseEntity<List<DeveloperLink>> getLinks(
            @RequestHeader(value = "X-Student-Id", required = false, defaultValue = "stu_rahul_01") String studentId) {
        return ResponseEntity.ok(profileService.getDeveloperLinks(studentId));
    }

    @PostMapping
    public ResponseEntity<?> addLink(
            @RequestHeader(value = "X-Student-Id", required = false, defaultValue = "stu_rahul_01") String studentId,
            @RequestBody DeveloperLink link) {
        try {
            DeveloperLink created = profileService.addDeveloperLink(studentId, link);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateLink(
            @RequestHeader(value = "X-Student-Id", required = false, defaultValue = "stu_rahul_01") String studentId,
            @PathVariable("id") String id,
            @RequestBody DeveloperLink link) {
        try {
            DeveloperLink updated = profileService.updateDeveloperLink(studentId, id, link);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteLink(
            @RequestHeader(value = "X-Student-Id", required = false, defaultValue = "stu_rahul_01") String studentId,
            @PathVariable("id") String id) {
        boolean removed = profileService.deleteDeveloperLink(studentId, id);
        if (removed) {
            return ResponseEntity.ok(Map.of("success", true, "deletedId", id));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Link not found"));
    }
}
