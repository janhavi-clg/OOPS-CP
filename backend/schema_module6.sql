-- ============================================================
-- DEVTRACK MODULE 6: RESUME BUILDER & RECOMMENDATIONS SCHEMA
-- PostgreSQL / Supabase DDL with Row Level Security (RLS)
-- ============================================================

CREATE TABLE IF NOT EXISTS public.resumes (
    id VARCHAR(64) PRIMARY KEY,
    student_id VARCHAR(64) NOT NULL,
    title VARCHAR(255) NOT NULL,
    template VARCHAR(64) DEFAULT 'modern',
    full_name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(64),
    location VARCHAR(255),
    github_url TEXT,
    linkedin_url TEXT,
    portfolio_url TEXT,
    summary TEXT,
    target_role VARCHAR(255),
    job_description TEXT,
    profile_match_score INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.resume_sections (
    id VARCHAR(64) PRIMARY KEY,
    resume_id VARCHAR(64) REFERENCES public.resumes(id) ON DELETE CASCADE,
    section_key VARCHAR(64) NOT NULL,
    title VARCHAR(128) NOT NULL,
    visible BOOLEAN DEFAULT TRUE,
    order_index INTEGER DEFAULT 0,
    custom_content TEXT
);

CREATE TABLE IF NOT EXISTS public.resume_education (
    id VARCHAR(64) PRIMARY KEY,
    resume_id VARCHAR(64) REFERENCES public.resumes(id) ON DELETE CASCADE,
    institution VARCHAR(255) NOT NULL,
    degree VARCHAR(255) NOT NULL,
    start_year VARCHAR(32),
    end_year VARCHAR(32),
    score VARCHAR(64),
    location VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS public.resume_experience (
    id VARCHAR(64) PRIMARY KEY,
    resume_id VARCHAR(64) REFERENCES public.resumes(id) ON DELETE CASCADE,
    company VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    start_date VARCHAR(64),
    end_date VARCHAR(64),
    is_current BOOLEAN DEFAULT FALSE,
    highlights TEXT[] DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS public.resume_projects (
    id VARCHAR(64) PRIMARY KEY,
    resume_id VARCHAR(64) REFERENCES public.resumes(id) ON DELETE CASCADE,
    source_project_id VARCHAR(64),
    title VARCHAR(255) NOT NULL,
    role VARCHAR(128),
    technologies TEXT[] DEFAULT '{}',
    live_url TEXT,
    github_url TEXT,
    highlights TEXT[] DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS public.resume_skills (
    id VARCHAR(64) PRIMARY KEY,
    resume_id VARCHAR(64) REFERENCES public.resumes(id) ON DELETE CASCADE,
    category VARCHAR(128) NOT NULL,
    skills TEXT[] DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS public.resume_achievements (
    id VARCHAR(64) PRIMARY KEY,
    resume_id VARCHAR(64) REFERENCES public.resumes(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    organization VARCHAR(255),
    date VARCHAR(64),
    description TEXT
);

CREATE TABLE IF NOT EXISTS public.job_targets (
    id VARCHAR(64) PRIMARY KEY,
    student_id VARCHAR(64) NOT NULL,
    target_role VARCHAR(255) NOT NULL,
    category VARCHAR(128),
    job_description TEXT,
    match_score INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.resume_recommendations (
    id VARCHAR(64) PRIMARY KEY,
    student_id VARCHAR(64) NOT NULL,
    target_role VARCHAR(255) NOT NULL,
    matched_skills TEXT[] DEFAULT '{}',
    missing_skills TEXT[] DEFAULT '{}',
    recommended_skills TEXT[] DEFAULT '{}',
    recommended_project_ids TEXT[] DEFAULT '{}',
    recommended_achievement_ids TEXT[] DEFAULT '{}',
    match_score INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indices for performance
CREATE INDEX IF NOT EXISTS idx_resumes_student_id ON public.resumes(student_id);
CREATE INDEX IF NOT EXISTS idx_resume_sections_resume_id ON public.resume_sections(resume_id);
CREATE INDEX IF NOT EXISTS idx_resume_education_resume_id ON public.resume_education(resume_id);
CREATE INDEX IF NOT EXISTS idx_resume_experience_resume_id ON public.resume_experience(resume_id);
CREATE INDEX IF NOT EXISTS idx_resume_projects_resume_id ON public.resume_projects(resume_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume_education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume_experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_targets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume_recommendations ENABLE ROW LEVEL SECURITY;
