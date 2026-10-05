package com.devtrack.module3_coding;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * REST Controller for the Coding Activity Timeline (Coding Journey).
 */
@RestController
@RequestMapping("/api/v1/coding/activity")
@CrossOrigin(origins = "*")
public class CodingActivityController {

    private final CodingActivityService activityService;

    public CodingActivityController(CodingActivityService activityService) {
        this.activityService = activityService;
    }

    @GetMapping
    public ResponseEntity<List<CodingActivity>> getActivities(
            @RequestHeader(value = "X-Student-Id", required = false, defaultValue = "stu_rahul_01") String studentId,
            @RequestParam(value = "platform", required = false, defaultValue = "ALL") String platform) {
        return ResponseEntity.ok(activityService.getActivitiesByPlatform(studentId, platform));
    }

    @PostMapping
    public ResponseEntity<CodingActivity> logActivity(
            @RequestHeader(value = "X-Student-Id", required = false, defaultValue = "stu_rahul_01") String studentId,
            @RequestBody CodingActivity activity) {
        CodingActivity logged = activityService.logActivity(studentId, activity);
        return ResponseEntity.status(HttpStatus.CREATED).body(logged);
    }
}
