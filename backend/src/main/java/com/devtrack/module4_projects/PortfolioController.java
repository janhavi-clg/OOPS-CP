package com.devtrack.module4_projects;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * REST Controller for the Portfolio Preview and public showcase data.
 * Endpoint:
 * - GET /api/portfolio/preview
 */
@RestController
@RequestMapping("/api/portfolio")
@CrossOrigin(origins = "*")
public class PortfolioController {

    private final PortfolioService portfolioService;
    private final String CURRENT_STUDENT_ID = "stu_rahul_01";

    public PortfolioController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    @GetMapping("/preview")
    public ResponseEntity<Map<String, Object>> getPortfolioPreview() {
        Map<String, Object> preview = portfolioService.getPortfolioPreview(CURRENT_STUDENT_ID);
        return ResponseEntity.ok(preview);
    }
}
