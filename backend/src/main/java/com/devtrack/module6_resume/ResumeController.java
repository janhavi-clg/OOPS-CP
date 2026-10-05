package com.devtrack.module6_resume;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resumes")
@CrossOrigin(origins = "*")
public class ResumeController {

    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @GetMapping
    public ResponseEntity<List<Resume>> getResumes(@RequestParam(value = "studentId", defaultValue = "student_rahul_001") String studentId) {
        List<Resume> list = resumeService.getResumesByStudent(studentId);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getResumeById(@PathVariable("id") String id,
                                          @RequestParam(value = "studentId", defaultValue = "student_rahul_001") String studentId) {
        return resumeService.getResumeById(studentId, id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Resume> createResume(@RequestBody Resume resume,
                                              @RequestParam(value = "studentId", defaultValue = "student_rahul_001") String studentId) {
        Resume created = resumeService.createResume(studentId, resume);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateResume(@PathVariable("id") String id,
                                         @RequestBody Resume resume,
                                         @RequestParam(value = "studentId", defaultValue = "student_rahul_001") String studentId) {
        return resumeService.updateResume(studentId, id, resume)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteResume(@PathVariable("id") String id,
                                         @RequestParam(value = "studentId", defaultValue = "student_rahul_001") String studentId) {
        boolean removed = resumeService.deleteResume(studentId, id);
        if (removed) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
