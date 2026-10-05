package com.devtrack.module1_profile;

import com.devtrack.core.model.StudentProfile;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * REST Controller for Student Profile in Module 1.
 */
@RestController
@RequestMapping("/api/v1/profile")
@CrossOrigin(origins = "*")
public class ProfileController {

    private final Module1ProfileService profileService;

    public ProfileController(Module1ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping
    public ResponseEntity<StudentProfile> getProfile(
            @RequestHeader(value = "X-Student-Id", required = false, defaultValue = "stu_rahul_01") String studentId) {
        return ResponseEntity.ok(profileService.getProfile(studentId));
    }

    @PutMapping
    public ResponseEntity<StudentProfile> updateProfile(
            @RequestHeader(value = "X-Student-Id", required = false, defaultValue = "stu_rahul_01") String studentId,
            @RequestBody StudentProfile updatedProfile) {
        return ResponseEntity.ok(profileService.updateProfile(studentId, updatedProfile));
    }

    @PostMapping("/avatar")
    public ResponseEntity<StudentProfile> uploadAvatar(
            @RequestHeader(value = "X-Student-Id", required = false, defaultValue = "stu_rahul_01") String studentId,
            @RequestBody Map<String, String> body) {
        String avatarUrl = body.get("avatarUrl");
        StudentProfile p = profileService.getProfile(studentId);
        p.setAvatarUrl(avatarUrl);
        return ResponseEntity.ok(profileService.updateProfile(studentId, p));
    }

    @DeleteMapping("/avatar")
    public ResponseEntity<StudentProfile> removeAvatar(
            @RequestHeader(value = "X-Student-Id", required = false, defaultValue = "stu_rahul_01") String studentId) {
        StudentProfile p = profileService.getProfile(studentId);
        p.setAvatarUrl(null);
        return ResponseEntity.ok(profileService.updateProfile(studentId, p));
    }
}
