-- ============================================================
-- DEVTRACK MODULE 5: ACHIEVEMENTS & CERTIFICATES SCHEMA
-- Target Database: PostgreSQL / Supabase
-- ============================================================

CREATE TABLE IF NOT EXISTS achievements (
    id VARCHAR(64) PRIMARY KEY,
    student_id VARCHAR(64) NOT NULL,
    title VARCHAR(255) NOT NULL,
    achievement_category VARCHAR(64) NOT NULL,
    organization VARCHAR(255),
    achievement_date VARCHAR(32),
    description TEXT,
    role VARCHAR(128),
    team_name VARCHAR(128),
    team_members TEXT,
    proof_url TEXT,
    has_proof BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_achievements_student_id ON achievements(student_id);
CREATE INDEX IF NOT EXISTS idx_achievements_category ON achievements(achievement_category);

CREATE TABLE IF NOT EXISTS certificates (
    id VARCHAR(64) PRIMARY KEY,
    student_id VARCHAR(64) NOT NULL,
    certificate_name VARCHAR(255) NOT NULL,
    issuing_organization VARCHAR(255) NOT NULL,
    issue_date VARCHAR(32),
    expiry_date VARCHAR(32),
    credential_id VARCHAR(128),
    credential_url TEXT,
    file_data_or_url TEXT,
    file_type VARCHAR(16) DEFAULT 'PNG',
    related_skill VARCHAR(128),
    description TEXT,
    verified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_certificates_student_id ON certificates(student_id);
CREATE INDEX IF NOT EXISTS idx_certificates_skill ON certificates(related_skill);

ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
