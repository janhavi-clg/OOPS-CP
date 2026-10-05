-- ============================================================
-- DEVTRACK MODULE 8: ANALYTICS, PROGRESS & INSIGHTS SCHEMA
-- PostgreSQL / Supabase DDL with Row Level Security (RLS)
-- ============================================================

CREATE TABLE IF NOT EXISTS public.student_analytics_snapshots (
    id VARCHAR(64) PRIMARY KEY,
    student_id VARCHAR(64) NOT NULL,
    snapshot_date DATE DEFAULT CURRENT_DATE,
    time_range VARCHAR(32) DEFAULT 'month',
    total_skills INTEGER DEFAULT 0,
    average_proficiency NUMERIC(5,2) DEFAULT 0.0,
    total_projects INTEGER DEFAULT 0,
    completed_projects INTEGER DEFAULT 0,
    project_completion_rate NUMERIC(5,2) DEFAULT 0.0,
    coding_problems_solved INTEGER DEFAULT 0,
    coding_streak_days INTEGER DEFAULT 0,
    total_certificates INTEGER DEFAULT 0,
    total_hackathons INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.development_activities (
    id VARCHAR(64) PRIMARY KEY,
    student_id VARCHAR(64) NOT NULL,
    date DATE NOT NULL,
    activity_title VARCHAR(255) NOT NULL,
    module_source VARCHAR(64) NOT NULL,
    category VARCHAR(64) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.devtrack_insights (
    id VARCHAR(64) PRIMARY KEY,
    student_id VARCHAR(64) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    category VARCHAR(64) NOT NULL,
    tone VARCHAR(32) DEFAULT 'POSITIVE',
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.devtrack_recommendations (
    id VARCHAR(64) PRIMARY KEY,
    student_id VARCHAR(64) NOT NULL,
    title VARCHAR(255) NOT NULL,
    action_prompt TEXT NOT NULL,
    target_module VARCHAR(64) NOT NULL,
    target_url VARCHAR(255),
    priority VARCHAR(32) DEFAULT 'MEDIUM',
    is_dismissed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indices for performance
CREATE INDEX IF NOT EXISTS idx_analytics_snapshots_student ON public.student_analytics_snapshots(student_id);
CREATE INDEX IF NOT EXISTS idx_dev_activities_student ON public.development_activities(student_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_dev_insights_student ON public.devtrack_insights(student_id);
CREATE INDEX IF NOT EXISTS idx_dev_recommendations_student ON public.devtrack_recommendations(student_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.student_analytics_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.development_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.devtrack_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.devtrack_recommendations ENABLE ROW LEVEL SECURITY;
