package com.devtrack.module1_profile;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * REST Controller for Hackathons in Module 1.
 */
@RestController
@RequestMapping("/api/v1/hackathons")
@CrossOrigin(origins = "*")
public class HackathonController {

    private final Module1ProfileService profileService;

    public HackathonController(Module1ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping
    public ResponseEntity<List<Module1Hackathon>> getHackathons(
            @RequestHeader(value = "X-Student-Id", required = false, defaultValue = "stu_rahul_01") String studentId,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "search", required = false) String search) {
        return ResponseEntity.ok(profileService.getHackathons(studentId, status, search));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getHackathonById(
            @RequestHeader(value = "X-Student-Id", required = false, defaultValue = "stu_rahul_01") String studentId,
            @PathVariable("id") String id) {
        try {
            return ResponseEntity.ok(profileService.getHackathonById(studentId, id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<?> addHackathon(
            @RequestHeader(value = "X-Student-Id", required = false, defaultValue = "stu_rahul_01") String studentId,
            @RequestBody Module1Hackathon hackathon) {
        try {
            Module1Hackathon created = profileService.addHackathon(studentId, hackathon);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateHackathon(
            @RequestHeader(value = "X-Student-Id", required = false, defaultValue = "stu_rahul_01") String studentId,
            @PathVariable("id") String id,
            @RequestBody Module1Hackathon hackathon) {
        try {
            Module1Hackathon updated = profileService.updateHackathon(studentId, id, hackathon);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteHackathon(
            @RequestHeader(value = "X-Student-Id", required = false, defaultValue = "stu_rahul_01") String studentId,
            @PathVariable("id") String id) {
        boolean removed = profileService.deleteHackathon(studentId, id);
        if (removed) {
            return ResponseEntity.ok(Map.of("success", true, "deletedId", id));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Hackathon not found"));
    }
}
