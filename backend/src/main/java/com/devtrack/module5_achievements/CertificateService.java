package com.devtrack.module5_achievements;

import org.springframework.stereotype.Service;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

/**
 * Service Layer managing Student Certificates, credential links,
 * file validation, and student data isolation.
 */
@Service
public class CertificateService {

    private final Map<String, List<Certificate>> studentCertificatesMap = new ConcurrentHashMap<>();
    private final String DEMO_STUDENT_ID = "stu_rahul_01";

    public CertificateService() {
        initRahulDemoCertificates();
    }

    private void initRahulDemoCertificates() {
        List<Certificate> certs = new ArrayList<>();

        // 1. Python for Data Science & AI (Coursera / IBM)
        certs.add(new Certificate(
                "cert_1", DEMO_STUDENT_ID, "Python for Data Science & AI",
                "Coursera (IBM)", "2025-08-15", "",
                "IBM-PY-884920", "https://coursera.org/verify/demo-ibm-py",
                "https://devtrack.demo/certificates/ibm_python.pdf", "PDF",
                "Python", "Comprehensive data manipulation, NumPy arrays, Pandas DataFrames, and REST API calls.",
                true
        ));

        // 2. Machine Learning Fundamentals (Kaggle)
        certs.add(new Certificate(
                "cert_2", DEMO_STUDENT_ID, "Machine Learning Fundamentals",
                "Kaggle", "2025-10-10", "",
                "KAG-ML-449102", "https://kaggle.com/learn/certification/rahul",
                "https://devtrack.demo/certificates/kaggle_ml.png", "PNG",
                "Machine Learning", "Supervised learning models, random forests, decision trees, and cross-validation.",
                true
        ));

        // 3. SQL (Intermediate) Certificate (HackerRank)
        certs.add(new Certificate(
                "cert_3", DEMO_STUDENT_ID, "SQL (Intermediate) Certificate",
                "HackerRank", "2025-12-04", "",
                "HR-SQL-991204", "https://hackerrank.com/certificates/demo-sql",
                "https://devtrack.demo/certificates/hackerrank_sql.pdf", "PDF",
                "SQL", "Complex multi-table JOINs, nested subqueries, CTEs, and window aggregate functions.",
                true
        ));

        // 4. Git & GitHub Version Control (Udemy)
        certs.add(new Certificate(
                "cert_4", DEMO_STUDENT_ID, "Git & GitHub Version Control Masterclass",
                "Udemy", "2025-07-20", "",
                "UC-GITH-772183", "https://udemy.com/certificate/demo-git",
                "https://devtrack.demo/certificates/udemy_git.png", "PNG",
                "Git", "Branching strategies, interactive rebase, pull requests, merge conflict resolutions.",
                true
        ));

        // 5. Cloud Computing Foundations (AWS Academy)
        certs.add(new Certificate(
                "cert_5", DEMO_STUDENT_ID, "AWS Academy Cloud Foundations",
                "AWS Academy", "2026-01-18", "2029-01-18",
                "AWS-ACAD-33104", "https://awsacademy.com/verify/demo",
                "https://devtrack.demo/certificates/aws_cloud.pdf", "PDF",
                "Cloud Computing", "Core cloud concepts, security IAM, S3 storage architectures, and EC2 scaling.",
                true
        ));

        studentCertificatesMap.put(DEMO_STUDENT_ID, certs);
        studentCertificatesMap.put("student_rahul_001", certs);
    }

    public List<Certificate> getCertificates(String studentId, String search, String skill) {
        String key = (studentId != null && studentId.contains("rahul")) ? DEMO_STUDENT_ID : studentId;
        List<Certificate> list = studentCertificatesMap.computeIfAbsent(key, k -> new ArrayList<>());

        return list.stream()
                .filter(c -> {
                    if (skill != null && !skill.trim().isEmpty() && !skill.equalsIgnoreCase("ALL")) {
                        if (!c.getRelatedSkill().toLowerCase().contains(skill.toLowerCase().trim())) {
                            return false;
                        }
                    }
                    if (search != null && !search.trim().isEmpty()) {
                        String q = search.toLowerCase().trim();
                        boolean mName = c.getCertificateName().toLowerCase().contains(q);
                        boolean mOrg = c.getIssuingOrganization().toLowerCase().contains(q);
                        boolean mId = c.getCredentialId().toLowerCase().contains(q);
                        if (!mName && !mOrg && !mId) return false;
                    }
                    return true;
                })
                .sorted((a, b) -> (b.getIssueDate() != null ? b.getIssueDate() : "")
                        .compareTo(a.getIssueDate() != null ? a.getIssueDate() : ""))
                .collect(Collectors.toList());
    }

    public Optional<Certificate> getCertificateById(String studentId, String id) {
        return studentCertificatesMap.computeIfAbsent(studentId, k -> new ArrayList<>())
                .stream()
                .filter(c -> c.getId().equalsIgnoreCase(id))
                .findFirst();
    }

    public Certificate addCertificate(String studentId, Certificate certificate) {
        if (certificate.getCertificateName() == null || certificate.getCertificateName().trim().isEmpty()) {
            throw new IllegalArgumentException("Certificate name is required.");
        }
        if (certificate.getIssuingOrganization() == null || certificate.getIssuingOrganization().trim().isEmpty()) {
            throw new IllegalArgumentException("Issuing organization is required.");
        }
        certificate.setStudentId(studentId);
        List<Certificate> list = studentCertificatesMap.computeIfAbsent(studentId, k -> new ArrayList<>());
        list.add(0, certificate);
        return certificate;
    }

    public Certificate updateCertificate(String studentId, String id, Certificate updated) {
        Certificate existing = getCertificateById(studentId, id)
                .orElseThrow(() -> new NoSuchElementException("Certificate not found with ID: " + id));

        if (updated.getCertificateName() != null && !updated.getCertificateName().trim().isEmpty()) {
            existing.setCertificateName(updated.getCertificateName().trim());
        }
        if (updated.getIssuingOrganization() != null) existing.setIssuingOrganization(updated.getIssuingOrganization());
        if (updated.getIssueDate() != null) existing.setIssueDate(updated.getIssueDate());
        if (updated.getExpiryDate() != null) existing.setExpiryDate(updated.getExpiryDate());
        if (updated.getCredentialId() != null) existing.setCredentialId(updated.getCredentialId());
        if (updated.getCredentialUrl() != null) existing.setCredentialUrl(updated.getCredentialUrl());
        if (updated.getFileDataOrUrl() != null) existing.setFileDataOrUrl(updated.getFileDataOrUrl());
        if (updated.getFileType() != null) existing.setFileType(updated.getFileType());
        if (updated.getRelatedSkill() != null) existing.setRelatedSkill(updated.getRelatedSkill());
        if (updated.getDescription() != null) existing.setDescription(updated.getDescription());

        existing.touch();
        return existing;
    }

    public boolean deleteCertificate(String studentId, String id) {
        List<Certificate> list = studentCertificatesMap.computeIfAbsent(studentId, k -> new ArrayList<>());
        return list.removeIf(c -> c.getId().equalsIgnoreCase(id));
    }
}
