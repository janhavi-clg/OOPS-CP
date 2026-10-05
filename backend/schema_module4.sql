-- ============================================================
-- DEVTRACK MODULE 4: PROJECT & PORTFOLIO MANAGEMENT SCHEMA
-- Target Database: PostgreSQL / Supabase
-- ============================================================

-- 1. Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id VARCHAR(64) PRIMARY KEY,
    student_id VARCHAR(64) NOT NULL,
    name VARCHAR(255) NOT NULL,
    short_description TEXT NOT NULL,
    detailed_description TEXT,
    problem_statement TEXT,
    solution_overview TEXT,
    category VARCHAR(64) DEFAULT 'Web Development',
    status VARCHAR(32) DEFAULT 'IN_PROGRESS' CHECK (status IN ('PLANNING', 'IN_PROGRESS', 'COMPLETED', 'PAUSED', 'ARCHIVED')),
    progress_percentage NUMERIC(5, 2) DEFAULT 0.0 CHECK (progress_percentage >= 0.0 AND progress_percentage <= 100.0),
    start_date VARCHAR(32),
    end_date VARCHAR(32) DEFAULT 'Present',
    image_url TEXT,
    featured BOOLEAN DEFAULT FALSE,
    role VARCHAR(128) DEFAULT 'Developer',
    contribution_details TEXT,
    team_size INT DEFAULT 1 CHECK (team_size >= 1),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_projects_student_id ON projects(student_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);

-- 2. Project Technologies Table
CREATE TABLE IF NOT EXISTS project_technologies (
    id BIGSERIAL PRIMARY KEY,
    project_id VARCHAR(64) NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    name VARCHAR(64) NOT NULL,
    category VARCHAR(64) DEFAULT 'General',
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_project_tech_proj_id ON project_technologies(project_id);
CREATE INDEX IF NOT EXISTS idx_project_tech_name ON project_technologies(name);

-- 3. Project Links Table
CREATE TABLE IF NOT EXISTS project_links (
    id BIGSERIAL PRIMARY KEY,
    project_id VARCHAR(64) NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    link_type VARCHAR(32) NOT NULL CHECK (link_type IN ('GITHUB', 'LIVE_DEMO', 'DOCUMENTATION', 'OTHER')),
    url TEXT NOT NULL,
    label VARCHAR(128),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_project_links_proj_id ON project_links(project_id);

-- 4. Project Milestones Table
CREATE TABLE IF NOT EXISTS project_milestones (
    id VARCHAR(64) PRIMARY KEY,
    project_id VARCHAR(64) NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    milestone_date VARCHAR(32),
    completed BOOLEAN DEFAULT TRUE,
    order_index INT DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_project_milestones_proj_id ON project_milestones(project_id);

-- 5. Project Achievements Table
CREATE TABLE IF NOT EXISTS project_achievements (
    id VARCHAR(64) PRIMARY KEY,
    project_id VARCHAR(64) NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    award_type VARCHAR(128) DEFAULT 'Recognition',
    organization VARCHAR(255),
    award_date VARCHAR(32),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_project_achievements_proj_id ON project_achievements(project_id);

-- 6. Project Key Features Table
CREATE TABLE IF NOT EXISTS project_key_features (
    id BIGSERIAL PRIMARY KEY,
    project_id VARCHAR(64) NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    feature_text TEXT NOT NULL,
    order_index INT DEFAULT 1
);

CREATE INDEX IF NOT EXISTS idx_project_features_proj_id ON project_key_features(project_id);

-- Row Level Security (RLS) policies for Supabase:
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_key_features ENABLE ROW LEVEL SECURITY;
