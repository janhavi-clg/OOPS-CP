package com.devtrack.module5_achievements;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/certificates")
@CrossOrigin(origins = "*")
public class CertificateController {

    private final CertificateService certificateService;
    private final String CURRENT_STUDENT_ID = "stu_rahul_01";

    public CertificateController(CertificateService certificateService) {
        this.certificateService = certificateService;
    }

    @GetMapping
    public ResponseEntity<List<Certificate>> getCertificates(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String skill) {
        return ResponseEntity.ok(certificateService.getCertificates(CURRENT_STUDENT_ID, search, skill));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCertificateById(@PathVariable String id) {
        return certificateService.getCertificateById(CURRENT_STUDENT_ID, id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<?> createCertificate(@RequestBody Certificate certificate) {
        try {
            Certificate created = certificateService.addCertificate(CURRENT_STUDENT_ID, certificate);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCertificate(@PathVariable String id, @RequestBody Certificate updated) {
        try {
            Certificate result = certificateService.updateCertificate(CURRENT_STUDENT_ID, id, updated);
            return ResponseEntity.ok(result);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCertificate(@PathVariable String id) {
        boolean removed = certificateService.deleteCertificate(CURRENT_STUDENT_ID, id);
        if (removed) {
            return ResponseEntity.ok(Map.of("message", "Certificate removed.", "id", id));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Certificate not found."));
    }
}
