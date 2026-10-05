import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Calendar,
  Layers,
  Sparkles,
  Award,
  RefreshCw,
  FolderGit2,
  Code2,
  BookOpen
} from 'lucide-react';
import { module8Service } from './module8Service';
import { AnalyticsOverviewCards } from './components/AnalyticsOverviewCards';
import { SkillAnalyticsCard } from './components/SkillAnalyticsCard';
import { CodingAnalyticsCard } from './components/CodingAnalyticsCard';
import { ProjectAnalyticsCard } from './components/ProjectAnalyticsCard';
import { WeeklyActivityChart } from './components/WeeklyActivityChart';
import { DevelopmentTimeline } from './components/DevelopmentTimeline';
import { InsightsPanel } from './components/InsightsPanel';
import { DeveloperGrowth3DOrb } from './components/DeveloperGrowth3DOrb';
import './module8.css';

export const Module8Page = () => {
  const [timeRange, setTimeRange] = useState('month'); // 'week', 'month', 'quarter', 'year', 'all'
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const timeRanges = [
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'quarter', label: 'Last 3 Months' },
    { id: 'year', label: 'This Year' },
    { id: 'all', label: 'All Time' }
  ];

  const loadData = () => {
    setLoading(true);
    const data = module8Service.getStudentAnalytics(timeRange);
    setAnalytics(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [timeRange]);

  return (
    <div className="module8-page-container">
      {/* Hero Header */}
      <header className="module8-hero-header">
        <div className="hero-left">
          <div className="hero-badge">
            <LineChart size={14} />
            <span>MODULE 8 • PROGRESS DASHBOARD & INSIGHTS</span>
          </div>
          <h1 className="hero-title">Developer Progress & Analytics</h1>
          <p className="hero-subtitle">
            A comprehensive, transparent view of your software engineering journey combining skills, coding, projects, and certifications.
          </p>
        </div>

        {/* Date / Time Filter Toolbar (per prompt 8.14) */}
        <div className="hero-filter-bar">
          <div className="time-filter-pills">
            <Calendar size={14} className="filter-cal-icon" />
            {timeRanges.map(tr => (
              <button
                key={tr.id}
                type="button"
                className={`time-pill-btn ${timeRange === tr.id ? 'active' : ''}`}
                onClick={() => setTimeRange(tr.id)}
              >
                {tr.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="btn-refresh"
            onClick={loadData}
            title="Refresh Analytics Data"
          >
            <RefreshCw size={14} />
          </button>
        </div>
      </header>

      {/* 8.1 Analytics Overview Top Cards */}
      <section className="overview-cards-section">
        <AnalyticsOverviewCards analytics={analytics} />
      </section>

      {/* Hero Feature Row: 3D Growth Orb + Insights & Recommendations */}
      <section className="growth-insights-row">
        <div className="growth-orb-container">
          <DeveloperGrowth3DOrb progressPercent={78} />
        </div>
        <div className="insights-container">
          <InsightsPanel
            insights={analytics?.insights}
            recommendations={analytics?.recommendations}
          />
        </div>
      </section>

      {/* Main Analytics Grid: Skills, Coding, Projects, Weekly Rhythm */}
      <section className="analytics-details-grid">
        <div className="analytics-column">
          <SkillAnalyticsCard skillsData={analytics?.skills} />
          <ProjectAnalyticsCard projectData={analytics?.projects} />
        </div>

        <div className="analytics-column">
          <CodingAnalyticsCard codingData={analytics?.coding} />
          <WeeklyActivityChart
            weeklyActivity={analytics?.weeklyActivity}
            activityDistribution={analytics?.activityDistribution}
          />
        </div>
      </section>

      {/* Unified Multi-Module Development Journey Timeline */}
      <section className="timeline-section-wrap">
        <DevelopmentTimeline timeline={analytics?.timeline} />
      </section>
    </div>
  );
};

export default Module8Page;
