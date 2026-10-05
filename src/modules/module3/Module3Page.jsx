import React, { useState, useEffect } from 'react';
import {
  Code2,
  Plus,
  RefreshCw,
  Layers,
  Calendar,
  Flame,
  Target,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  Clock,
  Sparkles,
  Link as LinkIcon
} from 'lucide-react';
import { module3Service } from './module3Service';
import { CodingOverview } from './components/CodingOverview';
import { PlatformCard } from './components/PlatformCard';
import { ConnectPlatformModal } from './components/ConnectPlatformModal';
import { ManualVerificationModal } from './components/ManualVerificationModal';
import { CodingGoalsSection } from './components/CodingGoalsSection';
import { CodingGoalModal } from './components/CodingGoalModal';
import { CodingJourneyTimeline } from './components/CodingJourneyTimeline';
import { DisconnectConfirmModal } from './components/DisconnectConfirmModal';
import { Coding3DHeader } from './components/Coding3DHeader';
import { Toast } from '../../components/common/Toast';
import { useAuth } from '../../context/AuthContext';

export const Module3Page = () => {
  const { user } = useAuth();

  // Navigation Tabs: 'overview' | 'platforms' | 'journey' | 'goals'
  const [activeTab, setActiveTab] = useState('overview');

  // Data States
  const [profiles, setProfiles] = useState([]);
  const [goals, setGoals] = useState([]);
  const [activities, setActivities] = useState([]);
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  // Syncing State: Map of profileId -> boolean
  const [syncingMap, setSyncingMap] = useState({});

  // Modals
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [manualVerifyProfile, setManualVerifyProfile] = useState(null);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [disconnectModal, setDisconnectModal] = useState({
    isOpen: false,
    profile: null
  });

  // Toast
  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const loadData = async () => {
    try {
      const [profData, goalData, actData, overData] = await Promise.all([
        module3Service.getProfiles(),
        module3Service.getGoals(),
        module3Service.getActivities('ALL'),
        module3Service.getCodingOverview()
      ]);

      setProfiles(profData);
      setGoals(goalData);
      setActivities(actData);
      setOverview(overData);
    } catch (err) {
      console.error('Error loading Module 3 data:', err);
      showToast('Error loading coding tracker data.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // -------------------------------------------------------------
  // PLATFORM ACTIONS
  // -------------------------------------------------------------
  const handleConnectPlatform = async (connectData) => {
    try {
      const created = await module3Service.connectPlatform(connectData);
      showToast(`Connected ${created.platform} account (@${created.username}).`);
      await loadData();
    } catch (err) {
      showToast(err.message || 'Failed to connect platform.', 'error');
      throw err;
    }
  };

  const handleSyncPlatform = async (profile) => {
    setSyncingMap((prev) => ({ ...prev, [profile.id]: true }));
    try {
      const updated = await module3Service.syncPlatform(profile.id);
      showToast(`✓ Synchronized live stats for ${profile.platform}.`);
      await loadData();
    } catch (err) {
      showToast(
        err.message || `Unable to synchronize ${profile.platform}. Please try again later.`,
        'error'
      );
    } finally {
      setSyncingMap((prev) => ({ ...prev, [profile.id]: false }));
    }
  };

  const handleManualVerifySave = async (profileId, manualData) => {
    try {
      const updated = await module3Service.updateManualVerification(profileId, manualData);
      showToast(`Saved manual verification metrics for ${updated.platform}.`);
      await loadData();
    } catch (err) {
      showToast(err.message || 'Failed to save manual verification.', 'error');
      throw err;
    }
  };

  const promptDisconnect = (profile) => {
    setDisconnectModal({
      isOpen: true,
      profile
    });
  };

  const handleConfirmDisconnect = async () => {
    const p = disconnectModal.profile;
    if (!p) return;
    try {
      await module3Service.disconnectPlatform(p.id);
      showToast(`Disconnected ${p.platform} from DevTrack.`);
      setDisconnectModal({ isOpen: false, profile: null });
      await loadData();
    } catch (err) {
      showToast(err.message || 'Failed to disconnect platform.', 'error');
    }
  };

  // -------------------------------------------------------------
  // GOAL ACTIONS
  // -------------------------------------------------------------
  const handleSaveGoal = async (goalData) => {
    try {
      if (goalData.id) {
        await module3Service.updateGoal(goalData.id, goalData);
        showToast(`Updated coding goal "${goalData.title}".`);
      } else {
        const created = await module3Service.addGoal(goalData);
        showToast(`Created new coding goal "${created.title}".`);
      }
      await loadData();
    } catch (err) {
      showToast(err.message || 'Failed to save coding goal.', 'error');
      throw err;
    }
  };

  const handleDeleteGoal = async (goal) => {
    try {
      await module3Service.deleteGoal(goal.id);
      showToast(`Deleted coding goal "${goal.title}".`);
      await loadData();
    } catch (err) {
      showToast(err.message || 'Failed to delete goal.', 'error');
    }
  };

  if (loading) {
    return (
      <div className="devtrack-module-loading">
        <div className="coffee-spinner" />
        <p className="loading-text">Loading Coding & Activity Tracker...</p>
      </div>
    );
  }

  return (
    <div className="devtrack-module-container module3-theme">
      {/* Toast Feedback */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Module 3 Hero Header */}
      <div className="module3-hero-header">
        <div className="hero-header-left">
          <div className="module-badge-row">
            <span className="module-number-pill">Module 3</span>
            <span className="module-name-pill">Coding Progress & Activity</span>
            <span className="module-live-tag">
              <Flame size={13} className="text-amber" />
              <span>{overview?.currentStreakDays || 23}-Day Active Streak</span>
            </span>
          </div>
          <h1 className="module3-main-heading">Coding Progress & Activity Tracker</h1>
          <p className="module3-subtitle">
            Synchronize live problem stats from LeetCode, GitHub, and Codeforces or record verified contest standings with complete data transparency.
          </p>
        </div>

        <div className="hero-header-right">
          <Coding3DHeader />
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="module3-navigation-bar">
        <div className="nav-tabs-group">
          <button
            type="button"
            className={`module-nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <TrendingUp size={16} />
            <span>Coding Overview</span>
          </button>
          <button
            type="button"
            className={`module-nav-btn ${activeTab === 'platforms' ? 'active' : ''}`}
            onClick={() => setActiveTab('platforms')}
          >
            <Layers size={16} />
            <span>Platforms ({profiles.length})</span>
          </button>
          <button
            type="button"
            className={`module-nav-btn ${activeTab === 'journey' ? 'active' : ''}`}
            onClick={() => setActiveTab('journey')}
          >
            <Clock size={16} />
            <span>Coding Journey ({activities.length})</span>
          </button>
          <button
            type="button"
            className={`module-nav-btn ${activeTab === 'goals' ? 'active' : ''}`}
            onClick={() => setActiveTab('goals')}
          >
            <Target size={16} />
            <span>Goals & Targets ({goals.length})</span>
          </button>
        </div>

        <div className="nav-actions-group">
          <button
            type="button"
            className="btn-primary"
            onClick={() => setIsConnectModalOpen(true)}
          >
            <Plus size={16} />
            <span>+ Connect Platform</span>
          </button>
        </div>
      </div>

      {/* TAB 1: Overview */}
      {activeTab === 'overview' && (
        <div className="tab-pane-container">
          <CodingOverview
            overview={overview}
            onConnectClick={() => setIsConnectModalOpen(true)}
            onAddGoalClick={() => {
              setEditingGoal(null);
              setIsGoalModalOpen(true);
            }}
          />

          {/* Connected Platforms Preview Section */}
          <div className="overview-platforms-preview">
            <div className="section-toolbar">
              <div>
                <h3 className="section-title">Connected Coding Accounts</h3>
                <p className="section-subtitle">
                  Synchronized external developer handles and verification states.
                </p>
              </div>
              <button
                type="button"
                className="btn-secondary-outline"
                onClick={() => setActiveTab('platforms')}
              >
                <span>View All Platforms</span>
              </button>
            </div>

            <div className="platforms-cards-grid">
              {profiles.map((p) => (
                <PlatformCard
                  key={p.id}
                  profile={p}
                  isSyncing={Boolean(syncingMap[p.id])}
                  onSync={handleSyncPlatform}
                  onManualVerify={(prof) => setManualVerifyProfile(prof)}
                  onDisconnect={promptDisconnect}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Platforms & Connections */}
      {activeTab === 'platforms' && (
        <div className="tab-pane-container">
          <div className="pane-header-row">
            <div>
              <h3 className="pane-title">Platform Connections</h3>
              <p className="pane-subtitle">
                Manage supported automatic API integrations (LeetCode, GitHub, Codeforces) and manual verification profiles (CodeChef, GeeksforGeeks).
              </p>
            </div>
            <button
              type="button"
              className="btn-primary"
              onClick={() => setIsConnectModalOpen(true)}
            >
              <Plus size={16} />
              <span>+ Connect Platform</span>
            </button>
          </div>

          <div className="platforms-cards-grid">
            {profiles.map((p) => (
              <PlatformCard
                key={p.id}
                profile={p}
                isSyncing={Boolean(syncingMap[p.id])}
                onSync={handleSyncPlatform}
                onManualVerify={(prof) => setManualVerifyProfile(prof)}
                onDisconnect={promptDisconnect}
              />
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Coding Journey (Timeline) */}
      {activeTab === 'journey' && (
        <div className="tab-pane-container">
          <CodingJourneyTimeline activities={activities} />
        </div>
      )}

      {/* TAB 4: Goals & Targets */}
      {activeTab === 'goals' && (
        <div className="tab-pane-container">
          <CodingGoalsSection
            goals={goals}
            onAddGoal={() => {
              setEditingGoal(null);
              setIsGoalModalOpen(true);
            }}
            onEditGoal={(g) => {
              setEditingGoal(g);
              setIsGoalModalOpen(true);
            }}
            onDeleteGoal={handleDeleteGoal}
          />
        </div>
      )}

      {/* Connect Platform Modal */}
      <ConnectPlatformModal
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
        connectedPlatforms={profiles}
        onConnect={handleConnectPlatform}
      />

      {/* Manual Verification Modal */}
      <ManualVerificationModal
        isOpen={Boolean(manualVerifyProfile)}
        onClose={() => setManualVerifyProfile(null)}
        profile={manualVerifyProfile}
        onSave={handleManualVerifySave}
      />

      {/* Coding Goal Modal */}
      <CodingGoalModal
        isOpen={isGoalModalOpen}
        onClose={() => {
          setIsGoalModalOpen(false);
          setEditingGoal(null);
        }}
        initialData={editingGoal}
        platforms={profiles}
        onSave={handleSaveGoal}
      />

      {/* Disconnect Confirmation Modal */}
      <DisconnectConfirmModal
        isOpen={disconnectModal.isOpen}
        platformName={disconnectModal.profile?.platform || ''}
        username={disconnectModal.profile?.username || ''}
        onConfirm={handleConfirmDisconnect}
        onCancel={() => setDisconnectModal({ isOpen: false, profile: null })}
      />
    </div>
  );
};

export default Module3Page;
