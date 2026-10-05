import React from 'react';
import {
  BookOpen,
  FolderGit2,
  Award,
  Trophy,
  Code2,
  Layers,
  Flame,
  CheckCircle2
} from 'lucide-react';

export const AnalyticsOverviewCards = ({ analytics }) => {
  if (!analytics) return null;

  const cards = [
    {
      id: 'skills',
      label: 'Skills Tracked',
      value: analytics.skills?.total || 7,
      subtext: `Avg: ${analytics.skills?.averageProficiency || 0}%`,
      icon: BookOpen,
      accent: 'warm'
    },
    {
      id: 'projects',
      label: 'Portfolio Projects',
      value: analytics.projects?.total || 6,
      subtext: `${analytics.projects?.completed || 4} Completed (${analytics.projects?.completionRate || 0}%)`,
      icon: FolderGit2,
      accent: 'dark'
    },
    {
      id: 'certificates',
      label: 'Verified Certifications',
      value: analytics.achievements?.totalCertificates || 5,
      subtext: 'Credentials verified',
      icon: Award,
      accent: 'warm'
    },
    {
      id: 'achievements',
      label: 'Hackathons & Accolades',
      value: analytics.achievements?.totalAchievements || 5,
      subtext: `${analytics.achievements?.hackathonsCount || 4} Hackathons`,
      icon: Trophy,
      accent: 'gold'
    },
    {
      id: 'coding',
      label: 'Coding Problems',
      value: analytics.coding?.problemsSolved || 137,
      subtext: 'LeetCode & HackerRank',
      icon: Code2,
      accent: 'dark'
    },
    {
      id: 'learning',
      label: 'Learning Resources',
      value: analytics.learning?.completedResources || 12,
      subtext: `${analytics.learning?.totalResources || 18} Tracked (${analytics.learning?.completionRate || 0}%)`,
      icon: Layers,
      accent: 'warm'
    },
    {
      id: 'streak',
      label: 'Active Daily Streak',
      value: `${analytics.coding?.codingStreakDays || 14} Days`,
      subtext: 'LeetCode streak active',
      icon: Flame,
      accent: 'flame'
    }
  ];

  return (
    <div className="analytics-overview-grid">
      {cards.map(c => {
        const Icon = c.icon;
        return (
          <div key={c.id} className={`overview-stat-card ${c.accent}`}>
            <div className="stat-card-top">
              <span className="stat-label">{c.label}</span>
              <div className="stat-icon-wrap">
                <Icon size={16} />
              </div>
            </div>
            <div className="stat-val">{c.value}</div>
            <div className="stat-sub">{c.subtext}</div>
          </div>
        );
      })}
    </div>
  );
};
